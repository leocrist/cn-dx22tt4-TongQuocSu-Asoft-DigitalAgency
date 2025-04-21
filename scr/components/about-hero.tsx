"use client"

import { ParallaxImage } from "./parallax-image"
import { ScrollReveal } from "./scroll-reveal"

export function AboutHero() {
  return (
    <section className="px-6 md:px-12 py-16">
      <ScrollReveal>
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-12 animate-title-reveal">About Us</h1>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed animate-description">
            Welcome to Infinity Solutions, where your digital aspirations meet infinite possibilities. Founded by a
            passionate team of dreamers and doers, we are a full-service digital agency dedicated to crafting bespoke
            websites, intuitive UI/UX designs, and distinctive branding that sets you apart in the digital realm. Our
            journey began with a simple belief: in the infinite potential of the digital space to connect, communicate,
            and convert.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <div className="w-full h-[600px]">
          <ParallaxImage
            src="/11.png"
            alt="Infinity Solutions office space"
            className="h-full"
            scale={1.3}
          />
        </div>
      </ScrollReveal>
    </section>
  )
}
