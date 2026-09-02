import { Linking } from "react-native";
import { API_BASE } from "../api/client";

/**
 * Hukuki sayfalar web'de tek kaynak (src/app/privacy, /terms, /account/delete);
 * mobil yalnız bağlar. Play: gizlilik politikası uygulama içinden erişilebilir olmalı.
 */
export const LEGAL_URLS = {
  privacy: `${API_BASE}/privacy`,
  terms: `${API_BASE}/terms`,
  deleteAccount: `${API_BASE}/account/delete`,
} as const;

export function openLegal(kind: keyof typeof LEGAL_URLS): void {
  Linking.openURL(LEGAL_URLS[kind]).catch(() => { /* tarayıcı yoksa sessiz */ });
}
