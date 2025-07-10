"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import LeadCard from "./LeadCard"

export default function StageColumn({ stage, leads }) {
  const { setNodeRef } = useDroppable({
    id: stage.id,
  })

  return (
    <div className="bg-gray-100 rounded-lg p-4 min-w-60 max-w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">{stage.name}</h3>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{leads.length}</span>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-32">
        <SortableContext items={leads.map((lead) => lead.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
