import type React from "react"
import { SnackbarProvider } from "@/components/admin/snackbar-provider"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <SnackbarProvider>{children}</SnackbarProvider>
}
