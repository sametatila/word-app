"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Oynatıcı çerçevesi — bir egzersiz sayfasının bütün oynatıcılarının ortak
 * bildiği üç şey: hedef dil, geri dönülecek yer, sıradaki egzersiz.
 *
 * NEDEN BAĞLAM. Bu üç bilgi rota sayfasında belli oluyor ama okunduğu yer
 * derinlerde: `lang` işareti ve ses dili soru bileşenlerinde, "geri" ve
 * "sıradaki" bitiş kartında. Her oynatıcıya ve altındaki her bileşene ayrı
 * prop geçirmek dokuz bileşene aynı üç alanı taşımak demekti; bağlam bunu
 * tek yerde tutuyor. Oynatıcılar `backHref` prop'unu hâlâ alabiliyor (eski
 * çağrılar bozulmasın diye); prop varsa bağlamı ezer.
 *
 * `lang` "de" ya da "en": egzersizin kursu İngilizceyse "en". Eskiden
 * bütün oynatıcılarda `lang="de"` ve `de-DE` sabit yazılıydı; İngilizce
 * kütüphane içeriği (2026-09) web'e gelince metin Almanca sesle okunur,
 * rubrik Almanca beklentiyle puanlardı.
 */
export type TargetLang = "de" | "en";

export type PlayerFrameValue = {
  lang: TargetLang;
  /** Geri bağlantısı ve bitiş kartındaki ana düğmenin etiketi. */
  backHref: string;
  backLabel: string;
  /** Aynı seviye ve beceride sıradaki bitmemiş kütüphane egzersizi (varsa). */
  next?: { href: string; title: string } | null;
};

const PlayerFrameContext = createContext<PlayerFrameValue>({
  lang: "de",
  backHref: "/immersion",
  backLabel: "Patika'ya dön",
  next: null,
});

export function PlayerFrame({ value, children }: { value: PlayerFrameValue; children: ReactNode }) {
  return <PlayerFrameContext.Provider value={value}>{children}</PlayerFrameContext.Provider>;
}

export function usePlayerFrame(): PlayerFrameValue {
  return useContext(PlayerFrameContext);
}

/** Egzersizin hedef dili — `lang` işareti, sentez ve tanıyıcı dili için. */
export function useTargetLang(): TargetLang {
  return useContext(PlayerFrameContext).lang;
}

/** BCP-47 yerel kodu: konuşma sentezi ve tarayıcı tanıyıcısı bunu ister. */
export function localeOf(lang: TargetLang): string {
  return lang === "en" ? "en-US" : "de-DE";
}
