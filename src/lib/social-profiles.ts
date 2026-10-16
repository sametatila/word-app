/**
 * Lernomi'nin sosyal hesapları — TEK KAYNAK. Tanıtım sayfasının alt bilgisi,
 * yapısal veri (`Organization.sameAs`) ve `llms.txt` buradan okuyor.
 *
 * Hesaplar 2026-10-16'da adresten doğrulandı (sosyal işçilerin `status.json`
 * kullanıcı adlarıyla aynı, `docs/social/README.md`). Kullanıcı adı değişirse
 * yalnız burası değişir.
 */
export type SocialProfile = {
  id: "instagram" | "tiktok" | "youtube";
  /** Platformun kendi adı (çevrilmez). */
  name: string;
  handle: string;
  url: string;
};

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { id: "instagram", name: "Instagram", handle: "@lernomi_app", url: "https://www.instagram.com/lernomi_app/" },
  { id: "tiktok", name: "TikTok", handle: "@lernomi_app", url: "https://www.tiktok.com/@lernomi_app" },
  { id: "youtube", name: "YouTube", handle: "@lernomiapp", url: "https://www.youtube.com/@lernomiapp" },
];
