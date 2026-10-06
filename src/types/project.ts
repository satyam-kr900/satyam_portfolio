export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  category: "AI" | "FULL-STACK" | "PLATFORM";
  github?: string;
  demo?: string;
  featured?: boolean;
  problem?: string;
  solution?: string;
  architecture?: string[];
  pipeline?: string[];
  color: string;
};

export type SkillOrbit = {
  orbit: string;
  items: { name: string; desc: string }[];
};

export type TimelineItem = {
  year: string;
  title: string;
  desc: string;
};
