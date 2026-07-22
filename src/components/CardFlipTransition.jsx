import { useCallback, useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

const HALF_FLIP_DURATION = 220;

function CardFlipTransition({
  activePanel,
  onPresenceChange,
  renderPanel,
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const requestedPanel = activePanel === "home" ? null : activePanel;
  const [displayedPanel, setDisplayedPanel] = useState(requestedPanel);
  const [rotation, setRotation] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const displayedPanelRef = useRef(requestedPanel);
  const requestedPanelRef = useRef(requestedPanel);
  const phaseRef = useRef("idle");
  const frameRef = useRef(null);

  const scheduleFlipIn = useCallback(() => {
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => {
        phaseRef.current = "in";
        setTransitionEnabled(true);
        setRotation(0);
      });
    });
  }, []);

  const startTransition = useCallback(() => {
    const currentPanel = displayedPanelRef.current;
    const nextPanel = requestedPanelRef.current;

    if (currentPanel === nextPanel || phaseRef.current !== "idle") return;

    setIsAnimating(true);

    if (currentPanel === null) {
      onPresenceChange(true);
      displayedPanelRef.current = nextPanel;
      phaseRef.current = "preparing-in";
      setTransitionEnabled(false);
      setDisplayedPanel(nextPanel);
      setRotation(-90);
      scheduleFlipIn();
      return;
    }

    phaseRef.current = "out";
    setTransitionEnabled(true);
    setRotation(90);
  }, [onPresenceChange, scheduleFlipIn]);

  useEffect(() => {
    requestedPanelRef.current = requestedPanel;

    const frame = requestAnimationFrame(() => {
      if (reduceMotion) {
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }

        displayedPanelRef.current = requestedPanelRef.current;
        phaseRef.current = "idle";
        onPresenceChange(requestedPanelRef.current !== null);
        setIsAnimating(false);
        setTransitionEnabled(false);
        setDisplayedPanel(requestedPanelRef.current);
        setRotation(0);
        return;
      }

      startTransition();
    });

    return () => cancelAnimationFrame(frame);
  }, [onPresenceChange, requestedPanel, reduceMotion, startTransition]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handleTransitionEnd(event) {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") {
      return;
    }

    if (phaseRef.current === "out") {
      const nextPanel = requestedPanelRef.current;

      setTransitionEnabled(false);

      if (nextPanel === null) {
        displayedPanelRef.current = null;
        phaseRef.current = "idle";
        onPresenceChange(false);
        setIsAnimating(false);
        setDisplayedPanel(null);
        setRotation(0);
        return;
      }

      displayedPanelRef.current = nextPanel;
      phaseRef.current = "preparing-in";
      setDisplayedPanel(nextPanel);
      setRotation(-90);
      scheduleFlipIn();
      return;
    }

    if (phaseRef.current === "in") {
      phaseRef.current = "idle";
      setIsAnimating(false);
      setTransitionEnabled(false);

      if (requestedPanelRef.current !== displayedPanelRef.current) {
        frameRef.current = requestAnimationFrame(startTransition);
      }
    }
  }

  if (displayedPanel === null && requestedPanel === null) return null;

  return (
    <Box sx={{ minWidth: 0, perspective: "1200px" }}>
      <Box
        aria-hidden={isAnimating}
        onTransitionEnd={handleTransitionEnd}
        sx={{
          minWidth: 0,
          transform: `rotateY(${rotation}deg)`,
          transformOrigin: "center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          opacity: rotation === 0 ? 1 : 0.55,
          pointerEvents: isAnimating ? "none" : "auto",
          transition: transitionEnabled
            ? `transform ${HALF_FLIP_DURATION}ms ease-in-out, opacity ${HALF_FLIP_DURATION}ms ease-in-out`
            : "none",
          willChange: transitionEnabled ? "transform, opacity" : "auto",
        }}
      >
        {renderPanel(displayedPanel)}
      </Box>
    </Box>
  );
}

export default CardFlipTransition;
