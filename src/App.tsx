import { useEffect, useState } from "react";
import type { SetStateAction } from "react";
import { Box } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import type { PanelId } from "./types/navigation";
import { useContent } from "./content/useContent";
import { usePortraitLayout } from "./hooks/usePortraitLayout";
import PortraitNavigation from "./components/PortraitNavigation";

function App() {
  const { language, profile } = useContent();
  const [activePanel, setActivePanel] = useState<PanelId>("home");
  const { isPortrait, layoutVersion } = usePortraitLayout();

  function navigateToPanel(update: SetStateAction<PanelId>) {
    const panel = typeof update === "function" ? update(activePanel) : update;
    if (isPortrait && panel !== activePanel && panel !== "home") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    setActivePanel(panel);
  }

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = profile.siteTitle;
  }, [language, profile.siteTitle]);

  return (
    <Box
      lang={language}
      data-portrait-layout={isPortrait ? "true" : undefined}
      sx={{
        minHeight: isPortrait ? "100svh" : "100vh",
        display: "flex",
        flexDirection: "column",
        ...(isPortrait && {
          boxSizing: "border-box",
          pb: "calc(72px + env(safe-area-inset-bottom, 0px))",
        }),
      }}
    >
      <Header activePanel={activePanel} setActivePanel={navigateToPanel} isPortrait={isPortrait} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(isPortrait && { alignItems: "flex-start", width: "100%" }),
        }}
      >
        <HeroSection
          activePanel={activePanel}
          setActivePanel={navigateToPanel}
          isPortrait={isPortrait}
          layoutVersion={layoutVersion}
        />
      </Box>

      <Footer />
      {isPortrait && (
        <PortraitNavigation activePanel={activePanel} setActivePanel={navigateToPanel} />
      )}
    </Box>
  );
}

export default App;
