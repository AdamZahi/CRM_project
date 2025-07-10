// import { NextResponse } from "next/server"
// import { prisma } from "/lib/db"

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const stageId = searchParams.get("stageId")
//     const status = searchParams.get("status")
//     const source = searchParams.get("source")

//     const where = {}
//     if (stageId) where.stageId = stageId
//     if (status) where.status = status
//     if (source) where.source = source

//     const leads = await prisma.lead.findMany({
//       where,
//       include: {
//         stage: true,
//         assignedTo: true,
//       },
//       orderBy: { createdAt: "desc" },
//     })

//     return NextResponse.json(leads)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json()
//     const { name, email, phone, source, status, channel, stageId, assignedToId, reminder } = body

//     const lead = await prisma.lead.create({
//       data: {
//         name,
//         email,
//         phone,
//         source,
//         status,
//         channel,
//         stageId,
//         assignedToId,
//         reminder,
//       },
//       include: {
//         stage: true,
//         assignedTo: true,
//       },
//     })

//     return NextResponse.json(lead)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
//   }
// }
