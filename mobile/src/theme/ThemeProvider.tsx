import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { light, dark, type Palette } from "./colors";

export type ThemeMode = "system" | "light" | "dark";
type Ctx = { colors: Palette; isDark: boolean; mode: ThemeMode; setMode: (m: ThemeMode) => void };

const ThemeContext = createContext<Ctx>({ colors: light, isDark: false, mode: "system", setMode: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");
  const isDark = mode === "system" ? scheme === "dark" : mode === "dark";
  const value = useMemo(() => ({ colors: isDark ? dark : light, isDark, mode, setMode }), [isDark, mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
