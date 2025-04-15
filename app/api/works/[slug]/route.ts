import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    // Get the work
    const { data: work, error } = await supabase
      .from("works")
      .select("*, work_details(*)")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "Work not found" },
          { status: 404 }
        );
      }
      throw error;
    }

    // Format the work to match the expected structure
    const details = work.work_details.map((detail: any) => ({
      label: detail.label,
      value: detail.value,
    }));

    const formattedWork = {
      ...work,
      details,
      work_details: undefined,
    };

    return NextResponse.json(formattedWork);
  } catch (error) {
    console.error("Error fetching work:", error);
    return NextResponse.json(
      { message: "Failed to fetch work" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();

    // Get the work ID
    const { data: existingWork, error: fetchError } = await supabase
      .from("works")
      .select("id")
      .eq("slug", slug)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json(
          { message: "Work not found" },
          { status: 404 }
        );
      }
      throw fetchError;
    }

    // Update the work
    const { error: updateError } = await supabase
      .from("works")
      .update({
        title: body.title,
        year: body.year,
        category: body.category,
        description: body.description,
        image: body.image,
        duration: body.duration,
        budget: body.budget,
        preview_link: body.previewLink,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingWork.id);

    if (updateError) throw updateError;

    // Update the details if provided
    if (body.details && body.details.length > 0) {
      // Delete existing details
      const { error: deleteError } = await supabase
        .from("work_details")
        .delete()
        .eq("work_id", existingWork.id);

      if (deleteError) throw deleteError;

      // Insert new details
      const detailsToInsert = body.details.map((detail: any) => ({
        work_id: existingWork.id,
        label: detail.label,
        value: detail.value,
      }));

      const { error: insertError } = await supabase
        .from("work_details")
        .insert(detailsToInsert);

      if (insertError) throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: "Work updated successfully",
    });
  } catch (error) {
    console.error("Error updating work:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update work" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // Delete the work (work_details will be deleted via cascade)
    const { error } = await supabase.from("works").delete().eq("slug", slug);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Work deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting work:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete work" },
      { status: 500 }
    );
  }
}
