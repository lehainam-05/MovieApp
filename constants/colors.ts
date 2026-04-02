export const colors = {
  primary: "#08090F",
  secondary: "#141624",
  accent: "#C873FF",
  text: {
    primary: "#F4EEFF",
    secondary: "#B7B4C8",
    muted: "#8A879C",
  },
  gradient: {
    purple: ["#6A36FF", "#B55CFF", "#EBA8FF"] as const,
    purpleDark: ["#3E1C74", "#6A36FF"] as const,
    chip: ["#7A4DFF", "#C873FF"] as const,
    cardOverlay: ["rgba(6,8,18,0.1)", "rgba(6,8,18,0.9)"] as const,
  },
} as const;
