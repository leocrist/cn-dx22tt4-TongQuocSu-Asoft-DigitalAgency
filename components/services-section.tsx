import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function ServicesSection() {
  return (
    <section className="px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <ScrollReveal>
          <div>
            <h2 className="text-5xl font-bold mb-4">Services</h2>
            <p className="text-gray-700 max-w-xl">
              Elevate Your Digital Presence: Expert UI/UX Design & Cutting-Edge Web Development
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="right">
          <Link
            href="/services"
            className="mt-4 md:mt-0 bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium"
          >
            View All
          </Link>
        </ScrollReveal>
      </div>

      {/* Branding and UI/UX Design Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Branding - Left Side */}
        <ScrollReveal delay={300} direction="left">
          <div className="flex flex-col">
            <div className="rounded-3xl overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Branding Service"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">Branding</h3>
            <p className="text-gray-700 mb-6">
              The core of a brand is reflected in the feelings stirred through interactions with its products. Our
              mission is to assist both established and new brands in crafting identities that authentically represent
              their real nature.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">logo</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Brand Identity</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Visual Identity</span>
            </div>
          </div>
        </ScrollReveal>

        {/* UI/UX Design - Right Side */}
        <ScrollReveal delay={400} direction="right">
          <div className="flex flex-col mt-8 md:mt-16">
            <div className="rounded-3xl overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="UI/UX Design Service"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">UI/UX Design</h3>
            <p className="text-gray-700 mb-6">
              Our strategy focuses on user-centric design to boost productivity and revenue, avoiding generic solutions.
              We create custom, engaging designs that improve user interaction and foster growth, reflecting our
              dedication to personalized, user-first approaches.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">UI/UX</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Digital Product</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Wireframe</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Web Development and Illustration Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Web Development - Left Side */}
        <ScrollReveal delay={500} direction="left">
          <div className="flex flex-col">
            <div className="rounded-3xl overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Web Development Service"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">Web Development</h3>
            <p className="text-gray-700 mb-6">
              Our approach focuses on user-oriented development to elevate website functionality and income, avoiding
              one-size-fits-all approaches. We create bespoke, adaptive websites that improve user interaction and
              stimulate expansion, showcasing our dedication to customized, user-priority web solutions.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Framer</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">React</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">NextJs</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Illustration - Right Side */}
        <ScrollReveal delay={600} direction="right">
          <div className="flex flex-col mt-8 md:mt-16">
            <div className="rounded-3xl overflow-hidden mb-6">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Illustration Service"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold mb-4">Illustration</h3>
            <p className="text-gray-700 mb-6">
              Our method revolves around audience-oriented illustration to enhance visual interaction and involvement,
              avoiding commonplace imagery. We design distinctive, engaging artworks that improve observer experience
              and encourage innovation, illustrating our commitment to bespoke, viewer-centric creative solutions.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Procreate</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Adobe Illustrator</span>
              <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Krita</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
