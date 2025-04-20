import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function HeroSection() {
  return (
    <section className="px-6 md:px-12 pt-20 pb-16">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-7xl md:text-8xl font-bold mb-12 tracking-tight animate-title-reveal">ASoft - DigitalAgency</h1>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-base text-center max-w-3xl mx-auto mb-10 leading-relaxed animate-description">
            Established in 2012, Asoft DigitalAgency Solutions stands as a premier strategic branding and design agency, dedicated
            to elevating brands with groundbreaking ideas and propelling them into the next frontier of innovation.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex justify-center">
            <Link
              href="/works"
              className="border border-[#6E13E8] text-[#6E13E8] px-8 py-3 rounded-full text-base font-medium hover:bg-[#6E13E8] hover:text-white transition-colors"
            >
              Our Work
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
