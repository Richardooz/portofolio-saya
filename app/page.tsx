"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Mail, Phone, MapPin, Github, Home, Linkedin } from "lucide-react"
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
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Richardo.dev",
  description: "Welcome to Richardo's portfolio - Information Systems Student & Full Stack Developer",
}

interface Project {
  title: string
  year: string
  description: string
  image: string
  technologies: string[]
  link?: string
  features?: string[]
  challenges?: string
  solution?: string
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "Laravel",
    "React",
    "Next.js",
    "Node.js",
    "MySQL",
    "PostgreSQL",
    "Python",
    "Docker",
    "Git",
    "Tailwind",
    "Bootstrap",
    "phpMyAdmin",
  ]

  const projects = [
    {
      title: "ElectRIC",
      year: "2024",
      description: "Designed and developed a full-featured e-commerce platform for electronic goods with product catalog, shopping cart, and payment integration to enhance customer experience.",
      image: "/electric.png",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Bootstrap"],
      features: [
        "Product catalog with advanced filtering",
        "Shopping cart and wishlist functionality", 
        "Secure payment gateway integration",
        "Admin dashboard for inventory management",
        "Order tracking system"
      ],
      challenges: "Building a scalable e-commerce platform with complex product variations and inventory management.",
      solution: "Implemented a flexible product attribute system and optimized database queries for better performance."
    },
    {
      title: "Florist",
      year: "2024",
      description: "Designed and developed a responsive online florist shop with beautiful product gallery and integrated order management system to streamline flower delivery services.",
      image: "/forist.png",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    },
    {
      title: "SIAKAD",
      year: "2024 - 2025",
      description: "Designed and developed an academic information system to manage student data, course schedules, and grades with role-based access control for different user types.",
      image: "/Siakad.png",
      technologies: ["Laravel", "JavaScript", "MySQL", "Git", "Tailwind CSS"],
    },
    {
      title: "System Information Nongsa Bakau Serip Village ",
      year: "2025",
      description: "Designed and developed a village information system that digitizes community data, manages local news, and improves public service delivery for better community engagement.",
      image: "/Desa.png",
      technologies: ["Laravel", "PHP", "MySQL", "Figma", "JavaScript"],
    },
    {
      title: "Aplikasi Uang Kas - Wangkas",
      year: "2025",
      description: "Developed a comprehensive school cash management system that tracks student fee payments, generates financial reports, and manages class treasury funds. Features automated payment reminders, transaction history, and role-based access for teachers and administrators.",
      image: "/uangkas.png",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "Blade"],
    },
    {
      title: "Gor Centaury",
      year: "2025",
      description: "Developed an online futsal field booking system for Gor Centaury, enabling users to check availability, reserve time slots, and manage bookings efficiently. The platform streamlines the reservation process and improves customer experience.",
      image: "/booking-futsal.png",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      link: "https://gorcentury.online",
    },
  ]

  const education = [
    {
      institution: "Batam Institute of Technology (ITEBA)",
      degree: "Students in Information Systems (S.SI)",
      period: "2023 - Now",
      logo: "/logo.png",
    },
  ]

  const organizations = [
    {
      name: "AIESEC Future Leader Summer 2024",
      position: "Contributor",
      period: "2024",
      logo: "/AIESEC.jpg",
      description:
        "Participated in AIESEC's international leadership development program focused on global citizenship, cross-cultural communication, and sustainable development goals. Engaged in workshops, team projects, and community service initiatives to develop leadership skills and global awareness.",
    },
    {
      name: "ITEBA English Club",
      position: "HR Staff",
      period: "2023 - 2024",
      logo: "/logo.png",
      description:
        "Served as Human Resources staff responsible for member recruitment, training coordination, and event organization. Managed club activities, facilitated English learning sessions, and coordinated with other departments to ensure smooth operations.",
    },
  ]

  const stats = [
    { number: 6, label: "Projects Completed", suffix: "+" },
    { number: 2, label: "Years Experience", suffix: "+" },
    { number: 10, label: "Technologies", suffix: "+" },
    { number: 100, label: "Commits", suffix: "+" },
  ]

  const typingTexts = [
    "Full Stack Developer",
    "Laravel Enthusiast", 
    "Problem Solver",
    "Code Craftsman"
  ]

  const radarSkills = [
    { name: "Laravel", level: 90 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "PHP", level: 85 },
    { name: "MySQL", level: 85 },
    { name: "Git", level: 80 }
  ]

  const timelineItems = [
    {
      year: "2023",
      title: "Started at ITEBA",
      description: "Began studying Information Systems and discovered passion for web development"
    },
    {
      year: "2024", 
      title: "First Projects",
      description: "Built ElectRIC e-commerce platform and Florist management system"
    },
    {
      year: "2025",
      title: "Advanced Development",
      description: "Created SIAKAD, Village Information System, and Gor Centaury booking platform"
    }
  ]

  const openProjectModal = (project: Project) => {
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors relative">
      <ScrollProgress />
      <ParticleBackground />
      <LoadingScreen />
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <MouseTrail />
      <SoundEffects />
      <KonamiCode />
      <SectionProgress />
      
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Richardo.dev</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: "About", id: "about" },
                { label: "Projects", id: "projects" },
                { label: "Education", id: "education" },
                { label: "Organizations", id: "organizations" },
                { label: "Skills", id: "skills" },
                { label: "Contact", id: "contact" },
              ].map((nav, idx) => (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-colors cursor-target"
                >
                  {nav.label}
                </button>
              ))}
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-6 py-4 space-y-3 bg-white">
              <button onClick={() => scrollToSection("contact")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section id="hero" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <DecryptedText 
                  text="Hi, I'm Richardo"
                  animateOn="view"
                  speed={50}
                  maxIterations={15}
                  revealDirection="center"
                  delay={3000}
                  className="text-gray-900 dark:text-white"
                /> <span className="animate-wave cursor-target">👋</span>
              </h1>
              <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                <TypewriterText texts={typingTexts} />
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed animate-slide-up animation-delay-2s">
                Information Systems Student. I love developing web applications and turning ideas into code. Passionate
                about Laravel and full-stack development, and not a fan of bugs.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden animate-scale-in animation-delay-1s">
                <Image
                  src="/laptop.jpeg.jpg"
                  alt="Richardo's workspace"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover animate-float animation-delay-3s"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Statistics Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-gray-900 dark:text-white">
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Code Showcase Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Code I Write</h2>
          <CodeShowcase />
        </section>
        {/* About Section */}
        <section id="about" className="mb-16 animate-fade-in [animation-delay:100ms]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            <DecryptedText 
              text="About"
              animateOn="view"
              speed={80}
              revealDirection="center"
              delay={500}
              className="text-gray-900 dark:text-white"
            />
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              <strong className="text-gray-900 dark:text-white">Im A Web Development</strong>. Possesses hands-on experience in building full-stack applications using the{" "}
              <strong className="text-gray-900 dark:text-white"> Laravel framework.</strong>collaborative team player and an active member of student organizations, 
                now seeking {" "}<strong className="text-gray-900 dark:text-white">a professional opportunity to contribute and grow technical skills.</strong>
            </p>
          </div>
        </section>
        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Journey</h2>
          <Timeline items={timelineItems} />
        </section>
        {/* Projects Section with Tilt Cards */}
        <section id="projects" className="mb-16 animate-fade-in [animation-delay:200ms]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            <DecryptedText 
              text="Featured Projects"
              animateOn="view"
              speed={60}
              revealDirection="end"
              delay={300}
              className="text-gray-900 dark:text-white"
            />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <TiltCard key={index}>
                <div
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 relative cursor-target"
                  onClick={() => openProjectModal(project)}
                >
                  <div className="aspect-video bg-gray-50 dark:bg-gray-700 overflow-hidden">
                    <Image src={project.image || "/placeholder.svg"} alt={`${project.title} preview`} width={500} height={300} className="w-full h-full object-cover"/>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">{tech}</span>
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
                            Visit Website
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
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
        {/* Education Section */}
        <section id="education" className="mb-16 animate-fade-in [animation-delay:300ms]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image src={edu.logo || "/placeholder.svg"} alt={`${edu.institution} logo`} width={32} height={32} className="w-8 h-8 object-contain"/>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{edu.institution}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.degree}</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{edu.period}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Organizations Section */}
        <section id="organizations" className="mb-16 animate-fade-in [animation-delay:400ms]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Organizations</h2>
          <div className="space-y-8">
            {organizations.map((org, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image src={org.logo || "/placeholder.svg"} alt={`${org.name} logo`} width={32} height={32} className="w-8 h-8 object-contain"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{org.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{org.position}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{org.period}</div>
                </div>
                {org.description && <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{org.description}</p>}
              </div>
            ))}
          </div>
        </section>
        {/* Skills Section with Radar Chart */}
        <section id="skills" className="mb-16 animate-fade-in [animation-delay:500ms]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Skills</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <SkillRadar skills={radarSkills} />
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full cursor-target">{skill}</span>
              ))}
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="mb-16 animate-fade-in [animation-delay:600ms]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">2321014@student.iteba.ac.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">+62 896-4348-7598</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">Batam, Indonesia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">github.com/Richardooz</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to work together!</p>
              <a href="mailto:richardanuarta12@gmail.com" className="inline-block">
                <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-target">Send Message</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="border-t border-gray-200 pt-8 animate-fade-in [animation-delay:700ms]">
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Richardooz" className="text-gray-600 hover:text-gray-900 transition-colors cursor-target">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-gray-900 transition-colors cursor-target">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:2321014@student.iteba.ac.id" className="text-gray-600 hover:text-gray-900 transition-colors cursor-target">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <FloatingMenu />
      <BackToTop />
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}