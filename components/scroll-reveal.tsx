"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Delay in ms
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number; // Distance in pixels
  duration?: number; // Duration in ms
  once?: boolean; // Whether to only reveal once
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 300, // Changed from 800 to 400 (50% faster)
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const alreadyRevealed = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initial state - hidden and translated
    let translateValue = "";
    switch (direction) {
      case "up":
        translateValue = `translateY(${distance}px)`;
        break;
      case "down":
        translateValue = `translateY(-${distance}px)`;
        break;
      case "left":
        translateValue = `translateX(${distance}px)`;
        break;
      case "right":
        translateValue = `translateX(-${distance}px)`;
        break;
      case "none":
        translateValue = "none";
        break;
    }

    element.style.opacity = "0";
    element.style.transform = translateValue;
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
    element.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If we should only reveal once and it's already been revealed, do nothing
            if (once && alreadyRevealed.current) return;

            // Reveal the element
            element.style.opacity = "1";
            element.style.transform = "translateY(0) translateX(0)";
            alreadyRevealed.current = true;

            // If we only need to reveal once, unobserve
            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            // If we should reveal multiple times, hide again when out of view
            element.style.opacity = "0";
            element.style.transform = translateValue;
            alreadyRevealed.current = false;
          }
        });
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: "0px 0px -100px 0px", // Trigger a bit before the element enters the viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, direction, distance, duration, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
