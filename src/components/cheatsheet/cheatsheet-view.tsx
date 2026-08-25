"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ChevronIcon, FlameIcon } from "@/components/icons";
import { LEVEL_TONE } from "@/components/skills/theme";
import { CHEATSHEETS, CHEAT_LEVELS } from "@/lib/cheatsheet";
import type { CheatBlock, CheatSheet } from "@/lib/cheatsheet";
import { itemById, itemsOfSheet, type CheatItem } from "@/lib/cheatsheet/items";
import { CheatQuiz, CheatQuizLoading } from "./cheat-quiz";

/**
 * Dilbilgisi ekranı — kural ve çekim tablolarının başvuru yeri.
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
 * 3. **Sayfa okunur ya da sınanır; arası yok.** Bir ara mod vardı — sütunlar
 *    gizleniyor, dokunulunca açılıyordu. Kaldırıldı: ölçmeyen bir "çalışma"
 *    kullanıcıyı kendi kendini yoklamaya bırakıyor ve hiçbir yere yazılmıyor.
 *    Kendini yoklamak isteyen zaten SINA'ya basıyor ve orada cevap ölçülüp
 *    tekrar planına giriyor.
 */
type Quiz = {
  title: string;
  items: CheatItem[];
  states: Record<string, { reps: number; lapses: number }>;
};

type Summary = { due: number; seen: number; mastered: number; total: number };

/** Bir turda sorulacak en çok madde — çalışma turu da kelime turu kadar uzun. */
const QUIZ_SIZE = 14;

