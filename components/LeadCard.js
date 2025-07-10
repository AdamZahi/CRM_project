"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Mail, Phone, User } from "lucide-react"

export default function LeadCard({ lead, isDragging = false }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getSourceColor = (source) => {
    switch (source) {
      case "ORGANIC":
        return "bg-green-100 text-green-800"
      case "PAID":
        return "bg-blue-100 text-blue-800"
      case "REFERRAL":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg p-4 shadow-sm border cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : "hover:shadow-md"
      } transition-shadow`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 truncate">{lead.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs ${getSourceColor(lead.source)}`}>{lead.source}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {lead.email && (
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>{lead.phone}</span>
          </div>
        )}
        {lead.assignedTo && (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{lead.assignedTo.name || lead.assignedTo.email}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-3">
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(lead.status)}`}>{lead.status}</span>
        <span className="text-xs text-gray-500">{new Date(lead.dateAdded).toLocaleDateString()}</span>
      </div>
    </div>
  )
}
