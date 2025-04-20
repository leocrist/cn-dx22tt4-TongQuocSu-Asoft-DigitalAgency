"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export function MarqueeBanner() {
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = bannerRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth

    // Only animate if content is wider than container
    if (scrollWidth <= clientWidth) return

    let scrollPos = 0
    const scrollSpeed = 1

    const animate = () => {
      if (!scrollContainer) return

      scrollPos += scrollSpeed
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0
      }

      scrollContainer.style.transform = `translateX(-${scrollPos}px)`
      requestAnimationFrame(animate)
    }

    const animation = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <div className="bg-[#6E13E8] py-6 overflow-hidden mt-12">
      <div className="relative">
        <div
          ref={bannerRef}
          className="flex whitespace-nowrap transition-transform"
          style={{ willChange: "transform" }}
        >
          {/* Duplicate content for seamless looping */}
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center">
                <Link href="/services/web-development" className="text-white text-2xl font-medium mx-4">
                  Web Development
                </Link>
                <span className="text-white mx-4">◆</span>
                <Link href="/services/ui-ux-design" className="text-white text-2xl font-medium mx-4">
                  UI/UX Design
                </Link>
                <span className="text-white mx-4">◆</span>
                <Link href="/services/branding" className="text-white text-2xl font-medium mx-4">
                  Branding
                </Link>
                <span className="text-white mx-4">◆</span>
                <Link href="/services/interactions" className="text-white text-2xl font-medium mx-4">
                  Interactions
                </Link>
                <span className="text-white mx-4">◆</span>
                <Link href="/services/illustration" className="text-white text-2xl font-medium mx-4">
                  Illustration
                </Link>
                <span className="text-white mx-4">◆</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
