// hooks\useBinaryCanvas.ts

import { useEffect, useRef } from "react"

interface UseBinaryCanvasOptions {
  color?: string
  fontSize?: number
  speed?: number
  opacity?: number
}

export function useBinaryCanvas({
  color = "0, 255, 200",
  fontSize = 12,
  speed = 1,
  opacity = 0.15,
}: UseBinaryCanvasOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const columns = Math.floor(canvas.width / fontSize)
    const drops: { y: number; speed: number; opacity: number }[] = Array(columns)
      .fill(null)
      .map(() => ({
        y: Math.random() * -canvas.height,
        speed: 0.4 + Math.random() * speed,
        opacity: Math.random() * opacity + 0.03,
      }))

    let animationFrameId: number
    let isVisible = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      ctx.fillStyle = "rgba(8, 8, 16, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `bold ${fontSize}px 'Monaco', 'Consolas', monospace`

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        ctx.fillStyle = `rgba(${color}, ${drop.opacity})`
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * fontSize, drop.y)
        drop.y += drop.speed

        if (drop.y > canvas.height + 100) {
          drop.y = Math.random() * -100
          drop.speed = 0.4 + Math.random() * speed
          drop.opacity = Math.random() * opacity + 0.03
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [color, fontSize, speed, opacity])

  return canvasRef
}