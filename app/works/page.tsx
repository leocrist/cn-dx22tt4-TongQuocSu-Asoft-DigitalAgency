import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { works } from "@/lib/data"

export default function WorksPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-title-reveal">Our Works</h1>
            <p className="text-gray-700 max-w-2xl mx-auto animate-description">
              Explore our portfolio of innovative digital solutions, branding projects, and UI/UX designs that have
              helped our clients achieve their business goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <ScrollReveal key={index} delay={200 + index * 100}>
              <div>
                <Link href={`/works/${work.slug}`} className="block group">
                  <div className="rounded-3xl overflow-hidden mb-6">
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={`${work.title} project`}
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{work.title}</h3>
                    <span className="text-gray-500">{work.year}</span>
                  </div>
                </Link>
                <div>
                  <span className="inline-block border border-[#6E13E8] text-[#6E13E8] px-4 py-1 rounded-full text-sm">
                    {work.category}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  )
}
