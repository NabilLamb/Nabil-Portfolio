// components\footer.tsx

"use client"

import { useEffect, useRef, useState } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  Code2,
  ExternalLink,
  Coffee,
  Sparkles,
  Rocket,
  Zap,
  ChevronUp,
  FileText,
  Globe,
  Terminal
} from "lucide-react"

interface FooterProps {
  data: {
    github: string
    linkedin: string
    twitter: string
    email?: string
  }
}

const Footer = ({ data }: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub", color: "text-gray-300", bg: "bg-gray-900/80", desc: "View my code" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn", color: "text-blue-400", bg: "bg-blue-900/80", desc: "Professional network" },
    { icon: Mail, href: `mailto:${data.email}`, label: "Email", color: "text-red-400", bg: "bg-red-900/80", desc: "Contact me" },
  ]

  const quickLinks = [
    { label: "Home", href: "#hero", icon: "🏠" },
    { label: "About", href: "#about", icon: "👨‍💻" },
    { label: "Experience", href: "#experiences", icon: "💼" },
    { label: "Projects", href: "#projects", icon: "🚀" },
    { label: "Skills", href: "#technologies", icon: "⚡" },
    { label: "Testimonials", href: "#feedbacks", icon: "⭐" },
    { label: "Contact", href: "#contact", icon: "📧" },
  ]

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Tailwind", "MongoDB", "PostgreSQL", "Docker"
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

    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  // Show/Hide Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
    const fontSize = 10
    const columns = Math.floor(canvas.width / fontSize)
    const drops: { y: number; speed: number; opacity: number }[] = Array(columns).fill(null).map(() => ({
      y: Math.random() * -canvas.height,
      speed: 0.2 + Math.random() * 0.8,
      opacity: Math.random() * 0.1 + 0.03
    }))

    let animationFrameId: number

    const draw = () => {
      // Very light overlay for trail effect
      ctx.fillStyle = 'rgba(8, 8, 16, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `bold ${fontSize}px 'Monaco', 'Consolas', monospace`

      // Draw binary characters
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]

        // Purple/cyan tint for binary code
        ctx.fillStyle = `rgba(120, 119, 198, ${drop.opacity})`

        // Draw character
        const char = binary[Math.floor(Math.random() * binary.length)]
        ctx.fillText(char, i * fontSize, drop.y)

        // Move drop down
        drop.y += drop.speed

        // Reset drop if it's past bottom
        if (drop.y > canvas.height + 100) {
          drop.y = Math.random() * -100
          drop.speed = 0.2 + Math.random() * 0.8
          drop.opacity = Math.random() * 0.1 + 0.03
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronUp className="w-5 h-5" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}

      <footer
        ref={footerRef}
        className="relative border-t border-purple-500/20 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900 overflow-hidden"
      >
        {/* Binary Animation Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(180deg, #0a0a14 0%, #11111f 100%)'
          }}
        />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        </div>

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 -z-10 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(120, 119, 198, 0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Main Footer Content */}
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          N
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Nabil
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono">Frontend Developer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Building exceptional digital experiences with modern technologies and creative solutions.
                  </p>

                  {/* Call to Action */}
                  <a
                    href="/nabil_cv.pdf"
                    download="Nabil_Lambattan_CV.pdf"
                    className="group relative w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 text-purple-300 hover:text-white"
                  >
                    <FileText size={16} />
                    <span>Download Resume</span>

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
                  </a>
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  Navigation
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      {hoveredLink === link.label && (
                        <ExternalLink className="w-3 h-3 text-purple-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Stack Column */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Currently Learning */}
                <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">Currently Learning</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    GraphQL, Kubernetes, AWS Advanced Architectures
                  </p>
                </div>
              </div>

              {/* Connect Column */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  Let's Connect
                </h4>
                <div className="space-y-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredLink(social.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group block p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${social.bg}`}>
                          <div className={social.color}>
                            {<social.icon size={18} />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{social.label}</p>
                          <p className="text-xs text-muted-foreground">{social.desc}</p>
                        </div>
                        <ExternalLink className={`w-4 h-4 transition-all duration-300 ${hoveredLink === social.label ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                          } text-purple-400`} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className={`pt-8 border-t border-white/10 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Copyright */}
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                  <p className="text-sm text-muted-foreground">
                    © {currentYear} Nabil. All rights reserved.
                  </p>
                </div>

                {/* Built With */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="w-4 h-4" />
                    <span>Built with</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Made With Love */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Coffee className="w-4 h-4" />
                  <span>Made with passion & countless cups of coffee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer