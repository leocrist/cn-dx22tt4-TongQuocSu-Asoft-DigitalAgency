"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { WorkForm } from "@/components/admin/work-form"
import { useSnackbar } from "@/components/admin/snackbar-provider"

interface WorkFormData {
  title: string
  category: string
  year: string
  description: string
  image: string
  duration?: string
  budget?: string
  previewLink?: string
}

export default function EditWorkPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const [work, setWork] = useState<WorkFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await fetch(`/api/works/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setWork(data)
        } else {
          showSnackbar("Failed to fetch work", "error")
        }
      } catch (error) {
        console.error("Error fetching work:", error)
        showSnackbar("An error occurred while fetching the work", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchWork()
  }, [slug, showSnackbar])

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    try {
      const imageUrl = (formData.get("imageUrl") as string) || work?.image || "/placeholder.svg?height=400&width=500"

      const response = await fetch(`/api/works/${slug}`, {
        method: "PUT",
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
        showSnackbar("Work updated successfully", "success")
        router.push("/admin/works")
      } else {
        showSnackbar("Failed to update work", "error")
      }
    } catch (error) {
      console.error("Error updating work:", error)
      showSnackbar("An error occurred while updating the work", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Edit Work</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Loading work...</p>
        </div>
      </div>
    )
  }

  if (!work) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Edit Work</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Work not found</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Work: {work.title}</h1>
      <WorkForm onSubmit={handleSubmit} isSubmitting={isSubmitting} initialData={work} />
    </div>
  )
}
