import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function CallToAction() {
  return (
    <section className="bg-[#6E13E8] py-16 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto bg-[#f5f3ff] p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0 max-w-xl">
              Let's create something remarkable together.
            </h2>
            <Link
              href="/contact"
              className="bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#5a0bc0] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
