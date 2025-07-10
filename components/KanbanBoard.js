"use client"

import { useState, useEffect } from "react"
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core"
import StageColumn from "./StageColumn"
import LeadCard from "./LeadCard"
import AddLeadModal from "./AddLeadModal"
import AddStageModal from "./AddStageModal"
import { Plus } from "lucide-react"

export default function KanbanBoard() {
  const [stages, setStages] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddStage, setShowAddStage] = useState(false)
  const [loading, setLoading] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  useEffect(() => {
    fetchStages()
  }, [])

  const fetchStages = async () => {
    try {
      const response = await fetch("/api/stages")
      const data = await response.json()
      setStages(data)
    } catch (error) {
      console.error("Failed to fetch stages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the lead being dragged
    const activeLead = stages.flatMap((stage) => stage.leads).find((lead) => lead.id === activeId)

    if (!activeLead) return

    // Find the target stage
    const targetStage = stages.find((stage) => stage.id === overId || stage.leads.some((lead) => lead.id === overId))

    if (!targetStage || targetStage.id === activeLead.stageId) return

    // Update lead stage
    try {
      await fetch(`/api/leads/${activeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stageId: targetStage.id,
        }),
      })

      // Refresh stages
      fetchStages()
    } catch (error) {
      console.error("Failed to update lead:", error)
    }
  }

  const getActiveItem = () => {
    return stages.flatMap((stage) => stage.leads).find((lead) => lead.id === activeId)
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddLead(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Lead</span>
          </button>
          <button
            onClick={() => setShowAddStage(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Stage</span>
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <StageColumn key={stage.id} stage={stage} leads={stage.leads} />
          ))}
        </div>

        <DragOverlay>{activeId ? <LeadCard lead={getActiveItem()} isDragging /> : null}</DragOverlay>
      </DndContext>

      {showAddLead && (
        <AddLeadModal
          stages={stages}
          onClose={() => setShowAddLead(false)}
          onSuccess={() => {
            setShowAddLead(false)
            fetchStages()
          }}
        />
      )}

      {showAddStage && (
        <AddStageModal
          onClose={() => setShowAddStage(false)}
          onSuccess={() => {
            setShowAddStage(false)
            fetchStages()
          }}
        />
      )}
    </div>
  )
}
