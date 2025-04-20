"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"

export function HeroImage() {
  return (
    <section className="px-6 md:px-12 mb-0">
      <ScrollReveal delay={600}>
        <div className="rounded-3xl overflow-hidden" style={{ height: "min(80vh, 600px)" }}>
          <Image
            src="/hero_bg.png"
            alt="Abstract colorful gradient spheres"
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </ScrollReveal>
    </section>
  )
}
