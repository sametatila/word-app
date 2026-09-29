import type { ReactNode } from "react";
import { SettingsNav } from "@/components/settings-nav";
import { SettingsFrame } from "./frame";

/**
 * Ayarların ortak düzeni: masaüstünde başlık + sol menü, sağda sayfa (bkz.
 * `frame.tsx`). Veri okumuyor — menü değersiz, açık grup adresten — o yüzden
 * gruplar arasında gezerken bekletmiyor ve hiç yeniden çizilmiyor; yükleme
 * iskeletleri (`loading.tsx`) yalnız paneli çiziyor.
 */
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <SettingsFrame nav={<SettingsNav variant="sidebar" />}>{children}</SettingsFrame>;
}
