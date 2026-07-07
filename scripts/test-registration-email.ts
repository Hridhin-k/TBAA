#!/usr/bin/env node
/**
 * Sends a test registration email via EmailJS using the same template
 * variables as the live form (lib/api/registration-email-params.ts).
 *
 * Usage:
 *   npm run test:registration-email
 *   npm run test:registration-email -- --email you@example.com
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildRegistrationEmailParams,
  sampleRegistrationData,
} from "../lib/api/registration-email-params.ts";

const EMAILJS_API = "https://api.emailjs.com/api/v1.0/email/send";

function loadEnvFile(filePath: string) {
  let content: string;
  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    return;
  }

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function getArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function main() {
  const root = resolve(import.meta.dirname, "..");
  loadEnvFile(resolve(root, ".env.local"));
  loadEnvFile(resolve(root, ".env"));

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  // Private key is required for server-side (strict mode) API calls.
  // Never expose this in client code or NEXT_PUBLIC_* vars.
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error(
      "Missing EmailJS env vars. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
        "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local"
    );
    process.exit(1);
  }

  const overrideEmail = getArg("--email");
  const data = {
    ...sampleRegistrationData,
    ...(overrideEmail ? { email: overrideEmail } : {}),
  };

  const templateParams = buildRegistrationEmailParams(data);

  console.log("Sending test registration email via EmailJS…");
  console.log(`  Service:  ${serviceId}`);
  console.log(`  Template: ${templateId}`);
  console.log(`  Applicant: ${data.fullName} <${data.email}>`);
  console.log("");

  const response = await fetch(EMAILJS_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      ...(privateKey ? { accessToken: privateKey } : {}),
      template_params: templateParams,
    }),
  });

  const body = await response.text();

  if (!response.ok) {
    console.error(`EmailJS request failed (${response.status})`);
    console.error(body || "(empty response)");

    if (response.status === 403 && body.includes("non-browser")) {
      console.error("");
      console.error(
        "EmailJS blocks server-side requests by default. To run this script:"
      );
      console.error(
        "  EmailJS Dashboard → Account → Security → enable"
      );
      console.error(
        '  "Allow API access from non-browser applications", then retry.'
      );
    }

    if (response.status === 403 && body.includes("Private Key")) {
      console.error("");
      console.error(
        "EmailJS is in strict mode and needs your Private Key. Add it to .env.local:"
      );
      console.error("  EMAILJS_PRIVATE_KEY=your_private_key");
      console.error(
        "  (EmailJS Dashboard → Account → General → Private Key)"
      );
    }

    process.exit(1);
  }

  console.log(`EmailJS OK (${response.status})`);
  console.log(body || "(empty response body)");
  console.log("");
  console.log("Check your team inbox. The email should show all applicant fields,");
  console.log('not "One or more dynamic variables are corrupted".');
  console.log("");
  console.log("Template params sent:");
  for (const [key, value] of Object.entries(templateParams)) {
    const preview =
      value.length > 80 ? `${value.slice(0, 77)}…` : value;
    console.log(`  ${key}: ${preview}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
