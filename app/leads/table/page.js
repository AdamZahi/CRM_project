import TableView from "/components/TableView"

export default function TablePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Leads</h2>
        <p className="text-gray-600">View and manage all leads in a table format</p>
      </div>
      <TableView />
    </div>
  )
}
