import crypto from "crypto"

const COOKIE_NAME = "admin_session"

type SessionPayload = {
  exp: number
}

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "")
}

function base64UrlDecodeToString(input: string) {
  const base64 = input.replaceAll("-", "+").replaceAll("_", "/")
  const padded = base64 + "===".slice((base64.length + 3) % 4)
  return Buffer.from(padded, "base64").toString("utf8")
}

function sign(data: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(data).digest("base64url")
}

export function createAdminSessionToken(options?: { ttlSeconds?: number }) {
  const ttlSeconds = options?.ttlSeconds ?? 60 * 60 * 12

  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET env var")
  }

  const payload: SessionPayload = { exp: Math.floor(Date.now() / 1000) + ttlSeconds }
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(payloadEncoded, secret)

  return `${payloadEncoded}.${signature}`
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false

  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return false

  const parts = token.split(".")
  if (parts.length !== 2) return false

  const [payloadEncoded, signature] = parts
  const expected = sign(payloadEncoded, secret)
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false

  try {
    const payload = JSON.parse(base64UrlDecodeToString(payloadEncoded)) as SessionPayload
    if (typeof payload.exp !== "number") return false
    return payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

export const adminCookie = {
  name: COOKIE_NAME,
}
