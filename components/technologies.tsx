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
} from "lucide-react"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"

interface TechnologiesProps {
  data: string[]
  currentlyLearning: string
}

function AtomIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  )
}

function WindIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function VercelIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 19h20L12 2z" />
    </svg>
  )
}

const techIcons: Record<string, { icon: React.ReactNode; category: string; color: string }> = {
  HTML: { icon: <FileCode size={24} />, category: "Frontend", color: "text-orange-500" },
  CSS: { icon: <Palette size={24} />, category: "Frontend", color: "text-blue-500" },
  JavaScript: { icon: <Code2 size={24} />, category: "Frontend", color: "text-yellow-500" },
  TypeScript: { icon: <Terminal size={24} />, category: "Frontend", color: "text-blue-400" },
  React: { icon: <AtomIcon />, category: "Frontend", color: "text-cyan-400" },
  "Next.js": { icon: <Globe size={24} />, category: "Frontend", color: "text-white" },
  "Tailwind CSS": { icon: <WindIcon />, category: "Frontend", color: "text-cyan-300" },
  "Node.js": { icon: <Server size={24} />, category: "Backend", color: "text-green-500" },
  Express: { icon: <Zap size={24} />, category: "Backend", color: "text-gray-400" },
  MongoDB: { icon: <Database size={24} />, category: "Database", color: "text-green-400" },
  PostgreSQL: { icon: <Database size={24} />, category: "Database", color: "text-blue-300" },
  Firebase: { icon: <Zap size={24} />, category: "Database", color: "text-yellow-400" },
  Git: { icon: <GitBranch size={24} />, category: "Tools", color: "text-orange-600" },
  GitHub: { icon: <GithubIcon />, category: "Tools", color: "text-gray-300" },
  Vercel: { icon: <VercelIcon />, category: "DevOps", color: "text-white" },
}

const Technologies = ({ data, currentlyLearning }: TechnologiesProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useBinaryCanvas({ color: "0, 255, 255", fontSize: 10, speed: 0.9, opacity: 0.12 })

  const categories = [
    "All",
    ...Array.from(new Set(data.map((tech) => techIcons[tech]?.category ?? "Other"))),
  ]

  const filteredTechs =
    activeCategory === "All"
      ? data
      : data.filter((tech) => techIcons[tech]?.category === activeCategory)

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

  return (
    <section
      id="technologies"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={ref}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, #0a0a14 0%, #11111f 100%)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`transition-all duration-1000 mb-16 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-300">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technologies & Tools
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Technologies I use to build modern web applications
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
              >
                {category}
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
            const techInfo = techIcons[tech] ?? {
              icon: <Code2 size={24} />,
              category: "Other",
              color: "text-gray-400",
            }
            return (
              <div
                key={tech}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`group relative transition-all duration-500 ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
                  }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full p-4 lg:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10 ${techInfo.color}`}>
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {techInfo.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{tech}</h3>
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
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {[
            { label: "Frontend", value: data.filter((t) => techIcons[t]?.category === "Frontend").length, icon: <Layout size={20} /> },
            { label: "Backend & DB", value: data.filter((t) => ["Backend", "Database"].includes(techIcons[t]?.category ?? "")).length, icon: <Database size={20} /> },
            { label: "DevOps & Tools", value: data.filter((t) => ["DevOps", "Tools"].includes(techIcons[t]?.category ?? "")).length, icon: <Shield size={20} /> },
            { label: "Years Learning", value: "2+", icon: <Rocket size={20} /> },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                  <div className="text-cyan-400">{stat.icon}</div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning — from data.json */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="max-w-3xl mx-auto p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Always Learning</h3>
                  <p className="text-sm text-muted-foreground">Continuously exploring new technologies</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-mono text-cyan-300">
                  Currently: {currentlyLearning}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technologies