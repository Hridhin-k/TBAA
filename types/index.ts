export type NavItem = {
  label: string;
  href: string;
};

export type Mentor = {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  image: string;
};

export type PortfolioVideo = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  poster: string;
  videoSrc?: string;
  youtubeId?: string;
  duration?: string;
};

export type TimelineStep = {
  id: string;
  phase: string;
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  cohort?: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type CurriculumModule = {
  id: string;
  number: string;
  title: string;
  description: string;
  topics: string[];
};

export type RegistrationFormData = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  city: string;
  profession: string;
  experience: string;
  motivation: string;
  portfolioLink?: string;
  instagram: string;
  linkedin: string;
  agreement: boolean;
};

export type JourneyStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};
