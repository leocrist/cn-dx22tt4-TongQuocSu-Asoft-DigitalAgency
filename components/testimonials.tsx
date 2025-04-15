"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

interface Testimonial {
  id: number
  title: string
  content: string
  author: string
  position: string
  company: string
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      title: "As a long-term client of Infinity Solutions",
      content:
        "I feel compelled to share my experience with others who might be in the market for digital services. Our company has been collaborating with Infinity Solutions for over two years, relying on their expertise for a wide range of digital solutions including web development, SEO, social media marketing, and content creation.",
      author: "Robert Anthany",
      position: "CEO",
      company: "Innovasion",
    },
    {
      id: 2,
      title: "As a valued client of Infinity Solutions",
      content:
        "I'm inspired to share our journey for anyone exploring branding services. Our firm has engaged with Infinity Solutions for upwards of two years, tapping into their skill set across multiple branding solutions like website design, search engine strategies, online community engagement, and narrative crafting.",
      author: "Angelina Smith",
      position: "CEO",
      company: "WebWorld",
    },
    {
      id: 3,
      title: "Working with Infinity Solutions has been transformative",
      content:
        "Their team's dedication to excellence and innovative approach has significantly improved our digital presence. The solutions they've provided are not only visually stunning but also highly functional and user-friendly. We've seen a remarkable increase in engagement and conversion rates since implementing their strategies.",
      author: "Michael Johnson",
      position: "Marketing Director",
      company: "TechGrowth",
    },
    {
      id: 4,
      title: "Infinity Solutions exceeded all our expectations",
      content:
        "From the initial consultation to the final delivery, their process was smooth and transparent. They took the time to understand our unique needs and challenges, then crafted custom solutions that perfectly aligned with our brand vision. Their ongoing support has been invaluable to our continued success.",
      author: "Sarah Williams",
      position: "Creative Director",
      company: "DesignHub",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      // Loop to the end if at the beginning
      setCurrentIndex(Math.ceil(testimonials.length / 2) - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < Math.ceil(testimonials.length / 2) - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Loop to the beginning if at the end
      setCurrentIndex(0)
    }
  }

  return (
    <section className="px-6 md:px-12 py-16">
      <ScrollReveal>
        <div className="mb-6">
          <h2 className="text-5xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-700 max-w-2xl">Highlights: Exceptional UI/UX Design & Cutting-Edge Web Solutions</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="relative mt-16">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Display testimonials in pairs */}
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, pairIndex) => (
                <div key={pairIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.slice(pairIndex * 2, pairIndex * 2 + 2).map((testimonial) => (
                    <div key={testimonial.id} className="border-t pt-8">
                      <h3 className="text-3xl font-bold mb-6">{testimonial.title}</h3>
                      <p className="text-gray-700 mb-12">{testimonial.content}</p>
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-gray-600">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  )
}
