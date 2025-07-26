"use client"

import { useRef, useState } from "react"
import { ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltCard({ children, className = "", maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / rect.height) * -maxTilt
    const rotateY = (mouseX / rect.width) * maxTilt

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg pointer-events-none" />
      )}
    </div>
  )
}
