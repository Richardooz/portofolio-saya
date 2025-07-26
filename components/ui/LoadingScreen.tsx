"use client"

import { useState, useEffect } from "react"
import DecryptedText from "./DecryptedText"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <DecryptedText 
            text="Loading Portfolio..."
            animateOn="view"
            speed={80}
            className="text-white text-2xl font-bold"
          />
        </div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-gray-400 mt-4">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
