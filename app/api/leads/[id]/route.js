import { NextResponse } from "next/server"
import { prisma } from "../../../lib/db"

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const { stageId, ...updateData } = body

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: {
        ...updateData,
        ...(stageId && { stageId }),
      },
      include: {
        stage: true,
        assignedTo: true,
      },
    })

    return NextResponse.json(lead)
  } catch (error) {
    console.error(`The error: ${error.message}`)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.lead.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`The error: ${error.message}`)
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 })
  }
}
