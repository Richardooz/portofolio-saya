"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, User, MessageSquare } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    const mailtoLink = `mailto:richardanuarta12@gmail.com?subject=${subject}&body=${body}`
    
    window.open(mailtoLink)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent cursor-target"
          required
        />
      </div>
      
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent cursor-target"
          required
        />
      </div>
      
      <div className="relative">
        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          rows={4}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none cursor-target"
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-black hover:bg-gray-800 text-white cursor-target"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
