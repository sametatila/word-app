/**
 * Nomi mobil palet — marka turuncusu (#f87612, logo zemininden) çekirdek;
 * yumuşak/modern (fitness örneği) doku. Semantik renkler WEB paletiyle hizalı
 * (mint=doğru/A1, rose=yanlış/C1, sky=A2, violet=B1, flame=seri) ki iki uygulama
 * tutarlı olsun. Light + dark; dolu zeminde okunur tonlar sabit.
 */
export const orange = {
  50: "#fff4e9", 100: "#ffe3c4", 200: "#ffc98d", 300: "#ffab54", 400: "#fb8f2a",
  500: "#f87612", 600: "#db5f08", 700: "#b44909", 800: "#8f3a0f", 900: "#74310f",
} as const;

export type Palette = {
  primary: string; primaryStrong: string; primarySoft: string; onPrimary: string;
  bg: string; surface: string; surface2: string; surfaceGlass: string; elevated: string;
  border: string; hairline: string;
  text: string; textMuted: string; textFaint: string;
  success: string; danger: string; streak: string; info: string; accent: string;
  successSoft: string; dangerSoft: string;
  gradientA: [string, string]; gradientB: [string, string]; // yumuşak kart gradyanları
};

export const light: Palette = {
  primary: orange[500], primaryStrong: orange[600], primarySoft: orange[100], onPrimary: "#ffffff",
  bg: "#fbf7f2", surface: "#ffffff", surface2: "#f5efe8", surfaceGlass: "rgba(255,255,255,0.72)", elevated: "#ffffff",
  border: "#ece3d8", hairline: "#f1eae0",
  text: "#241a12", textMuted: "#8a7866", textFaint: "#b7a695",
  success: "#2f9a61", danger: "#dc3f55", streak: "#b8940f", info: "#1b93ac", accent: "#9256bc",
  successSoft: "#e2f2e9", dangerSoft: "#fde6ea",
  gradientA: ["#fb8f2a", "#f87612"], gradientB: ["#ffab54", "#db5f08"],
};

export const dark: Palette = {
  primary: orange[400], primaryStrong: orange[500], primarySoft: "rgba(248,118,18,0.16)", onPrimary: "#1a1008",
  bg: "#17120e", surface: "#211a14", surface2: "#2b221a", surfaceGlass: "rgba(43,34,26,0.6)", elevated: "#2b221a",
  border: "#3a2e23", hairline: "#2b221a",
  text: "#f6efe6", textMuted: "#a9998a", textFaint: "#7c6c5d",
  success: "#6fd19b", danger: "#f79ba6", streak: "#ddb62c", info: "#6fd1e3", accent: "#cda6e8",
  successSoft: "rgba(111,209,155,0.16)", dangerSoft: "rgba(247,155,166,0.16)",
  gradientA: ["#fb8f2a", "#db5f08"], gradientB: ["#f87612", "#8f3a0f"],
};
