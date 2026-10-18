import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode, TransitionEvent } from "react";
import { Box, useMediaQuery } from "@mui/material";
import type { CardPanelId, PanelId } from "../types/navigation";

interface CardFlipTransitionProps {
  activePanel: PanelId;
  onPresenceChange: (isPresent: boolean) => void;
  renderPanel: (panel: CardPanelId) => ReactNode;
}

interface DetachedLayout {
  left: number;
  top: number;
  width: number;
  height: number;
}

type FlipDirection = -1 | 1;
type TransitionKind = "flip" | "slide-enter" | "slide-exit";
type RestPhase = "entering" | "flip-in";
type TransitionPhase =
  | "idle"
  | "preparing-enter"
  | "exiting"
  | "flip-out"
  | "preparing-flip-in"
  | RestPhase;

const HALF_FLIP_DURATION = 220;
const SLIDE_DURATION = 480;
const SLIDE_ENTER_EASING = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const SLIDE_EXIT_EASING = "cubic-bezier(0.55, 0.06, 0.68, 0.19)";
const PANEL_ORDER: readonly CardPanelId[] = ["about", "skills", "projects", "contact"];

function getFlipDirection(
  currentPanel: CardPanelId,
  nextPanel: CardPanelId,
): FlipDirection {
  return PANEL_ORDER.indexOf(nextPanel) > PANEL_ORDER.indexOf(currentPanel)
    ? 1
    : -1;
}

function CardFlipTransition({
  activePanel,
  onPresenceChange,
  renderPanel,
}: CardFlipTransitionProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const requestedPanel = activePanel === "home" ? null : activePanel;
  const [displayedPanel, setDisplayedPanel] = useState<CardPanelId | null>(requestedPanel);
  const [rotation, setRotation] = useState(0);
  const [slideOffset, setSlideOffset] = useState("0px");
  const [opacity, setOpacity] = useState(1);
  const [transitionKind, setTransitionKind] = useState<TransitionKind>("flip");
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [detachedLayout, setDetachedLayout] = useState<DetachedLayout | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const displayedPanelRef = useRef<CardPanelId | null>(requestedPanel);
  const requestedPanelRef = useRef<CardPanelId | null>(requestedPanel);
  const phaseRef = useRef<TransitionPhase>("idle");
  const flipDirectionRef = useRef<FlipDirection>(1);
  const frameRef = useRef<number | null>(null);

  const scheduleToRest = useCallback((phase: RestPhase) => {
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

      if (container) {
        const containerRect = container.getBoundingClientRect();

        setDetachedLayout({
          left: containerRect.left,
          top: containerRect.top,
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

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
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

  if (displayedPanel === null) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        minWidth: 0,
        perspective: "1200px",
        ...(detachedLayout && {
          position: "fixed",
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
