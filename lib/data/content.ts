import type {
  CurriculumModule,
  FAQItem,
  JourneyStep,
  Mentor,
  PortfolioVideo,
  Testimonial,
  TimelineStep,
} from "@/types";

export const mentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Arjun Menon",
    role: "Executive Creative Director",
    expertise: "Brand Narrative & Campaign Direction",
    bio: "Two decades shaping campaigns for lifestyle, hospitality, and FMCG brands across India and the Middle East.",
    image: "/images/mentors/mentor-1.jpg",
  },
  {
    id: "mentor-2",
    name: "Priya Nair",
    role: "Head of Strategy",
    expertise: "Consumer Insight & Brand Positioning",
    bio: "Former agency planner turned educator. Believes strategy should feel as creative as the work it inspires.",
    image: "/images/mentors/mentor-2.jpg",
  },
  {
    id: "mentor-3",
    name: "Rahul Varma",
    role: "Film Director & Visual Storyteller",
    expertise: "Commercial Film & Motion",
    bio: "Directs films that live between cinema and advertising — where emotion meets brand purpose.",
    image: "/images/mentors/mentor-3.jpg",
  },
  {
    id: "mentor-4",
    name: "Meera Thomas",
    role: "Senior Art Director",
    expertise: "Visual Systems & Art Direction",
    bio: "Crafts visual worlds for brands that refuse to blend in. Obsessed with typography, texture, and tension.",
    image: "/images/mentors/mentor-4.jpg",
  },
];

export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "work-1",
    title: "A Morning Worth Waking For",
    client: "Coastal Brew Co.",
    category: "Brand Film · F&B",
    year: "2025",
    poster: "/images/portfolio/work-1-poster.jpg",
    youtubeId: "RJwwBp6_5Eo",
    duration: "1:24",
  },
  {
    id: "work-2",
    title: "Built Different",
    client: "Forge Athletics",
    category: "Campaign Film · Fitness",
    year: "2024",
    poster: "/images/portfolio/work-2-poster.jpg",
    youtubeId: "PUGWG91RzqE",
    duration: "0:45",
  },
  {
    id: "work-3",
    title: "The Art of Arrival",
    client: "Meridian Hotels",
    category: "Hospitality · Brand Film",
    year: "2024",
    poster: "/images/portfolio/work-3-poster.jpg",
    youtubeId: "_VgcGhKAg34",
    duration: "2:10",
  },
  {
    id: "work-4",
    title: "Every Thread Tells a Story",
    client: "Loom & Ladle",
    category: "Fashion · Campaign",
    year: "2023",
    poster: "/images/portfolio/work-4-poster.jpg",
    youtubeId: "5ELhcpEOIPU",
    duration: "1:52",
  },
];

export const curriculumModules: CurriculumModule[] = [
  {
    id: "mod-1",
    number: "01",
    title: "Foundations of Great Advertising",
    description:
      "Understanding what makes work timeless — insight, tension, and truth.",
    topics: ["Creative briefs", "Audience psychology", "Cultural context"],
  },
  {
    id: "mod-2",
    number: "02",
    title: "Strategy That Inspires",
    description:
      "Building strategic frameworks that unlock bold creative territories.",
    topics: ["Brand positioning", "Competitive mapping", "Narrative arcs"],
  },
  {
    id: "mod-3",
    number: "03",
    title: "Visual Language & Art Direction",
    description:
      "Developing a distinctive visual voice across every touchpoint.",
    topics: ["Composition", "Typography systems", "Mood & reference"],
  },
  {
    id: "mod-4",
    number: "04",
    title: "Copy That Moves People",
    description: "Writing headlines, scripts, and long-form copy with precision.",
    topics: ["Headline craft", "Scriptwriting", "Tone of voice"],
  },
  {
    id: "mod-5",
    number: "05",
    title: "Film & Motion",
    description:
      "From storyboard to screen — directing commercials that feel cinematic.",
    topics: ["Shot design", "Editing rhythm", "Sound & score"],
  },
  {
    id: "mod-6",
    number: "06",
    title: "Integrated Campaigns",
    description:
      "Orchestrating ideas across film, print, digital, and experiential.",
    topics: ["Channel thinking", "Campaign architecture", "Client presentation"],
  },
];

