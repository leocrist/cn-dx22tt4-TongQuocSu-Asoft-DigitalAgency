"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  scale?: number // Scale factor to zoom the image
}

export function ParallaxImage({ src, alt, className = "", scale = 1.2 }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return

      // Get the bounding rectangle of the container
      const rect = containerRef.current.getBoundingClientRect()

      // Only apply parallax if the container is in or near the viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate how far the element is from the top of the viewport
        // and how far it is through its journey through the viewport
        const distanceFromTop = rect.top
        const elementHeight = rect.height
        const windowHeight = window.innerHeight

        // Calculate a value between -0.5 and 0.5 based on the element's position
        // -0.5 when the element enters the viewport, 0 when it's centered, 0.5 when it leaves
        const scrollProgress = (distanceFromTop - windowHeight / 2 + elementHeight / 2) / (windowHeight + elementHeight)

        // Apply a transform based on the scroll progress
        // The multiplier controls the intensity of the effect
        const translateY = scrollProgress * elementHeight * 0.4

        imageRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Initial call to set position
    handleScroll()

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-3xl ${className}`}>
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: "translateY(0px)",
          scale: scale.toString(), // Apply zoom to ensure image covers container during parallax
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
