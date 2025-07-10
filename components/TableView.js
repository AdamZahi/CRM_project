"use client"

import { useState, useEffect } from "react"
import FilterBar from "./FilterBar"
import { Mail, Phone, User, Edit, Trash2 } from "lucide-react"

export default function TableView() {
  const [leads, setLeads] = useState([])
  const [stages, setStages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    stageId: "",
    status: "",
    source: "",
  })

  useEffect(() => {
    fetchStages()
    fetchLeads()
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [filters])

  const fetchStages = async () => {
    try {
      const response = await fetch("/api/stages")
      const data = await response.json()
      setStages(data)
    } catch (error) {
      console.error("Failed to fetch stages:", error)
    }
  }

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })

      const response = await fetch(`/api/leads?${params}`)
      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error("Failed to fetch leads:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (leadId) => {
    if (!confirm("Are you sure you want to delete this lead?")) return

    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
      })
      fetchLeads()
    } catch (error) {
      console.error("Failed to delete lead:", error)
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <FilterBar stages={stages} filters={filters} onFiltersChange={setFilters} />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    {lead.channel && <div className="text-sm text-gray-500">{lead.channel}</div>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    {lead.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {lead.email}
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {lead.phone}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{lead.stage.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(lead.source)}`}
                  >
                    {lead.source}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lead.assignedTo ? (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      {lead.assignedTo.name || lead.assignedTo.email}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Unassigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(lead.dateAdded).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(lead.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
