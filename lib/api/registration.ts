import type { RegistrationFormData } from "@/types";

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

export async function submitRegistration(
  data: RegistrationFormData
): Promise<RegistrationResponse> {
  const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!endpoint) {
    throw new RegistrationError(
      "Registration is temporarily unavailable. Please try again later."
    );
  }

  const payload = {
    ...data,
    submittedAt: new Date().toISOString(),
    source: "website",
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new RegistrationError(
      "We couldn't submit your application. Please try again.",
      response.status
    );
  }

  let result: RegistrationResponse;

  try {
    result = (await response.json()) as RegistrationResponse;
  } catch {
    result = { success: true, message: "Application received." };
  }

  if (!result.success) {
    throw new RegistrationError(
      result.message ?? "Submission failed. Please try again."
    );
  }

  return result;
}
