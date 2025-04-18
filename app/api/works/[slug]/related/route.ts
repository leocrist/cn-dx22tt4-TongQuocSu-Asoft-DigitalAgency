import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // First get the current work's created_at
    const { data: currentWork, error: currentWorkError } = await supabase
      .from("works")
      .select("created_at")
      .eq("slug", params.slug)
      .single();

    if (currentWorkError) throw currentWorkError;

    // Get related works (excluding current work)
    const { data: relatedWorks, error: relatedWorksError } = await supabase
      .from("works")
      .select("*")
      .neq("slug", params.slug)
      .order("created_at", { ascending: false })
      .limit(2);

    if (relatedWorksError) throw relatedWorksError;

    return NextResponse.json({ data: relatedWorks });
  } catch (error) {
    console.error("Error fetching related works:", error);
    return NextResponse.json(
      { error: "Failed to fetch related works" },
      { status: 500 }
    );
  }
}
