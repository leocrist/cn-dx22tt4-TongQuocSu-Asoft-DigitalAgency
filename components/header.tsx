"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="flex items-center justify-between py-8 px-12">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
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
          <span className="font-semibold text-xl">Solutions</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-10">
        <Link href="/" className="hover-text-animation">
          <span className="text-primary text-base font-medium">Home</span>
          <span className="text-secondary text-base font-medium">Home</span>
        </Link>
        <Link href="/about" className="hover-text-animation">
          <span className="text-primary text-base font-medium">About</span>
          <span className="text-secondary text-base font-medium">About</span>
        </Link>
        <Link href="/works" className="hover-text-animation">
          <span className="text-primary text-base font-medium">Works</span>
          <span className="text-secondary text-base font-medium">Works</span>
        </Link>
        <Link href="/services" className="hover-text-animation">
          <span className="text-primary text-base font-medium">Services</span>
          <span className="text-secondary text-base font-medium">Services</span>
        </Link>
        <Link href="/insights" className="hover-text-animation">
          <span className="text-primary text-base font-medium">Insights</span>
          <span className="text-secondary text-base font-medium">Insights</span>
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <Link
            href="/admin"
            className="text-[#6E13E8] border border-[#6E13E8] px-4 py-2 rounded-full text-base font-medium hover:bg-[#6E13E8] hover:text-white transition-colors"
          >
            Admin
          </Link>
        )}
        <Link
          href="/contact"
          className="bg-[#6E13E8] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#5a0bc0] transition-colors"
        >
          Contact
        </Link>
      </div>
    </header>
  )
}
