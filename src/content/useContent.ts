import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

export function useContent() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("Portfolio content requires a LanguageProvider.");
  }

  return context;
}
