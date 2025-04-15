import Link from "next/link"

export function ServiceTabs() {
  return (
    <div className="flex items-center justify-center py-4 px-6 md:px-12 space-x-6 overflow-x-auto bg-purple-600 text-white">
      <Link href="/services/interactions" className="flex items-center">
        <span className="mr-1">+</span>
        <span>Interactions</span>
      </Link>
      <Link href="/services/illustration" className="flex items-center">
        <span className="mr-1">+</span>
        <span>Illustration</span>
      </Link>
      <Link href="/services/web-development" className="flex items-center">
        <span className="mr-1">+</span>
        <span>Web Development</span>
      </Link>
      <Link href="/services/more" className="flex items-center">
        <span className="mr-1">+</span>
        <span>...</span>
      </Link>
    </div>
  )
}
