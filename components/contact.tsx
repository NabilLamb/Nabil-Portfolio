// components\contact.tsx

"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
  Clock,
  Globe,
  Linkedin,
  Github,
  Sparkles,
  Paperclip,
  User,
  MailCheck
} from "lucide-react"

interface ContactProps {
  data: {
    email: string
    phone: string
    location: string
  }
}

const Contact = ({ data }: ContactProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Social media links
  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", url: "https://github.com/NabilLamb", color: "text-gray-300", bg: "bg-gray-900/80" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", url: "https://linkedin.com/in/nabil-lambattan", color: "text-blue-400", bg: "bg-blue-900/80" },
    { icon: <Mail size={20} />, label: "Email", url: "mailto:lambattannabil2000@gmail.com", color: "text-red-400", bg: "bg-red-900/80" },
  ]

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Binary background animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Matrix animation settings
    const binary = "01"
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: { y: number; speed: number; opacity: number }[] = Array(columns).fill(null).map(() => ({
      y: Math.random() * -canvas.height,
      speed: 0.4 + Math.random() * 1.5,
      opacity: Math.random() * 0.15 + 0.05
    }))

    let animationFrameId: number

    const draw = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(8, 8, 16, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `bold ${fontSize}px 'Monaco', 'Consolas', monospace`

      // Draw binary characters
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]

        // Green/cyan tint for binary code
        ctx.fillStyle = `rgba(0, 255, 200, ${drop.opacity})`

        // Draw character
        const char = binary[Math.floor(Math.random() * binary.length)]
        ctx.fillText(char, i * fontSize, drop.y)

        // Move drop down
        drop.y += drop.speed

        // Reset drop if it's past bottom
        if (drop.y > canvas.height + 100) {
          drop.y = Math.random() * -100
          drop.speed = 0.4 + Math.random() * 1.5
          drop.opacity = Math.random() * 0.15 + 0.05
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "", subject: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleFieldFocus = (fieldName: string) => {
    setActiveField(fieldName)
  }

  const handleFieldBlur = () => {
    setActiveField(null)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      {/* Binary Animation Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{
          background: 'linear-gradient(135deg, #0a0a14 0%, #11111f 100%)'
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-emerald-500/3 via-cyan-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 255, 200, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0, 255, 200, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`transition-all duration-1000 mb-16 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-6">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-emerald-300">Let's Connect</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information - Left Column */}
          <div
            className={`transition-all duration-1000 lg:col-span-1 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="space-y-6">
              {/* Contact Cards */}
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: data.email,
                  link: `mailto:${data.email}`,
                  color: "text-red-400",
                  bg: "bg-red-500/10"
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: data.phone,
                  link: `tel:${data.phone}`,
                  color: "text-green-400",
                  bg: "bg-green-500/10"
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: data.location,
                  link: "#",
                  color: "text-blue-400",
                  bg: "bg-blue-500/10"
                },
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Within 24 hours",
                  link: "#",
                  color: "text-purple-400",
                  bg: "bg-purple-500/10"
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <a
                    key={idx}
                    href={item.link}
                    onClick={(e) => item.label === "Location" && e.preventDefault()}
                    className={`group block p-4 rounded-xl ${item.bg} backdrop-blur-sm border border-white/10 hover:border-${item.color.split('-')[1]}-500/30 transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${item.bg} border border-white/10`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className={`text-base font-medium text-white truncate ${item.color}`}>
                          {item.value}
                        </p>
                      </div>
                      <div className={`opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${item.color}`}>
                        <Send className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                )
              })}

              {/* Social Links */}
              <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Connect Online
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex-1 min-w-[120px] p-3 rounded-lg ${social.bg} backdrop-blur-sm border border-white/10 hover:border-${social.color.split('-')[1]}-500/30 transition-all duration-300 hover:scale-105`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`${social.color} transition-transform duration-300 group-hover:scale-110`}>
                          {social.icon}
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-white transition-colors">
                          {social.label}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Currently Available</p>
                    <p className="text-xs text-muted-foreground">For new projects & collaborations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div
            className={`transition-all duration-1000 delay-300 lg:col-span-2 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative">
              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="font-medium text-white">Message Sent Successfully!</p>
                      <p className="text-sm text-muted-foreground">I'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative group"
              >
                {/* Form Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Form Content */}
                <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-white">Send me a message</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <User className="w-4 h-4" />
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFieldFocus("name")}
                          onBlur={handleFieldBlur}
                          required
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${activeField === "name"
                              ? "border-emerald-500/50"
                              : "border-white/10"
                            } text-white placeholder-muted-foreground focus:outline-none transition-all duration-300`}
                        />
                        {formData.name && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MailCheck className="w-4 h-4" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFieldFocus("email")}
                          onBlur={handleFieldBlur}
                          required
                          placeholder="john@example.com"
                          className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${activeField === "email"
                              ? "border-emerald-500/50"
                              : "border-white/10"
                            } text-white placeholder-muted-foreground focus:outline-none transition-all duration-300`}
                        />
                        {formData.email && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2 mb-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Paperclip className="w-4 h-4" />
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFieldFocus("subject")}
                      onBlur={handleFieldBlur}
                      required
                      placeholder="Project Inquiry"
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${activeField === "subject"
                          ? "border-emerald-500/50"
                          : "border-white/10"
                        } text-white placeholder-muted-foreground focus:outline-none transition-all duration-300`}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2 mb-8">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      Your Message
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFieldFocus("message")}
                        onBlur={handleFieldBlur}
                        required
                        rows={6}
                        placeholder="Tell me about your project, timeline, and budget..."
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${activeField === "message"
                            ? "border-emerald-500/50"
                            : "border-white/10"
                          } text-white placeholder-muted-foreground focus:outline-none resize-none transition-all duration-300`}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                        {formData.message.length}/2000
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Form Note */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                    <span>Your data is secure. No spam, guaranteed.</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Quick Contact CTA */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Prefer a call?</p>
                    <p className="text-xs text-muted-foreground">Schedule a 15-minute discovery call</p>
                  </div>
                </div>
                <a
                  href={`tel:${data.phone}`}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400 hover:bg-emerald-500/10 hover:text-white transition-all duration-300"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact