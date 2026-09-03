import { Linking } from "react-native";
import { API_BASE } from "../api/client";
import { currentLang } from "./i18n";

/**
 * Hukuki sayfalar web'de tek kaynak (src/app/privacy, /terms, /account/delete);
 * mobil yalnız bağlar. Play: gizlilik politikası uygulama içinden erişilebilir olmalı.
 *
 * Bağlantı arayüzün DİLİNE göre veriliyor. Türkçe kanonik yolda (/privacy),
 * çeviriler alt yolda (/privacy/en) — web'deki legalPath() ile aynı kural.
 * Almanca arayüzden yalnız Türkçe bir politikaya düşmek, hem kullanıcıya hem
 * Play incelemesine karşı yetersiz bir sunum.
 */
const PATHS = {
  privacy: "/privacy",
  terms: "/terms",
  deleteAccount: "/account/delete",
} as const;

export type LegalDoc = keyof typeof PATHS;

/** Hesap silme sayfası çevrilmedi; oraya dil eki eklenmiyor. */
export function legalUrl(doc: LegalDoc): string {
  const lang = currentLang();
  const suffix = lang !== "tr" && doc !== "deleteAccount" ? `/${lang}` : "";
  return `${API_BASE}${PATHS[doc]}${suffix}`;
}

export function openLegal(doc: LegalDoc): void {
  Linking.openURL(legalUrl(doc)).catch(() => { /* tarayıcı yoksa sessiz */ });
}
