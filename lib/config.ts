export const siteConfig = {
  name: "The Better Academy",
  shortName: "Better Academy",
  tagline: "Where advertising is taught the way it's made.",
  description:
    "A premium advertising academy from The Better Agency. Immersive training, real campaigns, and mentorship from industry practitioners — for creatives who want to make work that matters.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebetteracademy.com",
  ogImage: "/opengraph-image",
  locale: "en_IN",
  organization: {
    name: "The Better Academy",
    parentCompany: "The Better Agency",
    parentUrl: "https://thebetteragency.in",
    email: "hello@thebetteracademy.com",
    address: {
      city: "Kochi",
      region: "Kerala",
      country: "IN",
    },
  },
  social: {
    instagram: "https://instagram.com/thebetteragency",
    linkedin: "https://linkedin.com/company/thebetteragency",
    youtube: "https://youtube.com/@thebetteragency",
  },
  nav: [
    { label: "Showreel", href: "#showreel" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Journey", href: "#journey" },
    { label: "FAQ", href: "#faq" },
    { label: "Apply", href: "#apply" },
  ],
} as const;
