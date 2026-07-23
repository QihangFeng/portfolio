import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
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
import ParticleText from "./ParticleText";

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
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  function supportingTextMotion(delay) {
    if (reduceMotion) return {};

    return {
      "--home-text-offset": hasPanelInLayout ? "14px" : "-14px",
      animation:
        "home-supporting-text 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
      animationDelay: `${delay}ms`,
      "@keyframes home-supporting-text": {
        from: {
          opacity: 0.45,
          transform: "translateX(var(--home-text-offset))",
        },
        to: {
          opacity: 1,
          transform: "translateX(0)",
        },
      },
    };
  }

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
          <Box
            sx={{
              maxWidth: hasPanelInLayout ? 680 : 760,
              mx: hasPanelInLayout ? 0 : "auto",
              transform: hasPanelInLayout
                ? "translateX(-10px)"
                : "translateX(0)",
              transition: "all 500ms ease",
            }}
          >
            <ParticleText
              variant="overline"
              transitionKey={hasPanelInLayout}
              direction={hasPanelInLayout ? -1 : 1}
              maxParticles={760}
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              Software Engineering Portfolio · Work in Progress
            </ParticleText>

            <ParticleText
              variant="h2"
              component="h1"
              transitionKey={hasPanelInLayout}
              direction={hasPanelInLayout ? -1 : 1}
              delay={55}
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
              Hi, I’m Qihang Feng.
            </ParticleText>

            <Typography
              key={`subtitle-${hasPanelInLayout}`}
              variant="h5"
              sx={{
                mt: 2,
                color: "text.secondary",
                lineHeight: 1.5,
                ...supportingTextMotion(70),
              }}
            >
              MEng student building full stack applications and machine learning
              projects with React, FastAPI, PyTorch, and SQL.
            </Typography>

            <Typography
              key={`description-${hasPanelInLayout}`}
              variant="body1"
              sx={{
                mt: 3,
                color: "text.secondary",
                lineHeight: 1.8,
                ...supportingTextMotion(120),
              }}
            >
              I focus on practical software development, reproducible machine
              learning workflows, data structures, and technical content that
              turns complex ideas into clear materials.
            </Typography>

            <Stack
              key={`actions-${hasPanelInLayout}`}
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4, ...supportingTextMotion(165) }}
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
                {hasActivePanel ? "Next" : "Start"}
              </Button>

              <Button
                variant="outlined"
                size="large"
                href={`${import.meta.env.BASE_URL}Qihang_Feng_Resume.pdf`}
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
                Download Resume
              </Button>
            </Stack>

            <Stack
              key={`socials-${hasPanelInLayout}`}
              direction="row"
              spacing={2}
              sx={{
                mt: 4,
                alignItems: "center",
                ...supportingTextMotion(210),
              }}
            >
              <IconButton
                href="https://www.linkedin.com/in/qihang-feng-48bb72395/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: "#0A66C2" }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>

              <IconButton
                href="https://github.com/QihangFeng"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: "#181717" }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>

              <IconButton
                href="https://www.youtube.com/@BeaverExplorers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                sx={{ color: "#FF0000" }}
              >
                <YouTubeIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Box>

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
