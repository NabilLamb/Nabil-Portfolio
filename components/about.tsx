// components\about.tsx

"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Cpu, Zap, Sparkles, Globe, Server, Database, Terminal } from "lucide-react"
import Image from "next/image"

interface AboutProps {
  data: {
    title: string
    description: string
    avatar: string
  }
}

const About = ({ data }: AboutProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    technologies: 0
  })

  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          // Animate counters when visible
          setTimeout(() => {
            setCounters({
              experience: 2,
              projects: 6,
              technologies: 10
            })
          }, 500)

          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
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
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(-fontSize)
    let animationFrameId: number

    const draw = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(8, 8, 16, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px 'Monaco', 'Consolas', monospace`

      // Draw binary characters
      for (let i = 0; i < drops.length; i++) {
        // Random character with varying opacity
        const char = binary[Math.floor(Math.random() * binary.length)]
        const opacity = Math.random() * 0.3 + 0.1

        // Greenish tint for binary code
        ctx.fillStyle = `rgba(0, 255, 200, ${opacity})`

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i])

        // Move drop down
        drops[i] += fontSize

        // Reset drop if it's past bottom and random chance
        if (drops[i] > canvas.height && Math.random() > 0.95) {
          drops[i] = -fontSize
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

  // Tech stack items
  const techStack = [
    { icon: <Code2 size={20} />, name: "React/Next.js", color: "text-cyan-400" },
    { icon: <Server size={20} />, name: "Node.js/Express", color: "text-green-400" },
    { icon: <Database size={20} />, name: "MongoDB/PostgreSQL", color: "text-blue-400" },
    { icon: <Terminal size={20} />, name: "TypeScript", color: "text-purple-400" },
    { icon: <Globe size={20} />, name: "AWS/Cloud", color: "text-orange-400" },
    { icon: <Cpu size={20} />, name: "CI/CD", color: "text-pink-400" }
  ]

  return (
    <section
      id="about"
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`transition-all duration-1000 mb-16 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-300">About Me</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get to know the developer behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Avatar & Stats */}
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Avatar container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10"></div>

                {/* Avatar image */}
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Floating code badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <code className="text-xs font-mono text-cyan-300">
                        nabil@portfolio:~$
                      </code>
                    </div>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Years Coding", value: counters.experience, suffix: "+", color: "text-cyan-400" },
{ label: "Projects Built", value: counters.projects, suffix: "+", color: "text-purple-400" },
{ label: "Technologies", value: counters.technologies, suffix: "+", color: "text-orange-400" }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 group/stat"
                  >
                    <div className="flex items-end gap-1">
                      <span className={`text-3xl font-bold ${stat.color} transition-all duration-300 group-hover/stat:scale-110`}>
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

          {/* Right Column - Description & Skills */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Description */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {data.description}
              </p>
              
            </div>

            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white">Tech Stack</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 group/tech"
                  >
                    <div className={`${tech.color} transition-transform duration-300 group-hover/tech:scale-110`}>
                      {tech.icon}
                    </div>
                    <span className="text-sm font-medium text-white">{tech.name}</span>
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
                  <h4 className="text-lg font-bold text-white mb-1">Let's Build Something Amazing</h4>
                  <p className="text-sm text-muted-foreground">
                    Ready to bring your ideas to life with cutting-edge technology
                  </p>
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