"use client"

import { useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { works, getRelatedWorks } from "@/lib/data"

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Find the current work
  const work = works.find((w) => w.slug === slug)
  const relatedProjects = getRelatedWorks(slug)

  if (!work) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-title-reveal">Project Not Found</h1>
          <p className="mb-8 animate-description">The project you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/works"
            className="bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#5a0bc0] transition-colors"
          >
            Back to Works
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <ScrollReveal>
        <section className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 animate-title-reveal">{work.title}</h1>
        </section>
      </ScrollReveal>

      <section className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1000px] mx-auto">
          {/* Project Details Sidebar - Left Column */}
          <div className="md:col-span-1">
            <div ref={sidebarRef} className="bg-[#6E13E8] text-white p-8 rounded-3xl sticky top-4">
              <h2 className="text-3xl font-bold mb-8">Project Details</h2>
              <div className="space-y-6">
                {work.details.map((detail, index) => (
                  <div key={index}>
                    <h3 className="text-white/80 mb-1">{detail.label}</h3>
                    {detail.label === "Preview Link" ? (
                      <Link href="#" className="font-medium hover:underline">
                        {detail.value}
                      </Link>
                    ) : (
                      <p className="font-medium">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Description - Right Column */}
          <div className="md:col-span-2">
            <ScrollReveal delay={300} direction="right">
              <h2 className="text-3xl font-bold mb-8">Project Details:</h2>
              <div className="prose max-w-none">
                {work.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-12 text-center">Related Projects</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {relatedProjects.map((relatedProject, index) => (
            <ScrollReveal key={index} delay={200 + index * 100} direction={index % 2 === 0 ? "left" : "right"}>
              <Link href={`/works/${relatedProject.slug}`} className="block">
                <div className="rounded-3xl overflow-hidden mb-4">
                  <Image
                    src={relatedProject.image || "/placeholder.svg"}
                    alt={relatedProject.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{relatedProject.title}</h3>
                <span className="text-gray-600">{relatedProject.category}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  )
}
