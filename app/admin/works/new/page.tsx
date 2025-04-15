"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { WorkForm } from "@/components/admin/work-form"
import { useSnackbar } from "@/components/admin/snackbar-provider"

export default function NewWorkPage() {
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    try {
      const imageUrl = (formData.get("imageUrl") as string) || "/placeholder.svg?height=400&width=500"

      const response = await fetch("/api/works", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          category: formData.get("category"),
          year: formData.get("year"),
          description: formData.get("description"),
          duration: formData.get("duration"),
          budget: formData.get("budget"),
          previewLink: formData.get("previewLink"),
          image: imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        showSnackbar("Work created successfully", "success")
        router.push("/admin/works")
      } else {
        showSnackbar("Failed to create work", "error")
      }
    } catch (error) {
      console.error("Error creating work:", error)
      showSnackbar("An error occurred while creating the work", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Work</h1>
      <WorkForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
