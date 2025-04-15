"use client"

import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"

interface Insight {
  slug: string
  title: string
  date: string
  author: string
  image: string
}

interface InsightsTableProps {
  insights: Insight[]
  onEdit: (slug: string) => void
  onDelete: (slug: string) => void
}

export function InsightsTable({ insights, onEdit, onDelete }: InsightsTableProps) {
  if (insights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p>No insights found. Create your first insight!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {insights.map((insight) => (
            <tr key={insight.slug} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-12 w-12 relative rounded-md overflow-hidden">
                  <Image src={insight.image || "/placeholder.svg"} alt={insight.title} fill className="object-cover" />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{insight.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{insight.author}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{insight.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href={`/admin/insights/edit/${insight.slug}`} className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button onClick={() => onDelete(insight.slug)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
