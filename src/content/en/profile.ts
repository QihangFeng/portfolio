import sharedProfile from "../shared";
import type { PortfolioProfile, Project, ProjectId, SkillGroupId } from "../types";

const skillTitles: Record<SkillGroupId, string> = {
  backend: "Backend & APIs",
  frontend: "Frontend",
  machineLearning: "AI & Machine Learning",
  databases: "Databases & ORM",
  foundations: "Languages",
  tools: "Tools & Workflow",
};

const projectText: Record<
  ProjectId,
  Pick<Project, "title" | "type" | "description">
> = {
  roboticPushing: {
    title: "Efficient Robotic Pushing with Diffusion Policy",
    type: "Robot Learning, Computer Vision & Cyber-Physical Systems",
    description:
      "Combined adaptive action execution and self-imitation-based fine-tuning in PushT simulation, using visual feedback to improve pushing success while reducing model prediction calls and average runtime.",
  },
  portfolio: {
    title: "Personal Portfolio Website",
    type: "Frontend Development",
    description:
      "Built and deployed an interactive portfolio website with React, Vite, and Material UI, featuring animated card navigation, responsive layout, and a working contact form.",
  },
  lime: {
    title: "Reliable LIME under Query Budget Constraints",
    type: "Explainable AI",
    description:
      "Built a budget sweep pipeline for LIME image explanations and designed a coarse to fine budget allocation strategy to improve faithfulness under low query budgets.",
  },
  objectPlacement: {
    title: "Object Placement Localization in Street Scenes",
    type: "Computer Vision",
    description:
      "Built a text guided computer vision pipeline for object placement in street scenes, improving validation localization performance with candidate generation, neural ranking, and ablation studies.",
  },
  balancedTrees: {
    title: "Rust Balanced Trees",
    type: "Data Structures",
    description:
      "Implemented AVL Tree and Red Black Tree in Rust with reusable generic abstractions, shared rotation logic, an interactive CLI, and Criterion benchmarks.",
  },
};

const profile: PortfolioProfile = {
  name: sharedProfile.name,
  siteTitle: "Qihang Feng Portfolio",
  initials: sharedProfile.initials,
  hero: {
    greeting: "Hi, I’m Qihang Feng.",
    headline:
      "MEng student building full stack applications and machine learning projects with React, FastAPI, PyTorch, and SQL.",
    summary:
      "I focus on practical software development, reproducible machine learning workflows, data structures, and technical content that turns complex ideas into clear materials.",
  },
  resumeFile: sharedProfile.resumeFile,
  socialLinks: sharedProfile.socialLinks,
  about: {
    location: "Edmonton, AB, Canada",
    role: "Software Engineering MEng Student",
    gpa: "GPA, 3.9 / 4.0",
    graduation: "Expected Graduation, May 2027",
    experience: [
      {
        title: "Research Assistant, Agentic AI Benchmarking",
        period: "May 2026 - Present",
        location: "University of Alberta, Edmonton, AB, Canada",
        highlights: [
          "Built a Python benchmark covering 15,584 trajectories from eight agent datasets.",
          "Evaluated LLM methods for locating failures at the agent and step levels.",
          "Developed validation tools to improve data quality.",
        ],
      },
    ],
    education: [
      {
        degree: "M.Eng. in Electrical and Computer Engineering",
        period: "Sep 2025 - Present",
        institution: "University of Alberta, Edmonton, AB, Canada",
        detail: "Specialization in Software Engineering and Intelligent Systems",
      },
      {
        degree: "B.Eng. in Internet of Things Engineering",
        period: "Sep 2019 - Jun 2023",
        institution:
          "Nanjing University of Posts and Telecommunications, China",
      },
    ],
  },
  skillGroups: sharedProfile.skillGroups.map((group) => ({
    id: group.id,
    title: skillTitles[group.id],
    skills: group.skills,
  })),
  projects: sharedProfile.projects.map((project) => ({
    id: project.id,
    ...projectText[project.id],
    tech: project.tech,
    link: project.link,
  })),
  contact: {
    introduction:
      "I am open to software development, full stack projects, machine learning research, and technical collaboration opportunities.",
    email: sharedProfile.email,
    formSubject: "New message from Qihang Feng Portfolio",
  },
};

export default profile;
