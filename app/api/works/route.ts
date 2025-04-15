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
    const { count } = await supabase.from("works").select("*", { count: "exact", head: true })

    // Get paginated works
    const { data: works, error } = await supabase
      .from("works")
      .select("*, work_details(*)")
      .range(startIndex, startIndex + limit - 1)
      .order("created_at", { ascending: false })

    if (error) throw error

    // Format the works to match the expected structure
    const formattedWorks = works.map((work) => {
      const details = work.work_details.map((detail: any) => ({
        label: detail.label,
        value: detail.value,
      }))

      return {
        ...work,
        details,
        work_details: undefined,
      }
    })

    // Calculate total pages
    const totalItems = count || 0
    const totalPages = Math.ceil(totalItems / limit)

    // Return paginated works
    return NextResponse.json({
      works: formattedWorks,
      currentPage: page,
      totalPages,
      totalItems,
    })
  } catch (error) {
    console.error("Error fetching works:", error)
    return NextResponse.json({ error: "Failed to fetch works" }, { status: 500 })
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

    // Insert the work
    const { data: work, error } = await supabase
      .from("works")
      .insert({
        slug,
        title: body.title,
        year: body.year,
        category: body.category,
        description: body.description,
        image: body.image,
        duration: body.duration,
        budget: body.budget,
        preview_link: body.previewLink,
      })
      .select()
      .single()

    if (error) throw error

    // Insert the details
    if (body.details && body.details.length > 0) {
      const detailsToInsert = body.details.map((detail: any) => ({
        work_id: work.id,
        label: detail.label,
        value: detail.value,
      }))

      const { error: detailsError } = await supabase.from("work_details").insert(detailsToInsert)

      if (detailsError) throw detailsError
    }

    return NextResponse.json({ success: true, message: "Work created successfully", work }, { status: 201 })
  } catch (error) {
    console.error("Error creating work:", error)
    return NextResponse.json({ success: false, message: "Failed to create work" }, { status: 400 })
  }
}
