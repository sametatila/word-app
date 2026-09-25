"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { useLang, useT } from "@/lib/i18n/client";
import { formatPercent, localeOf } from "@/lib/i18n/dict";
import { SKILL_LABEL_KEYS } from "@/lib/skills/meta";
import type { CefrLevel, SkillId } from "@/lib/skills/types";
import { SKILL_ICON, SKILL_TINT } from "@/components/skills/theme";
import { FlowNote } from "@/components/flow";
import { UnlockProgress } from "@/components/unlock-progress";
import type { SurfaceView } from "@/lib/premium/unlock-copy";
import { CheckIcon, ChevronRightIcon, LockIcon } from "@/components/icons";

export type BrowserRow = {
  id: string;
  title: string;
  genre: string;
  minutes: number;
  items: number;
  score: number | null;
  done: boolean;
  /** Hak bitti ve alıştırma daha önce açılmadı: satır planlara götürür. */
  locked: boolean;
};

export type BrowserSection = {
  skill: SkillId;
  rows: BrowserRow[];
  nextId: string | null;
  /** Premium kotası notu (`gateNote` çıktısı); yoksa çizilmez. */
  note: { key: string; n: number } | null;
  /**
   * Seviyenin kalan hakkı ve sonraki hakkın nasıl açılacağı (2026-09-25:
   * Beceriler hakkı seviye başına). Varsa not yerine bu çiziliyor.
   */
  unlock?: SurfaceView | null;
};

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Beceriler sekmesinin gövdesi: seviye şeridi, beceri karoları ve SEÇİLİ
 * becerinin listesi.
 *
 * NEDEN SEKMELİ (2026-09-25). Kütüphane hücre başına yirmi egzersize çıktı;
 * beş bölüm alt alta bir seviyede 100 satır demekti ve dil bilgisine inmek
 * için dört listeyi geçmek gerekiyordu. Artık beş karo bir bakışta beş
 * becerinin ilerlemesini gösteriyor, liste yalnız seçili becerininki. Mobilde
 * `SkillsScreen` aynı düzeni çiziyor.
 *
 * Seçili beceri adreste (`?skill=`) duruyor ama sunucuya gidilmiyor: sekme
 * değişimi anında, adres `replaceState` ile güncelleniyor ki yenileme ve
 * seviye bağlantıları seçimi korusun. Adreste yoksa başlangıç, sunucunun
 * önerdiği beceri (en geride kalan).
 */
export function SkillBrowser({
  level,
  sections,
  initialSkill,
  doneCount,
  total,
  suggestion,
}: {
  level: CefrLevel;
  sections: BrowserSection[];
  initialSkill: SkillId;
  doneCount: number;
  total: number;
  /** Öneri ya da "seviye tamam" kartı — sunucuda çiziliyor, karoların üstüne. */
  suggestion: ReactNode;
}) {
  const t = useT();
  const lang = useLang();
  const [skill, setSkill] = useState<SkillId>(initialSkill);
  const [hideDone, setHideDone] = useState(false);
  const root = useId();
  const tabId = (s: SkillId) => `${root}-${s}`;
  const panelId = `${root}-panel`;

  const visible = sections.filter((s) => s.rows.length);
  const current = visible.find((s) => s.skill === skill) ?? visible[0] ?? null;

  function choose(next: SkillId) {
    setSkill(next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("level", level);
      url.searchParams.set("skill", next);
      window.history.replaceState(null, "", url);
    } catch {
      /* adres güncellenemese de seçim ekranda geçerli */
    }
  }

  const finished = current ? current.rows.filter((r) => r.done).length : 0;
  const rows = current ? (hideDone ? current.rows.filter((r) => !r.done) : current.rows) : [];
  const Icon = current ? SKILL_ICON[current.skill] : null;
  const tint = current ? SKILL_TINT[current.skill] : "";

  return (
    <>
      {/* Etiket ve sayaç TEK satırda, çiplerin üstünde — mobildeki düzen. */}
      <div className="mb-2 ml-1 flex items-center justify-between">
        <p className="muted text-caption tracking-wide">{t("skills.level")}</p>
        {total ? <p className="muted text-caption">{t("skills.done_of", { done: doneCount, total })}</p> : null}
      </div>
      {/* Seviye seçici — EŞİT GENİŞLİKTE BEŞ sekme; seçili beceri korunur. */}
      <nav className="mb-4 flex gap-2" aria-label={t("skills.level")}>
        {LEVELS.map((lv) => {
          const active = lv === level;
          return (
            <Link
              key={lv}
              href={`/skills?level=${lv}&skill=${current?.skill ?? skill}`}
              aria-current={active ? "page" : undefined}
              className="pressable flex-1 rounded-tile py-2.5 text-center text-strong"
              style={{
                border: `1.5px solid ${active ? "var(--color-brand-500)" : "var(--border)"}`,
                background: active ? "color-mix(in srgb, var(--color-brand-500) 14%, transparent)" : "var(--surface)",
                color: active ? "var(--color-brand)" : "var(--text-muted)",
              }}
            >
              {lv}
            </Link>
          );
        })}
      </nav>

      {!total ? (
        <p className="card mb-4 p-4 text-body" style={{ color: "var(--text-muted)" }}>
          {t("skills.this_course_has_no_reading")}
        </p>
      ) : null}

      {suggestion}

      {current ? (
        <>
          {/*
            BECERİ KAROLARI — beş eşit sütun. Karo becerinin rengini simgede,
            ilerlemesini sayıda ve ince çubukta taşıyor; seçili karo seviye
            sekmesiyle aynı dili konuşuyor (turuncu kenar, %14 zemin), yoksa
            "seçtim" iki ayrı biçimde görünürdü. Sekme şeridi (`tablist`),
            bağlantı şeridi değil: aynı sayfanın beş görünümü.
          */}
          <div role="tablist" aria-label={t("skills.skill")} className="mb-4 grid grid-cols-5 gap-1.5 sm:gap-2">
            {visible.map((s) => {
              const active = s.skill === current.skill;
              const SIcon = SKILL_ICON[s.skill];
              const doneN = s.rows.filter((r) => r.done).length;
              const pct = Math.round((doneN / s.rows.length) * 100);
              return (
                <button
                  key={s.skill}
                  id={tabId(s.skill)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={panelId}
                  aria-label={`${t(SKILL_LABEL_KEYS[s.skill])}, ${doneN}/${s.rows.length}`}
                  onClick={() => choose(s.skill)}
                  className="pressable flex min-w-0 flex-col items-center gap-1 rounded-tile px-0.5 pb-2 pt-2.5"
                  style={{
                    border: `1.5px solid ${active ? "var(--color-brand-500)" : "var(--border)"}`,
                    background: active ? "color-mix(in srgb, var(--color-brand-500) 14%, transparent)" : "var(--surface)",
                  }}
                >
                  <SIcon size={20} style={{ color: SKILL_TINT[s.skill] }} />
                  {/* İki satıra kadar: 390 px telefonda "Dil bilgisi" tek satıra
                      sığmıyor ve kırpılınca okunmuyordu. Sayaç ve çubuk
                      `mt-auto` ile dibe yaslı, karolar aynı hizada kalıyor. */}
                  <span
                    className="line-clamp-2 w-full text-center text-caption leading-tight"
                    style={{ color: active ? "var(--color-brand)" : "var(--text)" }}
                  >
                    {t(SKILL_LABEL_KEYS[s.skill])}
                  </span>
                  <span className="muted mt-auto block text-micro">
                    {doneN}/{s.rows.length}
                  </span>
                  <span aria-hidden className="block h-1 w-4/5 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
                    <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: SKILL_TINT[s.skill] }} />
                  </span>
                </button>
              );
            })}
          </div>

          <section id={panelId} role="tabpanel" aria-labelledby={tabId(current.skill)} className="mb-5">
            <div className="mb-2 ml-1 flex items-center gap-2">
              {Icon ? <Icon size={18} style={{ color: tint }} /> : null}
              <h2 className="text-h3">{t(SKILL_LABEL_KEYS[current.skill])}</h2>
              <span className="muted text-caption">
                {finished}/{current.rows.length}
              </span>
              {/* Bitenleri gizle: yirmi satırın çoğu bittiğinde sıradakini
                  bulmak için kaydırmak gerekmesin. Hiç biten yoksa anahtar yok. */}
              {finished ? (
                <button
                  type="button"
                  aria-pressed={hideDone}
                  onClick={() => setHideDone((v) => !v)}
                  className="pressable ml-auto text-caption"
                  style={{ color: "var(--color-brand)" }}
                >
                  {hideDone ? t("skills.show_done", { n: finished }) : t("skills.hide_done")}
                </button>
              ) : null}
            </div>
            {/* Kuralı kilide çarpmadan ÖNCE söyle (deneme sınavlarındaki not). */}
            {current.unlock ? (
              <div className="mb-2">
                <UnlockProgress
                  copy={current.unlock.copy}
                  compact={current.unlock.remaining > 0}
                  celebrate={{ key: `skill:${current.skill}:${level}`, open: current.unlock.open, gain: current.unlock.copy?.when?.gain }}
                />
              </div>
            ) : current.note ? (
              <div className="mb-2">
                <FlowNote
                  icon={<LockIcon size={16} className="muted shrink-0" />}
                  text={`${t("skills.ai_quota")} · ${t(current.note.key, { n: current.note.n })}`}
                />
              </div>
            ) : null}
            {rows.length ? (
              <ul className="card divide-y px-4" style={{ borderColor: "var(--hairline)" }}>
                {rows.map((m) => (
                  <li key={m.id}>
                    <Row row={m} isNext={current.nextId === m.id} tint={tint} lang={lang} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="card p-4 text-body" style={{ color: "var(--text-muted)" }}>
                {t("skills.all_done_hidden", { n: finished })}
              </p>
            )}
          </section>
        </>
      ) : null}
    </>
  );
}

function Row({ row, isNext, tint, lang }: { row: BrowserRow; isNext: boolean; tint: string; lang: ReturnType<typeof useLang> }) {
  const t = useT();
  return (
    <Link
      href={row.locked ? "/premium" : `/immersion/skill/${row.id}?from=skills`}
      prefetch={row.locked ? false : undefined}
      className="pressable flex items-center gap-3 py-3"
      style={row.locked ? { opacity: 0.6 } : undefined}
    >
      {/* Nokta: biten yosun, bitmeyen becerinin kendi rengi. */}
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: row.done ? "var(--color-mint-500)" : tint }} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-strong">{row.title}</span>
        <span className="muted block text-caption">
          {t(`genre.${row.genre}`)} · {t("skills.dk", { n: row.minutes })} · {t("skills.n_items_short", { n: row.items })}
          {isNext ? (
            <>
              {" · "}
              <span style={{ color: tint }}>{t("skills.next").toLocaleLowerCase(localeOf(lang))}</span>
            </>
          ) : null}
        </span>
      </span>
      {/* Son puan: bitmişse yeşil, bitmemişse kehribar — "denedim ama %50
          aldım" ile "hiç açmadım" ayrışsın. %14 tint + anlamsal jeton. */}
      {row.score !== null ? (
        <span
          className="shrink-0 rounded-chip px-1.5 py-0.5 text-micro"
          style={{
            background: row.done
              ? "color-mix(in srgb, var(--color-mint-500) 14%, transparent)"
              : "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
            color: row.done ? "var(--color-mint)" : "var(--color-flame)",
          }}
        >
          {formatPercent(row.score, lang)}
        </span>
      ) : null}
      {/* "Bitti" ve "kilitli" ekran okuyucuya da söyleniyor. */}
      {row.locked ? (
        <LockIcon size={18} role="img" aria-hidden={false} aria-label={t("gate.premium_only")} className="muted shrink-0" />
      ) : row.done ? (
        <CheckIcon size={18} role="img" aria-hidden={false} aria-label={t("common.completed")} className="shrink-0" style={{ color: "var(--color-mint)" }} />
      ) : (
        <ChevronRightIcon size={20} className="muted shrink-0" />
      )}
    </Link>
  );
}
