import { useLayoutEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";

const DISSOLVE_DURATION = 100;
const FLOW_DURATION = 400;
const REASSEMBLE_DURATION = 150;
const PARTICLE_DURATION =
  DISSOLVE_DURATION + FLOW_DURATION + REASSEMBLE_DURATION;
let rendererPromise;

function loadElementRenderer() {
  rendererPromise ??= import("html2canvas").then(
    (rendererModule) => rendererModule.default,
  );
  return rendererPromise;
}

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

async function captureElementSnapshot(root, maxParticles) {
  const marker = `particle-flow-${performance.now()}-${Math.random()}`;
  const html2canvas = await loadElementRenderer();
  const rootRect = root.getBoundingClientRect();
  const sourceElement = root.cloneNode(true);

  sourceElement.style.opacity = "1";
  sourceElement.style.visibility = "visible";
  sourceElement.style.transition = "none";
  root.dataset.particleFlowCapture = marker;

  try {
    const renderedElement = await html2canvas(root, {
      backgroundColor: null,
      logging: false,
      scale: 1,
      useCORS: true,
      onclone: (clonedDocument) => {
        const clonedRoot = clonedDocument.querySelector(
          `[data-particle-flow-capture="${marker}"]`,
        );

        if (clonedRoot) {
          clonedRoot.style.opacity = "1";
          clonedRoot.style.visibility = "visible";
          clonedRoot.style.transition = "none";
        }
      },
    });
    const context = renderedElement.getContext("2d", {
      willReadFrequently: true,
    });
    const width = renderedElement.width;
    const height = renderedElement.height;
    const pixels = context.getImageData(0, 0, width, height).data;
    const scaleX = rootRect.width / Math.max(width, 1);
    const scaleY = rootRect.height / Math.max(height, 1);
    const sampleStep = rootRect.width >= 560 ? 3 : 2;
    const particles = [];

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const pixelIndex = (y * width + x) * 4;
        const alpha = pixels[pixelIndex + 3];

        if (alpha < 64) continue;

        const localX = x * scaleX;
        const localY = y * scaleY;
        const seed = x * 0.73 + y * 1.37;

        particles.push({
          x: rootRect.left + localX,
          y: rootRect.top + localY,
          normalizedX: localX / Math.max(rootRect.width, 1),
          normalizedY: localY / Math.max(rootRect.height, 1),
          red: pixels[pixelIndex],
          green: pixels[pixelIndex + 1],
          blue: pixels[pixelIndex + 2],
          alpha: alpha / 255,
          radius: 0.72 + seededValue(seed + 5.8) * 0.42,
        });
      }
    }

    const sampledParticles =
      particles.length <= maxParticles
        ? particles
        : Array.from(
            { length: maxParticles },
            (_, index) =>
              particles[Math.floor(index * (particles.length / maxParticles))],
          );

    return {
      rect: rootRect,
      image: renderedElement,
      particles: sampledParticles,
      sourceElement,
    };
  } finally {
    if (root.dataset.particleFlowCapture === marker) {
      delete root.dataset.particleFlowCapture;
    }
  }
}

function createSourceOverlay(snapshot) {
  if (!snapshot.sourceElement) return null;

  const overlay = snapshot.sourceElement.cloneNode(true);

  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    position: "fixed",
    left: `${snapshot.rect.left}px`,
    top: `${snapshot.rect.top}px`,
    width: `${snapshot.rect.width}px`,
    height: `${snapshot.rect.height}px`,
    margin: "0",
    maxWidth: "none",
    transform: "none",
    transition: "none",
    opacity: "1",
    zIndex: "1199",
    pointerEvents: "none",
  });
  document.body.appendChild(overlay);

  return overlay;
}

function createFlowCanvas() {
  const canvas = document.createElement("canvas");
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const context = canvas.getContext("2d");

  canvas.width = Math.ceil(window.innerWidth * pixelRatio);
  canvas.height = Math.ceil(window.innerHeight * pixelRatio);
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
    zIndex: "1200",
    pointerEvents: "none",
  });

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  document.body.appendChild(canvas);

  return { canvas, context };
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress ** 3
    : 1 - (-2 * progress + 2) ** 3 / 2;
}

function ParticleFlowGroup({
  children,
  transitionKey,
  direction,
  maxParticles = 6200,
  sx,
  ...boxProps
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const rootRef = useRef(null);
  const snapshotRef = useRef(null);
  const previousKeyRef = useRef(transitionKey);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let active = true;
    let animationFrame;
    let flowCanvas;
    let sourceOverlay;
    let layoutContainer;
    let originalLayoutTransitionProperty;

    if (
      previousKeyRef.current === transitionKey ||
      reduceMotion ||
      !snapshotRef.current?.particles.length
    ) {
      previousKeyRef.current = transitionKey;

      captureElementSnapshot(root, maxParticles).then((snapshot) => {
        if (active) {
          snapshotRef.current = snapshot;
        }
      });

      return () => {
        active = false;
      };
    }

    previousKeyRef.current = transitionKey;

    const previousSnapshot = snapshotRef.current;
    const particles = previousSnapshot.particles.map((particle, index) => {
      const seed = particle.x * 0.37 + particle.y * 0.61 + index * 0.19;

      return {
        ...particle,
        delay: seededValue(seed + 3.1) * 125,
        curve: (seededValue(seed + 7.7) - 0.5) * 68,
      };
    });
    sourceOverlay = createSourceOverlay(previousSnapshot);
    const { canvas, context } = createFlowCanvas();
    const startTime = performance.now();
    const originalTransitionProperty = root.style.transitionProperty;
    let targetSnapshot = null;
    let targetCaptureStarted = false;
    let targetWaitStarted = null;
    let accumulatedTargetWait = 0;

    flowCanvas = canvas;
    layoutContainer = root.parentElement;
    originalLayoutTransitionProperty =
      layoutContainer?.style.transitionProperty ?? "";
    root.style.transitionProperty = "none";
    if (layoutContainer) {
      layoutContainer.style.transitionProperty = "none";
    }
    root.style.opacity = "0";
    root.getBoundingClientRect();

    function beginTargetCapture() {
      if (targetCaptureStarted) return;
      targetCaptureStarted = true;

      captureElementSnapshot(root, maxParticles).then((snapshot) => {
        if (!active) return;
        targetSnapshot = snapshot;
        snapshotRef.current = snapshot;
      });
    }

    function drawFrame(now) {
      let elapsed = Math.max(
        0,
        now - startTime - accumulatedTargetWait,
      );

      if (!targetSnapshot && elapsed >= DISSOLVE_DURATION) {
        targetWaitStarted ??= now;
        elapsed = DISSOLVE_DURATION;
      } else if (targetSnapshot && targetWaitStarted !== null) {
        accumulatedTargetWait += now - targetWaitStarted;
        targetWaitStarted = null;
        elapsed = Math.max(
          0,
          now - startTime - accumulatedTargetWait,
        );
      }

      const progress = Math.min(elapsed / PARTICLE_DURATION, 1);
      const dissolveProgress = Math.min(elapsed / DISSOLVE_DURATION, 1);
      const flowElapsed = Math.max(0, elapsed - DISSOLVE_DURATION);
      const flowProgress = Math.min(flowElapsed / FLOW_DURATION, 1);
      const reassembleElapsed = Math.max(
        0,
        elapsed - DISSOLVE_DURATION - FLOW_DURATION,
      );
      const reassembleProgress = Math.min(
        reassembleElapsed / REASSEMBLE_DURATION,
        1,
      );
      const particleFormationProgress =
        easeInOutCubic(
          Math.min(1, dissolveProgress / 0.58),
        );
      const sourceFadeProgress = easeInOutCubic(
        Math.min(
          1,
          Math.max(0, (dissolveProgress - 0.58) / 0.42),
        ),
      );
      const contentRevealProgress = Math.min(
        1,
        Math.max(0, (reassembleProgress - 0.22) / 0.78),
      );
      const easedContentReveal =
        1 - (1 - contentRevealProgress) ** 2;
      const liveContentProgress = Math.min(
        1,
        Math.max(0, (reassembleProgress - 0.72) / 0.28),
      );
      const easedLiveContent =
        1 - (1 - liveContentProgress) ** 2;
      const particleOpacity =
        flowProgress < 1
          ? particleFormationProgress
          : 1 - easedContentReveal;
      const liveRect = root.getBoundingClientRect();

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (sourceOverlay) {
        sourceOverlay.style.opacity = String(1 - sourceFadeProgress);

        if (dissolveProgress >= 1) {
          sourceOverlay.remove();
          sourceOverlay = null;
        }
      } else if (dissolveProgress < 1 && previousSnapshot.image) {
        context.save();
        context.globalAlpha = 1 - sourceFadeProgress;
        context.drawImage(
          previousSnapshot.image,
          previousSnapshot.rect.left,
          previousSnapshot.rect.top,
          previousSnapshot.rect.width,
          previousSnapshot.rect.height,
        );
        context.restore();
      }

      if (
        contentRevealProgress > 0 &&
        targetSnapshot?.image
      ) {
        context.save();
        context.globalAlpha =
          easedContentReveal * (1 - easedLiveContent);
        context.drawImage(
          targetSnapshot.image,
          targetSnapshot.rect.left,
          targetSnapshot.rect.top,
          targetSnapshot.rect.width,
          targetSnapshot.rect.height,
        );
        context.restore();
      }

      particles.forEach((particle, index) => {
        const exactTargets = targetSnapshot?.particles;
        const exactTarget = exactTargets?.length
          ? exactTargets[
              Math.floor(index * (exactTargets.length / particles.length))
            ]
          : null;
        const targetX =
          exactTarget?.x ??
          liveRect.left + particle.normalizedX * liveRect.width;
        const targetY =
          exactTarget?.y ??
          liveRect.top + particle.normalizedY * liveRect.height;
        const localProgress = Math.min(
          1,
          Math.max(
            0,
            (flowElapsed - particle.delay) /
              (FLOW_DURATION - particle.delay),
          ),
        );
        const travelProgress = easeInOutCubic(localProgress);
        const deltaX = targetX - particle.x;
        const deltaY = targetY - particle.y;
        const distance = Math.max(1, Math.hypot(deltaX, deltaY));
        const curveProgress = Math.sin(travelProgress * Math.PI);
        const directionBias = direction * 12 * curveProgress;
        const x =
          particle.x +
          deltaX * travelProgress -
          (deltaY / distance) * particle.curve * curveProgress +
          directionBias;
        const y =
          particle.y +
          deltaY * travelProgress +
          (deltaX / distance) * particle.curve * curveProgress;

        context.beginPath();
        context.fillStyle = `rgba(${particle.red}, ${particle.green}, ${particle.blue}, ${particle.alpha * particleOpacity})`;
        context.arc(
          x,
          y,
          particle.radius * (1 + curveProgress * 0.22),
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      root.style.opacity = targetSnapshot
        ? String(easedLiveContent)
        : String(easedContentReveal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(drawFrame);
      } else {
        root.style.opacity = "1";
        flowCanvas.remove();

        animationFrame = requestAnimationFrame(() => {
          if (!active) return;
          root.style.opacity = "";
          root.style.transitionProperty = originalTransitionProperty;
          if (layoutContainer) {
            layoutContainer.style.transitionProperty =
              originalLayoutTransitionProperty;
          }
        });

        captureElementSnapshot(root, maxParticles).then((snapshot) => {
          if (!active) return;
          snapshotRef.current = snapshot;
        });
      }
    }

    beginTargetCapture();
    drawFrame(performance.now());

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      root.style.opacity = "";
      root.style.transitionProperty = originalTransitionProperty;
      if (layoutContainer) {
        layoutContainer.style.transitionProperty =
          originalLayoutTransitionProperty;
      }
      sourceOverlay?.remove();
      flowCanvas?.remove();
    };
  }, [direction, maxParticles, reduceMotion, transitionKey]);

  return (
    <Box ref={rootRef} {...boxProps} sx={sx}>
      {children}
    </Box>
  );
}

export default ParticleFlowGroup;
