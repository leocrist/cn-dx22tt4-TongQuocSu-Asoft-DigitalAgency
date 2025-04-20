import { ParallaxImage } from "./parallax-image"
import { ScrollReveal } from "./scroll-reveal"

export function AboutWhyChooseUs() {
  return (
    <section className="px-6 md:px-12 py-16">
      <ScrollReveal>
        <h2 className="text-5xl md:text-6xl font-bold mb-8 animate-title-reveal">Why Choose Us</h2>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="max-w-4xl mb-16">
          <p className="text-lg text-gray-700 leading-relaxed animate-description">
            We understand that no two businesses are the same. That's why we offer customized solutions that address
            your specific challenges and objectives. Our team is a blend of creative minds and technical experts, all
            dedicated to pushing the envelope and delivering excellence. Your success is our success. We work closely
            with you every step of the way, ensuring open communication and transparency. In a rapidly evolving digital
            landscape, we keep our finger on the pulse of the latest trends and technologies, ensuring your digital
            presence remains relevant and competitive.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <div className="w-full h-[500px] md:h-[600px]">
          <ParallaxImage
            src="/placeholder.svg?height=800&width=1200"
            alt="Abstract 3D shapes representing innovation"
            className="h-full"
            scale={1.3}
          />
        </div>
      </ScrollReveal>
    </section>
  )
}
