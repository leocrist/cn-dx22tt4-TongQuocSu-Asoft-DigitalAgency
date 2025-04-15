"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { parseCookies } from "nookies"

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Check authentication status on mount and when cookies change
  useEffect(() => {
    const checkAuth = () => {
      try {
        const cookies = parseCookies()
        const hasToken = !!cookies.access_token

        // Also check localStorage for persistence across page reloads
        const localAuth = localStorage.getItem("isAuthenticated") === "true"

        // Update state if either is true
        setIsAuthenticated(hasToken || localAuth)

        // If there's a mismatch, sync them
        if (hasToken && !localAuth) {
          localStorage.setItem("isAuthenticated", "true")
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }

    // Check immediately
    checkAuth()

    // Set up an interval to periodically check auth status
    const interval = setInterval(checkAuth, 5000)

    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = () => {
      checkAuth()
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        // Also store in localStorage for cross-tab synchronization
        localStorage.setItem("isAuthenticated", "true")
        // Trigger storage event for other tabs
        window.dispatchEvent(new Event("storage"))
        return { success: true, message: data.message || "Login successful" }
      }

      return { success: false, message: data.message || "Login failed" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        setIsAuthenticated(false)
        localStorage.removeItem("isAuthenticated")
        // Trigger storage event for other tabs
        window.dispatchEvent(new Event("storage"))
        router.push("/")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
