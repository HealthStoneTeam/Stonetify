import { ShareTheme } from "../models/types/share";

export type SpotifyLogoTone = "black" | "white";

export type ShareThemePalette = {
  isDark: boolean;
  posterBackground: string;
  panelBackground: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  border: string;
  controlBackground: string;
  logoTone: SpotifyLogoTone;
};

const themes: Record<ShareTheme, ShareThemePalette> = {
  classic: {
    isDark: true,
    posterBackground: "#121212",
    panelBackground: "#282828",
    text: "#FFFFFF",
    muted: "#B3B3B3",
    accent: "#1DB954",
    accent2: "#1ED760",
    border: "#3A3E3B",
    controlBackground: "#181818",
    logoTone: "white",
  },
  neon: {
    isDark: true,
    posterBackground: "#07111F",
    panelBackground: "#101D35",
    text: "#F8FBFF",
    muted: "#A8C1E8",
    accent: "#35F2F2",
    accent2: "#FF4FB8",
    border: "#2E74FF",
    controlBackground: "#13284A",
    logoTone: "white",
  },
  sunset: {
    isDark: true,
    posterBackground: "#241038",
    panelBackground: "#351A4B",
    text: "#FFF6E8",
    muted: "#F3C6A5",
    accent: "#FF8C42",
    accent2: "#7BDFF2",
    border: "#B65F84",
    controlBackground: "#44245E",
    logoTone: "white",
  },
  monochrome: {
    isDark: false,
    posterBackground: "#F4F1EA",
    panelBackground: "#FFFFFF",
    text: "#111111",
    muted: "#5D5D5D",
    accent: "#111111",
    accent2: "#7A7A7A",
    border: "#C9C3B8",
    controlBackground: "#E7E2D9",
    logoTone: "black",
  },
};

export function getShareTheme(theme: ShareTheme) {
  return themes[theme] || themes.classic;
}
