"use client";

import { useRef, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CallToAction } from "@/components/call-to-action";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useParams } from "next/navigation";

interface Work {
  slug: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
  details: {
    label: string;
    value: string;
  }[];
}

export default function WorkDetailPage() {
  const { slug } = useParams();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [work, setWork] = useState<Work | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch work details
        const workResponse = await fetch(`/api/works/${slug}`);
        if (!workResponse.ok) {
          throw new Error("Failed to fetch work");
        }
        const workData = await workResponse.json();
        setWork(workData);

        // Fetch related projects
        const relatedResponse = await fetch(`/api/works/${slug}/related`);
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related projects");
        }
        const relatedData = await relatedResponse.json();
        setRelatedProjects(relatedData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="px-6 md:px-12 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6E13E8] mx-auto"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !work) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-title-reveal">
            Project Not Found
          </h1>
          <p className="mb-8 animate-description">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/works"
            className="bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#5a0bc0] transition-colors"
          >
            Back to Works
          </Link>
        </div>
        <Footer />
      </main>
    );
  }
  const detail = [
    { label: "Owner", key: "owner" },
    { label: "Category", key: "category" },
    { label: "Duration", key: "duration" },
    { label: "Budget", key: "budget" },
  ];
  return (
    <main className="min-h-screen">
      <Header />

      <ScrollReveal>
        <section className="px-6 md:px-12 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 animate-title-reveal">
            {work.title}
          </h1>
        </section>
      </ScrollReveal>

      <section className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1000px] mx-auto">
          {/* Project Details Sidebar - Left Column */}
          <div className="md:col-span-1">
            <div
              ref={sidebarRef}
              className="bg-[#6E13E8] text-white p-8 rounded-3xl sticky top-4"
            >
              <h2 className="text-3xl font-bold mb-8">Project Details</h2>
              <div className="space-y-6">
                {detail.map((key: any, index) => (
                  <div key={index}>
                    <h3 className="text-white/80 mb-1">{key.label}</h3>
                    {key.label === "Preview Link" ? (
                      <Link href="#" className="font-medium hover:underline">
                        {work[key.key]}
                      </Link>
                    ) : (
                      <p className="font-medium">{work[key.key]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Description - Right Column */}
          <div className="md:col-span-2">
            <ScrollReveal delay={300} direction="right">
              <Image
                src={work.image}
                alt={work.title}
                width={100}
                height={100}
                className="w-full h-auto object-cover aspect-square"
              />
              <h2 className="text-3xl font-bold mb-8 mt-8">Project Details:</h2>
              <div className="prose max-w-none">
                {work.description
                  .split("\n\n")
                  .map((paragraph: any, index: any) => (
                    <p
                      key={index}
                      className="mb-6 text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 bg-gray-50">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Related Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {relatedProjects.map((relatedProject, index) => (
            <ScrollReveal
              key={index}
              delay={200 + index * 100}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <Link href={`/works/${relatedProject.slug}`} className="block">
                <div className="rounded-3xl overflow-hidden mb-4">
                  <Image
                    src={relatedProject.image || "/placeholder.svg"}
                    alt={relatedProject.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {relatedProject.title}
                </h3>
                <span className="text-gray-600">{relatedProject.category}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
