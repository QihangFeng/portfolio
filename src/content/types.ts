import type { PanelId } from "../types/navigation";

export type SkillGroupId =
  | "backend"
  | "frontend"
  | "machineLearning"
  | "databases"
  | "foundations"
  | "tools";

export type ProjectId =
  | "roboticPushing"
  | "portfolio"
  | "lime"
  | "objectPlacement"
  | "balancedTrees";

export type SocialLinkId = "linkedin" | "github" | "youtube";

export interface HeroContent {
  greeting: string;
  headline: string;
  summary: string;
}

export interface Experience {
  title: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  period: string;
  institution: string;
  detail?: string;
}

export interface AboutContent {
  location: string;
  role: string;
  gpa: string;
  graduation: string;
  experience: Experience[];
  education: Education[];
}

export interface SkillGroup {
  id: SkillGroupId;
  title: string;
  skills: string[];
}

export interface Project {
  id: ProjectId;
  title: string;
  type: string;
  description: string;
  tech: string[];
  link: string;
}

export interface ContactContent {
  introduction: string;
  email: string;
  formSubject: string;
}

export interface PortfolioProfile {
  name: string;
  siteTitle: string;
  initials: string;
  hero: HeroContent;
  resumeFile: string;
  socialLinks: Record<SocialLinkId, string>;
  about: AboutContent;
  skillGroups: SkillGroup[];
  projects: Project[];
  contact: ContactContent;
}
export type Language = "en" | "zh-CN";

export interface NavigationItem {
  label: string;
  value: PanelId;
}

export interface UiText {
  navigation: NavigationItem[];
  hero: {
    eyebrow: string;
    start: string;
    next: string;
    downloadResume: string;
  };
  social: Record<SocialLinkId, string>;
  about: {
    experienceHeading: string;
    educationHeading: string;
  };
  skills: {
    heading: string;
    introduction: string;
  };
  projects: {
    heading: string;
    introduction: string;
    viewOnGitHub: string;
  };
  contact: {
    heading: string;
    emailLabel: string;
    quickMessageHeading: string;
    nameLabel: string;
    emailFieldLabel: string;
    messageLabel: string;
    sendMessage: string;
    sending: string;
    sentSuccessfully: string;
    helperText: string;
    hiddenFrameTitle: string;
  };
  footer: {
    rightsReserved: string;
  };
  language: {
    buttonLabel: string;
    switchLabel: string;
  };
}

export interface LocalizedContent {
  profile: PortfolioProfile;
  uiText: UiText;
}
