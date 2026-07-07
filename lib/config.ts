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
      city: "Thrissur",
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
    { label: "Academy", href: "#academy" },
    { label: "Timeline", href: "#timeline" },
    { label: "Reserve", href: "#register" },
  ],
  legal: {
    // The legal entity operating the site. Replace with the registered
    // company / firm name once confirmed with counsel.
    entityName: "The Better Agency",
    // Displayed as "Last updated" on the legal pages.
    effectiveDate: "8 July 2026",
    // DPDP Act, 2023 requires a published grievance contact.
    grievanceEmail: "privacy@thebetteracademy.com",
    grievanceOfficer: "Grievance Officer, The Better Academy",
  },
  legalPages: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
