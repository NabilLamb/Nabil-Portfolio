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

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-transparent -translate-x-1/2"></div>
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            {experiences.map((_, idx) => (
              <div key={idx} className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border-2 border-background" style={{ top: `${experiences.length > 1 ? (idx / (experiences.length - 1)) * 100 : 0}%`, transform: "translate(-50%, -50%)" }}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping ${activeIndex === idx ? "opacity-20" : "opacity-10"}`}></div>
              </div>
            ))}
          </div>

          <div className="space-y-24">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`relative transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ marginLeft: idx % 2 === 0 ? "0" : "auto", width: "45%" }} onMouseEnter={() => setActiveIndex(idx)}>
                <div className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] group ${idx % 2 === 0 ? "mr-auto ml-0" : "ml-auto mr-0"} ${activeIndex === idx ? "border-cyan-500/50 bg-gradient-to-r from-purple-500/10 via-background/50 to-cyan-500/10 shadow-xl shadow-cyan-500/10" : "border-white/10 bg-white/5 hover:border-purple-500/30"}`}>
                  <div className={`absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg transition-all duration-300 ${activeIndex === idx ? "border-cyan-500" : "border-purple-500/30 group-hover:border-purple-500"}`}></div>
                  <div className={`absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg transition-all duration-300 ${activeIndex === idx ? "border-purple-500" : "border-cyan-500/30 group-hover:border-cyan-500"}`}></div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${activeIndex === idx ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20" : "bg-white/5 group-hover:bg-white/10"}`}>
                      <div className={activeIndex === idx ? "text-cyan-400" : "text-purple-400"}>{getRoleIcon(exp.role)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${activeIndex === idx ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300" : "bg-white/5 text-muted-foreground group-hover:text-white"}`}>
                          <Calendar size={12} />
                          {getDuration(exp.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-cyan-300 font-medium"><Briefcase size={14} />{exp.company}</span>
                        <span className="flex items-center gap-1 text-muted-foreground"><MapPin size={14} />{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line group-hover:text-white/80 transition-colors duration-300">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className={`px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-sm border transition-all duration-300 ${activeIndex === idx ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30" : "bg-white/5 text-muted-foreground border-white/10 group-hover:border-purple-500/30 group-hover:text-purple-300"}`}>{tech}</span>
                    ))}
                  </div>

                  {idx === 0 && (
                    <div className="absolute -top-3 -right-3">
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
                        <Zap size={12} className="text-yellow-500" />
                        <span className="text-xs font-medium text-yellow-300">Current Role</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-1 transition-all duration-300 ${activeIndex === idx ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/20"} ${idx % 2 === 0 ? "right-0 translate-x-full" : "left-0 -translate-x-full"}`}>
                  <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-cyan-400" : "bg-white/40"} ${idx % 2 === 0 ? "right-0" : "left-0"}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          <div className="relative pl-8">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/20 via-cyan-500/20 to-transparent"></div>
            {experiences.map((exp, idx) => (
              <div key={idx} className={`relative mb-12 last:mb-0 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} onMouseEnter={() => setActiveIndex(idx)}>
                <div className={`absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-background z-10 transition-all duration-300 ${activeIndex === idx ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/20"}`}>
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-ping ${activeIndex === idx ? "opacity-20" : "opacity-10"}`}></div>
                </div>
                <div className={`ml-8 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${activeIndex === idx ? "border-cyan-500/50 bg-gradient-to-b from-purple-500/10 to-cyan-500/10 shadow-xl shadow-cyan-500/10" : "border-white/10 bg-white/5 hover:border-purple-500/30"}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${activeIndex === idx ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20" : "bg-white/5"}`}>
                      <div className={activeIndex === idx ? "text-cyan-400" : "text-purple-400"}>{getRoleIcon(exp.role)}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2"><Briefcase size={14} className="text-cyan-300" /><span className="text-cyan-300 font-medium">{exp.company}</span></div>
                        <div className="flex items-center gap-2"><MapPin size={14} className="text-muted-foreground" /><span className="text-muted-foreground">{exp.location}</span></div>
                        <div className="flex items-center gap-2"><Calendar size={14} className="text-muted-foreground" /><span className="text-muted-foreground">{getDuration(exp.date)}</span></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className={`px-3 py-1.5 text-xs font-medium rounded-lg backdrop-blur-sm border ${activeIndex === idx ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/30" : "bg-white/5 text-muted-foreground border-white/10"}`}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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