"use client"

import { useEffect, useState } from "react"
import { I18nextProvider, useTranslation } from "react-i18next"
import i18n from "@/src/i18n"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experiences from "@/components/experiences"
import Technologies from "@/components/technologies"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-neon-purple text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PortfolioContent />
    </I18nextProvider>
  )
}

function PortfolioContent() {
  const { t } = useTranslation()

  const navbarData = t("navbar", { returnObjects: true }) as any
  const heroData = t("hero", { returnObjects: true }) as any
  const aboutData = t("about", { returnObjects: true }) as any
  const experiencesData = t("experiences", { returnObjects: true }) as any
  const technologiesData = t("technologies", { returnObjects: true }) as any
  const projectsData = t("projects", { returnObjects: true }) as any
  const projectsList = t("projectsList", { returnObjects: true }) as any[]
  const testimonialsData = t("testimonials", { returnObjects: true }) as any
  const testimonialsList = t("testimonialsList", { returnObjects: true }) as any[]
  const contactData = t("contact", { returnObjects: true }) as any
  const footerData = t("footer", { returnObjects: true }) as any

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar data={navbarData} />
      <Hero data={heroData} />
      <About data={aboutData} />
      <Experiences experiences={experiencesData.list || []} content={experiencesData} />
      <Technologies data={technologiesData.list || []} content={technologiesData} />
      <Projects data={projectsList || []} content={projectsData} />
      <Testimonials data={testimonialsList || []} content={testimonialsData} />
      <Contact data={contactData} />
      <Footer data={footerData} />
    </div>
  )
}