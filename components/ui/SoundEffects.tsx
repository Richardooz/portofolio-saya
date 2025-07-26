"use client"

import { useEffect } from "react"

export default function SoundEffects() {
  useEffect(() => {
    // Create audio context for button clicks
    const playClickSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }

    // Add click sound to cursor-target elements
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('cursor-target')) {
        playClickSound()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
