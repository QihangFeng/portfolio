import { useLayoutEffect, useRef } from "react";
import { Typography, useMediaQuery } from "@mui/material";

const PARTICLE_DURATION = 850;
const TARGET_CAPTURE_TIME = 500;

function seededValue(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function transformedCharacter(character, textTransform) {
  if (textTransform === "uppercase") return character.toUpperCase();
  if (textTransform === "lowercase") return character.toLowerCase();
  return character;
}

function sampleTextSnapshot(root, textNode, maxParticles) {
  const rootRect = root.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rootRect.width));
  const height = Math.max(1, Math.ceil(rootRect.height));
  const sampleCanvas = document.createElement("canvas");
  const context = sampleCanvas.getContext("2d", { willReadFrequently: true });
  const computedStyle = getComputedStyle(root);
  const fontSize = Number.parseFloat(computedStyle.fontSize);

  sampleCanvas.width = width;
  sampleCanvas.height = height;

  context.clearRect(0, 0, width, height);
  context.fillStyle = computedStyle.color;
  context.font = [
    computedStyle.fontStyle,
    computedStyle.fontWeight,
    computedStyle.fontSize,
    computedStyle.fontFamily,
  ].join(" ");
  context.textBaseline = "top";

  const text = textNode.textContent;
  const range = document.createRange();

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character.trim() === "") continue;

    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);

    const characterRect = range.getBoundingClientRect();
    const x = characterRect.left - rootRect.left;
    const y =
      characterRect.top -
      rootRect.top +
      (characterRect.height - fontSize) / 2;

    context.fillText(
      transformedCharacter(character, computedStyle.textTransform),
      x,
      y,
    );
  }

  range.detach();

  const pixels = context.getImageData(0, 0, width, height).data;
  const sampleStep = fontSize >= 44 ? 3 : 2;
  const particles = [];

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const pixelIndex = (y * width + x) * 4;
      const alpha = pixels[pixelIndex + 3];

      if (alpha < 80) continue;

      const seed = x * 0.73 + y * 1.37;

      particles.push({
        x: rootRect.left + x,
        y: rootRect.top + y,
        normalizedX: x / Math.max(rootRect.width, 1),
        normalizedY: y / Math.max(rootRect.height, 1),
        red: pixels[pixelIndex],
        green: pixels[pixelIndex + 1],
        blue: pixels[pixelIndex + 2],
        alpha: alpha / 255,
        radius: sampleStep * (0.28 + seededValue(seed + 5.8) * 0.12),
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
    particles: sampledParticles,
  };
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

function ParticleText({
  children,
  transitionKey,
  direction,
  delay = 0,
  maxParticles = 1300,
  sx,
  ...typographyProps
}) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const snapshotRef = useRef(null);
  const previousKeyRef = useRef(transitionKey);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const textNode = content?.firstChild;

    if (!root || !content || !textNode) {
      return undefined;
    }

    const currentSnapshot = sampleTextSnapshot(
      root,
      textNode,
      maxParticles,
    );
    const previousSnapshot = snapshotRef.current;

    if (
      previousKeyRef.current === transitionKey ||
      reduceMotion ||
      !previousSnapshot?.particles.length
    ) {
      previousKeyRef.current = transitionKey;
      snapshotRef.current = currentSnapshot;
      return undefined;
    }

    previousKeyRef.current = transitionKey;

    const { canvas, context } = createFlowCanvas();
    const particles = previousSnapshot.particles.map((particle, index) => {
      const seed = particle.x * 0.37 + particle.y * 0.61 + index * 0.19;

      return {
        ...particle,
        delay: seededValue(seed + 3.1) * 105,
        curve: (seededValue(seed + 7.7) - 0.5) * 54,
      };
    });
    const startTime = performance.now() + delay;
    let targetSnapshot = null;
    let animationFrame;

    content.style.opacity = "0";

    function drawFrame(now) {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / PARTICLE_DURATION, 1);
      const revealProgress = Math.max(0, (progress - 0.84) / 0.16);
      const particleOpacity = 1 - revealProgress;
      const liveRect = root.getBoundingClientRect();

      if (!targetSnapshot && elapsed >= TARGET_CAPTURE_TIME) {
        targetSnapshot = sampleTextSnapshot(root, textNode, maxParticles);
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

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
            (elapsed - particle.delay) /
              (PARTICLE_DURATION - particle.delay),
          ),
        );
        const travelProgress = easeInOutCubic(localProgress);
        const deltaX = targetX - particle.x;
        const deltaY = targetY - particle.y;
        const distance = Math.max(1, Math.hypot(deltaX, deltaY));
        const curveProgress = Math.sin(travelProgress * Math.PI);
        const directionBias = direction * 10 * curveProgress;
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
          particle.radius * (1 + curveProgress * 0.25),
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      content.style.opacity = String(revealProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(drawFrame);
      } else {
        snapshotRef.current =
          targetSnapshot ?? sampleTextSnapshot(root, textNode, maxParticles);
        content.style.opacity = "";
        canvas.remove();
      }
    }

    drawFrame(performance.now());

    return () => {
      cancelAnimationFrame(animationFrame);
      content.style.opacity = "";
      canvas.remove();
    };
  }, [delay, direction, maxParticles, reduceMotion, transitionKey]);

  return (
    <Typography
      ref={rootRef}
      {...typographyProps}
      sx={[{ position: "relative" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <span ref={contentRef}>{children}</span>
    </Typography>
  );
}

export default ParticleText;
