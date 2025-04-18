import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // First get the current insight's created_at
    const { data: currentInsight, error: currentInsightError } = await supabase
      .from("insights")
      .select("created_at")
      .eq("slug", params.slug)
      .single();

    if (currentInsightError) throw currentInsightError;

    // Get related insights (excluding current insight)
    const { data: relatedInsights, error: relatedInsightsError } =
      await supabase
        .from("insights")
        .select("*")
        .neq("slug", params.slug)
        .order("created_at", { ascending: false })
        .limit(2);

    if (relatedInsightsError) throw relatedInsightsError;

    return NextResponse.json({ data: relatedInsights });
  } catch (error) {
    console.error("Error fetching related insights:", error);
    return NextResponse.json(
      { error: "Failed to fetch related insights" },
      { status: 500 }
    );
  }
}
