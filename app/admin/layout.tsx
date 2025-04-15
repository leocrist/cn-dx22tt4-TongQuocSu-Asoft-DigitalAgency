"use client"

import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SnackbarProvider } from "@/components/admin/snackbar-provider"
import { AuthGuard } from "@/components/admin/auth-guard"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  return (
    <SnackbarProvider>
      {isLoginPage ? (
        children
      ) : (
        <AuthGuard>
          <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-8">{children}</div>
          </div>
        </AuthGuard>
      )}
    </SnackbarProvider>
  )
}
