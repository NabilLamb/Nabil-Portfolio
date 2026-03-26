// components\projects.tsx

"use client"

import { useEffect, useRef, useState } from "react"
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Code2, 
  Star, 
  Zap, 
  ChevronRight,
  Layers,
  Rocket,
  Sparkles,
  FolderKanban,
  TrendingUp
} from "lucide-react"
import Image from "next/image"

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
}

const Projects = ({ data }: ProjectsProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Extract all technologies for filtering
  const allTechnologies = Array.from(
    new Set(data.flatMap(project => project.technologies))
  )

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All" 
    ? data 
    : data.filter(project => project.technologies.includes(activeFilter))

  // Categories for filtering
  const categories = [
    "All",
    "Featured",
    "Frontend",
    "Full Stack",
    "Web3",
    "Mobile"
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

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
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
    const fontSize = 11
    const columns = Math.floor(canvas.width / fontSize)
    const drops: { y: number; speed: number; opacity: number }[] = Array(columns).fill(null).map(() => ({
      y: Math.random() * -canvas.height,
      speed: 0.4 + Math.random() * 1.8,
      opacity: Math.random() * 0.2 + 0.05
    }))

    let animationFrameId: number

    const draw = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(8, 8, 16, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `bold ${fontSize}px 'Monaco', 'Consolas', monospace`
      
      // Draw binary characters
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        
        // Purple/pink tint for binary code
        ctx.fillStyle = `rgba(168, 85, 247, ${drop.opacity})`
        
        // Draw character
        const char = binary[Math.floor(Math.random() * binary.length)]
        ctx.fillText(char, i * fontSize, drop.y)
        
        // Draw trailing character with different opacity
        if (drop.y > fontSize) {
          ctx.fillStyle = `rgba(139, 92, 246, ${drop.opacity * 0.7})`
          ctx.fillText(binary[Math.floor(Math.random() * binary.length)], i * fontSize, drop.y - fontSize)
        }
        
        // Move drop down
        drop.y += drop.speed
        
        // Reset drop if it's past bottom
        if (drop.y > canvas.height + 100) {
          drop.y = Math.random() * -100
          drop.speed = 0.4 + Math.random() * 1.8
          drop.opacity = Math.random() * 0.2 + 0.05
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

  // Open project modal
  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  // Close project modal
  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  // Get project complexity indicator
  const getComplexityLevel = (techCount: number) => {
    if (techCount > 8) return { level: "Advanced", color: "text-red-400", bg: "bg-red-500/10" }
    if (techCount > 5) return { level: "Intermediate", color: "text-yellow-400", bg: "bg-yellow-500/10" }
    return { level: "Basic", color: "text-green-400", bg: "bg-green-500/10" }
  }

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={ref}
    >
      {/* Binary Animation Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{
          background: 'linear-gradient(135deg, #0a0a14 0%, #11111f 100%)'
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" 
             style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 via-pink-500/3 to-rose-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`transition-all duration-1000 mb-16 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <FolderKanban className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-mono text-purple-300">Portfolio</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Building innovative solutions with modern technologies and best practices
          </p>
        </div>

        {/* Project Stats */}
        <div
          className={`mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { label: "Total Projects", value: data.length, icon: <Layers size={20} />, color: "text-purple-400" },
            { label: "Open Source", value: data.filter(p => p.github).length, icon: <Github size={20} />, color: "text-gray-300" },
            { label: "Live Demos", value: data.filter(p => p.demo).length, icon: <Eye size={20} />, color: "text-green-400" },
            { label: "Featured", value: data.filter(p => p.featured).length, icon: <Star size={20} />, color: "text-yellow-400" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')}/10`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div
          className={`mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                  activeFilter === category
                    ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
                    : 'text-muted-foreground hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category}
                  {activeFilter === category && (
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Technology Quick Filter */}
        <div
          className={`mb-8 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm text-muted-foreground mb-3 text-center">Filter by Technology:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {allTechnologies.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                  activeFilter === tech
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tech}
              </button>
            ))}
            {allTechnologies.length > 8 && (
              <button
                onClick={() => setActiveFilter("All")}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 border border-white/10"
              >
                +{allTechnologies.length - 8} more
              </button>
            )}
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
                onClick={() => openProjectModal(project)}
                className={`group relative cursor-pointer transition-all duration-700 ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="relative">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">
                        <div className="flex items-center gap-1">
                          <Star size={10} />
                          <span>Featured</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-yellow-500 animate-ping opacity-20"></div>
                    </div>
                  </div>
                )}

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Project card */}
                <div className="relative h-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/30 transition-all duration-300 group-hover:scale-105">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20"></div>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-white">Live Preview</span>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${complexity.bg} ${complexity.color}`}>
                          {complexity.level}
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick view button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          <span>Quick View</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
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

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-white/5 text-muted-foreground border border-white/10 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-white/5 text-muted-foreground border border-white/10">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all duration-300 group/link"
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 hover:text-white transition-all duration-300 group/link"
                      >
                        <Eye size={16} />
                        <span className="text-sm">Live Demo</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View More CTA */}
        {filteredProjects.length > 0 && (
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <span>Showing {filteredProjects.length} of {data.length} projects</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
              </div>
              <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30">
                <span className="relative flex items-center justify-center gap-2">
                  <Rocket size={18} />
                  View All Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
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
                <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
                <p className="text-muted-foreground">
                  No projects match the selected filter. Try selecting a different technology or category.
                </p>
              </div>
              <button
                onClick={() => setActiveFilter("All")}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal (would be implemented fully with state) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeProjectModal}
          ></div>
          
          {/* Modal content would go here */}
          <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal implementation would be here */}
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects