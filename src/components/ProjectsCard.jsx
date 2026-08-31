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
import LiquidGlassCard from "./LiquidGlassCard";
import profile from "../content/profile";
import uiText from "../content/uiText";

const projectIcons = {
  portfolio: <WebIcon />,
  lime: <PsychologyIcon />,
  objectPlacement: <ImageSearchIcon />,
  balancedTrees: <AccountTreeIcon />,
};

function ProjectsCard() {
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
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {projectIcons[project.id]}
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight={800}>
                      {project.title}
                    </Typography>

                    <Typography variant="body2" color="primary.main">
                      {project.type}
                    </Typography>
                  </Box>
                </Stack>

                <Typography color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  {project.description}
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {project.tech.map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        borderRadius: 2,
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
