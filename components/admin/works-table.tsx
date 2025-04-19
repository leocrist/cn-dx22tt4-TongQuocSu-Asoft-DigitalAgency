"use client";

import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Eye } from "lucide-react";

interface Work {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

interface WorksTableProps {
  works: Work[];
  onEdit: (slug: string) => void;
  onDelete: (slug: string) => void;
}

export function WorksTable({ works, onEdit, onDelete }: WorksTableProps) {
  if (works?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p>No works found. Create your first work!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {works?.map((work) => (
            <tr key={work.slug} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-12 w-12 relative rounded-md overflow-hidden">
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {work.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                  {work.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {work.year}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link
                    href={`/works/${work.slug}`}
                    target="_blank"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/admin/works/edit/${work.slug}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => onDelete(work.slug)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
