"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface InsightFormProps {
  onSubmit: (formData: FormData) => void
  isSubmitting: boolean
  initialData?: {
    title: string
    author: string
    date: string
    content: string
    image: string
  }
}

export function InsightForm({ onSubmit, isSubmitting, initialData }: InsightFormProps) {
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState(initialData?.image || "/placeholder.svg?height=400&width=600")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // If there's a selected file, upload it first
    if (uploadedImageUrl) {
      formData.append("imageUrl", uploadedImageUrl)
    }

    onSubmit(formData)
  }

  // Update the handleFileChange function to use the new upload API
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create a preview URL for the selected file
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)

      // Upload the file immediately
      const formData = new FormData()
      formData.append("image", file)

      try {
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json()
          // Store the URL for form submission
          setUploadedImageUrl(url)
        } else {
          console.error("Failed to upload image")
        }
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    }
  }

  // Format today's date as YYYY-MM-DD for the date input default value
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialData?.title || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={initialData?.author || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={initialData?.date || today}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content (HTML)
          </label>
          <textarea
            id="content"
            name="content"
            rows={12}
            defaultValue={initialData?.content || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8] font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <div className="mt-1 flex items-center">
            <div className="relative h-32 w-48 rounded-md overflow-hidden bg-gray-100">
              <Image src={previewImage || "/placeholder.svg"} alt="Insight preview" fill className="object-cover" />
            </div>
            <label className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6E13E8] cursor-pointer">
              Change
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/admin/insights")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#6E13E8] text-white rounded-md hover:bg-[#5a0bc0] disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update Insight" : "Create Insight"}
          </button>
        </div>
      </form>
    </div>
  )
}
