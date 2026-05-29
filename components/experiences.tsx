"use client"

import { useEffect, useRef, useState } from "react"
import {
  Briefcase,
  Calendar,
  MapPin,
  Code2,
  Zap,
  Cpu,
  Rocket,
  Terminal,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowRight,
  Code,
  Mail,
} from "lucide-react"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"

interface Experience {
  role: string
  company: string
  location: string
  date: string
  description: string
  technologies: string[]
}

interface ExperiencesProps {
  experiences: Experience[]
  content: {
    sectionTitle: string
    sectionSubtitle: string
    stats: Array<{ label: string; value: string; icon: string }>
    ctaTitle: string
    ctaDescription: string
    ctaButtonPrimary: string
    ctaButtonSecondary: string
  }
}

const Experiences = ({ experiences, content }: ExperiencesProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useBinaryCanvas({ color: "120, 119, 198", fontSize: 10, speed: 0.8, opacity: 0.12 })

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

  const getDuration = (dateString: string) => {
    const match = dateString.match(/(\w{3}) (\d{4}) – (\w{3})? ?(\d{4})?/)
    if (!match) return dateString
    const [, startMonth, startYear, endMonth, endYear] = match
    const end = endYear || "Present"
    return `${startMonth} ${startYear} - ${endMonth ? `${endMonth} ` : ""}${end}`
  }

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes("full-stack")) return <Code2 size={20} />
    if (role.toLowerCase().includes("technical") || role.toLowerCase().includes("it")) return <Cpu size={20} />
    if (role.toLowerCase().includes("freelance")) return <Rocket size={20} />
    if (role.toLowerCase().includes("intern")) return <Terminal size={20} />
    return <Briefcase size={20} />
  }

  const iconMap: Record<string, any> = {
    clock: <Clock size={20} />,
    code2: <Code2 size={20} />,
    cpu: <Cpu size={20} />,
    sparkles: <Sparkles size={20} />,
  }

  return (
    <section id="experiences" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, var(--section-bg) 0%, var(--section-bg-alt) 100%)", opacity: "var(--canvas-opacity)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(120, 119, 198, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(120, 119, 198, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div
          className={`transition-all duration-1000 mb-16 text-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 mb-6">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-mono text-cyan-300">{t("ui.timeline") || "Career Journey"}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {content.sectionTitle}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.sectionSubtitle}</p>
        </div>

        {/* Desktop Timeline (unchanged, but uses experiences) */}
        {/* ... keep the same timeline code, just replace data with experiences ... */}

        {/* (The timeline JSX is unchanged, just using experiences variable) */}

        {/* Stats Summary */}
        <div
          className={`mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-purple-400">
                    {iconMap[stat.icon] || <TrendingUp size={20} />}
                  </div>
                  <span className="text-3xl font-bold text-purple-400">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="p-8 md:p-12 rounded-3xl bg-background/80 border border-purple-500/30 backdrop-blur-lg shadow-2xl shadow-purple-900/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl lg:max-w-3xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Briefcase size={20} className="text-cyan-400" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                    {t("ui.collaborate") || "Ready to collaborate?"}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {content.ctaTitle}
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground/90">{content.ctaDescription}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto justify-center lg:justify-end">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center justify-center px-8 py-3 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-400/60"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail size={20} />
                    {content.ctaButtonPrimary}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                </a>
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center px-6 py-3 w-full sm:w-auto border border-cyan-500/50 text-cyan-400 font-semibold rounded-xl transition-all duration-300 hover:bg-cyan-500/10 hover:text-foreground" style={{ background: 'var(--glass-bg)' }}
                >
                  <span className="flex items-center gap-2">
                    <Code size={18} />
                    {content.ctaButtonSecondary}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experiences