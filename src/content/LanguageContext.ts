import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Language, LocalizedContent } from "./types";

interface LanguageContextValue extends LocalizedContent {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
