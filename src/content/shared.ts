import type { PortfolioProfile, Project, SkillGroup } from "./types";

type SharedProfile = Pick<
  PortfolioProfile,
  "name" | "initials" | "resumeFile" | "socialLinks"
> & {
  email: string;
  skillGroups: Omit<SkillGroup, "title">[];
  projects: Omit<Project, "title" | "type" | "description">[];
};

const sharedProfile: SharedProfile = {
  name: "Qihang Feng",
  initials: "QF",
  resumeFile: "Qihang_Feng_Resume.pdf",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/qihang-feng-48bb72395/",
    github: "https://github.com/QihangFeng",
    youtube: "https://www.youtube.com/@BeaverExplorers",
  },
  email: "q7feng@gmail.com",
  skillGroups: [
    {
      id: "backend",
      skills: ["FastAPI", "Node.js", "Express", "REST APIs"],
    },
    {
      id: "frontend",
      skills: ["React", "JavaScript", "TypeScript", "Vite", "Material UI"],
    },
    {
      id: "machineLearning",
      skills: ["Python", "PyTorch", "OpenCV", "scikit-learn"],
    },
    {
      id: "databases",
      skills: ["PostgreSQL", "SQL", "SQLAlchemy", "Alembic"],
    },
    {
      id: "foundations",
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Rust"],
    },
    {
      id: "tools",
      skills: ["Git", "GitHub", "pytest", "VS Code", "JupyterLab"],
    },
  ],
  projects: [
    {
      id: "roboticPushing",
      tech: ["PyTorch", "Diffusion Policy", "PushT", "OpenCV", "Fine-tuning"],
      link: "https://github.com/QihangFeng/pusht-prediction-utilization",
    },
    {
      id: "portfolio",
      tech: ["React", "Vite", "Material UI", "GitHub Pages", "Web3Forms"],
      link: "https://github.com/QihangFeng/portfolio",
    },
    {
      id: "lime",
      tech: ["Python", "LIME", "XAI", "Evaluation", "scikit-learn"],
      link:
        "https://github.com/QihangFeng/Reliable-LIME-under-Query-Budget-Constraints",
    },
    {
      id: "objectPlacement",
      tech: ["Python", "PyTorch", "Computer Vision", "Cityscapes"],
      link:
        "https://github.com/QihangFeng/Object-Placement-Localization-in-Street-Scenes",
    },
    {
      id: "balancedTrees",
      tech: ["Rust", "AVL Tree", "Red Black Tree", "Benchmarking"],
      link: "https://github.com/QihangFeng/Rust-Balanced-Trees",
    },
  ],
};

export default sharedProfile;
