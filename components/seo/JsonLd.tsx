import { siteConfig } from "@/lib/config";

type JsonLdProps = {
  type: "organization" | "course" | "breadcrumb";
};

export function JsonLd({ type }: JsonLdProps) {
  let data: Record<string, unknown>;

  switch (type) {
    case "organization":
      data = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: siteConfig.organization.name,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.organization.email,
        parentOrganization: {
          "@type": "Organization",
          name: siteConfig.organization.parentCompany,
          url: siteConfig.organization.parentUrl,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.organization.address.city,
          addressRegion: siteConfig.organization.address.region,
          addressCountry: siteConfig.organization.address.country,
        },
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.linkedin,
          siteConfig.social.youtube,
        ],
      };
      break;

    case "course":
      data = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "The Better Academy — Advertising Program",
        description: siteConfig.description,
        provider: {
          "@type": "EducationalOrganization",
          name: siteConfig.organization.name,
          url: siteConfig.url,
        },
        educationalLevel: "Professional",
        teaches: [
          "Advertising Strategy",
          "Creative Direction",
          "Copywriting",
          "Commercial Film",
          "Brand Campaign Development",
        ],
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Blended",
          courseWorkload: "P6M",
          location: {
            "@type": "Place",
            name: siteConfig.organization.address.city,
          },
        },
      };
      break;

    case "breadcrumb":
      data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
        ],
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
