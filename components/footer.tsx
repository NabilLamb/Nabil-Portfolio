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
  Terminal,
} from "lucide-react"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"

interface FooterProps {
  data: {
    brandName: string
    brandRole: string
    description: string
    quickLinks: Array<{ label: string; href: string; icon: string }>
    techStack: string[]
    learningText: string
    builtWithTechs: string[]
    copyrightName: string
  }
}

const Footer = ({ data }: FooterProps) => {
  const { t, i18n } = useTranslation()
  const cvFile = i18n.language === "fr" ? "/nabil_cv_fr.pdf" : "/nabil_cv_en.pdf"
  const cvFilename = i18n.language === "fr" ? "Nabil_Lambattan_CV_FR.pdf" : "Nabil_Lambattan_CV_EN.pdf"
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const footerRef = useRef<HTMLElement>(null)
  const canvasRef = useBinaryCanvas({ color: "120, 119, 198", fontSize: 10, speed: 0.5, opacity: 0.08 })

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

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace("#", ""))
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const iconMap: Record<string, any> = {
    github: <Github size={18} />,
    linkedin: <Linkedin size={18} />,
    mail: <Mail size={18} />,
  }

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label={t("ui.backToTop") || "Back to top"}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronUp className="w-5 h-5" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}

      <footer
        ref={footerRef}
        className="relative border-t border-purple-500/20 bg-background overflow-hidden"
      >
        {/* Binary Animation Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(180deg, var(--section-bg) 0%, var(--section-bg-alt) 100%)", opacity: "var(--canvas-opacity)" }}
        />

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {data.brandName.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {data.brandName}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono">{data.brandRole}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{data.description}</p>

                  <a
                    href={cvFile}
                    download={cvFilename}
                    className="group relative w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 text-purple-300 hover:text-foreground"
                  >
                    <FileText size={16} />
                    {t("hero.ctaCV") || "Download Resume"}
                  </a>
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  {t("ui.navigation") || "Navigation"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {data.quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
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
                <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  {t("ui.techStack") || "Tech Stack"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-foreground">{t("ui.currentlyLearning") || "Currently Learning"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{data.learningText}</p>
                </div>
              </div>

              {/* Connect Column */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  {t("ui.connectOnline") || "Let's Connect"}
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "GitHub", url: "https://github.com/NabilLamb", color: "text-gray-300", bg: "bg-gray-900/80", icon: "github", desc: t("ui.viewMyCode") || "View my code" },
                    { label: "LinkedIn", url: "https://linkedin.com/in/nabil-lambattan", color: "text-blue-400", bg: "bg-blue-900/80", icon: "linkedin", desc: t("ui.professionalNetwork") || "Professional network" },
                    { label: "Email", url: "mailto:lambattannabil2000@gmail.com", color: "text-red-400", bg: "bg-red-900/80", icon: "mail", desc: t("ui.contactMeDescription") || "Contact me" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target={social.url.startsWith("mailto") ? undefined : "_blank"}
                      rel={social.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      onMouseEnter={() => setHoveredLink(social.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group block p-3 rounded-lg hover:border-purple-500/30 transition-all duration-300 hover:scale-105" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${social.bg}`}>
                          <div className={social.color}>{iconMap[social.icon] || <Globe size={18} />}</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{social.label}</p>
                          <p className="text-xs text-muted-foreground">{social.desc}</p>
                        </div>
                        <ExternalLink
                          className={`w-4 h-4 transition-all duration-300 ${
                            hoveredLink === social.label ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                          } text-purple-400`}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div
              className={`pt-8 border-t border-white/10 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                  <p className="text-sm text-muted-foreground">
                    © {currentYear} {data.copyrightName}. {t("ui.allRightsReserved") || "All rights reserved."}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="w-4 h-4" />
                    <span>{t("ui.builtWith") || "Built with"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {data.builtWithTechs.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Coffee className="w-4 h-4" />
                  <span>{t("ui.madeWithCoffee") || "Made with passion & lots of coffee"}</span>
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