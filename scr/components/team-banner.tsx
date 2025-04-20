"use client"

export function TeamBanner() {
  return (
    <div className="bg-[#6E13E8] py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center text-white text-xl">
              <span className="mx-4">Meet Our Team</span>
              <span className="mx-4">◆</span>
            </div>
          ))}
      </div>
    </div>
  )
}
