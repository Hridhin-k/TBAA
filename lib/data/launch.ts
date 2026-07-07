export type AcademyFeature = {
  number: string;
  title: string;
  description: string;
};

export type LaunchPhase = {
  step: string;
  label: string;
  window: string;
  description: string;
  status: "open" | "upcoming";
};

export const academyFeatures: AcademyFeature[] = [
  {
    number: "01",
    title: "Real Campaigns",
    description:
      "You won't build mock projects. You'll work on live briefs — the same work our agency ships for real brands.",
  },
  {
    number: "02",
    title: "Agency Mentorship",
    description:
      "Learn beside practitioners who still make the work. Direct, unfiltered feedback from people in the room.",
  },
  {
    number: "03",
    title: "Creative Workshops",
    description:
      "Intensive studio sessions on strategy, copy, art direction, and film — craft taught the way it's practised.",
  },
  {
    number: "04",
    title: "Industry Exposure",
    description:
      "Introductions to brands, production partners, and agency leaders. A network that outlasts the program.",
  },
];

export const launchPhases: LaunchPhase[] = [
  {
    step: "01",
    label: "Applications Open",
    window: "Now",
    description: "Reserve your seat for the founding cohort.",
    status: "open",
  },
  {
    step: "02",
    label: "Selections",
    window: "Rolling",
    description: "A short conversation with our team — we review every application personally.",
    status: "upcoming",
  },
  {
    step: "03",
    label: "First Batch Begins",
    window: "2026",
    description: "The founding cohort steps inside the studio.",
    status: "upcoming",
  },
];
