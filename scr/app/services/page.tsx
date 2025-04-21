import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 animate-title-reveal">Our Services</h1>
            <p className="text-gray-700 max-w-2xl mx-auto animate-description">
              We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
              From branding to web development, we've got you covered.
            </p>
          </div>
        </ScrollReveal>

        {/* Branding */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={200} direction="left">
              <div>
                <div className="rounded-3xl overflow-hidden mb-6">
                  <Image
                    src="/branding.png" 
                    alt="Branding Service"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="right">
              <div>
                <h2 className="text-3xl font-bold mb-4">Branding</h2>
                <p className="text-gray-700 mb-6">
                  The core of a brand is reflected in the feelings stirred through interactions with its products. Our
                  mission is to assist both established and new brands in crafting identities that authentically
                  represent their real nature.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">logo</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Brand Identity</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Visual Identity</span>
                </div>
                <Link
                  href="/services/branding"
                  className="inline-block border border-[#6E13E8] text-[#6E13E8] px-6 py-2 rounded-full"
                >
                  Learn more
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* UI/UX Design */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={400} direction="right" className="order-1 md:order-2">
              <div>
                <div className="rounded-3xl overflow-hidden mb-6">
                  <Image
                    src="/uiux.png"
                    alt="UI/UX Design Service"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500} direction="left" className="order-2 md:order-1">
              <div>
                <h2 className="text-3xl font-bold mb-4">UI/UX Design</h2>
                <p className="text-gray-700 mb-6">
                  Our strategy focuses on user-centric design to boost productivity and revenue, avoiding generic
                  solutions. We create custom, engaging designs that improve user interaction and foster growth,
                  reflecting our dedication to personalized, user-first approaches.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">UI/UX</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Digital Product</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Wireframe</span>
                </div>
                <Link
                  href="/services/ui-ux-design"
                  className="inline-block border border-[#6E13E8] text-[#6E13E8] px-6 py-2 rounded-full"
                >
                  Learn more
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Web Development */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={600} direction="left">
              <div>
                <div className="rounded-3xl overflow-hidden mb-6">
                  <Image
                    src="/web.png"
                    alt="Web Development Service"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={700} direction="right">
              <div>
                <h2 className="text-3xl font-bold mb-4">Web Development</h2>
                <p className="text-gray-700 mb-6">
                  Our approach focuses on user-oriented development to elevate website functionality and income,
                  avoiding one-size-fits-all approaches. We create bespoke, adaptive websites that improve user
                  interaction and stimulate expansion, showcasing our dedication to customized, user-priority web
                  solutions.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Framer</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">React</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">NextJs</span>
                </div>
                <Link
                  href="/services/web-development"
                  className="inline-block border border-[#6E13E8] text-[#6E13E8] px-6 py-2 rounded-full"
                >
                  Learn more
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Illustration */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={800} direction="right" className="order-1 md:order-2">
              <div>
                <div className="rounded-3xl overflow-hidden mb-6">
                  <Image
                    src="/illus.png"
                    alt="Illustration Service"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={900} direction="left" className="order-2 md:order-1">
              <div>
                <h2 className="text-3xl font-bold mb-4">Illustration</h2>
                <p className="text-gray-700 mb-6">
                  Our method revolves around audience-oriented illustration to enhance visual interaction and
                  involvement, avoiding commonplace imagery. We design distinctive, engaging artworks that improve
                  observer experience and encourage innovation, illust artworks that improve observer experience and
                  encourage innovation, illustrating our commitment to bespoke, viewer-centric creative solutions.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Procreate</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Adobe Illustrator</span>
                  <span className="bg-gray-100 px-4 py-2 text-sm rounded-full">Krita</span>
                </div>
                <Link
                  href="/services/illustration"
                  className="inline-block border border-[#6E13E8] text-[#6E13E8] px-6 py-2 rounded-full"
                >
                  Learn more
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  )
}
