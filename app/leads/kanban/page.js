import KanbanBoard from "/components/KanbanBoard"

export default function KanbanPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lead Pipeline</h2>
        <p className="text-gray-600">Manage your leads through the sales pipeline</p>
      </div>
      <KanbanBoard />
    </div>
  )
}
