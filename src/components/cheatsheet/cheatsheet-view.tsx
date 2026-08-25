"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, BookOpenIcon, ChevronIcon, TargetIcon } from "@/components/icons";
import { LEVEL_TONE } from "@/components/skills/theme";
import { CHEATSHEETS, CHEAT_LEVELS } from "@/lib/cheatsheet";
import type { CheatBlock, CheatSheet } from "@/lib/cheatsheet";

/**
 * Cheatsheet ekranı — dilbilgisi başvurusu ve tek mekanikli çalışma modu.
 *
 * Üç karar tasarımın tamamını açıklıyor:
 *
 * 1. **Sayfalar kapalı açılıyor.** Bir seviyede on dört sayfa var ve hepsi
 *    açık gelseydi ekran metin duvarı olurdu. Kapalı hâlde görünen şey başlık
 *    ve tek satırlık özet; aranan sayfa göz gezdirerek bulunuyor.
 *
 * 2. **Arama satırları da filtreliyor, yalnızca sayfaları değil.** 189 satırlık
 *    fiil listesinde "nehmen"i bulmak için sayfayı açıp kaydırmak, aramanın
 *    yapmadığı işi kullanıcıya yıkmak olurdu. Arama yazılınca eşleşen sayfalar
 *    kendiliğinden açılıyor ve tablolarda yalnızca eşleşen satırlar kalıyor.
 *
 * 3. **Çalışma modu tek mekanik: sütun gizleme.** Basılı bir fiil listesini
 *    elle kapatıp kendini yoklamanın karşılığı. Her tabloya ayrı alıştırma
 *    yazılmadığı için altmış tablonun hepsi aynı anda çalışılabilir durumda —
 *    ve yeni bir tablo eklemek yalnızca veri eklemek oluyor.
 *
 * Burada puan, ilerleme ya da kilit YOK. Ders yolu ilerlemeyi ölçüyor;
 * başvuru ekranı ölçmüyor, açılıyor ve kapanıyor.
 */
