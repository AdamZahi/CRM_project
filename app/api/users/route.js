// import { NextResponse } from "next/server"
// import { prisma } from "/lib/db"

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       include: {
//         _count: {
//           select: { leads: true },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     })

//     return NextResponse.json(users)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json()
//     const { name, email, role = "USER" } = body

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         role,
//       },
//     })

//     return NextResponse.json(user)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
//   }
// }
