"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  Globe,
  Github,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react"
import Image from "next/image"
import DecryptedText from "@/components/ui/DecryptedText"
import TargetCursor from "@/components/ui/TargetCursor"
import ThemeToggle from "@/components/ui/ThemeToggle"
import LoadingScreen from "@/components/ui/LoadingScreen"
import BackToTop from "@/components/ui/BackToTop"
import ProjectModal from "@/components/ui/ProjectModal"
import ParticleBackground from "@/components/ui/ParticleBackground"
import FloatingMenu from "@/components/ui/FloatingMenu"
import AnimatedCounter from "@/components/ui/AnimatedCounter"
import SoundEffects from "@/components/ui/SoundEffects"
import KonamiCode from "@/components/ui/KonamiCode"
import SectionProgress from "@/components/ui/SectionProgress"
import MouseTrail from "@/components/ui/MouseTrail"
import ScrollProgress from "@/components/ui/ScrollProgress"
import TypewriterText from "@/components/ui/TypewriterText"
import CodeShowcase from "@/components/ui/CodeShowcase"
import TiltCard from "@/components/ui/TiltCard"
import SkillRadar from "@/components/ui/SkillRadar"
import Timeline from "@/components/ui/Timeline"

import {
  DEFAULT_HERO_IMAGE,
  DEFAULT_PROJECTS,
  type PortfolioProject,
} from "@/lib/portfolioDefaults"

const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Organizations", id: "organizations" },
  { label: "Skills", id: "skills" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
]

