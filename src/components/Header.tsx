import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { useContent } from "../content/useContent";
import type { NavigationProps } from "../types/navigation";

function Header({ activePanel, setActivePanel }: NavigationProps) {
  const { language, setLanguage, uiText } = useContent();
  const buttonWidth = 96;
  const gap = 24;
  const activeIndex = uiText.navigation.findIndex(
    (item) => item.value === activePanel,
  );
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        pt: { xs: 7, md: 0 },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              "--nav-button-width": {
                xs: "min(96px, calc((100vw - 48px) / 5))",
                sm: "min(96px, calc((100vw - 64px) / 5))",
                md: `${buttonWidth}px`,
              },
              "--nav-gap": { xs: "4px", md: `${gap}px` },
              gap: "var(--nav-gap)",
              alignSelf: "stretch",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                width: "var(--nav-button-width)",
                height: "44px",
                borderRadius: 2,
                backgroundColor: "primary.main",
                transform: `translateX(calc(${activeIndex} * (var(--nav-button-width) + var(--nav-gap))))`,
                transition: "transform 300ms ease",
                zIndex: 0,
              }}
            />
            {uiText.navigation.map((item) => {
              return (
                <Button
                  key={item.value}
                  onClick={() => setActivePanel(item.value)}
                  sx={{
                    width: "var(--nav-button-width)",
                    minWidth: 0,
                    flexShrink: 0,
                    height: "44px",
                    px: { xs: 0.5, md: 2 },
                    zIndex: 1,
                    color:
                      activePanel === item.value ? "white" : "text.primary",
                    textTransform: "none",
                    fontSize: { xs: "13px", sm: "14px", md: "16px" },
                    fontWeight: 600,
                    fontFamily: "Arial, sans-serif",
                    fontStyle: "normal",
                    borderRadius: 2,
                    transition: "color 250ms ease",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
      <Button
        variant="outlined"
        aria-label={uiText.language.switchLabel}
        lang={language === "en" ? "zh-CN" : "en"}
        onClick={() => setLanguage(current => current === "en" ? "zh-CN" : "en")}
        startIcon={<TranslateIcon />}
        sx={{
          position: "absolute",
          right: { xs: 16, sm: 24 },
          top: { xs: 8, md: "50%" },
          transform: { xs: "none", md: "translateY(-50%)" },
          width: 112,
          height: 40,
          borderRadius: 2,
          textTransform: "none",
          whiteSpace: "nowrap",
          fontWeight: 600,
          backgroundColor: "white",
        }}
      >
        {uiText.language.buttonLabel}
      </Button>
    </AppBar>
  );
}

export default Header;
