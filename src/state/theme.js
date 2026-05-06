export const themes = [
  {
    id: "ice",
    name: "Ice Mode",
    vars: {
      "--bg": "#0b1018",
      "--card": "#141c28",
      "--panel": "#1a2534",
      "--text": "#e6edf7",
      "--muted": "#9aa8bf",
      "--accent": "#22d3ee",
      "--accent-soft": "rgba(34,211,238,0.18)",
      "--border": "rgba(148,163,184,0.25)",
    },
  },
  {
    id: "phantom",
    name: "Phantom Mode",
    vars: {
      "--bg": "#090909",
      "--card": "#131313",
      "--panel": "#1a1a1a",
      "--text": "#f2f2f2",
      "--muted": "#b3b3b3",
      "--accent": "#d4d4d4",
      "--accent-soft": "rgba(212,212,212,0.15)",
      "--border": "rgba(163,163,163,0.25)",
    },
  },
  {
    id: "inferno",
    name: "Inferno Mode",
    vars: {
      "--bg": "#0b0b0d",
      "--card": "#181115",
      "--panel": "#24151b",
      "--text": "#f6e9ed",
      "--muted": "#c7a8b0",
      "--accent": "#e11d48",
      "--accent-soft": "rgba(225,29,72,0.2)",
      "--border": "rgba(244,63,94,0.28)",
    },
  },
  {
    id: "royal",
    name: "Royal Mode",
    vars: {
      "--bg": "#070b17",
      "--card": "#111a2c",
      "--panel": "#17233b",
      "--text": "#ecf2ff",
      "--muted": "#a8b7d6",
      "--accent": "#3b82f6",
      "--accent-soft": "rgba(59,130,246,0.2)",
      "--border": "rgba(96,165,250,0.25)",
    },
  },
  {
    id: "neon",
    name: "Neon Mode",
    vars: {
      "--bg": "#080b0a",
      "--card": "#111713",
      "--panel": "#19241c",
      "--text": "#e8fff1",
      "--muted": "#9ac7ab",
      "--accent": "#22c55e",
      "--accent-soft": "rgba(34,197,94,0.2)",
      "--border": "rgba(74,222,128,0.28)",
    },
  },
];

const THEME_KEY = "btcali-theme";

export function getStoredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return themes.find((t) => t.id === saved) ?? themes[0];
}

export function applyTheme(theme) {
  Object.entries(theme.vars).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
  localStorage.setItem(THEME_KEY, theme.id);
}
