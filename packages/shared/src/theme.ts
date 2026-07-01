// @go-irl/shared — Design tokens
// GO IRL: dark platform with neon-lime accent

export const theme = {
  bg: "#0A0A0A",
  bgCard: "#141414",
  bgCard2: "#1C1C1C",
  bgCard3: "#222222",
  border: "#2A2A2A",
  borderLight: "#333333",

  text: "#F0F0F0",
  textSub: "#888888",
  textMuted: "#555555",

  accent: "#C8FF00",
  accentDark: "#A3D400",
  accentDim: "#C8FF0015",
  accentBorder: "#C8FF0030",

  sport: "#3B82F6",
  sportDim: "#3B82F615",
  sportBorder: "#3B82F630",

  success: "#22C55E",
  successDim: "#22C55E15",
  warn: "#F59E0B",
  warnDim: "#F59E0B15",
  danger: "#EF4444",
  dangerDim: "#EF444415",

  radius: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 },
  fontSize: { xs: 10, sm: 12, md: 13, base: 14, lg: 16, xl: 18, xxl: 22, h: 28 },
} as const

export type Theme = typeof theme
