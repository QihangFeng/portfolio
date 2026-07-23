import { useCallback, useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

const HALF_FLIP_DURATION = 220;
const SLIDE_DURATION = 480;
const SLIDE_ENTER_EASING = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const SLIDE_EXIT_EASING = "cubic-bezier(0.55, 0.06, 0.68, 0.19)";
const PANEL_ORDER = ["about", "skills", "projects", "contact"];

function getFlipDirection(currentPanel, nextPanel) {
  return PANEL_ORDER.indexOf(nextPanel) > PANEL_ORDER.indexOf(currentPanel)
    ? 1
    : -1;
}

function CardFlipTransition({
  activePanel,
  onPresenceChange,
  renderPanel,
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const requestedPanel = activePanel === "home" ? null : activePanel;
  const [displayedPanel, setDisplayedPanel] = useState(requestedPanel);
  const [rotation, setRotation] = useState(0);
  const [slideOffset, setSlideOffset] = useState("0px");
  const [opacity, setOpacity] = useState(1);
  const [transitionKind, setTransitionKind] = useState("flip");
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [detachedLayout, setDetachedLayout] = useState(null);

  const containerRef = useRef(null);
  const displayedPanelRef = useRef(requestedPanel);
  const requestedPanelRef = useRef(requestedPanel);
  const phaseRef = useRef("idle");
  const flipDirectionRef = useRef(1);
  const frameRef = useRef(null);

  const scheduleToRest = useCallback((phase) => {
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => {
        phaseRef.current = phase;
        setTransitionEnabled(true);
        setRotation(0);
        setSlideOffset("0px");
        setOpacity(1);
      });
    });
  }, []);

  const startTransition = useCallback(() => {
    const currentPanel = displayedPanelRef.current;
    const nextPanel = requestedPanelRef.current;

    if (currentPanel === nextPanel || phaseRef.current !== "idle") return;

    setIsAnimating(true);

    if (currentPanel === null) {
      setDetachedLayout(null);
      onPresenceChange(true);
      displayedPanelRef.current = nextPanel;
      phaseRef.current = "preparing-enter";
      setTransitionEnabled(false);
      setTransitionKind("slide-enter");
      setDisplayedPanel(nextPanel);
      setRotation(0);
      setSlideOffset("100vw");
      setOpacity(0);
      scheduleToRest("entering");
      return;
    }

    if (nextPanel === null) {
      const container = containerRef.current;
      const parent = container?.parentElement;

      if (container && parent) {
        const containerRect = container.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        setDetachedLayout({
          left: containerRect.left - parentRect.left,
          top: containerRect.top - parentRect.top,
          width: containerRect.width,
          height: containerRect.height,
        });
      }

      onPresenceChange(false);
      phaseRef.current = "exiting";
      setTransitionKind("slide-exit");
      setTransitionEnabled(true);
      setRotation(0);
      setSlideOffset("100vw");
      setOpacity(0);
      return;
    }

    flipDirectionRef.current = getFlipDirection(currentPanel, nextPanel);
    phaseRef.current = "flip-out";
    setTransitionKind("flip");
    setTransitionEnabled(true);
    setSlideOffset("0px");
    setOpacity(0.55);
    setRotation(90 * flipDirectionRef.current);
  }, [onPresenceChange, scheduleToRest]);

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
        setDetachedLayout(null);
        setTransitionEnabled(false);
        setDisplayedPanel(requestedPanelRef.current);
        setRotation(0);
        setSlideOffset("0px");
        setOpacity(1);
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

    if (phaseRef.current === "exiting") {
      displayedPanelRef.current = null;
      phaseRef.current = "idle";
      onPresenceChange(false);
      setIsAnimating(false);
      setDetachedLayout(null);
      setTransitionEnabled(false);
      setDisplayedPanel(null);
      setRotation(0);
      setSlideOffset("0px");
      setOpacity(1);
      return;
    }

    if (phaseRef.current === "flip-out") {
      const nextPanel = requestedPanelRef.current;

      setTransitionEnabled(false);

      if (nextPanel === null) {
        displayedPanelRef.current = null;
        phaseRef.current = "idle";
        onPresenceChange(false);
        setIsAnimating(false);
        setDisplayedPanel(null);
        setRotation(0);
        setSlideOffset("0px");
        setOpacity(1);
        return;
      }

      displayedPanelRef.current = nextPanel;
      phaseRef.current = "preparing-flip-in";
      setDisplayedPanel(nextPanel);
      setRotation(-90 * flipDirectionRef.current);
      setSlideOffset("0px");
      setOpacity(0.55);
      scheduleToRest("flip-in");
      return;
    }

    if (
      phaseRef.current === "entering" ||
      phaseRef.current === "flip-in"
    ) {
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
    <Box
      ref={containerRef}
      sx={{
        minWidth: 0,
        perspective: "1200px",
        ...(detachedLayout && {
          position: "absolute",
          left: `${detachedLayout.left}px`,
          top: `${detachedLayout.top}px`,
          width: `${detachedLayout.width}px`,
          height: `${detachedLayout.height}px`,
          zIndex: 2,
        }),
      }}
    >
      <Box
        aria-hidden={isAnimating}
        onTransitionEnd={handleTransitionEnd}
        sx={{
          minWidth: 0,
          transform: `translateX(${slideOffset}) rotateY(${rotation}deg)`,
          transformOrigin: "center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          opacity,
          pointerEvents: isAnimating ? "none" : "auto",
          transition: transitionEnabled
            ? transitionKind === "flip"
              ? `transform ${HALF_FLIP_DURATION}ms ease-in-out, opacity ${HALF_FLIP_DURATION}ms ease-in-out`
              : `transform ${SLIDE_DURATION}ms ${
                  transitionKind === "slide-enter"
                    ? SLIDE_ENTER_EASING
                    : SLIDE_EXIT_EASING
                }, opacity ${SLIDE_DURATION}ms ease`
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
