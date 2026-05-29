"use client"

import { useEffect, useRef, useState } from "react"
import {
  ExternalLink,
  Github,
  Eye,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Rocket,
  FolderKanban,
  X,
} from "lucide-react"
import Image from "next/image"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"

interface Project {
  title: string
  image: string
  description: string
  technologies: string[]
  github: string
  demo: string
  featured?: boolean
}

interface ProjectsProps {
  data: Project[]
  content: {
    sectionTitle: string
    sectionSubtitle: string
    stats: Array<{ label: string; icon: string }>
    viewAllButtonText: string
    emptyStateMessage: string
    resetFiltersButton: string
  }
}

const Projects = ({ data, content }: ProjectsProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useBinaryCanvas({ color: "168, 85, 247", fontSize: 11, speed: 1.2, opacity: 0.15 })

  const allTechnologies = ["All", ...Array.from(new Set(data.flatMap((p) => p.technologies)))]

  const filteredProjects = activeFilter === "All" ? data : data.filter((p) => p.technologies.includes(activeFilter))

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const getComplexityLevel = (techCount: number) => {
    if (techCount > 8) return { level: t("ui.complexity.advanced") || "Advanced", color: "text-red-400", bg: "bg-red-500/10" }
    if (techCount > 5) return { level: t("ui.complexity.intermediate") || "Intermediate", color: "text-yellow-400", bg: "bg-yellow-500/10" }
    return { level: t("ui.complexity.basic") || "Basic", color: "text-green-400", bg: "bg-green-500/10" }
  }

  const iconMap: Record<string, any> = {
    layers: <Layers size={20} />,
    github: <Github size={20} />,
    eye: <Eye size={20} />,
    star: <Star size={20} />,
  }

  return (
    <section id="projects" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, var(--section-bg) 0%, var(--section-bg-alt) 100%)", opacity: "var(--canvas-opacity)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <FolderKanban className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-mono text-purple-300">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              {content.sectionTitle}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{content.sectionSubtitle}</p>
        </div>

        {/* Project Stats */}
        <div
          className={`mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {content.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:scale-105" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: 'var(--glass-bg)' }}>
                  <div className="text-purple-400">{iconMap[stat.icon] || <FolderKanban size={20} />}</div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.label === "Total Projects" && data.length}
                    {stat.label === "Open Source" && data.filter((p) => p.github).length}
                    {stat.label === "Live Demos" && data.filter((p) => p.demo).length}
                    {stat.label === "Featured" && data.filter((p) => p.featured).length}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Filter */}
        <div
          className={`mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {allTechnologies.slice(0, 10).map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                  activeFilter === tech
                    ? "text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                    : "text-muted-foreground hover:text-foreground border"
                }`}
                style={activeFilter !== tech ? { background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' } : {}}
              >
                {tech === "All" ? (t("ui.all") || "All") : tech}
                {activeFilter === tech && (
                  <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => {
            const complexity = getComplexityLevel(project.technologies.length)
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project)}
                className={`group relative cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {project.featured && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="relative">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold flex items-center gap-1">
                        <Star size={10} />
                        <span>{t("ui.featured") || "Featured"}</span>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-yellow-500 animate-ping opacity-20"></div>
                    </div>
                  </div>
                )}

                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative h-full overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-purple-500/30" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}>
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20"></div>
                    <Image
                      src={project.image || "/placeholder.jpg"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                           <span className="text-xs text-white">{t("ui.livePreview") || "Live Preview"}</span>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${complexity.bg} ${complexity.color}`}>
                          {complexity.level}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm backdrop-blur-sm flex items-center gap-2">
                        <Eye size={16} />
                        <span>{t("ui.quickView") || "Quick View"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </h3>
                      {hoveredProject === project.title && (
                        <div className="p-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                          <ChevronRight className="w-4 h-4 text-purple-400 animate-pulse" />
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full text-muted-foreground group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all duration-300" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-full text-muted-foreground" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 pt-4" style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: 'var(--glass-border)' }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 group/link" style={{ background: 'var(--glass-bg)' }}
                      >
                         <Github size={16} />
                         <span className="text-sm">{t("ui.code") || "Code"}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 hover:text-foreground transition-all duration-300 group/link"
                      >
                         <Eye size={16} />
                         <span className="text-sm">{t("ui.liveDemo") || "Live Demo"}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All CTA */}
        {filteredProjects.length > 0 && (
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                 <span>
                   {t("ui.showingProjects", { count: filteredProjects.length, total: data.length }) || `Showing ${filteredProjects.length} of ${data.length} projects`}
                 </span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
              </div>
              <a
                href="https://github.com/NabilLamb"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 flex items-center gap-2"
              >
                <Rocket size={18} />
                {content.viewAllButtonText}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div
            className={`text-center py-16 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex flex-col items-center gap-6 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                <Code2 className="w-10 h-10 text-purple-400" />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-foreground mb-2">{t("ui.noProjects") || "No Projects Found"}</h3>
                <p className="text-muted-foreground">{content.emptyStateMessage}</p>
              </div>
              <button
                onClick={() => setActiveFilter("All")}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                {content.resetFiltersButton}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
          <div className="relative bg-background border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
              <Image
                src={selectedProject.image || "/placeholder.jpg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-3">{selectedProject.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-foreground hover:opacity-80 transition-all duration-300" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                >
                   <Github size={18} />
                   {t("ui.viewCode") || "View Code"}
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                >
                   <Eye size={18} />
                   {t("ui.liveDemo") || "Live Demo"}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects