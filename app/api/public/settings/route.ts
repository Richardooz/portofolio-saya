import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { key: "site" } })
  return NextResponse.json({ settings })
}