export function CheatsheetView({ userLevel }: { userLevel: string }) {
  const start = (CHEAT_LEVELS as string[]).includes(userLevel) ? userLevel : "A1";
  const [level, setLevel] = useState(start);
  const [term, setTerm] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  /** Tur kurulurken gösterilecek başlık — kelime turundaki yükleme ekranının aynısı. */
  const [preparing, setPreparing] = useState<string | null>(null);

  const query = term.trim().toLocaleLowerCase("de-DE");

  /**
   * Derin bağlantı (WP-13): `/cheatsheet#a1-artikel`. Geri bildirim
   * şeridindeki "Kural ↗" buraya geliyor; sayfa o sayfanın seviyesine geçer,
   * kartı açık getirir, kaydırır ve kısa süre vurgular. Hash yalnız ilk
   * çizimden sonra okunuyor (sunucuda `location` yok) ve bir kez: kullanıcı
   * sonra başka seviyeye geçerse bağlantı onu geri çekmemeli.
   */
  const [target, setTarget] = useState<string | null>(null);
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!id) return;
    const sheet = CHEATSHEETS.find((s) => s.id === id);
    if (!sheet) return;
    setLevel(sheet.level);
    setTarget(id);
    const t = setTimeout(() => {
      document.getElementById(`sheet-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cheat", { cache: "no-store" });
      if (res.ok) setSummary((await res.json()) as Summary);
    } catch {
      /* çevrimdışı: özet olmadan da sayfa çalışıyor */
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  /**
   * Sayfa turu.
   *
   * Sayfada 189 madde olabilir ve tur on dört soruluk; hangi on dördü
   * sorulacağı rastgele DEĞİL: önce tekrarı gelmiş maddeler, sonra hiç
   * görülmemişler, sonra en az tekrar edilmişler. Rastgele seçmek, elli kez
   * doğru bilinen bir maddeyi hiç görülmemiş bir maddeyle aynı sıklıkta
   * sormak olurdu.
   */
  const startSheetQuiz = useCallback(async (sheet: CheatSheet) => {
    if (preparing) return;
    setPreparing(sheet.title);
    const all = itemsOfSheet(sheet);
    let states: Record<string, { reps: number; lapses: number; due: boolean }> = {};
    try {
      const res = await fetch(`/api/cheat?sheet=${encodeURIComponent(sheet.id)}`, {
        cache: "no-store",
      });
      if (res.ok) states = ((await res.json()) as { states: typeof states }).states ?? {};
    } catch {
      /* ilerleme okunamazsa hepsi yeni sayılır — tur yine kurulur */
    }
    const rank = (item: CheatItem) => {
      const st = states[item.id];
      if (!st) return 1; // hiç görülmemiş
      if (st.due) return 0; // tekrarı gelmiş
      return 2 + st.reps; // ilerlemiş: en az tekrar edilen önce
    };
    const items = [...all].sort((a, b) => rank(a) - rank(b)).slice(0, QUIZ_SIZE);
    setQuiz({ title: sheet.title, items, states });
    setPreparing(null);
  }, [preparing]);

  /** Karışık tekrar turu — bütün sayfalardan, yalnızca zamanı gelmişler. */
  const startDueQuiz = useCallback(async () => {
    if (preparing) return;
    setPreparing("Tekrar turu");
    try {
      const res = await fetch("/api/cheat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ want: "due", limit: QUIZ_SIZE }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          items: { itemId: string; reps: number; lapses: number }[];
        };
        const states: Record<string, { reps: number; lapses: number }> = {};
        const items: CheatItem[] = [];
        for (const row of data.items) {
          const item = itemById(row.itemId);
          if (!item) continue;
          states[item.id] = { reps: row.reps, lapses: row.lapses };
          items.push(item);
        }
        if (items.length) setQuiz({ title: "Tekrar turu", items, states });
      }
    } catch {
      /* çevrimdışı */
    }
    setPreparing(null);
  }, [preparing]);

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

  /*
    Tur ekranına geçiş BÜTÜN kancalardan SONRA.

    Erken dönüş bir üst satırda duruyordu ve "Sına" her basıldığında ekran
    hata sayfasına düşüyordu: `results` bir `useMemo` ve dönüşün ALTINDA
    kalıyordu, yani tur açılınca o kanca hiç çağrılmıyor, React de
    "beklenenden az kanca çizildi" diye patlıyordu. Kanca sayısı çizimden
    çizime değişemez.
  */
  if (preparing) return <CheatQuizLoading title={preparing} />;

  if (quiz) {
    return (
      <CheatQuiz
        title={quiz.title}
        items={quiz.items}
        states={quiz.states}
        onClose={(answered) => {
          setQuiz(null);
          if (answered) void refresh();
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      {/*
        Yapışkan başlık şeridi — ve `top` neden NEGATİF.

        Yapışkan konum, kaydırma kabının PADDING kutusuna göre hesaplanıyor.
        `main`in üstünde 1rem dolgu var, dolayısıyla `top-0` şeridi üst
        başlığın 16 piksel ALTINA çiviliyordu: arada kalan o şeritten liste
        kartları kayarak geçiyor, başlıkla üst başlık arasından bir şeyler
        akıyordu. Aynı 16 piksel durgun hâlde de başlığı gereğinden uzağa
        itiyordu.

        `-top-4` o dolguyu geri alıyor: şerit tam üst başlığın dibine oturuyor
        ve kendi `pt-4`ü nefes payını İÇERİDE veriyor. Negatif üst pay ile
        birlikte durgun ve yapışmış hâl aynı yere denk geliyor — kaydırma
        başladığında başlık zıplamıyor.
      */}
      <div
        className="sticky -top-4 z-10 -mt-4 space-y-3 pb-3 pt-4 md:-top-8 md:-mt-8 md:pt-8"
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
            <h1 className="truncate text-xl font-bold">Dilbilgisi</h1>
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

      {/*
        Tekrar şeridi — kelime tarafındaki "tekrar sırası gelen" sayacının
        dilbilgisi karşılığı. Yalnızca borç varken görünüyor: sıfır yazan bir
        sayaç her açılışta bir satır yer kaplar ve hiçbir şey söylemez.
      */}
      {summary && summary.due > 0 && !query ? (
        <button
          onClick={startDueQuiz}
          disabled={preparing !== null}
          className="card flex w-full items-center gap-3 px-4 py-3 text-left disabled:opacity-60"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "color-mix(in srgb, var(--color-flame) 16%, transparent)",
              color: "var(--color-flame)",
            }}
          >
            <FlameIcon size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">
              {summary.due} maddenin tekrarı geldi
            </span>
            <span className="muted block text-xs">Bütün sayfalardan karışık tur</span>
          </span>
          <span className="btn btn-primary shrink-0 px-3.5 py-2 text-xs">Başla</span>
        </button>
      ) : null}

      <p className="muted text-xs font-semibold">
        {query
          ? results.length
            ? `${results.length} sayfada eşleşme`
            : "Eşleşme yok"
          : `${results.length} sayfa`}
        {summary && summary.seen > 0 && !query
          ? ` · ${summary.seen.toLocaleString("tr-TR")} madde çalışıldı`
          : ""}
      </p>

      {results.map(({ sheet, blocks }) => (
        <SheetCard
          // Arama değişince kart yeniden kuruluyor: açık/kapalı ve gizli sütun
          // durumu eski aramanın kalıntısı olarak taşınmamalı.
          key={`${sheet.id}:${query ? "q" : "all"}:${target === sheet.id ? "t" : ""}`}
          sheet={sheet}
          blocks={blocks}
          defaultOpen={Boolean(query) || target === sheet.id}
          highlight={target === sheet.id}
          onQuiz={startSheetQuiz}
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
  highlight = false,
  onQuiz,
}: {
  sheet: CheatSheet;
  blocks: CheatBlock[];
  defaultOpen: boolean;
  /** Derin bağlantıyla gelindi: kart kısa süre çerçeveli parlar. */
  highlight?: boolean;
  onQuiz: (sheet: CheatSheet) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const tone = LEVEL_TONE[sheet.level] ?? "var(--color-brand)";

  return (
    <section
      id={`sheet-${sheet.id}`}
      className="card overflow-hidden"
      // Yapışkan başlık + seviye şeridi ~9rem: derin bağlantıyla kaydırınca
      // kart başlığı onların altında kalmasın.
      style={{ scrollMarginTop: "9.5rem", ...(highlight ? { boxShadow: `0 0 0 3px ${tone}` } : {}) }}
    >
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

              <button
                onClick={() => onQuiz(sheet)}
                className="btn btn-primary flex items-center gap-1.5 px-3.5 py-2 text-xs"
              >
                <FlameIcon size={14} /> Bu sayfayı sına
              </button>

              {blocks.map((block, bi) =>
                block.kind === "note" ? (
                  <Note key={bi} text={block.text} tone={tone} />
                ) : (
                  <Table key={bi} block={block} />
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

function Table({ block }: { block: Extract<CheatBlock, { kind: "table" }> }) {
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
   * Anahtar sütun yatay kaydırmada YERİNDE kalıyor: 189 satırlık tabloda
   * Perfekt'i görmek için sağa kaydırıldığında Infinitiv ekrandan çıkarsa
   * geriye hangi fiilin satırı olduğu belirsiz hücreler kalır.
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
                  className="whitespace-nowrap px-2.5 py-2 text-xs font-bold"
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
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-2.5 py-1.5 align-top ${
                      wraps[ci] ? "min-w-52 max-w-80" : "whitespace-nowrap"
                    }`}
                    style={cellStyle(ci)}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
