"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Award,
  Heart,
  TrendingUp,
  Users,
  MessageCircle
} from "lucide-react"

interface Testimonial {
  name: string
  role: string
  message: string
  rating: number
  company?: string
}

interface TestimonialsProps {
  data: Testimonial[]
}

const Testimonials = ({ data }: TestimonialsProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

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
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: { y: number; speed: number; opacity: number }[] = Array(columns).fill(null).map(() => ({
      y: Math.random() * -canvas.height,
      speed: 0.3 + Math.random() * 1.2,
      opacity: Math.random() * 0.15 + 0.05
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
        
        // Gold/yellow tint for binary code (matching testimonial theme)
        ctx.fillStyle = `rgba(255, 215, 0, ${drop.opacity})`
        
        // Draw character
        const char = binary[Math.floor(Math.random() * binary.length)]
        ctx.fillText(char, i * fontSize, drop.y)
        
        // Move drop down
        drop.y += drop.speed
        
        // Reset drop if it's past bottom
        if (drop.y > canvas.height + 100) {
          drop.y = Math.random() * -100
          drop.speed = 0.3 + Math.random() * 1.2
          drop.opacity = Math.random() * 0.15 + 0.05
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

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, data.length])

  // Navigate to next testimonial
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 10000)
  }

  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length)
    setAutoPlay(false)
    setTimeout(() => setAutoPlay(true), 10000)
  }

  // Get random gradient for card
  const getCardGradient = (index: number) => {
    const gradients = [
      "from-amber-500/10 via-orange-500/5 to-yellow-500/10",
      "from-emerald-500/10 via-green-500/5 to-teal-500/10",
      "from-purple-500/10 via-violet-500/5 to-fuchsia-500/10",
      "from-cyan-500/10 via-blue-500/5 to-sky-500/10",
    ]
    return gradients[index % gradients.length]
  }

  // Get random border color
  const getBorderColor = (index: number) => {
    const colors = [
      "border-amber-500/30 hover:border-amber-500/60",
      "border-emerald-500/30 hover:border-emerald-500/60",
      "border-purple-500/30 hover:border-purple-500/60",
      "border-cyan-500/30 hover:border-cyan-500/60",
    ]
    return colors[index % colors.length]
  }

  // Render stars
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${
          i < rating
            ? "fill-yellow-500 text-yellow-500"
            : "fill-gray-800 text-gray-700"
        } transition-transform duration-300 hover:scale-125`}
      />
    ))
  }

  return (
    <section
      id="feedbacks"
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
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse" 
             style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-500/3 via-orange-500/3 to-amber-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`transition-all duration-1000 mb-16 text-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-6">
            <Heart className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-mono text-yellow-300">Client Love</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            What clients and colleagues say about working with me
          </p>
        </div>

        {/* Stats */}
        <div
          className={`mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { label: "Happy Clients", value: data.length * 3, icon: <Users size={20} />, color: "text-yellow-400" },
            { label: "Average Rating", value: "4.9/5", icon: <Award size={20} />, color: "text-orange-400" },
            { label: "Projects Delivered", value: "40+", icon: <TrendingUp size={20} />, color: "text-amber-400" },
            { label: "Repeat Clients", value: "85%", icon: <Heart size={20} />, color: "text-red-400" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105"
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

        {/* Main Carousel */}
        <div className="relative mb-12">
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm flex items-center justify-center text-yellow-300 hover:text-white hover:border-yellow-500/60 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 backdrop-blur-sm flex items-center justify-center text-orange-300 hover:text-white hover:border-orange-500/60 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Active testimonial card */}
          <div
            ref={carouselRef}
            className={`transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div
              key={activeIndex}
              onMouseEnter={() => setHoveredCard(activeIndex)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Main testimonial card */}
              <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-black/10 backdrop-blur-sm border border-white/10 group-hover:border-yellow-500/40 transition-all duration-300">
                {/* Quote icon */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-yellow-400" />
                </div>
                
                {/* Content */}
                <div className="space-y-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {renderStars(data[activeIndex].rating || 5)}
                    <span className="ml-2 text-sm text-yellow-400 font-medium">
                      {data[activeIndex].rating || 5}.0
                    </span>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0 text-5xl text-yellow-500/30 font-serif">"</div>
                    <p className="text-lg text-muted-foreground leading-relaxed pl-4 pr-8 italic">
                      {data[activeIndex].message}
                    </p>
                    <div className="absolute -right-6 bottom-0 text-5xl text-yellow-500/30 font-serif">"</div>
                  </div>

                  {/* Author info */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-white">{data[activeIndex].name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-orange-400">{data[activeIndex].role}</p>
                          {data[activeIndex].company && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <p className="text-sm text-muted-foreground">{data[activeIndex].company}</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${
                        hoveredCard === activeIndex 
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' 
                          : 'bg-white/5'
                      } border ${
                        hoveredCard === activeIndex 
                          ? 'border-yellow-500/30' 
                          : 'border-white/10'
                      } transition-all duration-300`}>
                        <MessageCircle className="w-5 h-5 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.slice(0, 3).map((testimonial, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveIndex(idx)}
              className={`group relative cursor-pointer transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Hover glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-amber-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getBorderColor(idx)}`}></div>
              
              {/* Testimonial card */}
              <div className={`relative p-5 rounded-xl bg-gradient-to-br ${getCardGradient(idx)} backdrop-blur-sm border ${getBorderColor(idx)} transition-all duration-300 group-hover:scale-105 ${
                activeIndex === idx ? 'ring-2 ring-yellow-500/50' : ''
              }`}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating || 5)}
                </div>

                {/* Message */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 italic">
                  "{testimonial.message}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                  {hoveredCard === idx && (
                    <div className="p-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                      <ChevronRight className="w-4 h-4 text-yellow-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-3 mb-12">
          {data.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx)
                setAutoPlay(false)
                setTimeout(() => setAutoPlay(true), 10000)
              }}
              className={`transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-10 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Auto-play toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/30 transition-all duration-300"
          >
            <div className={`w-3 h-3 rounded-full ${autoPlay ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-sm text-muted-foreground">
              {autoPlay ? 'Auto-playing' : 'Click to play'}
            </span>
          </button>
        </div>

        {/* CTA Section */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mx-auto p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-amber-500/10 border border-yellow-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Ready to share your experience?</h3>
                  <p className="text-sm text-muted-foreground">
                    Worked with me? I'd love to hear your feedback
                  </p>
                </div>
              </div>
              <button className="group relative px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/30">
                <span className="relative flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Share Your Feedback
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials