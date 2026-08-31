// components\navbar.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Moon, Sun, User } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "./language-switcher"

interface NavbarData {
  brandName?: string;
  brandRole?: string;
  links?: Array<{
    id: string;
    label: string;
    icon: string;
  }>;
}

const Navbar = ({ data }: { data?: NavbarData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Home")
  const { theme, setTheme } = useTheme()
  const canvasRef = useBinaryCanvas({ color: "120, 119, 198", fontSize: 8, speed: 0.6, opacity: 0.1 })

  const { t, i18n } = useTranslation()
  const cvFile = i18n.language === "fr" ? "/nabil_cv_fr.pdf" : "/nabil_cv_en.pdf"
  const cvFilename = i18n.language === "fr" ? "Nabil_Lambattan_CV_FR.pdf" : "Nabil_Lambattan_CV_EN.pdf"

  const links = (t("navbar.links", { returnObjects: true }) as NavbarData["links"]) || [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👨‍💻" },
    { id: "experiences", label: "Experience", icon: "💼" },
    { id: "technologies", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "feedbacks", label: "Testimonials", icon: "⭐" },
    { id: "contact", label: "Contact", icon: "📧" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = links.map((link) => link.id)
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(links.find((link) => link.id === currentSection)?.label || "Home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
            ? "linear-gradient(180deg, rgba(10,10,20,0.95) 0%, rgba(10,10,20,0.9) 100%)"
            : "linear-gradient(180deg, rgba(10,10,20,0.8) 0%, transparent 100%)",
        }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-purple-500/20 shadow-xl shadow-purple-500/5"
            : "bg-transparent backdrop-blur-sm border-b border-purple-500/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Image
                      src="/apple-icon-180x180.png"
                      alt="Nabil Logo"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse border-2 border-background"></div>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {t("navbar.brandName") || data?.brandName || "Nabil"}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{t("navbar.brandRole") || data?.brandRole || "Frontend Developer"}</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  aria-label={`Navigate to ${link.label}`}
                  aria-current={activeSection === link.label ? "page" : undefined}
                  className={`relative cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    activeSection === link.label
                      ? "text-foreground bg-purple-500/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{link.icon}</span>
                    <span>{link.label}</span>
                  </div>

                  {activeSection === link.label && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  )}

                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="cursor-pointer p-2 rounded-lg border text-muted-foreground hover:text-foreground hover:border-purple-500/30 transition-all duration-300" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Download CV Button */}
              <a
                href={cvFile}
                download={cvFilename}
                className="cursor-pointer hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-300 hover:text-foreground hover:border-purple-500/60 transition-all duration-300"
              >
                <User size={16} />
                <span className="text-sm font-medium">{t("hero.ctaCV") || "Download CV"}</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
                className="cursor-pointer md:hidden p-2 rounded-lg border text-purple-400 hover:text-foreground hover:border-purple-500/30 transition-all duration-300" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
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
                    className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === link.label
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium text-foreground">{link.label}</span>
                    {activeSection === link.label && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                    )}
                  </button>
                ))}

                {/* Mobile Actions */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={cvFile}
                    download={cvFilename}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    <User size={18} />
                    {t("hero.ctaCV") || "Download CV"}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Section Indicator - Desktop */}
        <div
          className="hidden md:block absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-500"
          style={{
            width: `${(links.findIndex((link) => link.label === activeSection) + 1) * (100 / links.length)}%`,
            transform: `translateX(${links.findIndex((link) => link.label === activeSection) * 100}%)`,
          }}
        />
      </nav>
    </>
  )
}

export default Navbar