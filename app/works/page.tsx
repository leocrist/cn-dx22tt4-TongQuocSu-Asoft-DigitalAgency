import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CallToAction } from "@/components/call-to-action";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { fetchPaginatedData } from "@/lib/data";

async function getWorks() {
  const result = await fetchPaginatedData("works", 1, 100, {
    relations: ["work_details"],
  });
  return result;
}

export default async function WorksPage() {
  const { data: works } = await getWorks();

  return (
    <main className="min-h-screen">
      <Header />

      <ScrollReveal>
        <section className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 animate-title-reveal">
            Our Works
          </h1>
        </section>
      </ScrollReveal>

      <section className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work: any, index: number) => (
            <ScrollReveal key={index} delay={200 + index * 100}>
              <div>
                <Link href={`/works/${work.slug}`} className="block group">
                  <div className="rounded-3xl overflow-hidden mb-6">
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={`${work.title} project`}
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{work.title}</h3>
                    <span className="text-gray-500">{work.year}</span>
                  </div>
                </Link>
                <div>
                  <span className="inline-block border border-[#6E13E8] text-[#6E13E8] px-4 py-1 rounded-full text-sm">
                    {work.category}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