export const journeySteps: JourneyStep[] = [
  {
    id: "journey-1",
    step: "01",
    title: "Apply",
    description:
      "Share your story, your work, and your ambition. We review every application with care.",
  },
  {
    id: "journey-2",
    step: "02",
    title: "Selection",
    description:
      "A thoughtful conversation — not an interrogation. We look for curiosity, craft, and character.",
  },
  {
    id: "journey-3",
    step: "03",
    title: "Training",
    description:
      "Immersive studio sessions, live briefs, and mentorship from practitioners who still make work.",
  },
  {
    id: "journey-4",
    step: "04",
    title: "Projects",
    description:
      "Real campaigns for real brands. Build a portfolio that opens doors, not just fills pages.",
  },
  {
    id: "journey-5",
    step: "05",
    title: "Career",
    description:
      "Placement support, industry introductions, and a network that lasts beyond graduation.",
  },
];

export const timelineSteps: TimelineStep[] = [
  {
    id: "tl-1",
    phase: "Week 1–4",
    title: "Immersion",
    description: "Agency culture, creative process, and the anatomy of great campaigns.",
  },
  {
    id: "tl-2",
    phase: "Week 5–12",
    title: "Craft",
    description: "Deep dives into strategy, copy, art direction, and film.",
  },
  {
    id: "tl-3",
    phase: "Week 13–20",
    title: "Creation",
    description: "Live briefs with mentor feedback at every stage of development.",
  },
  {
    id: "tl-4",
    phase: "Week 21–24",
    title: "Launch",
    description: "Portfolio review, industry showcase, and career positioning.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "This wasn't a course — it was an apprenticeship inside a real agency mindset. Every project felt like it could go on air tomorrow.",
    name: "Ananya Krishnan",
    role: "Junior Art Director",
    cohort: "Cohort I",
  },
  {
    id: "test-2",
    quote:
      "The mentors didn't teach theory from slides. They tore apart our work, rebuilt it, and showed us what excellence actually looks like.",
    name: "Vikram S.",
    role: "Copywriter",
    cohort: "Cohort I",
  },
  {
    id: "test-3",
    quote:
      "I came in with scattered ideas. I left with a portfolio, a point of view, and the confidence to pitch my own concepts.",
    name: "Leah Joseph",
    role: "Creative Strategist",
    cohort: "Cohort I",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who is The Better Academy for?",
    answer:
      "Ambitious creatives, strategists, and aspiring advertising professionals who want rigorous, real-world training — not another online certificate. Whether you're fresh out of college or pivoting careers, we look for hunger, humility, and a portfolio of potential.",
  },
  {
    id: "faq-2",
    question: "How is this different from other advertising courses?",
    answer:
      "We're built inside an active agency. You'll work on live briefs, receive feedback from practitioners who ship campaigns weekly, and graduate with work that reflects industry standards — not classroom exercises.",
  },
  {
    id: "faq-3",
    question: "What is the duration of the program?",
    answer:
      "The core program runs approximately six months, combining intensive studio weeks with project-based learning. Exact schedules are shared during the selection process.",
  },
  {
    id: "faq-4",
    question: "Do I need prior advertising experience?",
    answer:
      "Not necessarily. We value creative thinking, cultural awareness, and a willingness to learn deeply. Some students arrive with agency experience; others bring fresh perspectives from design, film, or writing.",
  },
  {
    id: "faq-5",
    question: "Is there placement support after graduation?",
    answer:
      "Yes. We facilitate introductions to agencies, brands, and production houses in our network. Our goal is to help you land roles where your training translates immediately.",
  },
  {
    id: "faq-6",
    question: "What does the application process involve?",
    answer:
      "Submit the application form with your details and any portfolio links. Shortlisted candidates are invited for a conversation with our team. We keep the process respectful of your time and transparent at every step.",
  },
  {
    id: "faq-7",
    question: "Where is the academy located?",
    answer:
      "Our studio is based in Kochi, Kerala, with select hybrid components for remote collaboration. Full location details are provided to accepted students.",
  },
  {
    id: "faq-8",
    question: "What is the investment for the program?",
    answer:
      "Program fees are shared during your selection conversation. We believe in transparency and will walk you through what's included — mentorship, materials, studio access, and career support.",
  },
];
