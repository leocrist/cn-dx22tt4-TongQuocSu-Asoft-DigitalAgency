import { type NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

// In a real application, this would be stored securely
const JWT_SECRET = new TextEncoder().encode("your-secret-key-for-jwt-tokens")

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Check if the credentials match the mock admin account
    if (username === "admin" && password === "admin") {
      // Generate a JWT token using jose
      const token = await new SignJWT({
        username,
        role: "admin",
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(JWT_SECRET)

      // Create a response with the token
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
      })

      // Set the token as an HTTP-only cookie
      response.cookies.set({
        name: "access_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return response
    }

    // If credentials don't match
    return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
