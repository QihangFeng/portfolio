import type { ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WebIcon from "@mui/icons-material/Web";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LiquidGlassCard from "./LiquidGlassCard";
import { useContent } from "../content/useContent";
import type { ProjectId } from "../content/types";
import { PORTRAIT_LAYOUT } from "../theme/portrait";

const projectIcons = {
  roboticPushing: <SmartToyIcon />,
  portfolio: <WebIcon />,
  lime: <PsychologyIcon />,
  objectPlacement: <ImageSearchIcon />,
  balancedTrees: <AccountTreeIcon />,
} satisfies Record<ProjectId, ReactNode>;

function ProjectsCard() {
  const { profile, uiText } = useContent();
  return (
    <LiquidGlassCard
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#fafafa",
        maxHeight: { md: "75vh" },
        overflowY: "auto",
        [PORTRAIT_LAYOUT]: {
          p: { xs: 2.5, sm: 3 },
          height: "auto",
          maxHeight: "none",
          overflow: "visible",
          "& .MuiTypography-h4": { fontSize: "1.75rem", lineHeight: 1.25 },
        },
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {uiText.projects.heading}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.5 }}>
            {uiText.projects.introduction}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2.5}>
          {profile.projects.map((project) => (
            <Paper
              key={project.title}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                backgroundColor: "white",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 250ms ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
                [PORTRAIT_LAYOUT]: {
                  p: 2,
                  minWidth: 0,
                  "@media (hover: none)": {
                    "&:hover": { transform: "none", boxShadow: "none" },
                  },
                },
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      [PORTRAIT_LAYOUT]: {
                        flexShrink: 0,
                        alignItems: "flex-start",
                        pt: 0.375,
                      },
                    }}
                  >
                    {projectIcons[project.id]}
                  </Box>

                  <Box sx={{ [PORTRAIT_LAYOUT]: { minWidth: 0 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        [PORTRAIT_LAYOUT]: {
                          fontSize: "1.0625rem",
                          lineHeight: 1.4,
                          overflowWrap: "anywhere",
                        },
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{ [PORTRAIT_LAYOUT]: { mt: 0.5, lineHeight: 1.5 } }}
                    >
                      {project.type}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.5,
                    [PORTRAIT_LAYOUT]: { fontSize: "0.9375rem", lineHeight: 1.65 },
                  }}
                >
                  {project.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: "wrap", [PORTRAIT_LAYOUT]: { gap: 0.75 } }}
                >
                  {project.tech.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        borderRadius: 2,
                        [PORTRAIT_LAYOUT]: {
                          maxWidth: "100%",
                          fontSize: "0.6875rem",
                          "& .MuiChip-label": { whiteSpace: "normal" },
                        },
                      }}
                    />
                  ))}
                </Stack>

                <Button
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    alignSelf: "flex-start",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 0,
                    [PORTRAIT_LAYOUT]: { minHeight: 44 },
                  }}
                >
                  {uiText.projects.viewOnGitHub}
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </LiquidGlassCard>
  );
}

export default ProjectsCard;
