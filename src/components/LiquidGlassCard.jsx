import { useId, useRef } from "react";
import { Box, Paper } from "@mui/material";

function LiquidGlassCard({ children, sx, ...paperProps }) {
  const rootRef = useRef(null);
  const filterFrameRef = useRef(null);
  const filterId = `liquid-glass-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  function handlePointerMove(event) {
    const root = rootRef.current;
    if (!root || event.pointerType === "touch") return;

    const rect = root.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
    const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
    const angle =
      (Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) *
        180) /
        Math.PI +
      90;

    if (filterFrameRef.current !== null) {
      cancelAnimationFrame(filterFrameRef.current);
    }

    filterFrameRef.current = requestAnimationFrame(() => {
      const currentRoot = rootRef.current;
      filterFrameRef.current = null;
      if (!currentRoot) return;

      currentRoot.style.setProperty("--glass-x", `${Math.min(100, Math.max(0, x))}%`);
      currentRoot.style.setProperty("--glass-y", `${Math.min(100, Math.max(0, y))}%`);
      currentRoot.style.setProperty("--glass-angle", `${angle}deg`);
      currentRoot.style.setProperty("--glass-gloss-opacity", "0.62");
      currentRoot.style.setProperty("--glass-rim-opacity", "1");
    });
  }

  function handlePointerLeave() {
    const root = rootRef.current;
    if (!root) return;

    if (filterFrameRef.current !== null) {
      cancelAnimationFrame(filterFrameRef.current);
      filterFrameRef.current = null;
    }

    root.style.setProperty("--glass-x", "24%");
    root.style.setProperty("--glass-y", "10%");
    root.style.setProperty("--glass-angle", "128deg");
    root.style.setProperty("--glass-gloss-opacity", "0.34");
    root.style.setProperty("--glass-rim-opacity", "0.94");
  }

  return (
    <Box
      ref={rootRef}
      data-liquid-glass-card="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      sx={{
        "--glass-x": "24%",
        "--glass-y": "10%",
        "--glass-angle": "128deg",
        "--glass-gloss-opacity": "0.34",
        "--glass-rim-opacity": "0.94",
        position: "relative",
        minWidth: 0,
        borderRadius: 4,
        isolation: "isolate",
        boxShadow:
          "0 24px 54px rgba(15, 23, 42, 0.14), 0 5px 14px rgba(15, 23, 42, 0.07)",
      }}
    >
      <Box
        component="svg"
        aria-hidden="true"
        focusable="false"
        sx={{ position: "absolute", width: 0, height: 0 }}
      >
        <filter
          id={filterId}
          x="-12%"
          y="-12%"
          width="124%"
          height="124%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.055"
            numOctaves="2"
            seed="8"
            stitchTiles="stitch"
            result="glassNoise"
          />
          <feGaussianBlur
            in="glassNoise"
            stdDeviation="0.55"
            result="softGlassNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softGlassNoise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refractedBackdrop"
          />
          <feGaussianBlur in="refractedBackdrop" stdDeviation="0.12" />
        </filter>
      </Box>

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          transform: "translate(4px, 5px)",
          backgroundImage:
            "linear-gradient(145deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.2) 52%, rgba(15,23,42,0.13) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.58)",
          boxShadow:
            "0 18px 34px rgba(15,23,42,0.12), inset 2px 2px 2px rgba(255,255,255,0.56), inset -3px -4px 6px rgba(15,23,42,0.12)",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          borderRadius: "inherit",
          pointerEvents: "none",
          overflow: "hidden",
          backgroundColor: "rgba(252, 253, 255, 0.6)",
          backgroundImage:
            "linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 42%, transparent 64%, rgba(255,255,255,0.1) 100%)",
          backdropFilter: "blur(9px) saturate(116%) brightness(102%)",
          WebkitBackdropFilter: "blur(9px) saturate(116%) brightness(102%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.82), inset 0 -1px 0 rgba(15,23,42,0.06)",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          borderRadius: "inherit",
          pointerEvents: "none",
          overflow: "hidden",
          opacity: "var(--glass-gloss-opacity)",
          mixBlendMode: "screen",
          backgroundImage:
            "radial-gradient(ellipse 34% 17% at var(--glass-x) var(--glass-y), rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.24) 34%, transparent 72%), linear-gradient(132deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 24%, transparent 42%)",
          transition: "opacity 180ms ease",
        }}
      />

      <Paper
        {...paperProps}
        elevation={0}
        sx={[
          sx,
          {
            position: "relative",
            zIndex: 3,
            backgroundColor: "rgba(255, 255, 255, 0.035)",
            backgroundImage: "none",
            borderColor: "transparent",
            boxShadow: "none",
          },
        ]}
      >
        {children}
      </Paper>

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: { xs: -7, sm: -10, md: -14 },
          zIndex: 4,
          borderRadius: { xs: "23px", sm: "26px", md: "30px" },
          pointerEvents: "none",
          opacity: 1,
          border: {
            xs: "7px solid rgba(100, 116, 139, 0.38)",
            sm: "10px solid rgba(100, 116, 139, 0.38)",
            md: "14px solid rgba(100, 116, 139, 0.38)",
          },
          boxShadow:
            "0 0 14px rgba(71,85,105,0.24), 0 7px 20px rgba(51,65,85,0.13), inset 2px 2px 5px rgba(255,255,255,0.58), inset -5px -6px 10px rgba(51,65,85,0.28)",
          transition: "filter 180ms ease",
          "@supports ((-webkit-mask-composite: xor) or (mask-composite: exclude))": {
            padding: { xs: "7px", sm: "10px", md: "14px" },
            border: 0,
            backgroundImage:
              "radial-gradient(circle at 0 0, rgba(255,255,255,0.66) 0%, rgba(148,163,184,0.28) 32%, transparent 56%), radial-gradient(circle at 100% 100%, rgba(51,65,85,0.36) 0%, rgba(100,116,139,0.22) 40%, transparent 64%), linear-gradient(var(--glass-angle), rgba(226,232,240,0.76) 0%, rgba(148,163,184,0.52) 34%, rgba(100,116,139,0.48) 62%, rgba(71,85,105,0.48) 80%, rgba(203,213,225,0.64) 100%)",
            backdropFilter: "blur(5px) saturate(66%) contrast(110%) brightness(98%)",
            WebkitBackdropFilter: "blur(5px) saturate(66%) contrast(110%) brightness(98%)",
            filter: `url(#${filterId}) blur(0.55px)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: { xs: -2, md: -3 },
            borderRadius: "inherit",
            border: "2px solid rgba(71,85,105,0.22)",
            filter: "blur(1.8px)",
            opacity: 0.72,
          },
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: "var(--glass-rim-opacity)",
          border: "1px solid rgba(100, 116, 139, 0.36)",
          boxShadow:
            "inset 1px 1px 0 rgba(255,255,255,0.82), inset -1px -1px 0 rgba(51,65,85,0.25)",
          "@supports ((-webkit-mask-composite: xor) or (mask-composite: exclude))": {
            padding: "1.5px",
            border: 0,
            backgroundImage:
              "linear-gradient(var(--glass-angle), rgba(226,232,240,0.48) 0%, rgba(255,255,255,0.9) 22%, rgba(148,163,184,0.3) 47%, rgba(51,65,85,0.38) 73%, rgba(226,232,240,0.72) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          },
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          left: 16,
          right: 16,
          top: 1,
          height: 2,
          zIndex: 6,
          borderRadius: "999px",
          pointerEvents: "none",
          opacity: "var(--glass-rim-opacity)",
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.42) 72%, transparent 100%)",
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 1,
          height: 4,
          zIndex: 6,
          borderRadius: "999px",
          pointerEvents: "none",
          opacity: 0.72,
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.11) 18%, rgba(255,255,255,0.42) 52%, rgba(0,0,0,0.13) 82%, transparent 100%)",
          filter: "blur(0.6px)",
        }}
      />
    </Box>
  );
}

export default LiquidGlassCard;
