import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import type { PortfolioProject } from "@/lib/portfolioDefaults"
import { projectToSlug } from "@/lib/projectSlug"
import { getPublicProjects } from "@/lib/publicPortfolio"
import { getSiteUrl } from "@/lib/siteUrl"

type PageProps = {
  params: Promise<{ slug: string }>
}

async function findProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPublicProjects()
  return projects.find((p) => projectToSlug(p) === slug) ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await findProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  const title = `${project.title} (${project.year})`
  const description = project.description
  const baseUrl = getSiteUrl()
  const canonical = `${baseUrl}/projects/${slug}`
  const ogImage = project.image ? new URL(project.image, baseUrl).toString() : undefined

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = await findProjectBySlug(slug)

  if (!project) notFound()

  const baseUrl = getSiteUrl()
  const canonical = `${baseUrl}/projects/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: canonical,
    image: project.image ? new URL(project.image, baseUrl).toString() : undefined,
    dateCreated: project.year,
    keywords: project.technologies,
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="text-sm text-muted-foreground">{project.year}</p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </header>

        <section className="overflow-hidden rounded-lg border">
          <div className="relative aspect-video">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.features?.length ? (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.challenges ? (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Challenges</h2>
            <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
          </section>
        ) : null}

        {project.solution ? (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
          </section>
        ) : null}

        <section className="flex flex-wrap gap-3">
          <Link href="/projects">
            <Button variant="outline">All Projects</Button>
          </Link>
          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer">
              <Button>Visit Live Site</Button>
            </a>
          ) : null}
        </section>
      </div>
    </main>
  )
}
