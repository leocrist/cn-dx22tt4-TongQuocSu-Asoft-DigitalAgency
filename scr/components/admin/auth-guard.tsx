"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      isClient &&
      !isAuthenticated &&
      !window.location.pathname.includes("/admin/login")
    ) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isClient, router]);

  if (!isClient) {
    return null;
  }

  if (!isAuthenticated && !window.location.pathname.includes("/admin/login")) {
    return null;
  }

  return <>{children}</>;
}
