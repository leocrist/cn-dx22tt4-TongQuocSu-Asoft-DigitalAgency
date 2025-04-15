import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import { AboutHero } from "@/components/about-hero"
import { AboutPhilosophy } from "@/components/about-philosophy"
import { AboutWhyChooseUs } from "@/components/about-why-choose-us"
import { AboutTeam } from "@/components/about-team"
import { AboutTestimonials } from "@/components/about-testimonials"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <AboutPhilosophy />
      <AboutWhyChooseUs />
      <AboutTeam />
      <AboutTestimonials />
      <CallToAction />
      <Footer />
    </main>
  )
}
