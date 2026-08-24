import type { Gloss } from "@/lib/skills/types";

/**
 * Sözlükçe maddesinin ekrandaki hâli.
 *
 * Dört bilgi taşıyabiliyor ve hepsi aynı satıra sığmıyor: Almanca biçim,
 * Türkçe karşılık, İngilizce karşılık ve — Züritüütsch kursunda — Hochdeutsch
 * köprüsü. Daha önce hepsi tek satırda, parantez içinde birbirine
 * yapıştırılmıştı ("daire (Wohnung)"); okunmuyordu ve karşılığın nerede
 * bittiği belli olmuyordu.
 *
 * Sıra öğrenme sırasıdır: önce Almanca, sonra Türkçe (karar bu satırda
 * veriliyor), sonra İngilizce (Türkçede çöken kelimeleri ayıran satır), en
 * altta köprü ve not. Aşağı indikçe soluyor.
 */
export function GlossEntry({ g }: { g: Gloss }) {
  return (
    <span className="flex flex-col items-start text-left">
      <span>
        <strong className="text-[color:var(--text)]">{g.de}</strong>
        <span className="mx-1 opacity-50">·</span>
        {g.tr}
      </span>
      {g.en ? (
        <span className="text-[0.9em] opacity-60" lang="en">
          {g.en}
        </span>
      ) : null}
      {g.hd || g.note ? (
        <span className="text-[0.85em] opacity-50">
          {g.hd ? <span lang="de">HD: {g.hd}</span> : null}
          {g.hd && g.note ? " · " : null}
          {g.note}
        </span>
      ) : null}
    </span>
  );
}

/**
 * Kalıp düğmelerinin ipucu metni: düğmenin üstünde yalnızca Almanca duruyor,
 * karşılık buraya sığıyor. Hochdeutsch köprüsü de giriyor — Züritüütsch
 * kalıplarında düğmedeki lehçe biçimin Almancası başka türlü hiç görünmüyor.
 */
export function glossTitle(g: Gloss): string {
  return [g.tr, g.en, g.hd ? `HD: ${g.hd}` : null].filter(Boolean).join(" · ");
}
