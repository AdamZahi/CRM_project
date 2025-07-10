import Link from "next/link"

export default function LeadsLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <nav className="flex space-x-4">
                <NavLink href="/home" label="Overview" />
                <NavLink href="/home/kanban" label="Kanban" />
                <NavLink href="/home/table" label="Table View" />
              </nav>
            </div>
            <div className="text-sm text-gray-600">Welcome to NextGen Coding CRM</div>
          </div>
        </div>
      </header>
      <main className="max-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  )
}
