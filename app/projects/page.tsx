import Link from "next/link"

import { Button } from "@/components/ui/button"
import { projectToSlug } from "@/lib/projectSlug"
import { getSiteUrl } from "@/lib/siteUrl"
import { getPublicProjects } from "@/lib/publicPortfolio"

export const metadata = {
  title: "Projects",
  description: "Selected projects and case studies.",
}

export default async function ProjectsIndexPage() {
  const projects = await getPublicProjects()
  const baseUrl = getSiteUrl()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects",
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.title,
      url: `${baseUrl}/projects/${projectToSlug(p)}`,
    })),
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Selected projects & case studies.</p>
        </header>

        <div className="divide-y rounded-lg border">
          {projects.map((p) => (
            <div key={projectToSlug(p)} className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.year}</p>
                </div>
                <Link href={`/projects/${projectToSlug(p)}`}>
                  <Button variant="outline">Read Case Study</Button>
                </Link>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </main>
  )
}
