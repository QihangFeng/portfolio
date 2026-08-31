import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiquidGlassCard from "./LiquidGlassCard";
import profile from "../content/profile";
import uiText from "../content/uiText";

function AboutCard() {
  return (
    <LiquidGlassCard
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: "1px solid",
        height: "75vh",
        overflow: "auto",
        borderColor: "divider",
        backgroundColor: "#fafafa",
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
              fontSize: 44,
              fontWeight: 800,
              bgcolor: "primary.main",
            }}
          >
            {profile.initials}
          </Avatar>

          <Box sx={{ width: "65%" }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {profile.name}
            </Typography>

            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <LocationOnIcon />
              <Typography color="text.secondary">
                {profile.about.location}
              </Typography>
            </Stack>

            <Typography color="text.secondary" sx={{ mt: 1, ml: 0.6}}>
              {profile.about.role}
            </Typography>

            <Typography color="text.secondary" sx={{ml: 0.6}}>
              {profile.about.gpa}
            </Typography>

            <Typography color="text.secondary" sx={{ml: 0.6}}>
              {profile.about.graduation}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        {/* Technical Experience */}
        <Box>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mb: 1.5, alignItems: "center" }}
          >
            <WorkIcon sx={{ color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {uiText.about.experienceHeading}
            </Typography>
          </Stack>

          {profile.about.experience.map((experience) => (
            <Box
              key={`${experience.title}-${experience.period}`}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "white",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6">{experience.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {experience.period}
              </Typography>
              <Stack direction={"row"} sx={{ alignItems: "center" }}>
                <LocationOnIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  {experience.location}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1.5, lineHeight: 1.5 }}
              >
                {experience.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Education */}
        <Box>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mb: 1.5, alignItems: "center" }}
          >
            <SchoolIcon sx={{ color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {uiText.about.educationHeading}
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {profile.about.education.map((education) => (
              <Box
                key={`${education.degree}-${education.period}`}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "white",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6">{education.degree}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {education.period}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {education.institution}
                </Typography>

                {education.detail && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {education.detail}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    </LiquidGlassCard>
  );
}

export default AboutCard;
