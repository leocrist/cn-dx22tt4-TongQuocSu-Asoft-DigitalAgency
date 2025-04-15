import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { insights } from "@/lib/data"

export default function InsightsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-title-reveal">Insights</h1>
            <p className="text-gray-700 max-w-2xl mx-auto animate-description">
              Explore our collection of articles, guides, and thought leadership on web design, UI/UX, branding, and
              digital innovation.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <ScrollReveal key={index} delay={200 + index * 100}>
              <Link href={`/insights/${insight.slug}`} className="block group">
                <div className="rounded-3xl overflow-hidden bg-[#f5f3ff] h-full">
                  <div className="h-[240px] overflow-hidden">
                    <Image
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500">{insight.author}</span>
                      <span className="text-gray-500">{insight.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{insight.title}</h3>
                    <span className="inline-block border border-[#6E13E8] text-[#6E13E8] px-4 py-1 rounded-full text-sm">
                      Read more
                    </span>
                  </div>
                </div>
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
