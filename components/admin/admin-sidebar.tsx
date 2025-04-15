"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FileText, BookOpen, LogOut } from "lucide-react"
import { useSnackbar } from "./snackbar-provider"
import { useAuth } from "@/contexts/auth-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const { logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const handleLogout = async () => {
    try {
      await logout()
      showSnackbar("Logout successful", "success")
    } catch (error) {
      console.error("Error during logout:", error)
      showSnackbar("An error occurred during logout", "error")
    }
  }

  return (
    <div className="w-64 bg-white shadow-md min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center">
          <svg
            width="48"
            height="24"
            viewBox="0 0 48 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M23.5059 5.36426C19.4619 5.36426 16.1709 8.65527 16.1709 12.6992C16.1709 16.7432 19.4619 20.0342 23.5059 20.0342C27.5498 20.0342 30.8408 16.7432 30.8408 12.6992C30.8408 8.65527 27.5498 5.36426 23.5059 5.36426ZM23.5059 17.0342C21.1152 17.0342 19.1709 15.0898 19.1709 12.6992C19.1709 10.3086 21.1152 8.36426 23.5059 8.36426C25.8965 8.36426 27.8408 10.3086 27.8408 12.6992C27.8408 15.0898 25.8965 17.0342 23.5059 17.0342Z"
              fill="#6E13E8"
            />
            <path
              d="M12.4941 5.36426C8.45019 5.36426 5.15918 8.65527 5.15918 12.6992C5.15918 16.7432 8.45019 20.0342 12.4941 20.0342C16.5381 20.0342 19.8291 16.7432 19.8291 12.6992C19.8291 8.65527 16.5381 5.36426 12.4941 5.36426ZM12.4941 17.0342C10.1035 17.0342 8.15918 15.0898 8.15918 12.6992C8.15918 10.3086 10.1035 8.36426 12.4941 8.36426C14.8848 8.36426 16.8291 10.3086 16.8291 12.6992C16.8291 15.0898 14.8848 17.0342 12.4941 17.0342Z"
              fill="#6E13E8"
            />
          </svg>
          <span className="font-semibold text-xl">Admin</span>
        </Link>
      </div>

      <nav className="p-4 flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin/works"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive("/admin/works") ? "bg-[#6E13E8] text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              <span>Works</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/insights"
              className={`flex items-center p-3 rounded-md transition-colors ${
                isActive("/admin/insights") ? "bg-[#6E13E8] text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              <span>Insights</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-md w-full text-left text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
