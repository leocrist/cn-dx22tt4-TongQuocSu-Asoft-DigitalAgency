import { ParallaxImage } from "./parallax-image";
import { ScrollReveal } from "./scroll-reveal";

export function AboutPhilosophy() {
  return (
    <section className="px-6 md:px-12 py-16">
      <ScrollReveal>
        <h2 className="text-5xl md:text-6xl font-bold animate-title-reveal">
          Our Philosophy
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <ScrollReveal delay={200} direction="left">
          <div className="h-[500px]">
            <ParallaxImage
              src="/placeholder.svg?height=600&width=600"
              alt="Design elements representing our philosophy"
              className="h-full"
              scale={1.3}
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col justify-between">
          <ScrollReveal delay={400} direction="right">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8 animate-description">
                At Infinity Solutions, we operate on the principle that every
                brand has a unique story waiting to be told. We believe in
                pushing the boundaries of creativity and technology to narrate
                your story in the most compelling way. Our approach is holistic
                and human-centric, focusing on creating experiences that
                resonate with your audience and drive engagement. We're not just
                about making things look pretty; we're about creating digital
                solutions that work.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-5xl font-bold mb-2">150+</p>
                <p className="text-gray-700">Project completed</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">620+</p>
                <p className="text-gray-700">Clients</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">20+</p>
                <p className="text-gray-700">Members</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">20+</p>
                <p className="text-gray-700">Years of Experience</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