function normalizeImageSrc(input?: string | null) {
  const trimmed = (input ?? "").trim()
  if (!trimmed) return ""

  const normalized = trimmed.replaceAll("\\", "/")
  const idx = normalized.toLowerCase().lastIndexOf("/public/")

  if (idx >= 0) {
    const after = normalized.slice(idx + "/public".length)
    return after.startsWith("/") ? after : `/${after}`
  }

  if (normalized.startsWith("./")) {
    return `/${normalized.slice(2)}`
  }

  if (
    normalized.startsWith("/") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("https://")
  ) {
    return normalized
  }

  return `/${normalized}`
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE)
  const [projects, setProjects] = useState<PortfolioProject[]>(DEFAULT_PROJECTS)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [projectsRes, settingsRes] = await Promise.all([
          fetch("/api/public/projects", { cache: "no-store" }),
          fetch("/api/public/settings", { cache: "no-store" }),
        ])

        if (projectsRes.ok) {
          const data = (await projectsRes.json()) as { projects?: PortfolioProject[] }
          if (!cancelled && Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects)
          }
        }

        if (settingsRes.ok) {
          const data = (await settingsRes.json()) as { settings?: { heroImage?: string | null } | null }
          const nextHero = data.settings?.heroImage
          if (!cancelled && nextHero) setHeroImage(nextHero)
        }
      } catch {
        // ignore: fallback to defaults
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  const skills = [
    "Python",
    "JavaScript",
    "SQL",
    "PHP",
    "Laravel",
    "Django",
    "React",
    "Next.js",
    "REST APIs",
    "PostgreSQL",
    "TensorFlow",
    "Keras",
    "Pandas",
    "Prompt Engineering",
    "Generative AI APIs",
    "Docker",
    "Git",
    "Hugging Face",
    "Google Colab",
    "Kaggle",
    "Agile",
  ]

  const education = [
    {
      institution: "Batam Institute of Technology (ITEBA)",
      degree: "Bachelor of Information Systems | Semester 6 | GPA 3.79 / 4.00",
      period: "2023 - Present (Expected 2027)",
      logo: "/logo.png",
    },
  ]

  const experiences = [
    {
      role: "Web Developer Intern",
      organization: "PT Otak Kanan",
      period: "Jun 2023 - Aug 2023",
      mode: "Remote",
      highlights: [
        "Assisted development and maintenance of client websites using HTML, CSS, JavaScript, and React.",
        "Collaborated with senior developers to debug issues and implement feature updates.",
        "Improved responsiveness and cross-browser compatibility on production pages.",
      ],
    },
    {
      role: "Generative AI Developer (Intensive Bootcamp)",
      organization: "Dicoding Indonesia",
      period: "Jul 2025 - Oct 2025",
      mode: "Online",
      highlights: [
        "Completed a 4-month program covering LLM and diffusion model fundamentals.",
        "Built AI-powered apps integrated with Google Gemini and OpenAI APIs.",
        "Practiced NLP workflows, prompt engineering, and model adaptation strategies.",
      ],
    },
    {
      role: "Program Officer",
      organization: "FYP Media Community Region Banten & East Java",
      period: "Oct 2025 - Jan 2026",
      mode: "Volunteer Program",
      highlights: [
        "Received Certificate of Appreciation for outstanding performance.",
        "Managed end-to-end execution of regional educational and community initiatives.",
        "Strengthened stakeholder relationships to expand community impact.",
      ],
    },
    {
      role: "Machine Learning Operations (Studi Independent)",
      organization: "Infinite Learning",
      period: "Feb 2026 - May 2026",
      mode: "Online",
      highlights: [
        "Applied MLOps practices from model training to deployment using Python and TensorFlow/PyTorch.",
        "Collaborated in an agile team to integrate ML models into backend systems.",
        "Improved scalability and efficiency of ML-enabled application workflows.",
      ],
    },
  ]

  const featuredCvProjects = [
    {
      title: "Real-time Cargo Logistics Tracking System",
      description:
        "Designed and developed a proof-of-concept platform to monitor and track cargo status in real-time.",
      technologies: ["Python", "Flask/Django", "React", "PostgreSQL", "WebSockets"],
    },
    {
      title: "Web-Based Tuberculosis Screening with Optimized CNN & Grad-CAM",
      description:
        "Developed an end-to-end diagnostic web app to classify chest X-ray images for TB screening with transfer learning and class-imbalance handling.",
      technologies: ["Python", "TensorFlow", "Keras", "Grad-CAM", "Transfer Learning"],
    },
  ]

  const certifications = [
    "GitHub Foundations Certification (GitHub)",
    "GitHub Foundations Microsoft Learn Modules (Microsoft)",
    "Game Development Fundamentals (Infinite Learning)",
    "Generative AI Developer (Dicoding Indonesia)",
  ]

  const organizations = [
    {
      name: "AIESEC Future Leader",
      position: "Member",
      period: "2025",
      logo: "/AIESEC.jpg",
      description:
        "Participated in an intensive leadership development program focused on critical thinking, public speaking, and problem-solving while collaborating on community-driven case studies.",
    },
  ]

  const stats = [
    { number: 4, label: "Professional Programs", suffix: "+" },
    { number: 2, label: "Featured AI & Web Projects", suffix: "" },
    { number: 18, label: "Core Technical Skills", suffix: "+" },
    { number: 3.79, label: "Current GPA", suffix: "/4.00" },
  ]

  const typingTexts = [
    "Information Systems Student",
    "Backend & Web Developer",
    "Generative AI Builder",
    "Fast Learner & Team Player",
  ]

  const radarSkills = [
    { name: "Python", level: 90 },
    { name: "Laravel", level: 85 },
    { name: "React", level: 80 },
    { name: "GenAI", level: 85 },
    { name: "MLOps", level: 75 },
    { name: "SQL", level: 82 },
  ]

  const timelineItems = [
    {
      year: "2023",
      title: "Started Information Systems at ITEBA",
      description: "Began formal study and completed a 3-month web developer internship at PT Otak Kanan.",
    },
    {
      year: "2025",
      title: "Deep Dive into Generative AI",
      description: "Completed Dicoding Generative AI bootcamp and contributed as Program Officer in regional communities.",
    },
    {
      year: "2026",
      title: "Machine Learning Operations",
      description: "Applied MLOps practices through Studi Independent at Infinite Learning while building practical AI systems.",
    },
  ]

  const openProjectModal = (project: PortfolioProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // Fungsi ini bisa dikembalikan jika Anda menggunakan kembali navigasi lama
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-gray-950 transition-colors dark:bg-gray-950 dark:text-gray-50">
      <div className="mesh-gradient" />
      <ScrollProgress />
      <ParticleBackground />
      <LoadingScreen />
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <MouseTrail />
      <SoundEffects />
      <KonamiCode />
      <SectionProgress />

      <nav className="fixed top-0 z-40 w-full border-b border-white/20 bg-white/65 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/70">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
          <button
            onClick={() => scrollToSection("hero")}
            className="group inline-flex items-center gap-2 text-left cursor-target"
          >
            <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
              Richardo.dev
            </span>
            <span className="hidden text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100 sm:block">
              Portfolio
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((nav) => (
              <button
                key={nav.id}
                onClick={() => scrollToSection(nav.id)}
                className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-900/5 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white cursor-target"
              >
                {nav.label}
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="cursor-target"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/30 bg-white/85 px-6 py-4 dark:border-white/10 dark:bg-gray-950/95 md:hidden">
            <div className="grid gap-2">
              {navItems.map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className="w-full rounded-xl border border-black/5 bg-white/70 px-4 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 cursor-target"
                >
                  {nav.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-24 lg:px-8">
        <section id="hero" className="mb-16">
                        <div className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-10">
                          <div className="relative grid items-center gap-10 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-4 py-1 text-xs font-semibold text-gray-700 backdrop-blur dark:bg-white/5 dark:text-gray-200">
                                Available for internship and freelance projects
                              </div>

                              <h1 className="mb-5 text-4xl font-black leading-tight text-gray-900 dark:text-white md:text-6xl">
                                <DecryptedText
                                  text="Hi, I'm Richardo"
                                  animateOn="view"
                                  speed={50}
                                  maxIterations={15}
                                  revealDirection="center"
                                  delay={2200}
                                  className="text-gray-900 dark:text-white"
                                />
                                <span className="animate-wave ml-3 inline-block cursor-target">👋</span>
                              </h1>

                              <div className="mb-3 text-xl font-medium text-gray-700 dark:text-gray-300">
                                <TypewriterText texts={typingTexts} />
                              </div>

                              <p className="mb-6 max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
                                Proactive and motivated Information Systems student from Batam with hands-on
                                experience in backend development, web development, and generative AI. Strong in
                                Python, JavaScript, and AI fundamentals, with a focus on building reliable software
                                solutions that solve real-world problems.
                              </p>

                              <div className="flex flex-wrap gap-3">
                                <Button
                                  onClick={() => scrollToSection("projects")}
                                  className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 cursor-target"
                                >
                                  View Projects
                                  <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                                <a href="mailto:richardanuarta12@gmail.com" className="inline-block">
                                  <Button variant="outline" className="cursor-target border-gray-300 bg-white/70 dark:border-white/20 dark:bg-white/5">
                                    Contact Me
                                  </Button>
                                </a>
                              </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 lg:items-end">
                              <div className="relative h-52 w-52 overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-2 shadow-2xl shadow-fuchsia-500/10 dark:border-white/10 dark:bg-white/5">
                                <Image
                                  src={normalizeImageSrc(heroImage) || DEFAULT_HERO_IMAGE}
                                  alt="Richardo's workspace"
                                  width={240}
                                  height={240}
                                  className="h-full w-full rounded-2xl object-cover animate-float"
                                />
                              </div>

                              <div className="grid w-full max-w-xs grid-cols-2 gap-3">
                                {[
                                  "Laravel",
                                  "Next.js",
                                  "Problem Solving",
                                  "Team Collaboration",
                                ].map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-center text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Statistics Section */}
                      <section className="mb-16">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                          {stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="glass-card rounded-2xl p-5 text-center shadow-lg shadow-black/5 dark:shadow-black/20"
                            >
                              <div className="text-2xl font-black text-gray-900 dark:text-white md:text-3xl">
                                <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2000} />
                              </div>
                              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                {stat.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Code Showcase Section */}
                      <section className="mb-16">
                        <div className="mb-6 flex items-center justify-between">
                          <h2 className="text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Code I Write</h2>
                          <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:border-white/15 dark:bg-white/10 dark:text-gray-200">
                            Selected snippets
                          </span>
                        </div>
                        <CodeShowcase />
                      </section>

                      {/* About Section */}
                      <section id="about" className="mb-16 animate-fade-in [animation-delay:100ms]">
                        <div className="glass-card rounded-3xl p-8 md:p-10">
                          <h2 className="mb-6 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">
                            <DecryptedText
                              text="About Me"
                              animateOn="view"
                              speed={80}
                              revealDirection="center"
                              delay={400}
                              className="text-gray-900 dark:text-white"
                            />
                          </h2>
                          <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
                            <p>
                              I quickly learn and apply new technologies in practical settings, from backend systems and
                              REST APIs to AI-powered application workflows. My current focus is combining software
                              engineering discipline with AI capabilities to build useful and scalable products.
                            </p>
                            <p>
                              I enjoy working in cross-functional teams, planning projects with agile approaches, and
                              communicating clearly with technical and non-technical stakeholders.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Experience Section */}
                      <section id="experience" className="mb-16 animate-fade-in [animation-delay:150ms]">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">
                          Internships & Professional Training
                        </h2>
                        <div className="space-y-6">
                          {experiences.map((experience, index) => (
                            <article key={`${experience.role}-${index}`} className="glass-card rounded-2xl p-6">
                              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{experience.role}</h3>
                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{experience.organization}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{experience.mode}</p>
                                </div>
                                <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-200">
                                  {experience.period}
                                </span>
                              </div>
                              <ul className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                {experience.highlights.map((highlight, highlightIndex) => (
                                  <li key={`${experience.role}-point-${highlightIndex}`}>- {highlight}</li>
                                ))}
                              </ul>
                            </article>
                          ))}
                        </div>
                      </section>

                      {/* Timeline Section */}
                      <section className="mb-16">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">My Journey</h2>
                        <Timeline items={timelineItems} />
                      </section>

                      {/* Additional CV Projects */}
                      <section className="mb-16 animate-fade-in [animation-delay:250ms]">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Research & AI Projects</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          {featuredCvProjects.map((project, index) => (
                            <article key={`${project.title}-${index}`} className="glass-card rounded-2xl p-6">
                              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
                              <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{project.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={`${project.title}-${tech}-${techIndex}`}
                                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      {/* Projects Section with Tilt Cards */}
                      <section id="projects" className="mb-16 animate-fade-in [animation-delay:200ms]">
                        <div className="mb-8 flex items-end justify-between gap-4">
                          <h2 className="text-2xl font-black text-gray-900 dark:text-white md:text-3xl">
                            <DecryptedText
                              text="Featured Projects"
                              animateOn="view"
                              speed={60}
                              revealDirection="end"
                              delay={300}
                              className="text-gray-900 dark:text-white"
                            />
                          </h2>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Click any card to view details</span>
                        </div>

                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                          {projects.map((project, index) => (
                            <TiltCard key={project.id || index}>
                              <article
                                className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/70 p-3 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/20 cursor-target"
                                onClick={() => openProjectModal(project)}
                              >
                                <div className="aspect-video overflow-hidden rounded-2xl">
                                  <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={`${project.title} preview`}
                                    width={500}
                                    height={300}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                  />
                                </div>

                                <div className="p-4">
                                  <div className="mb-3 flex items-center justify-between gap-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                                    <span className="rounded-full bg-gray-900/5 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
                                      {project.year}
                                    </span>
                                  </div>

                                  <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                    {project.description}
                                  </p>

                                  <div className="mb-5 flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                      <span
                                        key={`${project.id}-${tech}-${techIndex}`}
                                        className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-200"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="flex gap-2">
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Button size="sm" className="cursor-target">
                                          Live Site
                                        </Button>
                                      </a>
                                    )}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="cursor-target"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        openProjectModal(project)
                                      }}
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </div>
                              </article>
                            </TiltCard>
                          ))}
                        </div>
                      </section>

                      {/* Education Section */}
                      <section id="education" className="mb-16 animate-fade-in [animation-delay:300ms]">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Education</h2>
                        <div className="space-y-5">
                          {education.map((edu, index) => (
                            <div
                              key={`${edu.institution}-${index}`}
                              className="glass-card flex items-start gap-4 rounded-2xl p-5"
                            >
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/60 dark:bg-white/10">
                                <Image
                                  src={edu.logo || "/placeholder.svg"}
                                  alt={`${edu.institution} logo`}
                                  width={32}
                                  height={32}
                                  className="h-8 w-8 object-contain"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{edu.institution}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree}</p>
                              </div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{edu.period}</div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Organizations Section */}
                      <section id="organizations" className="mb-16 animate-fade-in [animation-delay:400ms]">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Organizations</h2>
                        <div className="space-y-6">
                          {organizations.map((org, index) => (
                            <article
                              key={`${org.name}-${index}`}
                              className="glass-card rounded-2xl p-6"
                            >
                              <div className="mb-4 flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/60 dark:bg-white/10">
                                  <Image
                                    src={org.logo || "/placeholder.svg"}
                                    alt={`${org.name} logo`}
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{org.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{org.position}</p>
                                </div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{org.period}</div>
                              </div>
                              {org.description && (
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{org.description}</p>
                              )}
                            </article>
                          ))}
                        </div>
                      </section>

                      {/* Skills Section with Radar Chart */}
                      <section id="skills" className="mb-16 animate-fade-in [animation-delay:500ms]">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Skills</h2>
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                          <div className="glass-card rounded-3xl p-6 md:p-8">
                            <SkillRadar skills={radarSkills} />
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                              <span
                                key={`${skill}-${index}`}
                                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-200 cursor-target"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </section>

                      {/* Certifications Section */}
                      <section id="certifications" className="mb-16 animate-fade-in [animation-delay:550ms]">
                        <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Certifications</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {certifications.map((certification, index) => (
                            <article key={`${certification}-${index}`} className="glass-card rounded-2xl p-5">
                              <p className="text-sm font-semibold leading-relaxed text-gray-800 dark:text-gray-100">{certification}</p>
                            </article>
                          ))}
                        </div>
                      </section>

                      {/* Contact Section */}
                      <section id="contact" className="mb-16 animate-fade-in [animation-delay:600ms]">
                        <div className="glass-card rounded-3xl p-8 md:p-10">
                          <h2 className="mb-8 text-2xl font-black text-gray-900 dark:text-white md:text-3xl">Get In Touch</h2>
                          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div>
                              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                  <Mail className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                  <span>richardanuarta12@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                  <span>+62 896-4348-7598</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                  <span>Batam, Indonesia</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                  <Github className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                                  <span>github.com/Richardooz</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                  <Globe className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                                  <span>ricdev.vercel.app</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Let&apos;s Connect</h3>
                              <p className="mb-5 text-gray-600 dark:text-gray-300">
                                Have a project idea, internship opening, or collaboration? Send a message and let&apos;s build
                                something valuable.
                              </p>
                              <a href="mailto:richardanuarta12@gmail.com" className="inline-block">
                                <Button className="cursor-target bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                                  Send Message
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Social Links */}
                      <section className="animate-fade-in border-t border-gray-200 pt-8 [animation-delay:700ms] dark:border-white/10">
                        <div className="flex justify-center gap-4">
                          <a
                            href="https://github.com/Richardooz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card rounded-full p-3 text-gray-700 transition hover:-translate-y-0.5 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-target"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                          <a
                            href="https://ricdev.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card rounded-full p-3 text-gray-700 transition hover:-translate-y-0.5 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-target"
                          >
                            <Globe className="h-5 w-5" />
                          </a>
                          <a
                            href="mailto:richardanuarta12@gmail.com"
                            className="glass-card rounded-full p-3 text-gray-700 transition hover:-translate-y-0.5 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-target"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </div>
                      </section>
                    </main>

                    <FloatingMenu />
                    <BackToTop />
                    <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                  </div>
                )
              }