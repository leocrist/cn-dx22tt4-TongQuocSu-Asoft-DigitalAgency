"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and show success message
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-title-reveal">Contact Us</h1>
            <p className="text-gray-700 animate-description">Let's create something remarkable together</p>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <ScrollReveal delay={200} direction="left">
            <div className="bg-[#6E13E8] text-white p-8 md:p-12 rounded-3xl">
              <h2 className="text-3xl font-bold mb-2">Contact Details</h2>
              <p className="mb-8">Love to hear from you.</p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Location</h3>
                  <p>3148 Ie NewYork St #42, Lower Marathon</p>
                  <p>87103, United States</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Phone Number</h3>
                  <p>+01 2345678910</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Social Media</h3>
                  <div className="flex space-x-4 mt-2">
                    <Link href="https://facebook.com" className="hover:opacity-80 transition-opacity">
                      <Facebook size={24} />
                    </Link>
                    <Link href="https://linkedin.com" className="hover:opacity-80 transition-opacity">
                      <Linkedin size={24} />
                    </Link>
                    <Link href="https://instagram.com" className="hover:opacity-80 transition-opacity">
                      <Instagram size={24} />
                    </Link>
                    <Link href="https://twitter.com" className="hover:opacity-80 transition-opacity">
                      <Twitter size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={300} direction="right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={10}
                  className="w-full p-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6E13E8] text-white py-4 rounded-md font-medium transition-colors hover:bg-[#5a0bc0] disabled:opacity-70"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
              {submitSuccess && (
                <div className="text-green-600 font-medium">
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#6E13E8] py-16 px-6 md:px-12 mt-16">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto bg-[#f5f3ff] p-12 rounded-3xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0 max-w-xl">
                Let's create something remarkable together.
              </h2>
              <Link href="/contact" className="button-hover-effect rounded-full h-12 inline-flex">
                <div className="button-default bg-[#6E13E8] text-white rounded-full">Contact</div>
                <div className="button-hover bg-[#5a0bc0] text-white rounded-full">Contact</div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  )
}
