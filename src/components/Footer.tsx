import { Box, Typography } from "@mui/material";
import { useContent } from "../content/useContent";
import { PORTRAIT_LAYOUT } from "../theme/portrait";

function Footer() {
  const { profile, uiText } = useContent();
  return (
    <Box
      component="footer"
      sx={{
        mt: 0, // margin-top
        py: 3, // padding-top, padding-bottom
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#fafafa",
        justifyContent: "center",
        [PORTRAIT_LAYOUT]: {
          px: 3,
          py: 2,
          backgroundColor: "rgba(250, 250, 250, 0.85)",
        },
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          [PORTRAIT_LAYOUT]: { fontSize: "0.75rem", lineHeight: 1.6 },
        }}
      >
        © {new Date().getFullYear()} {profile.name}. {uiText.footer.rightsReserved}
      </Typography>
    </Box>
  );
}

export default Footer;
