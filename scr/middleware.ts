import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

// In a real application, this would be stored securely and match the login route
const JWT_SECRET = new TextEncoder().encode("your-secret-key-for-jwt-tokens")

export async function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Only check API routes that require authentication
  if (pathname.startsWith("/api/admin")) {
    // Get the token from the cookies
    const token = request.cookies.get("access_token")?.value

    // If there's no token, return unauthorized
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
      // Verify the token using jose
      await jwtVerify(token, JWT_SECRET)

      // If verification is successful, continue
      return NextResponse.next()
    } catch (error) {
      // If verification fails, return unauthorized
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
  }

  // For all other routes, continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/admin/:path*"],
}
