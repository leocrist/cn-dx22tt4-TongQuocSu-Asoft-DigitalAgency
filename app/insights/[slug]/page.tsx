"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import { ParallaxImage } from "@/components/parallax-image"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import Image from "next/image"
import { getInsightBySlug } from "@/lib/data"

export default function InsightDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const insight = getInsightBySlug(slug)

  if (!insight) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-title-reveal">Article Not Found</h1>
          <p className="mb-8 animate-description">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/insights"
            className="bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#5a0bc0] transition-colors"
          >
            Back to Insights
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 pt-16 pb-8">
        <ScrollReveal>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center animate-title-reveal">{insight.title}</h1>
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
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: insight.content }} />
          </div>
        </ScrollReveal>
      </section>

      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <div className="max-w-[768px] mx-auto">
          <ScrollReveal>
            <h2 className="text-6xl font-bold mb-8">Next</h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Link href={`/insights/${insight.nextArticle.slug}`} className="block group">
              <div className="rounded-3xl overflow-hidden mb-6">
                <Image
                  src={insight.nextArticle.image || "/placeholder.svg"}
                  alt={insight.nextArticle.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="text-5xl font-bold mb-4">{insight.nextArticle.title}</h3>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">{insight.nextArticle.date}</span>
                <span className="text-gray-600">{insight.nextArticle.author}</span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  )
}
