import Link from "next/link"

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/works" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Works Management</h2>
          <p className="text-gray-600">Manage your portfolio works and case studies</p>
        </Link>

        <Link href="/admin/insights" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Insights Management</h2>
          <p className="text-gray-600">Manage your blog posts and articles</p>
        </Link>
      </div>
    </div>
  )
}
