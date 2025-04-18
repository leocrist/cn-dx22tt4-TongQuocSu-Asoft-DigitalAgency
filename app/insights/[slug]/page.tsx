"use client";

import { useRef, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CallToAction } from "@/components/call-to-action";
import { ParallaxImage } from "@/components/parallax-image";
import { ScrollReveal } from "@/components/scroll-reveal";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Insight {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
}

export default function InsightDetailPage() {
  const { slug } = useParams();
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedInsights, setRelatedInsights] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch insight details
        const insightResponse = await fetch(`/api/insights/${slug}`);
        if (!insightResponse.ok) {
          throw new Error("Failed to fetch insight");
        }
        const insightData = await insightResponse.json();
        setInsight(insightData);

        // Fetch related insights
        const relatedResponse = await fetch(`/api/insights/${slug}/related`);
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related insights");
        }
        const relatedData = await relatedResponse.json();
        setRelatedInsights(relatedData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center">
        <Header />
        <div className="px-6 md:px-12 py-16 text-center flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6E13E8] mx-auto"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !insight) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-title-reveal">
            Article Not Found
          </h1>
          <p className="mb-8 animate-description">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/insights"
            className="bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#5a0bc0] transition-colors"
          >
            Back to Insights
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 pt-16 pb-8">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center animate-title-reveal">
            {insight.title}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="flex justify-between items-center max-w-4xl mx-auto mb-12 animate-description">
            <span className="text-gray-600">{insight.date}</span>
            <span className="text-gray-600">{insight.author}</span>
          </div>
        </ScrollReveal>
      </section>

      <section className="mb-16">
        <ScrollReveal delay={300}>
          <div className="w-full h-[500px]">
            <ParallaxImage
              src={insight.image || "/placeholder.svg"}
              alt={insight.title}
              className="h-full"
              scale={1.3}
            />
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 md:px-12 py-8">
        <ScrollReveal delay={400}>
          <div className="max-w-[768px] mx-auto">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />
          </div>
        </ScrollReveal>
      </section>

      {relatedInsights.length > 0 && (
        <section className="px-6 md:px-12 py-16 bg-gray-50">
          <div className="max-w-[768px] mx-auto">
            <ScrollReveal>
              <h2 className="text-6xl font-bold mb-8">Related Articles</h2>
            </ScrollReveal>

            {relatedInsights.map((relatedInsight, index) => (
              <ScrollReveal key={index} delay={200 + index * 100}>
                <Link
                  href={`/insights/${relatedInsight.slug}`}
                  className="block group"
                >
                  <div className="rounded-3xl overflow-hidden mb-6">
                    <Image
                      src={relatedInsight.image || "/placeholder.svg"}
                      alt={relatedInsight.title}
                      width={1200}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-5xl font-bold mb-4">
                    {relatedInsight.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{relatedInsight.date}</span>
                    <span className="text-gray-600">
                      {relatedInsight.author}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <CallToAction />
      <Footer />
    </main>
  );
}
