"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { WorksTable } from "@/components/admin/works-table"
import { Pagination } from "@/components/admin/pagination"
import { DeleteConfirmModal } from "@/components/admin/delete-confirm-modal"
import { useSnackbar } from "@/components/admin/snackbar-provider"

interface Work {
  slug: string
  title: string
  category: string
  year: string
  image: string
}

export default function WorksManagementPage() {
  const { showSnackbar } = useSnackbar()
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [workToDelete, setWorkToDelete] = useState<string | null>(null)

  const itemsPerPage = 5

  useEffect(() => {
    fetchWorks()
  }, [currentPage])

  const fetchWorks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/works?page=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setWorks(data.works)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching works:", error)
      showSnackbar("Failed to load works", "error")
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDeleteClick = (slug: string) => {
    setWorkToDelete(slug)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!workToDelete) return

    try {
      const response = await fetch(`/api/works/${workToDelete}`, {
        method: "DELETE",
      })

      if (response.ok) {
        showSnackbar("Work deleted successfully", "success")
        // Refresh the works list
        fetchWorks()
      } else {
        showSnackbar("Failed to delete work", "error")
      }

      // Close the modal
      setIsDeleteModalOpen(false)
      setWorkToDelete(null)
    } catch (error) {
      console.error("Error deleting work:", error)
      showSnackbar("An error occurred while deleting the work", "error")
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setWorkToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Works Management</h1>
        <Link
          href="/admin/works/new"
          className="bg-[#6E13E8] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#5a0bc0] transition-colors"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Work
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Loading works...</p>
        </div>
      ) : (
        <>
          <WorksTable works={works} onEdit={(slug) => {}} onDelete={handleDeleteClick} />

          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </>
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Work"
        message="Are you sure you want to delete this work? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}
