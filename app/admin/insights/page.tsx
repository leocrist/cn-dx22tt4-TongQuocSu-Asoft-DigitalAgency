"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { InsightsTable } from "@/components/admin/insights-table"
import { Pagination } from "@/components/admin/pagination"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { useSnackbar } from "@/components/admin/snackbar-provider"

interface Insight {
  slug: string
  title: string
  date: string
  author: string
  image: string
}

export default function InsightsManagementPage() {
  const { showSnackbar } = useSnackbar()
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [insightToDelete, setInsightToDelete] = useState<string | null>(null)

  const itemsPerPage = 5

  useEffect(() => {
    fetchInsights()
  }, [currentPage])

  const fetchInsights = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/insights?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setInsights(data.insights)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching insights:", error)
      showSnackbar("Failed to load insights", "error")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDeleteClick = (slug: string) => {
    setInsightToDelete(slug)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!insightToDelete) return

    try {
      const response = await fetch(`/api/insights/${insightToDelete}`, {
        method: "DELETE",
      })

      if (response.ok) {
        showSnackbar("Insight deleted successfully", "success")
        // Refresh the insights list
        fetchInsights()
      } else {
        showSnackbar("Failed to delete insight", "error")
      }

      // Close the modal
      setIsDeleteModalOpen(false)
      setInsightToDelete(null)
    } catch (error) {
      console.error("Error deleting insight:", error)
      showSnackbar("An error occurred while deleting the insight", "error")
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setInsightToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Insights Management</h1>
        <Link
          href="/admin/insights/new"
          className="bg-[#6E13E8] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#5a0bc0] transition-colors"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Insight
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Loading insights...</p>
        </div>
      ) : (
        <>
          <InsightsTable insights={insights} onEdit={(slug) => {}} onDelete={handleDeleteClick} />

          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Insight"
        message="Are you sure you want to delete this insight? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}
