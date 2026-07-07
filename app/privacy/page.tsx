import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How The Better Academy collects, uses, protects, and shares the personal data you provide when applying to our founding batch.",
  canonical: `${siteConfig.url}/privacy`,
});

const { legal, organization } = siteConfig;

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated={legal.effectiveDate}
      intro="This policy explains what personal data we collect when you apply to The Better Academy, why we collect it, how we protect it, and the rights you have over it under India's Digital Personal Data Protection Act, 2023."
    >
      <section aria-label="Template notice">
        <div className="rounded-lg border border-accent/30 bg-accent-soft/50 p-4 text-sm leading-relaxed text-ink">
          <strong>Placeholder notice:</strong> This document is a good-faith draft
          provided for launch and is not legal advice. Please have it reviewed by a
          qualified legal professional before relying on it, and confirm the entity
          name, retention periods, and grievance contact are accurate.
        </div>
      </section>

      <section>
        <h2>1. Who we are</h2>
        <p>
          The Better Academy is an initiative operated by{" "}
          <strong>{legal.entityName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
          or &ldquo;our&rdquo;), based in {organization.address.city},{" "}
          {organization.address.region}, India. For the purposes of the Digital
          Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), we act as
          the <strong>Data Fiduciary</strong> for the personal data you submit
          through this website.
        </p>
        <p>
          You can reach us about privacy matters at{" "}
          <a href={`mailto:${legal.grievanceEmail}`}>{legal.grievanceEmail}</a>.
        </p>
      </section>

      <section>
        <h2>2. The personal data we collect</h2>
        <p>
          We only collect the information you provide voluntarily through our
          application form. This includes:
        </p>
        <ul>
          <li>Your full name</li>
          <li>Email address and phone number</li>
          <li>Age, city, and current profession</li>
          <li>Your level of creative experience</li>
          <li>Your motivation statement (free text you choose to share)</li>
          <li>
            Optional links: portfolio, Instagram handle, and LinkedIn profile
          </li>
        </ul>
        <p>
          We do not intentionally collect sensitive categories of data, and we ask
          that you do not include them in free-text fields.
        </p>
      </section>

      <section>
        <h2>3. Why we use your data</h2>
        <p>We process your personal data only for these specific purposes:</p>
        <ul>
          <li>To review and evaluate your application to the founding batch</li>
          <li>
            To contact you about your application, interviews, and admission
            decisions
          </li>
          <li>
            To share relevant updates about the academy&rsquo;s launch, where you
            have consented to be contacted
          </li>
          <li>To improve our application process and respond to your queries</li>
        </ul>
      </section>

      <section>
        <h2>4. Our legal basis</h2>
        <p>
          We process your personal data on the basis of your{" "}
          <strong>consent</strong>, which you provide through a clear affirmative
          action when you tick the agreement box and submit the form. You are free
          to decline, though we will not be able to process an application without
          the required information.
        </p>
      </section>

      <section>
        <h2>5. How your data is shared</h2>
        <p>
          We do not sell your personal data. We share it only with trusted service
          providers who help us operate the application process, acting as our Data
          Processors under contract:
        </p>
        <ul>
          <li>
            <strong>EmailJS</strong> — used to deliver your application form
            submission to our inbox.
          </li>
          <li>
            <strong>Our hosting provider</strong> — used to serve this website.
          </li>
        </ul>
        <p>
          We may also disclose data where required by law or to protect our legal
          rights.
        </p>
      </section>

      <section>
        <h2>6. How long we keep it</h2>
        <p>
          We retain application data only for as long as necessary to evaluate your
          application and administer the founding batch, after which it is deleted
          or anonymised, unless a longer period is required by law. You may request
          deletion at any time (see &ldquo;Your rights&rdquo; below).
        </p>
      </section>

      <section>
        <h2>7. How we protect your data</h2>
        <p>
          We apply reasonable technical and organisational safeguards to protect
          your data against unauthorised access, loss, or misuse. However, no
          method of transmission over the internet is completely secure, and we
          cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          Under the DPDP Act, as a <strong>Data Principal</strong> you have the
          right to:
        </p>
        <ul>
          <li>Access a summary of the personal data we hold about you</li>
          <li>Request correction or updating of inaccurate data</li>
          <li>Request erasure of your personal data</li>
          <li>
            Nominate another individual to exercise your rights in the event of
            death or incapacity
          </li>
          <li>Grievance redressal (see below)</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href={`mailto:${legal.grievanceEmail}`}>{legal.grievanceEmail}</a>.
        </p>
      </section>

      <section>
        <h2>9. Withdrawing your consent</h2>
        <p>
          You may withdraw your consent at any time, with the same ease as you gave
          it, by emailing{" "}
          <a href={`mailto:${legal.grievanceEmail}`}>{legal.grievanceEmail}</a>.
          Once you withdraw consent, we will stop processing your data unless we are
          legally required to retain it. Withdrawal does not affect processing
          carried out before the withdrawal.
        </p>
      </section>

      <section>
        <h2>10. Data of minors</h2>
        <p>
          The academy is intended for adults. Our application is open only to
          individuals who are <strong>18 years of age or older</strong>, and we do
          not knowingly collect the personal data of children (individuals under 18
          under the DPDP Act). If we learn that we have inadvertently collected data
          from someone under 18, we will delete it promptly.
        </p>
      </section>

      <section>
        <h2>11. Cookies and analytics</h2>
        <p>
          This is a static website. We do not use tracking cookies for advertising.
          If we introduce analytics in the future, we will update this policy and,
          where required, seek your consent.
        </p>
      </section>

      <section>
        <h2>12. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;Last
          updated&rdquo; date at the top reflects the latest version. Material
          changes will be communicated where appropriate.
        </p>
      </section>

      <section>
        <h2>13. Grievance redressal</h2>
        <p>
          If you have any concern about how your personal data is handled, please
          contact our Grievance Officer:
        </p>
        <p>
          <strong>{legal.grievanceOfficer}</strong>
          <br />
          <a href={`mailto:${legal.grievanceEmail}`}>{legal.grievanceEmail}</a>
        </p>
        <p>
          If your grievance is not resolved to your satisfaction, you may escalate
          it to the Data Protection Board of India in accordance with the DPDP Act.
        </p>
      </section>
    </LegalLayout>
  );
}
