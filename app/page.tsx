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
  hero: {
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
  about: {
    title: string
    description: string
    avatar: string
    techStack: { name: string; category: string }[]
    stats: { label: string; value: number; suffix: string }[]
  }
  experiences: {
    role: string
    company: string
    location: string
    date: string
    description: string
    technologies: string[]
  }[]
  technologies: string[]
  currentlyLearning: string
  projects: {
    title: string
    image: string
    description: string
    technologies: string[]
    github: string
    demo: string
    featured?: boolean
  }[]
  testimonials: {
    name: string
    role: string
    message: string
    rating: number
    company?: string
  }[]
  contact: {
    email: string
    phone: string
    location: string
  }
  social: {
    github: string
    linkedin: string
    email: string
  }
}

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json")
        const jsonData: PortfolioData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error("Error loading portfolio data:", error)
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
        <div className="text-neon-purple text-lg">Error loading portfolio data.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Experiences data={data.experiences} />
      <Technologies data={data.technologies} currentlyLearning={data.currentlyLearning} />
      <Projects data={data.projects} />
      <Testimonials data={data.testimonials} />
      <Contact data={data.contact} />
      <Footer data={data.social} />
    </div>
  )
}