import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import ProjectsCard from "./ProjectsCard";
import ContactCard from "./ContactCard";
import CardFlipTransition from "./CardFlipTransition";
import ParticleFlowGroup from "./ParticleFlowGroup";
import profile from "../content/profile";
import uiText from "../content/uiText";

const panelComponents = {
  about: AboutCard,
  skills: SkillsCard,
  projects: ProjectsCard,
  contact: ContactCard,
};

function renderPanel(panel) {
  const Panel = panelComponents[panel];
  return Panel ? <Panel /> : null;
}

function HeroSection({ activePanel, setActivePanel }) {
  const hasActivePanel = activePanel !== "home";
  const [hasPanelInLayout, setHasPanelInLayout] = useState(hasActivePanel);

  function handleMainButtonClick() {
    if (!hasActivePanel) {
      setActivePanel("about");
    } else if (activePanel === "about") {
      setActivePanel("skills");
    } else if (activePanel === "skills") {
      setActivePanel("projects");
    } else if (activePanel === "projects") {
      setActivePanel("contact");
    } else {
      setActivePanel("about");
    }
  }

  return (
    <Box
      id="home"
      component="section"
      sx={{
        py: { xs: 4, md: 6 },
        overflowX: "clip",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: hasPanelInLayout ? "1fr 1.2fr" : "1fr",
            },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
            transition: "all 500ms ease",
          }}
        >
          <ParticleFlowGroup
            transitionKey={hasPanelInLayout}
            direction={hasPanelInLayout ? -1 : 1}
            sx={{
              maxWidth: hasPanelInLayout ? 680 : 760,
              mx: hasPanelInLayout ? 0 : "auto",
              transform: hasPanelInLayout
                ? "translateX(-10px)"
                : "translateX(0)",
              transition: "all 500ms ease",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              {uiText.hero.eyebrow}
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                mt: 1,
                fontWeight: 800,
                lineHeight: 1.1,
                fontSize: {
                  xs: "2.6rem",
                  md: hasPanelInLayout ? "3.2rem" : "4rem",
                },
              }}
            >
              {profile.hero.greeting}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mt: 2,
                color: "text.secondary",
                lineHeight: 1.5,
              }}
            >
              {profile.hero.headline}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 3,
                color: "text.secondary",
                lineHeight: 1.8,
              }}
            >
              {profile.hero.summary}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleMainButtonClick}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 3,
                  width: { xs: "100%", sm: "fit-content" },
                }}
              >
                {hasPanelInLayout ? uiText.hero.next : uiText.hero.start}
              </Button>

              <Button
                variant="outlined"
                size="large"
                href={`${import.meta.env.BASE_URL}${profile.resumeFile}`}
                download
                startIcon={<DownloadIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 3,
                  width: { xs: "100%", sm: "fit-content" },
                  color: "text.primary",
                  borderColor: "grey.400",
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(4px)",

                  "&:hover": {
                    borderColor: "grey.600",
                    backgroundColor: "rgba(245, 245, 245, 0.9)",
                  },
                }}
              >
                {uiText.hero.downloadResume}
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mt: 4,
                alignItems: "center",
              }}
            >
              <IconButton
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={uiText.social.linkedin}
                sx={{ color: "#0A66C2" }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>

              <IconButton
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={uiText.social.github}
                sx={{ color: "#181717" }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>

              <IconButton
                href={profile.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={uiText.social.youtube}
                sx={{ color: "#FF0000" }}
              >
                <YouTubeIcon fontSize="large" />
              </IconButton>
            </Stack>
          </ParticleFlowGroup>

          <CardFlipTransition
            activePanel={activePanel}
            onPresenceChange={setHasPanelInLayout}
            renderPanel={renderPanel}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