export function CheatsheetView({ userLevel }: { userLevel: string }) {
  const start = (CHEAT_LEVELS as string[]).includes(userLevel) ? userLevel : "A1";
  const [level, setLevel] = useState(start);
  const [term, setTerm] = useState("");

  const query = term.trim().toLocaleLowerCase("de-DE");

  /**
   * Arama seviyeyi AŞIYOR: "Passiv" yazan biri o konunun hangi seviyede
   * olduğunu bilmek zorunda değil. Arama boşken seçili seviye geçerli.
   */
  const results = useMemo(() => {
    const pool = query ? CHEATSHEETS : CHEATSHEETS.filter((s) => s.level === level);
    if (!query) return pool.map((sheet) => ({ sheet, blocks: sheet.blocks, hits: 0 }));
    return pool
      .map((sheet) => match(sheet, query))
      .filter((r): r is SheetResult => r !== null);
  }, [level, query]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <div
        className="sticky top-0 z-10 -mt-4 space-y-3 pb-3 pt-4 md:-mt-8 md:pt-8"
        style={{ background: "var(--bg)" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/learn"
            prefetch={false}
            aria-label="Öğren ekranına dön"
            className="chip flex h-9 w-9 shrink-0 items-center justify-center"
          >
            <ArrowLeftIcon size={18} />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold">Cheatsheet</h1>
            <p className="muted truncate text-xs font-semibold">
              Seviye seviye dilbilgisi ve fiil tabloları
            </p>
          </div>
        </div>

        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Konu, kural ya da kelime ara…"
          className="option w-full px-4 py-2.5 text-base outline-none focus:border-[color:var(--color-brand)]"
        />

        {/* Aramada seviye sekmeleri anlamını yitiriyor: sonuç bütün
            seviyelerden geliyor ve seçili sekmeyi vurgulu bırakmak yanlış
            bilgi verirdi. */}
        {query ? null : (
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {CHEAT_LEVELS.map((l) => {
              const active = l === level;
              return (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  aria-pressed={active}
                  className="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors"
                  style={
                    active
                      ? { background: LEVEL_TONE[l], color: "#ffffff" }
                      : {
                          background: "var(--surface-2)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }
                  }
                >
                  {l}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <p className="muted text-xs font-semibold">
        {query
          ? results.length
            ? `${results.length} sayfada eşleşme`
            : "Eşleşme yok"
          : `${results.length} sayfa`}
      </p>

      {results.map(({ sheet, blocks }) => (
        <SheetCard
          // Arama değişince kart yeniden kuruluyor: açık/kapalı ve gizli sütun
          // durumu eski aramanın kalıntısı olarak taşınmamalı.
          key={`${sheet.id}:${query ? "q" : "all"}`}
          sheet={sheet}
          blocks={blocks}
          defaultOpen={Boolean(query)}
        />
      ))}

      {!results.length && query ? (
        <p className="muted rounded-2xl px-4 py-6 text-center text-sm" style={{ background: "var(--surface-2)" }}>
          &quot;{term}&quot; için bir şey bulunamadı. Almanca bir biçim (örneğin
          &quot;wurde&quot;) ya da Türkçe bir konu adı (&quot;edilgen&quot;) deneyebilirsin.
        </p>
      ) : null}
    </div>
  );
}

type SheetResult = { sheet: CheatSheet; blocks: CheatBlock[]; hits: number };

/**
 * Aramanın iki kademesi var.
 *
 * Sayfanın BAŞLIĞI eşleşiyorsa sayfa olduğu gibi açılıyor: "Edilgen" arayan
 * biri o sayfanın tamamını istiyor demektir. Eşleşme yalnızca satırlardaysa
 * tablolar eşleşen satırlara indiriliyor — 189 satırlık listede tek fiili
 * aramak bunun için.
 */
function match(sheet: CheatSheet, query: string): SheetResult | null {
  const head = `${sheet.title} ${sheet.de} ${sheet.summary}`.toLocaleLowerCase("de-DE");
  if (head.includes(query)) return { sheet, blocks: sheet.blocks, hits: 1 };

  const blocks: CheatBlock[] = [];
  let hits = 0;
  for (const block of sheet.blocks) {
    if (block.kind !== "table") continue;
    const rows = block.rows.filter((row) =>
      row.some((cell) => cell.toLocaleLowerCase("de-DE").includes(query)),
    );
    if (!rows.length) continue;
    hits += rows.length;
    blocks.push({ ...block, rows });
  }
  return blocks.length ? { sheet, blocks, hits } : null;
}

function SheetCard({
  sheet,
  blocks,
  defaultOpen,
}: {
  sheet: CheatSheet;
  blocks: CheatBlock[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [study, setStudy] = useState(false);
  /** Gizli sütunlar — sütun BAŞLIĞINA göre, tablo tablo değil. */
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  /** Açılmış hücreler: "blok:satır:sütun". */
  const [shown, setShown] = useState<Set<string>>(new Set());

  /**
   * Gizlenebilir sütun başlıkları: her tablonun İLK sütunu hariç hepsi.
   * İlk sütun satırın kimliği — gizlenirse neyin sorulduğu kalmaz.
   */
  const columns = useMemo(() => {
    const seen: string[] = [];
    for (const block of blocks) {
      if (block.kind !== "table") continue;
      for (const label of block.columns.slice(1)) if (!seen.includes(label)) seen.push(label);
    }
    return seen;
  }, [blocks]);

  function toggleStudy() {
    const next = !study;
    setStudy(next);
    // Çalışmaya geçerken varsayılan: ilk sütun dışında her şey kapalı.
    setHidden(next ? new Set(columns) : new Set());
    setShown(new Set());
  }

  const tone = LEVEL_TONE[sheet.level] ?? "var(--color-brand)";

  return (
    <section className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <span
          className="shrink-0 rounded-lg px-2 py-0.5 text-xs font-black text-white"
          style={{ background: tone }}
        >
          {sheet.level}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{sheet.title}</span>
          <span className="muted block truncate text-xs">{sheet.summary}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="muted shrink-0"
        >
          <ChevronIcon size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 px-4 pb-4">
              <p className="muted text-xs font-semibold italic">{sheet.de}</p>

              {columns.length ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={toggleStudy}
                    aria-pressed={study}
                    className={`chip flex items-center gap-1.5 px-3 py-1.5 text-xs ${
                      study ? "chip-active" : ""
                    }`}
                  >
                    {study ? <BookOpenIcon size={14} /> : <TargetIcon size={14} />}
                    {study ? "Okumaya dön" : "Çalış"}
                  </button>

                  {study ? (
                    <>
                      <span className="mx-0.5 h-5 w-px" style={{ background: "var(--border)" }} />
                      <span className="muted text-xs font-semibold">Kapalı:</span>
                      {columns.map((label) => {
                        const off = hidden.has(label);
                        return (
                          <button
                            key={label}
                            onClick={() =>
                              setHidden((prev) => {
                                const next = new Set(prev);
                                if (next.has(label)) next.delete(label);
                                else next.add(label);
                                return next;
                              })
                            }
                            aria-pressed={off}
                            className="chip px-2.5 py-1 text-xs"
                            /*
                              Kapalı sütun çipi VURGULU zeminle değil hafif bir
                              tonla işaretleniyor: beş çipin beşi birden kehribar
                              gradyan taşıyınca satır "Çalış" düğmesinden daha
                              çok bağırıyordu ve asıl bakılması gereken tablo
                              geri planda kalıyordu.

                              Yazı rengi tonlanmıyor. Zemin markanın %14'ü ve
                              üstüne marka rengi yazı koymak ölçülen kontrastı
                              düşürürdü; durumu kenarlık taşıyor.
                            */
                            style={
                              off
                                ? {
                                    background:
                                      "color-mix(in srgb, var(--color-brand) 14%, var(--surface))",
                                    borderColor: "var(--color-brand)",
                                    color: "var(--text)",
                                  }
                                : undefined
                            }
                          >
                            {label}
                          </button>
                        );
                      })}
                      {shown.size ? (
                        <button
                          onClick={() => setShown(new Set())}
                          className="chip px-2.5 py-1 text-xs"
                        >
                          Açılanları kapat ({shown.size})
                        </button>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ) : null}

              {study ? (
                <p className="muted text-xs">
                  Kapalı hücreye dokununca açılıyor. Çipler hangi sütunun kapalı
                  olduğunu değiştiriyor.
                </p>
              ) : null}

              {blocks.map((block, bi) =>
                block.kind === "note" ? (
                  <Note key={bi} text={block.text} tone={tone} />
                ) : (
                  <Table
                    key={bi}
                    block={block}
                    study={study}
                    hidden={hidden}
                    shown={shown}
                    reveal={(key) => setShown((prev) => new Set(prev).add(key))}
                    prefix={String(bi)}
                  />
                ),
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Note({ text, tone }: { text: string; tone: string }) {
  return (
    <p
      className="rounded-xl px-3.5 py-2.5 text-xs leading-relaxed"
      style={{
        background: `color-mix(in srgb, ${tone} 9%, transparent)`,
        borderLeft: `3px solid ${tone}`,
      }}
    >
      {text}
    </p>
  );
}

function Table({
  block,
  study,
  hidden,
  shown,
  reveal,
  prefix,
}: {
  block: Extract<CheatBlock, { kind: "table" }>;
  study: boolean;
  hidden: Set<string>;
  shown: Set<string>;
  reveal: (key: string) => void;
  prefix: string;
}) {
  /**
   * Sütun uzun metin taşıyor mu?
   *
   * İçerik iki cinsten: çekim tabloları (kısa biçimler) ve örnek cümle
   * tabloları. Hepsini tek satırda tutmak cümleli tabloyu ekranın on katı
   * genişliğinde yapıyor; hepsini sardırmak fiil listesini iki satırlık
   * bloklara bölüyor ve göz sütunu takip edemiyor. Karar sütun sütun
   * veriliyor, elle etiketle değil — yeni bir tablo eklemek yalnızca veri
   * eklemek olarak kalsın diye.
   */
  const wraps = block.columns.map((_, ci) =>
    block.rows.some((row) => (row[ci] ?? "").length > 28),
  );

  /**
   * Anahtar sütun yatay kaydırmada YERİNDE kalıyor.
   *
   * Çalışma modunda asıl sorun buydu: 189 satırlık tabloda Perfekt sütununu
   * görmek için sağa kaydırıldığında Infinitiv ekrandan çıkıyor ve geriye
   * "neyin sorulduğu belli olmayan boş kutular" kalıyordu.
   *
   * Yalnızca kısa ve üçten çok sütunlu tablolarda: iki sütunlu cümle
   * tablolarında yapışkan sütun ekranın yarısını kaplardı.
   */
  const pin = block.columns.length > 2 && !wraps[0];

  function cellStyle(ci: number): React.CSSProperties {
    const base: React.CSSProperties = {
      borderBottom: "1px solid var(--border)",
      fontWeight: ci === 0 ? 600 : 400,
    };
    if (ci !== 0 || !pin) return base;
    return {
      ...base,
      position: "sticky",
      left: 0,
      zIndex: 1,
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
    };
  }

  return (
    <div className="space-y-1.5">
      {block.caption ? (
        <p className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
          {block.caption}
        </p>
      ) : null}
      {/*
        Geniş tablo KENDİ İÇİNDE yatay kayıyor: sayfa gövdesinin yatay kayması
        telefonda bütün ekranı sağa sola oynatırdı.
      */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-left text-sm">
          <thead>
            <tr>
              {block.columns.map((label, ci) => (
                <th
                  key={ci}
                  scope="col"
                  className="px-2.5 py-2 text-xs font-bold whitespace-nowrap"
                  style={{
                    ...cellStyle(ci),
                    color: "var(--text-muted)",
                    borderBottom: "1.5px solid var(--border)",
                    fontWeight: 700,
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const key = `${prefix}:${ri}:${ci}`;
                  const masked =
                    study && ci > 0 && hidden.has(block.columns[ci]) && !shown.has(key);
                  return (
                    <td
                      key={ci}
                      className={`px-2.5 py-1.5 align-top ${
                        wraps[ci] ? "min-w-52 max-w-80" : "whitespace-nowrap"
                      }`}
                      style={cellStyle(ci)}
                    >
                      {masked ? (
                        <button
                          onClick={() => reveal(key)}
                          aria-label="Cevabı göster"
                          className="block h-6 w-full min-w-16 rounded-md"
                          style={{
                            border: "1px dashed var(--border)",
                            background: "var(--surface-2)",
                          }}
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
