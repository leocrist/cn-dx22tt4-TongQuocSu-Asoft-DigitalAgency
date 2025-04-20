"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InsightForm } from "@/components/admin/insight-form"
import { useSnackbar } from "@/components/admin/snackbar-provider"

export default function NewInsightPage() {
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    try {
      const imageUrl = (formData.get("imageUrl") as string) || "/placeholder.svg?height=400&width=600"

      const response = await fetch("/api/insights", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          author: formData.get("author"),
          date: formData.get("date"),
          content: formData.get("content"),
          image: imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        showSnackbar("Insight created successfully", "success")
        router.push("/admin/insights")
      } else {
        showSnackbar("Failed to create insight", "error")
      }
    } catch (error) {
      console.error("Error creating insight:", error)
      showSnackbar("An error occurred while creating the insight", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Insight</h1>
      <InsightForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
