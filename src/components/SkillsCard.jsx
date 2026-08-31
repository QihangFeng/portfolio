import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TerminalIcon from "@mui/icons-material/Terminal";
import BuildIcon from "@mui/icons-material/Build";
import WebIcon from "@mui/icons-material/Web";
import LiquidGlassCard from "./LiquidGlassCard";
import profile from "../content/profile";
import uiText from "../content/uiText";

const skillIcons = {
  frontend: <WebIcon />,
  backend: <DnsIcon />,
  databases: <StorageIcon />,
  machineLearning: <PsychologyIcon />,
  foundations: <TerminalIcon />,
  tools: <BuildIcon />,
};

function SkillsCard() {
  return (
    <LiquidGlassCard
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        height: { md: "75vh" },
        overflowY: "auto",
        backgroundColor: "#fafafa",
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {uiText.skills.heading}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.5 }}>
            {uiText.skills.introduction}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2.5}>
          {profile.skillGroups.map((group) => (
            <Box
              key={group.title}
              sx={{
                p: 2,
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
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {skillIcons[group.id]}
                </Box>

                <Typography variant="h6">{group.title}</Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{ mt: 2 }}
              >
                {group.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </LiquidGlassCard>
  );
}

export default SkillsCard;
