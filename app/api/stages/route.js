import { NextResponse } from "next/server"
import { prisma } from "/lib/db"

export async function GET() {
  try {
    const stages = await prisma.stage.findMany({
      include: {
        leads: {
          include: {
            assignedTo: true,
          },
        },
      },
      orderBy: { position: "asc" },
    })

    return NextResponse.json(stages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stages" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name } = body

    // Get the highest position and add 1
    const lastStage = await prisma.stage.findFirst({
      orderBy: { position: "desc" },
    })

    const position = lastStage ? lastStage.position + 1 : 1

    const stage = await prisma.stage.create({
      data: {
        name,
        position,
      },
    })

    return NextResponse.json(stage)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create stage" }, { status: 500 })
  }
}
