// components\navbar.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Hero")
  const { theme, setTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const links = [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "experiences", label: "Experience", icon: "💼" },
    { id: "technologies", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "feedbacks", label: "Testimonials", icon: "⭐" },
    { id: "contact", label: "Contact", icon: "📧" },
  ]

  // Scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = links.map(link => link.id)
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(links.find(link => link.id === currentSection)?.label || "Home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [links])

  // Binary background animation for navbar
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

    // Lightweight binary animation for navbar
    const binary = "01"
    const fontSize = 8
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(-fontSize)

    let animationFrameId: number
    let frameCount = 0

    const draw = () => {
      // Very light overlay for trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `bold ${fontSize}px 'Monaco', 'Consolas', monospace`

      // Draw binary characters
      if (frameCount % 3 === 0) {
        for (let i = 0; i < drops.length; i++) {
          const char = binary[Math.floor(Math.random() * binary.length)]
          const opacity = Math.random() * 0.15 + 0.05

          // Purple/blue tint for binary code
          ctx.fillStyle = `rgba(120, 119, 198, ${opacity})`
          ctx.fillText(char, i * fontSize, drops[i])

          drops[i] += fontSize

          // Reset drop if it's past bottom
          if (drops[i] > canvas.height && Math.random() > 0.98) {
            drops[i] = -fontSize
          }
        }
      }

      frameCount++
      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Binary Animation Canvas for Navbar */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-16 -z-10"
        style={{
          background: scrolled
            ? 'linear-gradient(180deg, rgba(10,10,20,0.95) 0%, rgba(10,10,20,0.9) 100%)'
            : 'linear-gradient(180deg, rgba(10,10,20,0.8) 0%, transparent 100%)'
        }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-gray-900/90 backdrop-blur-xl border-b border-purple-500/20 shadow-xl shadow-purple-500/5'
          : 'bg-transparent backdrop-blur-sm border-b border-purple-500/10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <Image
                      src="/apple-icon.png"
                      alt="Nabil Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse border-2 border-gray-900"></div>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Nabil
                </span>
                <span className="text-xs text-muted-foreground font-mono">Full-Stack Developer</span>              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${activeSection === link.label
                    ? 'text-white bg-purple-500/20'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{link.icon}</span>
                    <span>{link.label}</span>
                  </div>

                  {/* Active indicator */}
                  {activeSection === link.label && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-purple-500/30 transition-all duration-300"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Download CV Button */}
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-500/60 transition-all duration-300">
                <User size={16} />
                <span className="text-sm font-medium">Download CV</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-purple-400 hover:text-white hover:border-purple-500/30 transition-all duration-300"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 animate-in fade-in duration-300">
              <div className="space-y-2">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === link.label
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium text-white">{link.label}</span>
                    {activeSection === link.label && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                    )}
                  </button>
                ))}

                {/* Mobile Actions */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href="/nabil_cv.pdf"
                    download="Nabil_Lambattan_CV.pdf"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    <User size={18} />
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Section Indicator - Desktop */}
        <div className="hidden md:block absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-500"
          style={{
            width: `${(links.findIndex(link => link.label === activeSection) + 1) * (100 / links.length)}%`,
            transform: `translateX(${links.findIndex(link => link.label === activeSection) * 100}%)`
          }}
        />
      </nav>
    </>
  )
}

export default Navbar