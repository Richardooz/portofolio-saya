"use client"

import { useEffect, useState } from "react"

export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState('')
  const [progress, setProgress] = useState(0)

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'organizations', label: 'Organizations' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      let currentSection = ''
      let currentProgress = 0
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section.id
            currentProgress = ((scrollPosition - offsetTop) / offsetHeight) * 100
          }
        }
      })
      
      setActiveSection(currentSection)
      setProgress(Math.min(currentProgress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="relative group">
            <div 
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                activeSection === section.id 
                  ? 'bg-black dark:bg-white border-black dark:border-white' 
                  : 'bg-transparent border-gray-400 hover:border-gray-600'
              }`}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {section.label}
            </div>
            {activeSection === section.id && (
              <div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-black dark:border-white rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, black ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
