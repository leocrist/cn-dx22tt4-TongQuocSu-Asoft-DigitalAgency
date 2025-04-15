"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if not on the login page already
    if (
      !isAuthenticated &&
      !window?.location?.pathname?.includes("/admin/login")
    ) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Don't show the checking authentication message when on the login page
  if (
    !isAuthenticated &&
    !window?.location?.pathname?.includes("/admin/login")
  ) {
    return null; // Return nothing during redirect to avoid flashing content
  }

  return <>{children}</>;
}
