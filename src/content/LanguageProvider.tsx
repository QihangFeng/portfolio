import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { contentByLanguage } from "./index";
import { LanguageContext } from "./LanguageContext";
import type { Language } from "./types";

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const value = useMemo(
    () => ({ language, setLanguage, ...contentByLanguage[language] }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
