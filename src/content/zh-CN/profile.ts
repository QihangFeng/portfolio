import sharedProfile from "../shared";
import type { PortfolioProfile, Project, ProjectId, SkillGroupId } from "../types";

const skillTitles: Record<SkillGroupId, string> = {
  backend: "后端与 API",
  frontend: "前端开发",
  machineLearning: "人工智能与机器学习",
  databases: "数据库与 ORM",
  foundations: "编程语言",
  tools: "工具与工作流",
};

const projectText: Record<
  ProjectId,
  Pick<Project, "title" | "type" | "description">
> = {
  roboticPushing: {
    title: "基于扩散策略的高效机器人推物",
    type: "机器人学习、计算机视觉与信息物理系统",
    description:
      "在 PushT 仿真中结合自适应动作执行与基于自模仿的微调，利用视觉反馈提升机器人推物成功率，同时减少模型预测次数并缩短平均运行时间。",
  },
  portfolio: {
    title: "个人作品集网站",
    type: "前端开发",
    description:
      "使用 React、Vite 和 Material UI 构建并部署交互式个人作品集网站，实现动画卡片导航、响应式布局和可用的联系表单。",
  },
  lime: {
    title: "查询预算约束下的可靠 LIME",
    type: "可解释人工智能",
    description:
      "构建用于 LIME 图像解释的预算扫描流程，并设计由粗到细的预算分配策略，提升低查询预算下的解释忠实度。",
  },
  objectPlacement: {
    title: "街景中的物体放置定位",
    type: "计算机视觉",
    description:
      "构建文本引导的街景物体放置计算机视觉流程，通过候选生成、神经网络排序和消融实验，提升验证集上的定位性能。",
  },
  balancedTrees: {
    title: "Rust 平衡树",
    type: "数据结构",
    description:
      "使用 Rust 实现 AVL 树和红黑树，提供可复用的泛型抽象、共享旋转逻辑、交互式 CLI 和 Criterion 基准测试。",
  },
};

const profile: PortfolioProfile = {
  name: "冯启航",
  siteTitle: "冯启航的个人作品集",
  initials: sharedProfile.initials,
  hero: {
    greeting: "你好，我是冯启航。",
    headline:
      "我是一名工程硕士生，使用 React、FastAPI、PyTorch 和 SQL 构建全栈应用与机器学习项目。",
    summary:
      "我专注于实用软件开发、可复现的机器学习工作流、数据结构，以及将复杂概念讲解清楚的技术内容创作。",
  },
  resumeFile: sharedProfile.resumeFile,
  socialLinks: sharedProfile.socialLinks,
  about: {
    location: "加拿大阿尔伯塔省埃德蒙顿",
    role: "软件工程方向工程硕士生",
    gpa: "GPA：3.9 / 4.0",
    graduation: "预计毕业时间：2027 年 5 月",
    experience: [
      {
        title: "研究助理 · 智能体 AI 基准评测",
        period: "2026 年 5 月至今",
        location: "阿尔伯塔大学，加拿大阿尔伯塔省埃德蒙顿",
        highlights: [
          "构建 Python 基准测试框架，覆盖 8 个智能体数据集中的 15,584 条执行轨迹。",
          "评估基于 LLM 的故障定位方法，将失败定位到具体智能体和执行步骤。",
          "开发数据验证工具，提升数据质量。",
        ],
      },
    ],
    education: [
      {
        degree: "电气与计算机工程硕士（M.Eng.）",
        period: "2025 年 9 月至今",
        institution: "阿尔伯塔大学，加拿大阿尔伯塔省埃德蒙顿",
        detail: "专业方向：软件工程与智能系统",
      },
      {
        degree: "物联网工程学士（B.Eng.）",
        period: "2019 年 9 月至 2023 年 6 月",
        institution: "南京邮电大学，中国",
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
      "欢迎就软件开发、全栈项目、机器学习研究及技术合作机会与我联系。",
    email: sharedProfile.email,
    formSubject: "来自冯启航个人作品集的新留言",
  },
};

export default profile;
