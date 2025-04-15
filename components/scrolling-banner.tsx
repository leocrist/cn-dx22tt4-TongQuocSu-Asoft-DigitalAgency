"use client"

import { useEffect, useRef } from "react"

export function ScrollingBanner() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Clone the content for seamless scrolling
    const content = scrollContainer.querySelector(".scroll-content")
    if (!content) return

    const clone = content.cloneNode(true)
    scrollContainer.appendChild(clone)

    // Animation function
    const animate = () => {
      if (!scrollContainer) return

      if (scrollContainer.scrollLeft >= content.scrollWidth) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 1
      }

      requestAnimationFrame(animate)
    }

    const animation = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <div className="bg-[#6E13E8] py-6 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden whitespace-nowrap"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="scroll-content flex items-center space-x-6 pl-6">
          <span className="text-white text-2xl font-medium">Web Development</span>
          <span className="text-white">◆</span>
          <span className="text-white text-2xl font-medium">UI/UX Design</span>
          <span className="text-white">◆</span>
          <span className="text-white text-2xl font-medium">Branding</span>
          <span className="text-white">◆</span>
          <span className="text-white text-2xl font-medium">Interactions</span>
          <span className="text-white">◆</span>
          <span className="text-white text-2xl font-medium">Illustration</span>
          <span className="text-white">◆</span>
        </div>
      </div>
    </div>
  )
}
