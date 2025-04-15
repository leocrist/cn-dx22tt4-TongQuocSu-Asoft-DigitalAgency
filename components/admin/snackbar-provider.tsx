"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Snackbar, type SnackbarType } from "./snackbar"

interface SnackbarContextType {
  showSnackbar: (message: string, type: SnackbarType) => void
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState<SnackbarType>("success")

  const showSnackbar = (message: string, type: SnackbarType) => {
    setMessage(message)
    setType(type)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar message={message} type={type} open={open} onClose={handleClose} />
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const context = useContext(SnackbarContext)
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider")
  }
  return context
}
