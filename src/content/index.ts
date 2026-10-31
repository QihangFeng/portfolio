import englishProfile from "./en/profile";
import englishUiText from "./en/uiText";
import chineseProfile from "./zh-CN/profile";
import chineseUiText from "./zh-CN/uiText";
import type { Language, LocalizedContent } from "./types";

export const contentByLanguage: Record<Language, LocalizedContent> = {
  en: { profile: englishProfile, uiText: englishUiText },
  "zh-CN": { profile: chineseProfile, uiText: chineseUiText },
};
