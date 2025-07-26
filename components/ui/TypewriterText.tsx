"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export default function TypewriterText({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000 
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex]
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1))
        
        if (currentText === "") {
          setIsDeleting(false)
          setCurrentIndex(prev => (prev + 1) % texts.length)
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length + 1))
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className="border-r-2 border-gray-900 dark:border-white animate-pulse">
      {currentText}
    </span>
  )
}
