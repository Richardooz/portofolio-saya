export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { createAdminSessionToken, adminCookie } from "@/lib/adminSession"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { username?: string; password?: string }
    | null

  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin"
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedPassword) {
    return NextResponse.json(
      { error: "Missing ADMIN_PASSWORD env var" },
      { status: 500 }
    )
  }

  const username = body?.username ?? ""
  const password = body?.password ?? ""

  if (username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  let token: string
  try {
    token = createAdminSessionToken()
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message ?? "Failed to create session" },
      { status: 500 }
    )
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: adminCookie.name,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })

  return res
}
