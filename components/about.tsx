"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Cpu, Zap, Sparkles, Globe, Server, Database, Terminal } from "lucide-react"
import Image from "next/image"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"

interface AboutProps {
  data: {
    title: string
    description: string
    avatar: string
    sectionTitle: string
    sectionSubtitle: string
    journeyTitle: string
    techStackTitle: string
    ctaTitle: string
    ctaDescription: string
    techList: Array<{ name: string; icon: string }>
    stats: Array<{ label: string; value: number; suffix: string }>
  }
}

const About = ({ data }: AboutProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ experience: 0, projects: 0, technologies: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useBinaryCanvas({ color: "0, 255, 200", fontSize: 12, speed: 1, opacity: 0.12 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => {
            setCounters({
              experience: data.stats[0].value,
              projects: data.stats[1].value,
              technologies: data.stats[2].value,
            })
          }, 500)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [data.stats])

  const iconMap: Record<string, any> = {
    code: <Code2 size={20} />,
    server: <Server size={20} />,
    database: <Database size={20} />,
    terminal: <Terminal size={20} />,
    globe: <Globe size={20} />,
    cpu: <Cpu size={20} />,
  }

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={ref}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, var(--section-bg) 0%, var(--section-bg-alt) 100%)", opacity: "var(--canvas-opacity)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`transition-all duration-1000 mb-16 text-center ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-300">{data.sectionTitle}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{data.sectionSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Avatar & Stats */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative rounded-2xl overflow-hidden border bg-background" style={{ borderColor: 'var(--glass-border)' }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10"></div>

                <div className="relative aspect-square">
                  <Image
                    src={data.avatar || "/hero.png"}
                    alt="Profile Avatar"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <code className="text-xs font-mono text-cyan-300">{t("ui.terminalPrompt") || "nabil@portfolio:~$"}</code>
                    </div>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {data.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 group/stat" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                  >
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-3xl font-bold transition-all duration-300 group-hover/stat:scale-110 ${
                          idx === 0 ? "text-cyan-400" : idx === 1 ? "text-purple-400" : "text-orange-400"
                        }`}
                      >
                        {stat.value}
                      </span>
                      <span className="text-lg text-muted-foreground">{stat.suffix}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Description & Tech Stack */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Description */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-foreground">{data.journeyTitle}</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{data.description}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-foreground">{data.techStackTitle}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {data.techList.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 group/tech" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                  >
                    <div className="text-cyan-400 transition-transform duration-300 group-hover/tech:scale-110">
                      {iconMap[tech.icon] || <Code2 size={20} />}
                    </div>
                    <span className="text-sm font-medium text-foreground">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{data.ctaTitle}</h4>
                  <p className="text-sm text-muted-foreground">{data.ctaDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About