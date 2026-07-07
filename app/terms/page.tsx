import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of The Better Academy website and the application process for our founding batch.",
  canonical: `${siteConfig.url}/terms`,
});

const { legal, organization } = siteConfig;

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      updated={legal.effectiveDate}
      intro="These terms govern your use of this website and your application to The Better Academy. By using the site or submitting an application, you agree to them."
    >
      <section aria-label="Template notice">
        <div className="rounded-lg border border-accent/30 bg-accent-soft/50 p-4 text-sm leading-relaxed text-ink">
          <strong>Placeholder notice:</strong> This document is a good-faith draft
          provided for launch and is not legal advice. Please have it reviewed by a
          qualified legal professional before relying on it.
        </div>
      </section>

      <section>
        <h2>1. About us</h2>
        <p>
          This website is operated by <strong>{legal.entityName}</strong>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) for The Better
          Academy, based in {organization.address.city},{" "}
          {organization.address.region}, India.
        </p>
      </section>

      <section>
        <h2>2. Acceptance of these terms</h2>
        <p>
          By accessing this website or submitting an application, you confirm that
          you accept these terms and agree to comply with them. If you do not
          agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2>3. Nature of this website</h2>
        <p>
          This is a launch and pre-registration website for an upcoming academy
          programme. Information about the programme, dates, curriculum, and
          batches is indicative and may change. Nothing on this site constitutes a
          binding offer of admission or enrolment.
        </p>
      </section>

      <section>
        <h2>4. Applications and admission</h2>
        <ul>
          <li>
            Submitting an application does <strong>not</strong> guarantee admission
            to the academy.
          </li>
          <li>
            Applications are reviewed at our discretion, and selected candidates may
            be invited for further conversation.
          </li>
          <li>
            We do <strong>not</strong> collect any fees or payment through this
            website at the application stage.
          </li>
          <li>
            You are responsible for ensuring the information you provide is accurate,
            current, and complete.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Submit false, misleading, or fraudulent information</li>
          <li>
            Use the site in any way that is unlawful or could damage, disable, or
            impair it
          </li>
          <li>Attempt to gain unauthorised access to the site or its systems</li>
        </ul>
      </section>

      <section>
        <h2>6. Intellectual property</h2>
        <p>
          All content on this website — including text, design, graphics, logos, and
          showreel material — is owned by or licensed to us and is protected by
          applicable intellectual property laws. You may not reproduce, distribute,
          or reuse it without our prior written permission.
        </p>
      </section>

      <section>
        <h2>7. Third-party links</h2>
        <p>
          This site may contain links to third-party websites (such as our parent
          agency or social media profiles). We are not responsible for the content
          or practices of those sites, and their inclusion does not imply
          endorsement.
        </p>
      </section>

      <section>
        <h2>8. Disclaimers</h2>
        <p>
          This website is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. To the extent permitted by law, we make no
          warranties, express or implied, regarding the site&rsquo;s availability,
          accuracy, or fitness for a particular purpose.
        </p>
      </section>

      <section>
        <h2>9. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, we will not be liable for any
          indirect, incidental, or consequential loss arising from your use of, or
          inability to use, this website.
        </p>
      </section>

      <section>
        <h2>10. Privacy</h2>
        <p>
          Your use of this website is also governed by our{" "}
          <a href="/privacy">Privacy Policy</a>, which explains how we handle your
          personal data.
        </p>
      </section>

      <section>
        <h2>11. Changes to these terms</h2>
        <p>
          We may revise these terms from time to time. The &ldquo;Last
          updated&rdquo; date at the top reflects the current version. Continued use
          of the site after changes constitutes acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2>12. Governing law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes will be
          subject to the exclusive jurisdiction of the courts of{" "}
          {organization.address.city}, {organization.address.region}.
        </p>
      </section>

      <section>
        <h2>13. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${organization.email}`}>{organization.email}</a>.
        </p>
      </section>
    </LegalLayout>
  );
}
