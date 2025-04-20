"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useFeaturedWorks } from "@/lib/hooks/useData";

export function SelectedWorks() {
  const { data: featuredWorks, loading, error } = useFeaturedWorks();
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
          Error loading featured works: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <ScrollReveal>
          <div>
            <h2 className="text-5xl font-bold mb-4">
              Selected
              <br />
              Works
            </h2>
            <p className="text-gray-700 max-w-xl">
              Showcase of Excellence: Premier UI/UX Design & Innovative Web
              Solutions
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="right">
          <Link
            href="/works"
            className="mt-4 md:mt-0 bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium"
          >
            View All
          </Link>
        </ScrollReveal>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredWorks.map((work, index) => (
          <ScrollReveal
            key={work.slug}
            delay={300 + index * 100}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div>
              <Link href={`/works/${work.slug}`} className="block group">
                <div className="rounded-3xl overflow-hidden mb-6">
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={`${work.title} project`}
                    width={600}
                    height={500}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-4xl font-bold">{work.title}</h3>
                  <span className="text-gray-500">{work.year}</span>
                </div>
              </Link>
              <div>
                <span className="inline-block border border-[#6E13E8] text-[#6E13E8] px-6 py-2 rounded-full">
                  {work.category}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
