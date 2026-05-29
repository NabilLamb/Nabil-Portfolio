"use client"

import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration matches client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-lg border border-purple-500/20 bg-background/50 animate-pulse" />
    )
  }

  const currentLanguage = i18n.language || "en"

  const toggleLanguage = () => {
    const newLang = currentLanguage.startsWith("fr") ? "en" : "fr"
    i18n.changeLanguage(newLang)
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", newLang)
    }
  }

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="px-3 py-1.5 rounded-lg border text-xs font-mono font-bold text-muted-foreground hover:text-foreground hover:border-purple-500/30 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
      style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
    >
      <span className={currentLanguage.startsWith("en") ? "text-purple-400 font-bold" : ""}>EN</span>
      <span className="text-muted-foreground/30">|</span>
      <span className={currentLanguage.startsWith("fr") ? "text-purple-400 font-bold" : ""}>FR</span>
    </button>
  )
}

export default LanguageSwitcher
