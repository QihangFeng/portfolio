import { useRef, useState } from "react";

import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LiquidGlassCard from "./LiquidGlassCard";
import { useContent } from "../content/useContent";
import { PORTRAIT_LAYOUT } from "../theme/portrait";

function ContactCard() {
  const { profile, uiText } = useContent();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactLinks = [
    {
      label: uiText.contact.emailLabel,
      value: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
      icon: <EmailIcon />,
    },
  ];

  function handleSubmit() {
    setStatus("sending");
    setIsSubmitting(true);
  }

  function handleIframeLoad() {
    if (!isSubmitting) return;

    setStatus("sent");
    setIsSubmitting(false);
    formRef.current?.reset();
  }

  return (
    <LiquidGlassCard
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        height: { md: "75vh" },
        overflow: "auto",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#fafafa",
        [PORTRAIT_LAYOUT]: {
          p: { xs: 2.5, sm: 3 },
          height: "auto",
          maxHeight: "none",
          overflow: "visible",
          "& .MuiTypography-h4": { fontSize: "1.75rem", lineHeight: 1.25 },
          "& .MuiInputBase-input": { fontSize: "1rem" },
          "& .MuiOutlinedInput-root:not(.MuiInputBase-multiline)": { minHeight: 48 },
        },
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {uiText.contact.heading}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.5 }}>
            {profile.contact.introduction}
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2}>
          {contactLinks.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                p: 2,
                borderRadius: 3,
                backgroundColor: "white",
                border: "1px solid",
                borderColor: "divider",
                color: "text.primary",
                transition: "all 250ms ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 3,
                  backgroundColor: "white",
                },
                [PORTRAIT_LAYOUT]: {
                  minHeight: 60,
                  minWidth: 0,
                  "@media (hover: none)": {
                    "&:hover": { transform: "none", boxShadow: "none" },
                  },
                },
              }}
            >
              <Box
                sx={{
                  textAlign: "left",
                  [PORTRAIT_LAYOUT]: { minWidth: 0, overflowWrap: "anywhere" },
                }}
              >
                <Typography>{item.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.value}
                </Typography>
              </Box>
            </Button>
          ))}
        </Stack>

        <Divider />

        <iframe
          name="web3forms-hidden-frame"
          title={uiText.contact.hiddenFrameTitle}
          style={{ display: "none" }}
          onLoad={handleIframeLoad}
        />

        <Box
          component="form"
          ref={formRef}
          action="https://api.web3forms.com/submit"
          method="POST"
          target="web3forms-hidden-frame"
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {uiText.contact.quickMessageHeading}
          </Typography>

          <input
            type="hidden"
            name="access_key"
            value="b70606c5-556b-4982-be7b-b4b3ad942e1c"
          />

          <input
            type="hidden"
            name="subject"
            value={profile.contact.formSubject}
          />

          <input type="checkbox" name="botcheck" style={{ display: "none" }} />

          <Stack spacing={2}>
            <TextField
              name="name"
              label={uiText.contact.nameLabel}
              fullWidth
              size="small"
            />

            <TextField
              name="email"
              label={uiText.contact.emailFieldLabel}
              type="email"
              fullWidth
              size="small"
              required
            />

            <TextField
              name="message"
              label={uiText.contact.messageLabel}
              fullWidth
              multiline
              minRows={4}
              required
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                [PORTRAIT_LAYOUT]: {
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 1.5,
                  "& > :not(style) ~ :not(style)": { ml: 0, mt: 0 },
                },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 3,
                  [PORTRAIT_LAYOUT]: { width: "100%", minHeight: 48 },
                }}
              >
                {isSubmitting
                  ? uiText.contact.sending
                  : uiText.contact.sendMessage}
              </Button>

              {status !== "idle" && (
                <Typography
                  variant="body2"
                  sx={{
                    color: status === "sent"
                      ? "success.main"
                      : "text.secondary",
                    fontWeight: 600,
                  }}
                >
                  {status === "sent"
                    ? uiText.contact.sentSuccessfully
                    : uiText.contact.sending}
                </Typography>
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {uiText.contact.helperText}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </LiquidGlassCard>
  );
}

export default ContactCard;
