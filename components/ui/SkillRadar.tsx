"use client"

import { useEffect, useRef } from "react"

interface SkillRadarProps {
  skills: Array<{
    name: string
    level: number // 0-100
  }>
}

export default function SkillRadar({ skills }: SkillRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2)
      ctx.strokeStyle = '#e5e7eb'
      ctx.stroke()
    }

    // Draw axes
    const angleStep = (Math.PI * 2) / skills.length
    skills.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = '#e5e7eb'
      ctx.stroke()

      // Draw skill labels
      const labelX = centerX + Math.cos(angle) * (radius + 20)
      const labelY = centerY + Math.sin(angle) * (radius + 20)
      
      ctx.fillStyle = '#374151'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(skills[index].name, labelX, labelY)
    })

    // Draw skill polygon
    ctx.beginPath()
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2
      const distance = (skill.level / 100) * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.fill()
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw skill points
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2
      const distance = (skill.level / 100) * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#3b82f6'
      ctx.fill()
    })
  }, [skills])

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="max-w-full h-auto"
    />
  )
}
