import type { ApplicationStepId } from "@/lib/validation/registration";

export type JourneyStepMeta = {
  id: ApplicationStepId;
  phase: string;
  title: string;
  subtitle?: string;
};

export const journeySteps: JourneyStepMeta[] = [
  {
    id: "intro",
    phase: "Start",
    title: "Your application begins here.",
    subtitle:
      "We review every application personally. This takes about five minutes — one step at a time.",
  },
  {
    id: "identity",
    phase: "You",
    title: "First, what should we call you?",
    subtitle: "Your full name as you'd like it on your application.",
  },
  {
    id: "contact",
    phase: "Stay in touch",
    title: "How can we reach you?",
    subtitle: "We'll only use this to follow up on your application.",
  },
  {
    id: "background",
    phase: "Where you are",
    title: "Tell us a little about your world.",
    subtitle: "City, age, and what you do today.",
  },
  {
    id: "experience",
    phase: "Your level",
    title: "Where are you in your creative journey?",
    subtitle: "Select the option that feels closest to you.",
  },
  {
    id: "story",
    phase: "Your story",
    title: "Why do you want to join The Better Academy?",
    subtitle: "Be honest. We read every word.",
  },
  {
    id: "work",
    phase: "Your work",
    title: "Show us what you've made.",
    subtitle: "Links help us understand your craft — portfolio is optional.",
  },
  {
    id: "review",
    phase: "Almost there",
    title: "Review your application.",
    subtitle: "Make sure everything looks right before you send it.",
  },
];

export function getJourneyStepIndex(stepId: ApplicationStepId): number {
  return journeySteps.findIndex((s) => s.id === stepId);
}

export function getJourneyProgress(stepId: ApplicationStepId): number {
  const index = getJourneyStepIndex(stepId);
  if (index <= 0) return 0;
  return Math.round((index / (journeySteps.length - 1)) * 100);
}
