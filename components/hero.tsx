"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Download, Mail } from "lucide-react"
import Image from "next/image"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"

interface HeroProps {
  data: {
    name: string
    title: string
    subtitle: string
    ctaHire: string
    ctaCV: string
    heroImageLink: string
    cvLink: string
    description: string
    techStack: string[]
  }
}

const Hero = ({ data }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useBinaryCanvas({ color: "0, 255, 255", fontSize: 14, speed: 1.5, opacity: 0.2 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, #0a0a14 0%, #05050f 100%)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
              <span className="text-sm font-mono text-neon-cyan">Frontend Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-pretty leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {data.name}
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 text-balance leading-relaxed">
              {data.title}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground/80 mb-8 max-w-xl text-balance leading-relaxed">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-mono text-sm text-neon-blue">Available for work</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                <span className="font-mono text-sm text-neon-purple">Fast & Scalable</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold
                 bg-gradient-to-br from-neon-purple to-neon-blue text-background
                 shadow-lg shadow-neon-purple/30 transition-all duration-300
                 hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-neon-blue/40"
              >
                <Mail size={20} className="opacity-95 transition-transform duration-300 group-hover:-rotate-6" />
                <span className="tracking-wide">{data.ctaHire}</span>
              </a>

              <a
                href="/nabil_cv.pdf"
                download="Nabil_Lambattan_CV.pdf"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold
                 border-2 border-neon-blue/60 text-neon-blue
                 transition-all duration-300
                 hover:bg-neon-blue/10 hover:border-neon-blue hover:scale-[1.04]
                 hover:shadow-lg hover:shadow-neon-blue/30"
              >
                <Download size={20} className="transition-transform duration-300 group-hover:translate-x-[2px]" />
                <span className="tracking-wide">{data.ctaCV}</span>
              </a>
            </div>

            {/* Tech Stack — from data.json */}
            <div className="mb-12">
              <p className="text-sm text-muted-foreground mb-3">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {data.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-mono rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 group"
            >
              <span className="group-hover:text-neon-cyan group-hover:translate-x-1 transition-all duration-300">
                Explore my work
              </span>
              <ArrowDown
                size={18}
                className="text-neon-cyan transition-transform duration-300 group-hover:translate-y-1 group-hover:opacity-100 opacity-80"
              />
            </a>
          </div>

          {/* Right Visual */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-[2.5rem] blur-xl"></div>

              <div className="relative h-full rounded-[2rem] overflow-hidden border-2 border-white/10">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-neon-purple/50"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-neon-cyan/50"></div>
                </div>

                <div className="relative w-full h-full">
                  <Image
                    src={data.heroImageLink || "/hero.png"}
                    alt={data.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover object-center"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-purple rounded-bl-lg"></div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-sm border border-neon-blue/30 rounded-lg p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <code className="text-xs font-mono text-neon-blue">npm run dev</code>
                  </div>
                </div>
              </div>

              <div className="absolute -inset-4 -z-10">
                <div className="absolute inset-0 border-2 border-neon-purple/20 rounded-[3rem] animate-spin-slow"></div>
                <div className="absolute inset-4 border-2 border-neon-cyan/15 rounded-[2.5rem] animate-spin-slow-reverse" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero