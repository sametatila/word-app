"use client";

import { useEffect, useState, type ReactNode } from "react";
import { wordStatus, type WordStatus as WordStatusId } from "@/lib/word-status";
import { useT, useLang } from "@/lib/i18n/client";
import { LANG_LABEL, formatNumber } from "@/lib/i18n/dict";
import { courseName } from "@/lib/courses";
import { useRouter, useSearchParams } from "next/navigation";
import { trackOnce } from "@/lib/track";
import { AnimatePresence, motion } from "framer-motion";
import { CardsIcon, ChevronIcon } from "@/components/icons";
import { EmptyCard } from "@/components/empty-card";
import { PageBack } from "@/components/page-back";
import { SpeakButton } from "@/components/speak-button";
import { grammarNote, typLabel } from "@/components/games/types";
import { firstExample } from "@/lib/example";
import { SentenceTranslation } from "@/components/meaning-text";
import { reducedMotion } from "@/lib/fx";

export type WordRow = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  en: string | null;
  typ: string;
  niveau: string;
  beispiel: string | null;
  beispielTr: string | null;
  beispielEn: string | null;
  formen: string | null;
  intervalDays: number | null;
  dueAt: string | null;
  lapses: number | null;
  leech: boolean;
};

const ARTIKEL_TONE: Record<string, string> = {
  der: "var(--color-sky)",
  die: "var(--color-rose)",
  das: "var(--color-mint)",
};

/** Seviye süzgeci — "Tümü" dışındakiler zaten dilden bağımsız (CEFR kodu). */
const LEVELS = [
  /* Sifirlama cipi "Seviye" diyor, "Tumu" degil: iki grup yan yanayken iki
     ayri "Tumu" cipi cikiyordu ve hangisinin neyi sifirladigi okunmuyordu.
     Android baslangictan beri grubu adiyla adlandiriyor (`WordsScreen`). */
  { id: "", labelKey: "words.filter_level" },
  { id: "A1", labelKey: "" },
  { id: "A2", labelKey: "" },
  { id: "B1", labelKey: "" },
  { id: "B2", labelKey: "" },
  { id: "C1", labelKey: "" },
];

const STATUSES = [
  { id: "", labelKey: "words.filter_all" },
  { id: "new", labelKey: "words.status_new" },
  { id: "learning", labelKey: "words.status_learning" },
  { id: "mastered", labelKey: "words.status_mastered" },
];

/** Etiket ve ton — bant kararı TEK KAYNAKTAN (`lib/word-status`), ton burada. */
const STATUS_TONE: Record<WordStatusId, { labelKey: string; tone: string }> = {
  leech: { labelKey: "words.status_leech", tone: "var(--color-rose)" },
  new: { labelKey: "words.status_new", tone: "var(--text-muted)" },
  mastered: { labelKey: "words.status_mastered", tone: "var(--color-mint)" },
  familiar: { labelKey: "words.status_familiar", tone: "var(--color-sky)" },
  learning: { labelKey: "words.status_learning", tone: "var(--color-flame)" },
};

function statusOf(r: WordRow): { labelKey: string; tone: string } {
  return STATUS_TONE[wordStatus(r)];
}

/**
 * "Tekrar zamanı geldi" / "yarın tekrar" / "3 gün sonra tekrar".
 *
 * Dil DIŞARIDAN geliyor: üç cümle de sabit Türkçe yazılıydı ve kelime
 * listesi arayüz Almanca olduğunda bile Türkçe söylüyordu.
 */
function dueLabel(dueAt: string | null, t: (key: string, vars?: Record<string, string | number>) => string): string | null {
  if (!dueAt) return null;
  const days = Math.round((new Date(dueAt).getTime() - Date.now()) / 86400000);
  if (days <= 0) return t("words.due_now");
  if (days === 1) return t("words.due_tomorrow");
  return t("words.due_in_days", { n: days });
}

export function WordList({
  rows,
  total,
  page,
  hasMore,
  query,
  progress,
  progressSummary,
  course = "de",
}: {
  rows: WordRow[];
  total: number;
  page: number;
  hasMore: boolean;
  query: { q: string; level: string; status: string };
  /** İlerleme grafikleri (sunucuda kurulur) — başlığın altında katlanmış durur. */
  progress?: ReactNode;
  /** Kapalıyken de görünen tek satırlık özet. */
  progressSummary?: string;
  /** Arama kutusunun ipucu metni hedef dilin adını söylüyor. */
  course?: string;
}) {
  /* Çevirmen `tx` adında: aşağıda arama kutusunun zamanlayıcısı `t` adını
     kullanıyor ve iki `t` aynı kapsamda duramaz. Mobil tarafta da aynı
     sebeple `tx` deniyor (bkz. M/src/screens/FriendsScreen.tsx). */
  const tx = useT();
  const lang = useLang();
  const [showProgress, setShowProgress] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const [term, setTerm] = useState(query.q);
  const [open, setOpen] = useState<number | null>(null);

  // Arama kutusu yazarken adres çubuğunu geciktirerek günceller
  useEffect(() => {
    if (term === query.q) return;
    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (term) next.set("q", term);
      else next.delete("q");
      next.delete("page");
      if (term.trim()) trackOnce("search", term.trim().length, "words");
      router.replace(`/words?${next.toString()}`);
    }, 350);
    return () => clearTimeout(t);
  }, [term, query.q, params, router]);

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.replace(`/words?${next.toString()}`);
  }

  /* Süzgeç AÇIK MI? Boş listenin sebebi iki ayrı şey: hiç kelime yok ya da
     süzgeçler her şeyi dışarıda bıraktı. İkincisinde çıkış yolu süzgeçleri
     kaldırmak; bunu söylemeyen boş ekran kullanıcıyı listenin gerçekten boş
     olduğuna inandırıyordu. */
  const filtered = Boolean(query.q || query.level || query.status);

  function clearFilters() {
    const next = new URLSearchParams(params.toString());
    for (const k of ["q", "level", "status", "page"]) next.delete(k);
    setTerm("");
    router.replace(next.toString() ? `/words?${next.toString()}` : "/words");
  }

  function goPage(p: number) {
    const next = new URLSearchParams(params.toString());
    if (p > 0) next.set("page", String(p));
    else next.delete("page");
    router.replace(`/words?${next.toString()}`);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      {/*
        Geri düğmesi: Kelimeler alt sekmelerden çıktı ve tur özetinden ya da
        profilden açılıyor. Çubukta karşılığı olmayan bir ekrana girip cihazın
        kendi geri hareketini bilmeyen kullanıcı burada sıkışırdı.
      */}
      <PageBack
        fallback="/learn"
        title={tx("words.my_words")}
        subtitle={tx("words.subtitle", { n: formatNumber(total, lang) })}
      />

      {/*
        İlerleme grafikleri profildeydi ve orası yanlış yerdi: kaç kelimenin
        pekiştiğini merak eden kişi zaten kelime ekranındadır. Buraya gelince
        "Kelimelerim" tek bir soruyu değil ikisini birden cevaplıyor — hangi
        kelimeler ve ne kadarı oturdu.

        Kapalı açılıyor: dört grafik listenin önüne geçerse ekran yine bir
        panoya döner. Özet satırı kapalıyken de görünüyor, yani sayıya ulaşmak
        için açmak gerekmiyor.
      */}
      {progress ? (
        <section className="card overflow-hidden">
          <button
            type="button"
            onClick={() => setShowProgress((v) => !v)}
            aria-expanded={showProgress}
            data-panel="words_progress"
            className="flex w-full items-center gap-3 px-4 py-3 text-left"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-strong">{tx("appheader.progress")}</span>
              {progressSummary ? <span className="muted block text-caption">{progressSummary}</span> : null}
            </span>
            <motion.span
              animate={{ rotate: showProgress ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="muted shrink-0"
            >
              <ChevronIcon size={18} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {showProgress ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="border-t px-4 pb-4 pt-4" style={{ borderColor: "var(--border)" }}>
                  {progress}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      ) : null}

      <div className="space-y-3">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder={tx("words.search", { target: courseName(course, lang), nativeLang: LANG_LABEL[lang] })}
          aria-label={tx("words.search", { target: courseName(course, lang), nativeLang: LANG_LABEL[lang] })}
          /* Arama kutusu Android ile aynı: ilk harfi büyütmüyor (aranan sözcük
             İngilizce de olabilir ve sunucu küçük harfe indiriyor). */
          autoCapitalize="none"
          className="option w-full px-4 py-3 text-body outline-none focus:border-[color:var(--color-brand)]"
        />
        {/* İKİ AYRI ŞERİT — Android'deki gibi. Tek şeritte, aralarında ince
            bir çizgiyle duruyorlardı ve iki grup tek bir süzgeç gibi
            okunuyordu; sarılma olduğunda çizgi de satır ortasında kalıyordu. */}
        {/* TEK SEÇİMLİK SÜZGEÇ RADYO GRUBUDUR. `aria-pressed` bir aç/kapa
            düğmesi anlatıyor - ekran okuyucu "düğme, basılı" diyor ve
            kullanıcı birini seçmenin ötekini bıraktığını öğrenemiyor.
            Android iki şeridi de `accessibilityRole="radio"` ile veriyor
            (`WordsScreen`). */}
        <div role="radiogroup" aria-label={tx("words.filter_level")} className="flex flex-wrap items-center gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id || "all"}
              onClick={() => setFilter("level", l.id)}
              role="radio"
              aria-checked={query.level === l.id}
              className={`chip chip-filter px-3 py-1.5 text-caption ${query.level === l.id ? "chip-active" : ""}`}
            >
              {l.labelKey ? tx(l.labelKey) : l.id}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label={tx("wordsw.filter_status")} className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <button
              key={s.id || "any"}
              onClick={() => setFilter("status", s.id)}
              role="radio"
              aria-checked={query.status === s.id}
              className={`chip chip-filter px-3 py-1.5 text-caption ${query.status === s.id ? "chip-active" : ""}`}
            >
              {tx(s.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        /* Boş hâl EV KALIBINDA: Android'in `EmptyCard`ı (ikon karosu +
           başlık + açıklama + isteğe bağlı düğme). Burada yalnız sönük tek
           bir cümle vardı: ne olduğunu da, nereye gidileceğini de
           söylemiyordu. */
        <EmptyCard
          icon={CardsIcon}
          tint="var(--color-sky)"
          title={tx("words.no_words_found")}
          text={tx("words.empty_sub")}
          action={
            filtered ? (
              <button type="button" onClick={clearFilters} className="btn btn-primary px-4 py-2 text-body">
                {tx("words.clear_filters")}
              </button>
            ) : undefined
          }
        />
      ) : (
        <ul className="space-y-2">
          {rows.map((r, i) => {
            const st = statusOf(r);
            const isOpen = open === r.id;
            const note = grammarNote({ ...r, isNew: false }, lang);
            const example = firstExample(r.beispiel);
            const exampleTr = firstExample(r.beispielTr);
            const exampleEn = firstExample(r.beispielEn);
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.3) }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <div className="min-w-0 flex-1">
                    {/* SARMALIYOR, kırpmıyor: Android'in satırı iki metne de
                        satır sınırı vermiyor (`WordsScreen`). Kırpmak burada
                        İÇERİĞİ saklıyor — bileşik bir Almanca ismin sonu ya da
                        bir kelimenin ikinci anlamı satırın dışında kalıyordu,
                        oysa kullanıcı listeye tam onun için bakıyor. */}
                    <p className="font-semibold">
                      {r.artikel ? (
                        <span style={{ color: ARTIKEL_TONE[r.artikel] }}>{r.artikel} </span>
                      ) : null}
                      {r.de}
                    </p>
                    <p className="muted text-body">
                      {r.tr}
                      {/* İngilizce aynı satırda, ayraçla: liste satırı zaten
                          iki satır (Almanca + karşılık); üçüncü satır listeyi
                          taramayı zorlaştırırdı. */}
                      {r.en ? (
                        <span className="opacity-60" lang="en">
                          {" "}
                          · {r.en}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <span className="shrink-0 text-caption" style={{ color: st.tone }}>
                    {tx(st.labelKey)}
                  </span>
                  <span className="muted shrink-0 text-caption">{r.niveau}</span>
                </button>

                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t px-4 py-3 text-body"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <SpeakButton text={r.artikel ? `${r.artikel} ${r.de}` : r.de} size="sm" />
                      <span className="muted">
                        {typLabel(r.typ, r.tr, lang)}
                        {note ? ` · ${note}` : ""}
                      </span>
                    </div>
                    {example ? (
                      <>
                        <p className="muted mt-2 italic">{example}</p>
                        <SentenceTranslation
                          tr={exampleTr}
                          en={exampleEn}
                          className="muted mt-0.5 text-body"
                        />
                      </>
                    ) : null}
                    <p className="muted mt-2 text-caption">
                      {dueLabel(r.dueAt, tx) ?? tx("words.not_studied")}
                      {r.lapses ? ` · ${tx("words.n_lapses", { n: r.lapses })}` : ""}
                    </p>
                  </motion.div>
                ) : null}
              </motion.li>
            );
          })}
        </ul>
      )}

      {(page > 0 || hasMore) && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => goPage(page - 1)}
            disabled={page === 0}
            className="btn btn-ghost px-4 py-2 text-body disabled:opacity-60"
          >
            {tx("wordsw.prev")}
          </button>
          <span className="muted text-caption">{tx("wordsw.page", { n: page + 1 })}</span>
          <button
            onClick={() => goPage(page + 1)}
            disabled={!hasMore}
            className="btn btn-ghost px-4 py-2 text-body disabled:opacity-60"
          >
            {tx("wordsw.next")}
          </button>
        </div>
      )}
    </div>
  );
}
