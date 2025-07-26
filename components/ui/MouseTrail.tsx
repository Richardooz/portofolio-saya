"use client"

import { useEffect, useRef } from "react"

export default function MouseTrail() {
  const trailRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animateTrail = () => {
      trailRef.current.forEach((dot, index) => {
        if (dot) {
          const targetX = mousePos.current.x - 5
          const targetY = mousePos.current.y - 5
          
          const delay = index * 0.1
          const currentX = parseFloat(dot.style.left) || targetX
          const currentY = parseFloat(dot.style.top) || targetY
          
          const newX = currentX + (targetX - currentX) * (0.1 - delay * 0.01)
          const newY = currentY + (targetY - currentY) * (0.1 - delay * 0.01)
          
          dot.style.left = `${newX}px`
          dot.style.top = `${newY}px`
          dot.style.opacity = `${0.8 - index * 0.1}`
        }
      })
      
      requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateTrail()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) trailRef.current[index] = el
          }}
          className="absolute w-2 h-2 bg-black dark:bg-white rounded-full mix-blend-difference"
          style={{
            transform: `scale(${1 - index * 0.1})`,
            left: '-100px',
            top: '-100px'
          }}
        />
      ))}
    </div>
  )
}
