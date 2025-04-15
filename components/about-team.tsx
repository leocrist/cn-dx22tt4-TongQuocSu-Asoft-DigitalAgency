import Image from "next/image"
import { TeamBanner } from "./team-banner"
import { ScrollReveal } from "./scroll-reveal"

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
}

export function AboutTeam() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Ralph Jones",
      position: "Frontend Developer",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Daisy Smith",
      position: "UI/UX Designer",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "James Marnus",
      position: "Graphics Designer",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "Eleanor",
      position: "CEO",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 5,
      name: "Jos Bale",
      position: "Framer Developer",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 6,
      name: "Lily Charlotte",
      position: "Director",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section className="pb-16">
      <TeamBanner />

      <div className="px-6 md:px-12 pt-16">
        <ScrollReveal>
          <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-title-reveal">Team Members</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={200 + index * 100} direction={index % 2 === 0 ? "left" : "right"}>
              <div className="group">
                <div className="rounded-3xl overflow-hidden mb-4 aspect-square relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name}, ${member.position}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-gray-700">{member.position}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
