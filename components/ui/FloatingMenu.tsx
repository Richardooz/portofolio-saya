"use client"

import { useState } from "react"
import { Plus, Mail, Phone, Github, Linkedin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Mail, label: "Email", href: "mailto:richardanuarta12@gmail.com" },
    { icon: Phone, label: "Phone", href: "tel:+6289643487598" },
    { icon: Github, label: "GitHub", href: "https://github.com/Richardooz" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ]

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-16 left-0 space-y-3">
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center space-x-3 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-medium opacity-0 animate-fade-in">
                  {item.label}
                </span>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="icon"
                    className="rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-target shadow-lg"
                    variant="outline"
                  >
                    <item.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        )}
        
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 cursor-target shadow-lg w-14 h-14"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  )
}
