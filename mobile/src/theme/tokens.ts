import { Platform, type TextStyle } from "react-native";

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 } as const;
export const radii = { sm: 10, md: 14, lg: 20, xl: 26, xxl: 34, pill: 999 } as const;

const family = Platform.select({ ios: "System", default: "sans-serif" });
const familyBold = Platform.select({ ios: "System", android: "sans-serif", default: "sans-serif" });
export const typography = {
  display: { fontFamily: familyBold, fontSize: 32, fontWeight: "800", letterSpacing: -0.5 } as TextStyle,
  h1: { fontFamily: familyBold, fontSize: 26, fontWeight: "800", letterSpacing: -0.3 } as TextStyle,
  h2: { fontFamily: familyBold, fontSize: 20, fontWeight: "700" } as TextStyle,
  h3: { fontFamily: familyBold, fontSize: 16, fontWeight: "700" } as TextStyle,
  body: { fontFamily: family, fontSize: 15, fontWeight: "500" } as TextStyle,
  bodyStrong: { fontFamily: family, fontSize: 15, fontWeight: "700" } as TextStyle,
  caption: { fontFamily: family, fontSize: 12.5, fontWeight: "600" } as TextStyle,
  micro: { fontFamily: family, fontSize: 11, fontWeight: "700", letterSpacing: 0.4 } as TextStyle,
};

/** Yumuşak modern gölge (fitness örneği): geniş, düşük opaklık. */
export function softShadow(color: string, elevation = 8) {
  return Platform.select({
    ios: { shadowColor: color, shadowOffset: { width: 0, height: elevation * 0.7 }, shadowOpacity: 0.16, shadowRadius: elevation * 1.6 },
    android: { elevation, shadowColor: color },
    default: {},
  });
}
