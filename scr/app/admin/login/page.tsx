"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSnackbar } from "@/components/admin/snackbar-provider"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { showSnackbar } = useSnackbar()
  const { login, isAuthenticated } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // If already authenticated, redirect to admin dashboard
    if (isAuthenticated) {
      router.push("/admin")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(username, password)

      if (result.success) {
        showSnackbar("Login successful", "success")
        router.push("/admin")
      } else {
        showSnackbar(result.message || "Login failed", "error")
      }
    } catch (error) {
      showSnackbar("An error occurred during login", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
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
          <span className="font-semibold text-xl">Admin Login</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6E13E8]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6E13E8] text-white py-2 rounded-md hover:bg-[#5a0bc0] transition-colors disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
