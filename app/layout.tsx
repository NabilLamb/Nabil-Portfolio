// app/layout.tsx

import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import JsonLd from "@/components/JsonLd"
// @ts-ignore: Importing global CSS as a side-effect.
import "./globals.css"

const BASE_URL = "https://nabil-lambattan.vercel.app"

// ─── Font loading with display:swap (prevents render-blocking) ───────────────
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

// ─── Viewport (separate export — Next.js 14+ best practice) ─────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a14" },
    { media: "(prefers-color-scheme: light)", color: "#f8f8fc" },
  ],
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // Canonical base URL — all relative paths resolve against this
  metadataBase: new URL(BASE_URL),

  // Title with template so every page shows "Page | Nabil Lambattan"
  title: {
    default: "Nabil Lambattan — Full-Stack Developer | React · Next.js · C# · .NET",
    template: "%s | Nabil Lambattan",
  },

  description:
    "Full-Stack Developer from Morocco specializing in React, Next.js, TypeScript, C# and ASP.NET Core. Building modern, scalable, and high-performance web applications. Open to new opportunities.",

  keywords: [
    "Nabil Lambattan",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "C# Developer",
    ".NET Developer",
    "ASP.NET Core",
    "Full Stack Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer Morocco",
    "Portfolio",
    "React portfolio",
    "Node.js",
    "Entity Framework",
    "REST API",
    "SQL developer",
    "JavaScript developer",
    "Oujda developer",
  ],

  authors: [{ name: "Nabil Lambattan", url: BASE_URL }],
  creator: "Nabil Lambattan",
  publisher: "Nabil Lambattan",

  // Crawling directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical + language alternates
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": `${BASE_URL}?lang=en`,
      "fr-FR": `${BASE_URL}?lang=fr`,
    },
  },

  // Open Graph — controls how URL previews render on social networks
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: BASE_URL,
    siteName: "Nabil Lambattan — Full-Stack Developer",
    title: "Nabil Lambattan — Full-Stack Developer | React · Next.js · C# · .NET",
    description:
      "Full-Stack Developer specializing in React, Next.js, TypeScript, C# and ASP.NET Core. Building modern, scalable web applications from frontend to backend.",
    images: [
      {
        url: "/opengraph-image",   // resolved via the opengraph-image.tsx route
        width: 1200,
        height: 630,
        alt: "Nabil Lambattan — Full-Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Nabil Lambattan — Full-Stack Developer",
    description:
      "React · Next.js · TypeScript · C# · ASP.NET Core · Building modern, scalable web apps.",
    images: ["/opengraph-image"],
    creator: "@NabilLambattan",  // update if you have a Twitter/X handle
  },

  // Favicons (already configured, kept intact)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon-32x32.png",
  },

  // App manifest metadata
  category: "technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* JSON-LD Structured Data — server-rendered, always visible to crawlers */}
        <JsonLd />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
