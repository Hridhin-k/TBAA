import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[+]?[\d\s-]+$/, "Please enter a valid phone number"),
  age: z
    .string()
    .min(1, "Please enter your age")
    .refine((val) => {
      const num = parseInt(val, 10);
      return num >= 18 && num <= 65;
    }, "You must be 18 or older to apply"),
  city: z
    .string()
    .min(2, "Please enter your city")
    .max(80, "City name is too long"),
  profession: z
    .string()
    .min(2, "Please tell us your current profession")
    .max(100, "Profession is too long"),
  experience: z
    .string()
    .min(1, "Please select your experience level"),
  motivation: z
    .string()
    .min(50, "Please share at least 50 characters about your motivation")
    .max(1000, "Please keep your response under 1000 characters"),
  portfolioLink: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  website: z.string().max(0, "Invalid submission").optional().or(z.literal("")),
  instagram: z
    .string()
    .min(1, "Please enter your Instagram handle")
    .max(50, "Handle is too long"),
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .min(1, "Please enter your LinkedIn profile"),
  agreement: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to continue" }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const applicationStepIds = [
  "intro",
  "identity",
  "contact",
  "background",
  "experience",
  "story",
  "work",
  "review",
] as const;

export type ApplicationStepId = (typeof applicationStepIds)[number];

export const applicationStepValidators = {
  identity: registrationSchema.pick({ fullName: true }),
  contact: registrationSchema.pick({ email: true, phone: true }),
  background: registrationSchema.pick({ city: true, age: true, profession: true }),
  experience: registrationSchema.pick({ experience: true }),
  story: registrationSchema.pick({ motivation: true }),
  work: registrationSchema.pick({
    portfolioLink: true,
    instagram: true,
    linkedin: true,
  }),
  review: registrationSchema.pick({ agreement: true }),
} as const;

export const experienceOptions = [
  { value: "student", label: "Student / Fresher" },
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5+", label: "5+ years" },
] as const;
