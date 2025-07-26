"use client"

import { useState } from "react"
import { X, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 cursor-target"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="aspect-video overflow-hidden rounded-t-2xl">
            <Image 
              src={project.image} 
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
              <span className="text-gray-500 dark:text-gray-400">{project.year}</span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            
            {project.features && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.challenges && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Challenges</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.challenges}</p>
              </div>
            )}
            
            {project.solution && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Solution</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
              </div>
            )}
            
            <div className="flex gap-4">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button className="cursor-target">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Live Site
                  </Button>
                </a>
              )}
              <Button variant="outline" className="cursor-target">
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
