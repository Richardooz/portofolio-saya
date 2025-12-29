import { cookies } from "next/headers"
import { adminCookie, verifyAdminSessionToken } from "@/lib/adminSession"

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(adminCookie.name)?.value
  return verifyAdminSessionToken(token)
}
