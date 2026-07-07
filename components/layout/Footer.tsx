import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white" aria-label="Site footer">
      <div className="container-editorial py-12 lg:py-16">
        <div className="editorial-grid gap-y-12">
          <div className="col-span-12 lg:col-span-6 min-w-0">
            <p className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-tight leading-none mb-6">
              The Better
              <br />
              Academy
            </p>
            <p className="text-stone-light max-w-md text-base leading-relaxed">
              A venture from{" "}
              <a
                href={siteConfig.organization.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-white transition-colors"
              >
                {siteConfig.organization.parentCompany}
              </a>
              . Training the next generation of advertising talent.
            </p>
          </div>

          <div className="col-span-6 lg:col-span-3 min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-light mb-6">
              Navigate
            </p>
            <ul className="space-y-3" role="list">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-3 min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-light mb-6">
              Connect
            </p>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.organization.email}`}
                  className="text-sm text-white/80 hover:text-white transition-colors break-words"
                >
                  {siteConfig.organization.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline bg-white/10 mt-10 mb-6" />

        <div className="flex flex-col gap-4 text-xs text-stone-light sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.organization.name}. All rights reserved.
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {siteConfig.legalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-white/70 transition-colors hover:text-white"
              >
                {page.label}
              </Link>
            ))}
            <span className="text-white/40" aria-hidden="true">
              &middot;
            </span>
            <span>Thrissur, Kerala &mdash; India</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
