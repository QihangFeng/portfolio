const profile = {
  name: "Qihang Feng",
  siteTitle: "Qihang Feng Portfolio",
  initials: "QF",
  hero: {
    greeting: "Hi, I’m Qihang Feng.",
    headline:
      "MEng student building full stack applications and machine learning projects with React, FastAPI, PyTorch, and SQL.",
    summary:
      "I focus on practical software development, reproducible machine learning workflows, data structures, and technical content that turns complex ideas into clear materials.",
  },
  resumeFile: "Qihang_Feng_Resume.pdf",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/qihang-feng-48bb72395/",
    github: "https://github.com/QihangFeng",
    youtube: "https://www.youtube.com/@BeaverExplorers",
  },
  about: {
    location: "Edmonton, AB, Canada",
    role: "Software Engineering MEng Student",
    gpa: "GPA, 3.9 / 4.0",
    graduation: "Expected Graduation, May 2027",
    experience: [
      {
        title: "Research Assistant, Agentic AI Benchmarking",
        period: "May 2026 - Present",
        location:
          "University of Alberta, Edmonton, AB, Canada",
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
  skillGroups: [
    {
      id: "backend",
      title: "Backend & APIs",
      skills: ["FastAPI", "Node.js", "Express", "REST APIs"],
    },
    {
      id: "frontend",
      title: "Frontend",
      skills: ["React", "JavaScript", "Vite", "Material UI"],
    },
    {
      id: "machineLearning",
      title: "AI & Machine Learning",
      skills: ["Python", "PyTorch", "OpenCV", "scikit-learn"],
    },
    {
      id: "databases",
      title: "Databases & ORM",
      skills: ["PostgreSQL", "SQL", "SQLAlchemy", "Alembic"],
    },
    {
      id: "foundations",
      title: "Languages",
      skills: ["Python", "JavaScript", "SQL", "C++", "Rust"],
    },
    {
      id: "tools",
      title: "Tools & Workflow",
      skills: ["Git", "GitHub", "pytest", "VS Code", "JupyterLab"],
    },
  ],
  projects: [
    {
      id: "portfolio",
      title: "Personal Portfolio Website",
      type: "Frontend Development",
      description:
        "Built and deployed an interactive portfolio website with React, Vite, and Material UI, featuring animated card navigation, responsive layout, and a working contact form.",
      tech: ["React", "Vite", "Material UI", "GitHub Pages", "Web3Forms"],
      link: "https://github.com/QihangFeng/portfolio",
    },
    {
      id: "lime",
      title: "Reliable LIME under Query Budget Constraints",
      type: "Explainable AI",
      description:
        "Built a budget sweep pipeline for LIME image explanations and designed a coarse to fine budget allocation strategy to improve faithfulness under low query budgets.",
      tech: ["Python", "LIME", "XAI", "Evaluation", "scikit-learn"],
      link:
        "https://github.com/QihangFeng/Reliable-LIME-under-Query-Budget-Constraints",
    },
    {
      id: "objectPlacement",
      title: "Object Placement Localization in Street Scenes",
      type: "Computer Vision",
      description:
        "Built a text guided computer vision pipeline for object placement in street scenes, improving validation localization performance with candidate generation, neural ranking, and ablation studies.",
      tech: ["Python", "PyTorch", "Computer Vision", "Cityscapes"],
      link:
        "https://github.com/QihangFeng/Object-Placement-Localization-in-Street-Scenes",
    },
    {
      id: "balancedTrees",
      title: "Rust Balanced Trees",
      type: "Data Structures",
      description:
        "Implemented AVL Tree and Red Black Tree in Rust with reusable generic abstractions, shared rotation logic, an interactive CLI, and Criterion benchmarks.",
      tech: ["Rust", "AVL Tree", "Red Black Tree", "Benchmarking"],
      link: "https://github.com/QihangFeng/Rust-Balanced-Trees",
    },
  ],
  contact: {
    introduction:
      "I am open to software development, full stack projects, machine learning research, and technical collaboration opportunities.",
    email: "q7feng@gmail.com",
    formSubject: "New message from Qihang Feng Portfolio",
  },
};

export default profile;
