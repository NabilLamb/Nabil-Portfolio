// components/JsonLd.tsx
// Server Component — no "use client" so it renders in the initial HTML

const BASE_URL = "https://nabil-lambattan.vercel.app"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Nabil Lambattan",
  givenName: "Nabil",
  familyName: "Lambattan",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, Next.js, TypeScript, C# and ASP.NET Core. Building modern, scalable, and high-performance web applications.",
  url: BASE_URL,
  email: "lambattannabil2000@gmail.com",
  telephone: "+212639281869",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oujda",
    addressCountry: "MA",
  },
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/hero.png`,
    width: 1200,
    height: 1200,
  },
  sameAs: [
    "https://github.com/NabilLamb",
    "https://linkedin.com/in/nabil-lambattan",
    `${BASE_URL}`,
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "C#",
    "ASP.NET Core",
    "Entity Framework Core",
    "Node.js",
    "Express.js",
    "REST API Design",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Git",
    "GitHub",
    "Vercel",
    "Full-Stack Development",
    "Web Performance Optimization",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "French" },
    { "@type": "Language", name: "English" },
    { "@type": "Language", name: "Arabic" },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Nabil Lambattan — Full-Stack Developer Portfolio",
  url: BASE_URL,
  description:
    "Portfolio of Nabil Lambattan, a Full-Stack Developer specializing in React, Next.js, TypeScript, and C# / ASP.NET Core.",
  inLanguage: ["en", "fr"],
  author: { "@id": `${BASE_URL}/#person` },
  publisher: { "@id": `${BASE_URL}/#person` },
}

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE_URL}/#profilepage`,
  name: "Nabil Lambattan — Full-Stack Developer Portfolio",
  url: BASE_URL,
  description:
    "Portfolio and professional profile of Nabil Lambattan, Full-Stack Developer from Morocco.",
  inLanguage: ["en", "fr"],
  isPartOf: { "@id": `${BASE_URL}/#website` },
  mainEntity: { "@id": `${BASE_URL}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ],
  },
}

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  )
}
