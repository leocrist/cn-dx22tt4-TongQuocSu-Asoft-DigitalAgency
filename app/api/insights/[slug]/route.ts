import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    // Get the insight
    const { data: insight, error } = await supabase.from("insights").select("*").eq("slug", slug).single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ message: "Insight not found" }, { status: 404 })
      }
      throw error
    }

    // Get the next article
    const { data: nextArticle, error: nextArticleError } = await supabase
      .from("next_articles")
      .select("*")
      .eq("insight_id", insight.id)
      .single()

    if (nextArticleError && nextArticleError.code !== "PGRST116") {
      throw nextArticleError
    }

    // Format the insight to match the expected structure
    const formattedInsight = {
      ...insight,
      nextArticle: nextArticle || null,
    }

    return NextResponse.json(formattedInsight)
  } catch (error) {
    console.error("Error fetching insight:", error)
    return NextResponse.json({ message: "Failed to fetch insight" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json()

    // Get the insight ID
    const { data: existingInsight, error: fetchError } = await supabase
      .from("insights")
      .select("id")
      .eq("slug", slug)
      .single()

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ message: "Insight not found" }, { status: 404 })
      }
      throw fetchError
    }

    // Update the insight
    const { error: updateError } = await supabase
      .from("insights")
      .update({
        title: body.title,
        date: body.date,
        author: body.author,
        content: body.content,
        image: body.image,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingInsight.id)

    if (updateError) throw updateError

    // Update the next article if provided
    if (body.nextArticle) {
      // Check if next article exists
      const { data: existingNextArticle, error: checkError } = await supabase
        .from("next_articles")
        .select("id")
        .eq("insight_id", existingInsight.id)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        throw checkError
      }

      if (existingNextArticle) {
        // Update existing next article
        const { error: updateNextError } = await supabase
          .from("next_articles")
          .update({
            title: body.nextArticle.title,
            date: body.nextArticle.date,
            author: body.nextArticle.author,
            image: body.nextArticle.image,
            slug: body.nextArticle.slug,
          })
          .eq("id", existingNextArticle.id)

        if (updateNextError) throw updateNextError
      } else {
        // Insert new next article
        const { error: insertError } = await supabase.from("next_articles").insert({
          insight_id: existingInsight.id,
          title: body.nextArticle.title,
          date: body.nextArticle.date,
          author: body.nextArticle.author,
          image: body.nextArticle.image,
          slug: body.nextArticle.slug,
        })

        if (insertError) throw insertError
      }
    }

    return NextResponse.json({ success: true, message: "Insight updated successfully" })
  } catch (error) {
    console.error("Error updating insight:", error)
    return NextResponse.json({ success: false, message: "Failed to update insight" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    // Delete the insight (next_articles will be deleted via cascade)
    const { error } = await supabase.from("insights").delete().eq("slug", slug)

    if (error) throw error

    return NextResponse.json({ success: true, message: "Insight deleted successfully" })
  } catch (error) {
    console.error("Error deleting insight:", error)
    return NextResponse.json({ success: false, message: "Failed to delete insight" }, { status: 500 })
  }
}
