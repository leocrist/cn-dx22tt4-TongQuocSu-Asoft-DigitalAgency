import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { fetchPaginatedData } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "10");

  try {
    const result = await fetchPaginatedData("works", page, limit, {
      relations: ["work_details"],
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching works:", error);
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate a slug from the title
    const slug = body.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

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
      .single();

    if (error) throw error;

    // Insert the details
    if (body.details && body.details.length > 0) {
      const detailsToInsert = body.details.map((detail: any) => ({
        work_id: work.id,
        label: detail.label,
        value: detail.value,
      }));

      const { error: detailsError } = await supabase
        .from("work_details")
        .insert(detailsToInsert);

      if (detailsError) throw detailsError;
    }

    return NextResponse.json(
      { success: true, message: "Work created successfully", work },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating work:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create work" },
      { status: 400 }
    );
  }
}
