"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { InsightForm } from "@/components/admin/insight-form"
import { useSnackbar } from "@/components/admin/snackbar-provider"

interface InsightFormData {
  title: string
  author: string
  date: string
  content: string
  image: string
}

export default function EditInsightPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const [insight, setInsight] = useState<InsightFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const response = await fetch(`/api/insights/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setInsight(data)
        } else {
          showSnackbar("Failed to fetch insight", "error")
        }
      } catch (error) {
        console.error("Error fetching insight:", error)
        showSnackbar("An error occurred while fetching the insight", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchInsight()
  }, [slug, showSnackbar])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    try {
      const imageUrl = (formData.get("imageUrl") as string) || insight?.image || "/placeholder.svg?height=400&width=600"

      const response = await fetch(`/api/insights/${slug}`, {
        method: "PUT",
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
        showSnackbar("Insight updated successfully", "success")
        router.push("/admin/insights")
      } else {
        showSnackbar("Failed to update insight", "error")
      }
    } catch (error) {
      console.error("Error updating insight:", error)
      showSnackbar("An error occurred while updating the insight", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Edit Insight</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Loading insight...</p>
        </div>
      </div>
    )
  }

  if (!insight) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Edit Insight</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Insight not found</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Insight: {insight.title}</h1>
      <InsightForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={insight} />
    </div>
  )
}
