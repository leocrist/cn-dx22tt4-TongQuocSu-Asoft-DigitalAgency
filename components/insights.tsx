"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useFeaturedInsights } from "@/lib/hooks/useData";

export function Insights() {
  const { data: featuredInsights, loading, error } = useFeaturedInsights();

  if (loading) {
    return (
      <section className="px-6 md:px-12 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6E13E8]"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 md:px-12 py-16">
        <div className="text-center text-red-500">
          Error loading featured insights: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <ScrollReveal>
          <div>
            <h2 className="text-5xl font-bold mb-4">Insights</h2>
            <p className="text-gray-700 max-w-xl">
              Delving into the latest trends, insights, and strategies in the
              art and science of web design and UI/UX, sharing tips, trends.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="right">
          <Link
            href="/insights"
            className="mt-4 md:mt-0 bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium"
          >
            View All
          </Link>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredInsights?.map((insight, index) => (
          <ScrollReveal
            key={insight.slug}
            delay={300 + index * 100}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <Link href={`/insights/${insight.slug}`} className="block group">
              <div className="rounded-3xl overflow-hidden bg-[#f5f3ff] h-full">
                <div className="h-[300px] overflow-hidden">
                  <Image
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500">{insight.author}</span>
                    <span className="text-gray-500">{insight.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6">{insight.title}</h3>
                  <span className="inline-block border border-[#6E13E8] text-[#6E13E8] px-6 py-2 rounded-full">
                    Read more
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
