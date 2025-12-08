"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experiences from "@/components/experiences"
import Technologies from "@/components/technologies"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

type PortfolioData = {
  hero: any
  about: any
  experiences: any
  technologies: any
  projects: any
  testimonials: any
  contact: any
  social: any
}

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json")
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-neon-purple text-lg">Loading...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-neon-purple text-lg">Error loading portfolio</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Experiences data={data.experiences} />
      <Technologies data={data.technologies} />
      <Projects data={data.projects} />
      <Testimonials data={data.testimonials} />
      <Contact data={data.contact} />
      <Footer data={data.social} />
    </div>
  )
}
