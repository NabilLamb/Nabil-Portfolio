// components\hero.tsx

"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  data: {
    name: string;
    title: string;
    subtitle: string;
    ctaHire: string;
    ctaCV: string;
    heroImageLink: string;
    cvLink: string;
    description: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Binary background animation
  useEffect(() => {
    const canvas = document.getElementById("binaryCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Binary characters
    const binary =
      "010110100110111101110101011100100010000001100011011011110110010001100101";
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);

    // Animation settings
    const fontSize = 14;
    const speed = 20; // Lower is faster
    let frameCount = 0;

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(10, 10, 20, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 255, 0.1)"; // Neon cyan with low opacity
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (frameCount % speed === 0) {
          // Random binary character
          const text = Math.random() > 0.5 ? "1" : "0";

          ctx.fillStyle = "rgba(0, 255, 255, 0.3)"; // Brighter for first character
          ctx.fillText(text, i * 20, drops[i] * 20);

          ctx.fillStyle = "rgba(0, 255, 200, 0.1)"; // Dimmer for trail
          ctx.fillText(
            Math.random() > 0.5 ? "1" : "0",
            i * 20,
            (drops[i] - 1) * 20
          );

          drops[i]++;

          // Reset drop if it reaches bottom
          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      }

      frameCount++;
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center"
    >
      {/* Binary Animation Background */}
      <canvas
        id="binaryCanvas"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, #0a0a14 0%, #05050f 100%)",
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 -left-40 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
              <span className="text-sm font-mono text-neon-cyan">
                Frontend Developer
              </span>
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

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-mono text-sm text-neon-blue">
                  Available for work
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
                <span className="font-mono text-sm text-neon-purple">
                  Fast & Scalable
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Hire Me */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold
               bg-gradient-to-br from-neon-purple to-neon-blue text-background
               shadow-lg shadow-neon-purple/30 transition-all duration-300
               hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-neon-blue/40"
              >
                <Mail
                  size={20}
                  className="opacity-95 transition-transform duration-300 group-hover:-rotate-6"
                />
                <span className="tracking-wide">{data.ctaHire}</span>
              </a>

              {/* Download CV */}
              <a
                href="/nabil_cv.pdf"
                download="Nabil_CV.pdf"
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold
               border-2 border-neon-blue/60 text-neon-blue 
               transition-all duration-300
               hover:bg-neon-blue/10 hover:border-neon-blue hover:scale-[1.04]
               hover:shadow-lg hover:shadow-neon-blue/30"
              >
                <Download
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-[2px]"
                />
                <span className="tracking-wide">{data.ctaCV}</span>
              </a>
            </div>

            {/* Tech Stack */}
            <div className="mb-12">
              <p className="text-sm text-muted-foreground mb-3">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "Tailwind",
                  "MongoDB",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-mono rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <a
  href="#projects"
  className="inline-flex items-center gap-2 text-sm text-muted-foreground 
             transition-all duration-300 group"
>
  <span className="group-hover:text-neon-cyan group-hover:translate-x-1 
                   transition-all duration-300">
    Explore my work
  </span>

  <ArrowDown
    size={18}
    className="text-neon-cyan transition-transform duration-300 
               group-hover:translate-y-1 group-hover:opacity-100 opacity-80"
  />
</a>

          </div>

          {/* Right Visual - Profile Image */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-neon-blue/20 to-neon-cyan/20 rounded-[2.5rem] blur-xl"></div>

              {/* Image Container */}
              <div className="relative h-full rounded-[2rem] overflow-hidden border-2 border-white/10">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-neon-purple/50"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-neon-cyan/50"></div>
                </div>

                {/* Profile Image */}
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

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10"></div>

                  {/* Corner Accents */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-purple rounded-bl-lg"></div>
                </div>

                {/* Floating Code Badge */}
                <div className="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-sm border border-neon-blue/30 rounded-lg p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <code className="text-xs font-mono text-neon-blue">
                      npm run dev
                    </code>
                  </div>
                </div>
              </div>

              {/* Animated Rings */}
              <div className="absolute -inset-4 -z-10">
                <div className="absolute inset-0 border-2 border-neon-purple/20 rounded-[3rem] animate-spin-slow"></div>
                <div
                  className="absolute inset-4 border-2 border-neon-cyan/15 rounded-[2.5rem] animate-spin-slow-reverse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
