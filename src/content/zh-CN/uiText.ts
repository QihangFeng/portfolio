import type { UiText } from "../types";

const uiText: UiText = {
  navigation: [
    { label: "首页", value: "home" },
    { label: "关于我", value: "about" },
    { label: "技能", value: "skills" },
    { label: "项目", value: "projects" },
    { label: "联系", value: "contact" },
  ],
  hero: {
    eyebrow: "软件工程作品集 · 开发中",
    start: "开始",
    next: "下一项",
    downloadResume: "下载简历",
  },
  social: {
    linkedin: "LinkedIn",
    github: "GitHub",
    youtube: "YouTube",
  },
  about: {
    experienceHeading: "技术经历",
    educationHeading: "教育背景",
  },
  skills: {
    heading: "技术技能",
    introduction:
      "面向全栈应用、机器学习项目与可复现软件工作流的实用技术栈。",
  },
  projects: {
    heading: "项目经历",
    introduction:
      "精选项目涵盖前端开发、可解释人工智能、计算机视觉和数据结构实现。",
    viewOnGitHub: "在 GitHub 查看",
  },
  contact: {
    heading: "联系我",
    emailLabel: "电子邮箱",
    quickMessageHeading: "快速留言",
    nameLabel: "您的姓名",
    emailFieldLabel: "您的邮箱",
    messageLabel: "留言内容",
    sendMessage: "发送留言",
    sending: "发送中...",
    sentSuccessfully: "留言已成功发送。",
    helperText: "此表单会将您的留言直接发送到我的邮箱。",
    hiddenFrameTitle: "web3forms-hidden-frame",
  },
  footer: {
    rightsReserved: "保留所有权利。",
  },
  language: {
    buttonLabel: "English",
    switchLabel: "切换为英语",
  },
};

export default uiText;
