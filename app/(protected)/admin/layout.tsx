import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { adminCookie, verifyAdminSessionToken } from "@/lib/adminSession"

export const dynamic = "force-dynamic"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get(adminCookie.name)?.value
  const ok = verifyAdminSessionToken(token)

  if (!ok) {
    redirect("/admin/login")
  }

  return children
}
