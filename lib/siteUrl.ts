export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  const value = (fromEnv || "http://localhost:3000").replace(/\/$/, "")
  return value
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl())
}
