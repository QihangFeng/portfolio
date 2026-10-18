import type { Dispatch, SetStateAction } from "react";

export type PanelId = "home" | "about" | "skills" | "projects" | "contact";

export type CardPanelId = Exclude<PanelId, "home">;

export interface NavigationProps {
  activePanel: PanelId;
  setActivePanel: Dispatch<SetStateAction<PanelId>>;
}
