"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code2,
  Database,
  Terminal,
  Cpu,
  Shield,
  Zap,
  Layout,
  GitBranch,
  Server,
  Globe,
  Palette,
  FileCode,
  Rocket,
  Atom,
  Wind,
  Github,
  Triangle,
} from "lucide-react"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"

interface TechnologiesProps {
  data: string[]
  content: {
    sectionTitle: string
    sectionSubtitle: string
    stats: Array<{ label: string; value: number | string; icon: string }>
    learningText: string
  }
}

// Icons remain the same

const techIcons: Record<string, { icon: React.ReactNode; category: string; color: string }> = {
  "HTML": { icon: <FileCode size={24} />, category: "Frontend", color: "text-orange-500" },
  "CSS": { icon: <Palette size={24} />, category: "Frontend", color: "text-blue-500" },
  "JavaScript": { icon: <Code2 size={24} />, category: "Frontend", color: "text-yellow-500" },
  "TypeScript": { icon: <Terminal size={24} />, category: "Frontend", color: "text-blue-400" },
  "React": { icon: <Atom size={24} />, category: "Frontend", color: "text-cyan-400" },
  "Next.js": { icon: <Globe size={24} />, category: "Frontend", color: "text-foreground" },
  "Tailwind CSS": { icon: <Wind size={24} />, category: "Frontend", color: "text-cyan-300" },
  "Node.js": { icon: <Server size={24} />, category: "Backend", color: "text-green-500" },
  "Express": { icon: <Zap size={24} />, category: "Backend", color: "text-gray-400" },
  "MongoDB": { icon: <Database size={24} />, category: "Database", color: "text-green-400" },
  "MySQL": { icon: <Database size={24} />, category: "Database", color: "text-blue-300" },
  "Git": { icon: <GitBranch size={24} />, category: "Tools", color: "text-orange-600" },
  "GitHub": { icon: <Github size={24} />, category: "Tools", color: "text-gray-300" },
  "Vercel": { icon: <Triangle size={24} />, category: "DevOps", color: "text-foreground" },
}

const Technologies = ({ data, content }: TechnologiesProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useBinaryCanvas({ color: "0, 255, 255", fontSize: 10, speed: 0.9, opacity: 0.12 })

  const categories = ["All", ...Array.from(new Set(data.map((tech) => techIcons[tech]?.category || "Other")))]
  const filteredTechs = activeCategory === "All" ? data : data.filter((tech) => techIcons[tech]?.category === activeCategory)

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

  const iconMap: Record<string, any> = {
    layout: <Layout size={20} />,
    database: <Database size={20} />,
    shield: <Shield size={20} />,
    rocket: <Rocket size={20} />,
  }

  return (
    <section id="technologies" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, var(--section-bg) 0%, var(--section-bg-alt) 100%)", opacity: "var(--canvas-opacity)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-300">{t("ui.techStack") || "Tech Stack"}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {content.sectionTitle}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.sectionSubtitle}</p>
        </div>

        {/* Category Filter */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                    : "text-muted-foreground hover:text-foreground border"
                }`}
                style={activeCategory !== category ? { background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' } : {}}
              >
                {category === "All" ? (t("ui.all") || "All") : category}
                {activeCategory === category && (
                  <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {filteredTechs.map((tech, idx) => {
            const techInfo = techIcons[tech] || {
              icon: <Code2 size={24} />,
              category: "Other",
              color: "text-gray-400",
            }
            return (
              <div
                key={tech}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full p-4 lg:p-6 rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-500/30" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}>
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br from-white/5 to-transparent ${techInfo.color}`} style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110">{techInfo.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{tech}</h3>
                      <p className="text-xs text-muted-foreground">{techInfo.category}</p>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                        style={{ width: hoveredTech === tech ? "100%" : "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tech Stats */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {content.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gradient-to-br hover:border-cyan-500/30 transition-all duration-300 hover:scale-105" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                  <div className="text-cyan-400">{iconMap[stat.icon]}</div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Learning */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mx-auto p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{t("ui.alwaysLearning") || "Always Learning"}</h3>
                  <p className="text-sm text-muted-foreground">{content.learningText}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-mono text-cyan-300">{content.learningText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technologies