import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  // Calculate pagination
  const startIndex = (page - 1) * limit

  try {
    // Get total count
    const { count } = await supabase.from("insights").select("*", { count: "exact", head: true })

    // Get paginated insights
    const { data: insights, error } = await supabase
      .from("insights")
      .select("*")
      .range(startIndex, startIndex + limit - 1)
      .order("created_at", { ascending: false })

    if (error) throw error

    // Calculate total pages
    const totalItems = count || 0
    const totalPages = Math.ceil(totalItems / limit)

    // Return paginated insights
    return NextResponse.json({
      insights,
      currentPage: page,
      totalPages,
      totalItems,
    })
  } catch (error) {
    console.error("Error fetching insights:", error)
    return NextResponse.json({ error: "Failed to fetch insights" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate a slug from the title
    const slug = body.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    // Insert the insight
    const { data: insight, error } = await supabase
      .from("insights")
      .insert({
        slug,
        title: body.title,
        date: body.date,
        author: body.author,
        content: body.content,
        image: body.image,
      })
      .select()
      .single()

    if (error) throw error

    // Insert the next article if provided
    if (body.nextArticle) {
      const { error: nextArticleError } = await supabase.from("next_articles").insert({
        insight_id: insight.id,
        title: body.nextArticle.title,
        date: body.nextArticle.date,
        author: body.nextArticle.author,
        image: body.nextArticle.image,
        slug: body.nextArticle.slug,
      })

      if (nextArticleError) throw nextArticleError
    }

    return NextResponse.json({ success: true, message: "Insight created successfully", insight }, { status: 201 })
  } catch (error) {
    console.error("Error creating insight:", error)
    return NextResponse.json({ success: false, message: "Failed to create insight" }, { status: 400 })
  }
}
