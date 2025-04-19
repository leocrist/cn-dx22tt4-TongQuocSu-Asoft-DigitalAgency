import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const { data: relatedInsights, error } = await supabase
      .from("insights")
      .select("*")
      .neq("slug", slug)
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: relatedInsights });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch related insights" },
      { status: 500 }
    );
  }
}
