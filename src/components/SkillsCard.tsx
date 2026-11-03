import type { ReactNode } from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";

import StorageIcon from "@mui/icons-material/Storage";
import DnsIcon from "@mui/icons-material/Dns";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TerminalIcon from "@mui/icons-material/Terminal";
import BuildIcon from "@mui/icons-material/Build";
import WebIcon from "@mui/icons-material/Web";
import LiquidGlassCard from "./LiquidGlassCard";
import { useContent } from "../content/useContent";
import type { SkillGroupId } from "../content/types";
import { PORTRAIT_LAYOUT } from "../theme/portrait";

const skillIcons = {
  frontend: <WebIcon />,
  backend: <DnsIcon />,
  databases: <StorageIcon />,
  machineLearning: <PsychologyIcon />,
  foundations: <TerminalIcon />,
  tools: <BuildIcon />,
} satisfies Record<SkillGroupId, ReactNode>;

function SkillsCard() {
  const { profile, uiText } = useContent();
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
        [PORTRAIT_LAYOUT]: {
          p: { xs: 2.5, sm: 3 },
          height: "auto",
          maxHeight: "none",
          overflow: "visible",
          "& .MuiTypography-h4": { fontSize: "1.75rem", lineHeight: 1.25 },
          "& .MuiTypography-h6": { fontSize: "1.05rem", lineHeight: 1.4 },
        },
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: 2.5,
            alignItems: "stretch",
            [PORTRAIT_LAYOUT]: {
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.5,
            },
          }}
        >
          {profile.skillGroups.map((group) => (
            <Box
              key={group.title}
              sx={{
                p: 2,
                minWidth: 0,
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
                  "@media (hover: none)": {
                    "&:hover": { transform: "none", boxShadow: "none" },
                  },
                },
              }}
            >
              <Stack direction="row" spacing={1.5}>
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
                sx={{
                  mt: 2,
                  flexWrap: "wrap",
                  [PORTRAIT_LAYOUT]: { mt: 1.5, gap: 0.75 },
                }}
              >
                {group.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      [PORTRAIT_LAYOUT]: { fontSize: "0.75rem", height: 28 },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>
    </LiquidGlassCard>
  );
}

export default SkillsCard;
