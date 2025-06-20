"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Mail, Phone, MapPin, Github, Home, Linkedin } from "lucide-react"
import Image from "next/image"
// import Lanyard from "@/components/Lanyard"; // Lanyard dinonaktifkan

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      description:
        "Designed and developed a full-featured e-commerce platform for electronic goods with product catalog, shopping cart, and payment integration to enhance customer experience.",
      image: "/electric.png",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS", "Bootstrap"],
    },
    {
      title: "Florist",
      year: "2024",
      description:
        "Designed and developed a responsive online florist shop with beautiful product gallery and integrated order management system to streamline flower delivery services.",
      image: "/forist.png",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    },
    {
      title: "SIAKAD",
      year: "2024 - 2025",
      description:
        "Designed and developed an academic information system to manage student data, course schedules, and grades with role-based access control for different user types.",
      image: "/Siakad.png",
      technologies: ["Laravel", "JavaScript", "MySQL", "Git", "Tailwind CSS"],
    },
    {
      title: "System Information Nongsa Bakau Serip Village ",
      year: "2025",
      description:
        "Designed and developed a village information system that digitizes community data, manages local news, and improves public service delivery for better community engagement.",
      image: "/Desa.png",
      technologies: ["Laravel", "PHP", "MySQL", "Figma", "JavaScript"],
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

  // Fungsi ini bisa dikembalikan jika Anda menggunakan kembali navigasi lama
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <Lanyard /> */} {/* Lanyard dinonaktifkan */}
      
      {/* Anda bisa mengaktifkan kembali navigasi lama jika mau */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900">Richardo.dev</span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <button onClick={() => scrollToSection("about")} className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">About</button>
                <button onClick={() => scrollToSection("projects")} className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">Projects</button>
                <button onClick={() => scrollToSection("education")} className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">Education</button>
                <button onClick={() => scrollToSection("organizations")} className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">Organizations</button>
                <button onClick={() => scrollToSection("skills")} className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">Skills</button>
                <button onClick={() => scrollToSection("contact")} className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">Contact</button>
              </div>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-6 py-4 space-y-3 bg-white">
              <button onClick={() => scrollToSection("about")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">About</button>
              <button onClick={() => scrollToSection("projects")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">Projects</button>
              <button onClick={() => scrollToSection("education")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">Education</button>
              <button onClick={() => scrollToSection("organizations")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">Organizations</button>
              <button onClick={() => scrollToSection("skills")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">Skills</button>
              <button onClick={() => scrollToSection("contact")} className="block text-gray-700 hover:text-gray-900 text-sm font-medium w-full text-left">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <section id="hero" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hi, I'm Richardo 👋</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Information Systems Student. I love developing web applications and turning ideas into code. Passionate
                about Laravel and full-stack development, and not a fan of bugs.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/laptop.jpeg.jpg"
                  alt="Richardo's workspace"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>{" "}
              <strong>Im A Web Development</strong>. Possesses hands-on experience in building full-stack applications using the{" "}
              <strong> Laravel framework.</strong>collaborative team player and an active member of student organizations, 
                now seeking {" "}<strong>a professional opportunity to contribute and grow technical skills.</strong>
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video bg-gray-50 overflow-hidden">
                  <Image src={project.image || "/placeholder.svg"} alt={`${project.title} preview`} width={500} height={300} className="w-full h-full object-cover"/>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image src={edu.logo || "/placeholder.svg"} alt={`${edu.institution} logo`} width={32} height={32} className="w-8 h-8 object-contain"/>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                  <p className="text-gray-600 text-sm">{edu.degree}</p>
                </div>
                <div className="text-sm text-gray-500">{edu.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Organizations Section */}
        <section id="organizations" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Organizations</h2>
          <div className="space-y-8">
            {organizations.map((org, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Image src={org.logo || "/placeholder.svg"} alt={`${org.name} logo`} width={32} height={32} className="w-8 h-8 object-contain"/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{org.name}</h3>
                    <p className="text-gray-600 text-sm">{org.position}</p>
                  </div>
                  <div className="text-sm text-gray-500">{org.period}</div>
                </div>
                {org.description && <p className="text-gray-600 text-sm leading-relaxed">{org.description}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full">{skill}</span>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-600" /><span className="text-gray-700">2321014@student.iteba.ac.id</span></div>
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-600" /><span className="text-gray-700">+62 896-4348-7598</span></div>
                <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-gray-600" /><span className="text-gray-700">Batam, Indonesia</span></div>
                <div className="flex items-center gap-3"><Github className="w-5 h-5 text-gray-600" /><span className="text-gray-700">github.com/Richardooz</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Let's Connect</h3>
              <p className="text-gray-600 mb-4">I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to work together!</p>
              <Button className="bg-black hover:bg-gray-800 text-white">Send Message</Button>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="border-t border-gray-200 pt-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors"><Home className="w-5 h-5" /></a>
            <a href="https://linkedin.com" className="text-gray-600 hover:text-gray-900 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/Richardooz" className="text-gray-600 hover:text-gray-900 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="mailto:2321014@student.iteba.ac.id" className="text-gray-600 hover:text-gray-900 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </section>
      </main>
    </div>
  )
}