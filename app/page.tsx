import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HeroImage } from "@/components/hero-image"
import { MarqueeBanner } from "@/components/marquee-banner"
import { ServicesSection } from "@/components/services-section"
import { SelectedWorks } from "@/components/selected-works"
import { Testimonials } from "@/components/testimonials"
import { Insights } from "@/components/insights"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <HeroImage />
      <MarqueeBanner />
      <ServicesSection />
      <SelectedWorks />
      <Testimonials />
      <Insights />
      <CallToAction />
      <Footer />
    </main>
  )
}
