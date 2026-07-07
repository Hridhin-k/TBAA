import emailjs from "@emailjs/browser";
import type { RegistrationFormData } from "@/types";
import { experienceOptions } from "@/lib/validation/registration";

export type RegistrationResponse = {
  success: boolean;
  message?: string;
};

export class RegistrationError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "RegistrationError";
  }
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/**
 * Sends a registration as an email via EmailJS (no backend).
 * Configure NEXT_PUBLIC_EMAILJS_{SERVICE,TEMPLATE}_ID and _PUBLIC_KEY.
 */
export async function submitRegistration(
  data: RegistrationFormData
): Promise<RegistrationResponse> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new RegistrationError(
      "Registration is temporarily unavailable. Please try again later."
    );
  }

  const experienceLabel =
    experienceOptions.find((o) => o.value === data.experience)?.label ??
    data.experience;

  const templateParams: Record<string, string> = {
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    age: data.age,
    city: data.city,
    profession: data.profession,
    experience: experienceLabel,
    motivation: data.motivation,
    portfolio_link: data.portfolioLink ?? "",
    instagram: data.instagram ?? "",
    linkedin: data.linkedin ?? "",
    submitted_at: new Date().toLocaleString(),
    source: "website",
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      { publicKey: PUBLIC_KEY }
    );

    if (response.status !== 200) {
      throw new RegistrationError(
        "We couldn't submit your application. Please try again.",
        response.status
      );
    }

    return { success: true, message: "Application received." };
  } catch (error) {
    if (error instanceof RegistrationError) throw error;
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number((error as { status: unknown }).status)
        : undefined;
    throw new RegistrationError(
      "We couldn't submit your application. Please check your connection and try again.",
      status
    );
  }
}
