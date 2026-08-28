/**
 * Ekran anahtarları — ölçümün "neredeydi" sözlüğü (WP-80).
 *
 * Yol → kısa, kapalı bir etiket. Olaylara ham yol yazılmıyor: `/lessons/de-a1-hallo`
 * ile `/lessons/de-a1-tschuess` aynı EKRAN, ayrı içerik; içerik kimliği
 * ilgili olayın kendi `kind`ında (lesson_start, skill_finish…) zaten var.
 * Anahtar kapalı olunca "hangi ekranda ne kadar kalınıyor" sorgusu on satırla
 * cevaplanıyor ve alt gezinme yeniden düzenlense de tarihsel veri kırılmıyor
 * (sekme SIRASI değişti, ekran adı değişmedi).
 *
 * İstemci ve sunucuda ortak; `server-only` içermez.
 */
export const SCREEN_KEYS = [
  "home",
  "learn",
  "weekly",
  "lessons",
  "lesson",
  "roleplay_exam",
  "skills",
  "skill",
  "words",
  "profile",
  "settings",
  "badges",
  "writings",
  "exam",
  "placement",
  "other",
] as const;

export type ScreenKey = (typeof SCREEN_KEYS)[number];

export function screenKey(pathname: string): ScreenKey {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  const [, a, b, c] = p.split("/");
  switch (a) {
    case "learn":
      return b === "haftalik" ? "weekly" : "learn";
    case "lessons":
      if (!b) return "lessons";
      return c === "exam" ? "roleplay_exam" : "lesson";
    case "skills":
      return b ? "skill" : "skills";
    case "words":
      return "words";
    case "profile":
      if (b === "ayarlar") return "settings";
      if (b === "rozetler") return "badges";
      if (b === "yazilarim") return "writings";
      return "profile";
    case "exam":
      return "exam";
    case "placement":
      return "placement";
    default:
      return "other";
  }
}
