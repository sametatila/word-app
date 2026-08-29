import type { Metadata } from "next";
import { StarIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Beceriler" };

/**
 * Beceriler — YENİ, üçüncü menü. Şimdilik yalnızca yapım aşamasında bir yer
 * tutucu: menüde görünür, kurgusu netleşene dek içeriği yok. Eski "Beceriler"
 * (Dersler ile birlikte Patika'ya birleşen) ile aynı DEĞİL — ayrı bir düşünce.
 *
 * Tasarım dili mobil app'teki Beceriler ekranıyla bilerek aynı: yumuşak turuncu
 * kare içinde yıldız, "yapım aşamasında" hapı, kısa açıklama.
 */
export default function BecerilerPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl"
        style={{ background: "color-mix(in srgb, var(--color-brand) 15%, transparent)", color: "var(--color-brand)" }}
      >
        <StarIcon size={44} />
      </div>

      <h1 className="text-2xl font-extrabold">Beceriler</h1>

      <span
        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
      >
        🚧 Yapım aşamasında
      </span>

      <p className="mt-5 max-w-xs text-[15px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
        Bu bölüm yakında. Farklı bir kurgu üzerinde çalışıyoruz — okuma, dinleme,
        yazma ve daha fazlası burada olacak.
      </p>
    </div>
  );
}
