import type { ComponentType, SVGProps } from "react";
import type { SkillId } from "@/lib/skills/types";
import { GrammarIcon, ListenIcon, MicIcon, ReadIcon, WriteIcon } from "@/components/icons";

/**
 * CEFR seviye renkleri — level-badge ve ilerleme çubuklarıyla aynı ton dili.
 *
 * B2 turuncunun 700'ünde, diğerleri 600'de. Sebep ölçüm: rozet DOLU zemin +
 * beyaz yazı ve renk TEK taşıyıcı (yanında rengi açıklayan etiket yok), yani
 * KATI eşik geçerli. Marka turuncusuna geçildiğinde 600 (#db5f08) beyazla
 * 3.72 veriyordu; 700 (#b44909) 5.39. Birincil butonun kabul edilmiş sapması
 * (T-KARAR-1) buraya UZANMIYOR: orada zeminin markanın kendisi olması bir
 * kimlik kararı, burada zemin bir bilgi taşıyıcısı.
 */
export const LEVEL_TONE: Record<string, string> = {
  A1: "var(--color-mint-600)",
  A2: "var(--color-sky-600)",
  B1: "var(--color-violet-600)",
  B2: "var(--color-brand-700)",
  C1: "var(--color-rose-600)",
};

export const SKILL_ICON: Record<
  SkillId,
  ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  reading: ReadIcon,
  listening: ListenIcon,
  writing: WriteIcon,
  speaking: MicIcon,
  grammar: GrammarIcon,
};

/**
 * Beceri renkleri — mobil `SkillsScreen`in `tint` alanıyla birebir.
 *
 * Bölüm başlığındaki simge ve satırlardaki nokta bu renkten geliyor: dört
 * beceri listede alt alta duruyor ve renk, hangi bölümde olunduğunu başlığa
 * geri dönmeden söylüyor.
 */
export const SKILL_TINT: Record<SkillId, string> = {
  reading: "var(--color-sky-500)",
  listening: "var(--color-violet-500)",
  writing: "var(--color-mint-500)",
  speaking: "var(--color-brand-500)",
  // Dil bilgisi mobilde `streak` (kehribar) tonunu alıyor; buradaki karşılığı
  // seri rengi olan alev.
  grammar: "var(--color-flame-500)",
};
