import { useSyncExternalStore } from "react";
import { PORTRAIT_MAX_WIDTH } from "../theme/portrait";

interface LayoutSnapshot {
  isPortrait: boolean;
  width: number;
}

const serverSnapshot: LayoutSnapshot = { isPortrait: false, width: 0 };
let currentSnapshot: LayoutSnapshot | undefined;

function readLayout(): LayoutSnapshot {
  const width = window.innerWidth;
  const activeElement = document.activeElement;
  const isEditing = activeElement instanceof HTMLElement &&
    (activeElement.matches("input, textarea, select") || activeElement.isContentEditable);
  let isPortrait = width <= PORTRAIT_MAX_WIDTH && window.innerHeight >= width;

  // A software keyboard can make a portrait viewport wider than it is tall.
  // Keep the same shell while editing unless the actual width also changes.
  if (currentSnapshot && currentSnapshot.width === width && isEditing) {
    isPortrait = currentSnapshot.isPortrait;
  }

  if (currentSnapshot?.width === width && currentSnapshot.isPortrait === isPortrait) {
    return currentSnapshot;
  }

  return { width, isPortrait };
}

function getSnapshot() {
  currentSnapshot ??= readLayout();
  return currentSnapshot;
}

function subscribe(onStoreChange: () => void) {
  const update = () => {
    const nextSnapshot = readLayout();
    if (nextSnapshot !== currentSnapshot) {
      currentSnapshot = nextSnapshot;
      onStoreChange();
    }
  };

  window.addEventListener("resize", update);
  window.addEventListener("orientationchange", update);
  window.visualViewport?.addEventListener("resize", update);
  update();

  return () => {
    window.removeEventListener("resize", update);
    window.removeEventListener("orientationchange", update);
    window.visualViewport?.removeEventListener("resize", update);
  };
}

export function usePortraitLayout() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  return {
    isPortrait: snapshot.isPortrait,
    layoutVersion: `${snapshot.isPortrait ? "portrait" : "landscape"}:${snapshot.width}`,
  };
}
