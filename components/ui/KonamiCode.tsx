"use client"

import { useEffect, useState } from "react"

export default function KonamiCode() {
  const [konamiSequence] = useState([
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ])
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setUserSequence(prev => {
        const newSequence = [...prev, e.code].slice(-konamiSequence.length)
        
        if (newSequence.join(',') === konamiSequence.join(',')) {
          setIsActivated(true)
          // Add special effects
          document.body.style.animation = 'rainbow 2s infinite'
          setTimeout(() => {
            document.body.style.animation = ''
            setIsActivated(false)
          }, 5000)
        }
        
        return newSequence
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiSequence])

  return (
    <>
      {isActivated && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-20 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white animate-bounce">
            🎉 KONAMI! 🎉
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  )
}
