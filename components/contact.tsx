"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle,
  Clock,
  Globe,
  Linkedin,
  Github,
  Sparkles,
  Paperclip,
  User,
  MailCheck,
  AlertCircle,
} from "lucide-react"
import { useBinaryCanvas } from "@/hooks/useBinaryCanvas"
import { useTranslation } from "react-i18next"

interface ContactProps {
  data: {
    email: string
    phone: string
    location: string
    sectionTitle: string
    sectionSubtitle: string
    contactCards: Array<{
      label: string
      value: string
      link: string
      color: string
      bg: string
    }>
    socialLinks: Array<{
      label: string
      url: string
      color: string
      bg: string
      icon: string
    }>
    availabilityText: string
    availabilitySubtext: string
    formTitle: string
    formNote: string
    quickContactTitle: string
    quickContactDescription: string
  }
}

const Contact = ({ data }: ContactProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "", subject: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const canvasRef = useBinaryCanvas({ color: "0, 255, 200", fontSize: 12, speed: 0.8, opacity: 0.1 })

  const getCardIcon = (label: string) => {
    const l = label.toLowerCase()
    if (l.includes("email") || l.includes("mail")) return Mail
    if (l.includes("phone") || l.includes("téléphone") || l.includes("telephone")) return Phone
    if (l.includes("location") || l.includes("localisation")) return MapPin
    return Clock
  }

  const isCardInteractive = (label: string) => {
    const l = label.toLowerCase()
    return !(l.includes("location") || l.includes("localisation") || l.includes("time") || l.includes("temps"))
  }

  const socialIcons: Record<string, any> = {
    github: <Github size={20} />,
    linkedin: <Linkedin size={20} />,
    mail: <Mail size={20} />,
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsSubmitted(true)
        setSubmitError(false)
        setFormData({ name: "", email: "", message: "", subject: "" })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setSubmitError(true)
        setTimeout(() => setSubmitError(false), 5000)
      }
    } catch (error) {
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={ref}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(135deg, var(--section-bg) 0%, var(--section-bg-alt) 100%)", opacity: "var(--canvas-opacity)" }}
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-emerald-500/3 via-cyan-500/3 to-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 255, 200, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0, 255, 200, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-6">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-emerald-300">{t("ui.connectOnline") || "Let's Connect"}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {data.sectionTitle}
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{data.sectionSubtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 lg:col-span-1 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6">
              {data.contactCards.map((item, idx) => {
                const Icon = getCardIcon(item.label)
                return (
                  <a
                    key={idx}
                    href={item.link}
                    onClick={(e) => !isCardInteractive(item.label) && e.preventDefault()}
                    className={`group block p-4 rounded-xl ${item.bg} backdrop-blur-sm border border-white/10 hover:border-${item.color.split("-")[1]}-500/30 transition-all duration-300 hover:scale-105 cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${item.bg} border border-white/10`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className={`text-base font-medium truncate ${item.color}`}>{item.value}</p>
                      </div>
                      <div
                        className={`opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${item.color}`}
                      >
                        <Send className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
                )
              })}

              {/* Social Links */}
              <div className="p-5 rounded-xl backdrop-blur-sm" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  {t("ui.connectOnline") || "Connect Online"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target={social.url.startsWith("mailto") ? undefined : "_blank"}
                      rel={social.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className={`group flex-1 min-w-[100px] p-3 rounded-lg ${social.bg} backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer`} style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-white transition-transform duration-300 group-hover:scale-110">
                          {socialIcons[social.icon] || <Globe size={20} />}
                        </div>
                        <span className="text-xs text-white/80 group-hover:text-white transition-colors">
                          {social.label}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{data.availabilityText}</p>
                    <p className="text-xs text-muted-foreground">{data.availabilitySubtext}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-300 lg:col-span-2 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 animate-in slide-in-from-top duration-500">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="font-medium text-foreground">{t("ui.form.successTitle") || "Message Sent Successfully!"}</p>
                      <p className="text-sm text-muted-foreground">{t("ui.form.successDesc") || "I'll get back to you within 24 hours."}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 animate-in slide-in-from-top duration-500">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-medium text-red-300">{t("ui.form.errorTitle") || "Something went wrong"}</p>
                      <p className="text-sm text-red-200/80">
                        {t("ui.form.errorDesc") || "Please try emailing me directly at"}{" "}
                        <a href="mailto:lambattannabil2000@gmail.com" className="underline hover:text-red-300 transition-colors">
                          lambattannabil2000@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 md:p-8 rounded-2xl backdrop-blur-sm" style={{ background: 'var(--glass-bg)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--glass-border)' }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
                    <h3 className="text-2xl font-bold text-foreground">{data.formTitle}</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <User className="w-4 h-4" />
                        {t("ui.form.name") || "Your Name"}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                          required
                          placeholder={t("ui.form.placeholderName") || "John Doe"}
                          className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-white/5 border ${
                            activeField === "name" ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : "border-black/10 dark:border-white/10"
                          } text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-all duration-300`}
                        />
                        {formData.name && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MailCheck className="w-4 h-4" />
                        {t("ui.form.email") || "Email Address"}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                          required
                          placeholder={t("ui.form.placeholderEmail") || "john@example.com"}
                          className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-white/5 border ${
                            activeField === "email" ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : "border-black/10 dark:border-white/10"
                          } text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-all duration-300`}
                        />
                        {formData.email && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2 mb-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Paperclip className="w-4 h-4" />
                      {t("ui.form.subject") || "Subject"}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      required
                      placeholder={t("ui.form.placeholderSubject") || "Project Inquiry"}
                      className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-white/5 border ${
                        activeField === "subject" ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : "border-black/10 dark:border-white/10"
                      } text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition-all duration-300`}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2 mb-8">
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      {t("ui.form.message") || "Your Message"}
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        required
                        rows={6}
                        placeholder={t("ui.form.placeholderMessage") || "Tell me about your project, timeline, and budget..."}
                        className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-white/5 border ${
                          activeField === "message" ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : "border-black/10 dark:border-white/10"
                        } text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none resize-none transition-all duration-300`}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                        {formData.message.length}/2000
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t("ui.form.sending") || "Sending..."}
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t("ui.form.sendMessage") || "Send Message"}
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  </button>

                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                    <span>{data.formNote}</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Quick Contact CTA */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("ui.preferCall") || data.quickContactTitle}</p>
                    <p className="text-xs text-muted-foreground">{t("ui.reachDirectly") || data.quickContactDescription}</p>
                  </div>
                </div>
                <a
                  href={`tel:${data.phone}`}
                  className="px-4 py-2 rounded-lg border text-emerald-400 hover:bg-emerald-500/10 hover:text-foreground transition-all duration-300 cursor-pointer" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
                >
                  {data.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact