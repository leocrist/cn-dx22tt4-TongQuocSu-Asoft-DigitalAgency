"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, X } from "lucide-react"

export type SnackbarType = "success" | "error"

interface SnackbarProps {
  message: string
  type: SnackbarType
  open: boolean
  onClose: () => void
  autoHideDuration?: number
}

export function Snackbar({ message, type, open, onClose, autoHideDuration = 5000 }: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(open)

  useEffect(() => {
    setIsVisible(open)

    if (open && autoHideDuration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, autoHideDuration)

      return () => clearTimeout(timer)
    }
  }, [open, autoHideDuration, onClose])

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg max-w-md animate-fade-in-up"
      style={{
        backgroundColor: type === "success" ? "#10B981" : "#EF4444",
        color: "white",
      }}
    >
      <div className="mr-3">
        {type === "success" ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
      </div>
      <div className="mr-8 flex-1">{message}</div>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose()
        }}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

// Add this to your globals.css
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
//
// .animate-fade-in-up {
//   animation: fadeInUp 0.3s ease-out forwards;
// }
