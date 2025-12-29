"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type Project = {
  id: string
  title: string
  year: string
  description: string
  image: string
  technologies: string[]
  link?: string | null
  features?: string[]
  challenges?: string | null
  solution?: string | null
  published: boolean
  sortOrder: number
}

type Settings = {
  key: string
  heroImage?: string | null
}

function toCsv(values: string[] | undefined) {
  return (values ?? []).join(", ")
}

function fromCsv(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

function normalizeImageInput(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return ""
  const normalized = trimmed.replaceAll("\\\\", "/")

  const idx = normalized.toLowerCase().lastIndexOf("/public/")
  if (idx >= 0) {
    const after = normalized.slice(idx + "/public".length)
    return after.startsWith("/") ? after : `/${after}`
  }

  return normalized
}

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [heroImage, setHeroImage] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const emptyForm = useMemo(
    () => ({
      id: "",
      title: "",
      year: "",
      description: "",
      image: "",
      technologiesCsv: "",
      link: "",
      featuresCsv: "",
      challenges: "",
      solution: "",
      published: true,
      sortOrder: 0,
    }),
    []
  )

  const [form, setForm] = useState(emptyForm)

  async function loadAll() {
    setLoading(true)
    setError(null)

    try {
      const [projectsRes, settingsRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/settings"),
      ])

      if (!projectsRes.ok || !settingsRes.ok) {
        throw new Error("Failed to load admin data")
      }

      const projectsData = (await projectsRes.json()) as { projects: Project[] }
      const settingsData = (await settingsRes.json()) as { settings: Settings | null }

      setProjects(projectsData.projects)
      setSettings(settingsData.settings)
      setHeroImage(settingsData.settings?.heroImage ?? "")
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function startNew() {
    setForm(emptyForm)
  }

  function startEdit(p: Project) {
    setForm({
      id: p.id,
      title: p.title,
      year: p.year,
      description: p.description,
      image: p.image,
      technologiesCsv: toCsv(p.technologies),
      link: p.link ?? "",
      featuresCsv: toCsv(p.features),
      challenges: p.challenges ?? "",
      solution: p.solution ?? "",
      published: p.published,
      sortOrder: p.sortOrder,
    })
  }

  async function saveSettings() {
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroImage: normalizeImageInput(heroImage) }),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      throw new Error(data?.error ?? "Failed to save settings")
    }

    const data = (await res.json()) as { settings: Settings }
    setSettings(data.settings)
  }

  async function saveProject() {
    const payload = {
      title: form.title,
      year: form.year,
      description: form.description,
      image: normalizeImageInput(form.image),
      technologies: fromCsv(form.technologiesCsv),
      link: form.link,
      features: fromCsv(form.featuresCsv),
      challenges: form.challenges,
      solution: form.solution,
      published: form.published,
      sortOrder: Number(form.sortOrder) || 0,
    }

    const isEdit = Boolean(form.id)
    const url = isEdit ? `/api/admin/projects/${form.id}` : "/api/admin/projects"
    const method = isEdit ? "PATCH" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      throw new Error(data?.error ?? "Failed to save project")
    }

    await loadAll()
    startNew()
  }

  async function deleteProject(id: string) {
    const ok = confirm("Delete this project?")
    if (!ok) return

    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Failed to delete project")

    await loadAll()
    if (form.id === id) startNew()
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin</h1>
            <p className="text-sm text-muted-foreground">
              Kelola foto (hero) dan portfolio projects.
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </header>

        {loading ? <p className="text-sm">Loading...</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <section className="space-y-4 rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Foto (Hero)</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Image URL / Path</label>
            <input
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="/laptop.jpeg.jpg atau https://... (jangan pakai C:\\...)"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  try {
                    await saveSettings()
                    alert("Saved")
                  } catch (e) {
                    const msg = (e as Error).message || "Failed"
                    if (msg.toLowerCase().includes("failed to fetch")) {
                      alert(
                        "Server tidak bisa dihubungi. Pastikan `npm run dev` masih berjalan, tunggu kalau sedang restart, lalu refresh halaman."
                      )
                      return
                    }
                    alert(msg)
                  }
                }}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setHeroImage(settings?.heroImage ?? "")}
              >
                Reset
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-lg border p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Portfolio Projects</h2>
            <Button variant="outline" onClick={startNew}>
              New Project
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Year</label>
                  <input
                    value={form.year}
                    onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort Order</label>
                  <input
                    value={String(form.sortOrder)}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sortOrder: Number(e.target.value) || 0 }))
                    }
                    inputMode="numeric"
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image (URL/Path)</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="/electric.png atau https://... (jangan pakai C:\\...)"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies (comma separated)</label>
                <input
                  value={form.technologiesCsv}
                  onChange={(e) => setForm((f) => ({ ...f, technologiesCsv: e.target.value }))}
                  placeholder="Laravel, PHP, MySQL"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Link (optional)</label>
                <input
                  value={form.link}
                  onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="min-h-[110px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Features (comma separated)</label>
                <input
                  value={form.featuresCsv}
                  onChange={(e) => setForm((f) => ({ ...f, featuresCsv: e.target.value }))}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Challenges</label>
                <textarea
                  value={form.challenges}
                  onChange={(e) => setForm((f) => ({ ...f, challenges: e.target.value }))}
                  className="min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Solution</label>
                <textarea
                  value={form.solution}
                  onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
                  className="min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                />
                Published
              </label>

              <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    try {
                      await saveProject()
                      alert("Saved")
                    } catch (e) {
                      const msg = (e as Error).message || "Failed"
                      if (msg.toLowerCase().includes("failed to fetch")) {
                        alert(
                          "Server tidak bisa dihubungi. Pastikan `npm run dev` masih berjalan, tunggu kalau sedang restart, lalu refresh halaman."
                        )
                        return
                      }
                      alert(msg)
                    }
                  }}
                >
                  {form.id ? "Update" : "Create"}
                </Button>
                {form.id ? (
                  <Button variant="outline" onClick={startNew}>
                    Cancel
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Existing</h3>
              <div className="divide-y rounded-md border">
                {projects.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground">No projects yet.</p>
                ) : (
                  projects.map((p) => (
                    <div key={p.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">
                            {p.title} <span className="text-muted-foreground">({p.year})</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Order: {p.sortOrder} • {p.published ? "Published" : "Hidden"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => startEdit(p)}>
                            Edit
                          </Button>
                          <Button variant="outline" onClick={() => deleteProject(p.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
