import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type MetadataOverrides = Partial<Metadata> & { canonical?: string };

export function createMetadata(overrides?: MetadataOverrides): Metadata {
  const title = (overrides?.title as string) ?? siteConfig.name;
  const description = overrides?.description ?? siteConfig.description;
  const canonical = overrides?.canonical ?? siteConfig.url;
  const { canonical: _canonical, ...rest } = overrides ?? {};

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [
      "advertising academy",
      "creative advertising course",
      "advertising training India",
      "The Better Agency",
      "advertising mentorship",
      "creative portfolio program",
      "brand strategy training",
      "copywriting course",
      "art direction program",
    ],
    authors: [{ name: siteConfig.organization.name, url: siteConfig.url }],
    creator: siteConfig.organization.name,
    publisher: siteConfig.organization.name,
    category: "education",
    applicationName: siteConfig.name,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/apple-touch-icon.svg" }],
    },
    appleWebApp: {
      capable: true,
      title: siteConfig.shortName,
      statusBarStyle: "default",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Premium Advertising Academy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    ...rest,
  };
}
