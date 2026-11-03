import type { ReactNode } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import CodeIcon from "@mui/icons-material/Code";
import WorkOutlineIcon from "@mui/icons-material/WorkOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import { useContent } from "../content/useContent";
import type { NavigationProps, PanelId } from "../types/navigation";

const navigationIcons = {
  home: <HomeOutlinedIcon />,
  about: <PersonOutlineIcon />,
  skills: <CodeIcon />,
  projects: <WorkOutlineIcon />,
  contact: <MailOutlineIcon />,
} satisfies Record<PanelId, ReactNode>;

function PortraitNavigation({ activePanel, setActivePanel }: NavigationProps) {
  const { uiText } = useContent();

  return (
    <Paper
      component="nav"
      elevation={0}
      data-portrait-navigation="true"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        pb: "env(safe-area-inset-bottom, 0px)",
        borderTop: "1px solid rgba(100, 116, 139, 0.18)",
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 -4px 20px rgba(15,23,42,0.045)",
      }}
    >
      <BottomNavigation
        showLabels
        value={activePanel}
        onChange={(_, value: PanelId) => setActivePanel(value)}
        sx={{ height: 72, maxWidth: 600, mx: "auto", backgroundColor: "transparent" }}
      >
        {uiText.navigation.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={navigationIcons[item.value]}
            aria-current={activePanel === item.value ? "page" : undefined}
            sx={{
              minWidth: 0,
              minHeight: 48,
              px: 0.5,
              gap: 0.5,
              color: "text.secondary",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.6875rem",
                fontWeight: 600,
                "&.Mui-selected": { fontSize: "0.6875rem" },
              },
              "& .MuiSvgIcon-root": { fontSize: 23 },
              "&.Mui-selected": {
                color: "primary.main",
                "& .MuiSvgIcon-root": {
                  backgroundColor: "rgba(25,118,210,0.09)",
                  borderRadius: 2,
                  boxShadow: "0 0 0 5px rgba(25,118,210,0.09)",
                },
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}

export default PortraitNavigation;
