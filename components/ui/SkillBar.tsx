"use client"

import { useEffect, useState, useRef } from "react"

interface SkillBarProps {
  skill: string
  percentage: number
  delay?: number
}

export default function SkillBar({ skill, percentage, delay = 0 }: SkillBarProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const skillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (skillRef.current) {
      observer.observe(skillRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, delay])

  return (
    <div ref={skillRef} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{skill}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-black dark:bg-white h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
