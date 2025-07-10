import "./globals.css"

export const metadata = {
  title: "CRM Application",
  description: "Modern CRM with Kanban boards and lead management",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
