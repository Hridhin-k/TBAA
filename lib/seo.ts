import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = overrides?.title ?? siteConfig.name;
  const description = overrides?.description ?? siteConfig.description;

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
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
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
    ...overrides,
  };
}
