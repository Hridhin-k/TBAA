import type { RegistrationFormData } from "@/types";
import { experienceOptions } from "@/lib/validation/registration";

const clean = (value: string | undefined, fallback = "—") =>
  (value ?? "").trim() || fallback;

/** Template variables sent to EmailJS — shared by the app and test scripts. */
export function buildRegistrationEmailParams(
  data: RegistrationFormData
): Record<string, string> {
  const experienceLabel =
    experienceOptions.find((o) => o.value === data.experience)?.label ??
    data.experience;

  return {
    full_name: clean(data.fullName),
    email: clean(data.email),
    phone: clean(data.phone),
    age: clean(data.age),
    city: clean(data.city),
    profession: clean(data.profession),
    experience: experienceLabel.replace(/\u2013/g, "-"),
    motivation: clean(data.motivation),
    portfolio_link: clean(data.portfolioLink, "Not provided"),
    instagram: clean(data.instagram),
    linkedin: clean(data.linkedin),
    submitted_at: new Date().toISOString().replace("T", " ").slice(0, 16),
    source: "website",
    reply_to: clean(data.email),
  };
}

export const sampleRegistrationData: RegistrationFormData = {
  fullName: "Test Applicant",
  email: "test.applicant@example.com",
  phone: "+91 98765 43210",
  age: "24",
  city: "Thrissur",
  profession: "Junior Copywriter",
  experience: "1-3",
  motivation:
    "This is a test application sent from scripts/test-registration-email.mjs to verify the EmailJS template renders all dynamic variables correctly.",
  portfolioLink: "",
  instagram: "@test_applicant",
  linkedin: "https://linkedin.com/in/test-applicant",
  agreement: true,
};
