"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { FlagIcon, FlameIcon, PodiumIcon, TrophyIcon } from "@/components/icons";
import { ReportDialog } from "@/components/report-dialog";
import { EmptyCard } from "@/components/empty-card";
import { RowSkeleton, SkeletonCard, SkeletonLine, SkeletonPill } from "@/components/skeleton";
import { social, tierKey, type LeagueRowView, type LeagueView } from "@/lib/social/client";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";

/**
 * Haftalık lig tablosu.
 *
 * Genel sıralamadan tek farkı görünmüyor ama tek farkı BU: liste otuz kişiyle
 * sınırlı ve iki kuşağa bölünmüş — üstte yükselenler, altta düşenler. Sıra
 * numarası tek başına bir yargıdır ("18. sıradasın"); kuşak onu bir mesafeye
 * çevirir ("düşme çizgisinin iki sıra üstündesin").
 *
 * Renk kuşağı işaretliyor, madalya değil: ilk üç ayrıcalıklı değil, ilk
 * `promote` kişi ayrıcalıklı. Hafta sonunda önemli olan o.
 */
const ZONE_UP = "var(--color-mint)";
const ZONE_DOWN = "var(--color-rose)";

export function LeagueBoard() {
  const t = useT();
  const lang = useLang();
  const [view, setView] = useState<LeagueView | null>(null);
  const [err, setErr] = useState(false);
  const [result, setResult] = useState<LeagueView["result"]>(null);
  /* Ligdeki kişiler arkadaş DEĞİL: uygunsuz ad bildirimi buradan açılıyor.
     Sunucu, istemci kitaplığı ve kart zaten hazırdı - eksik olan tek şey
     düğmeydi, yani yazılmış bir yol hiç kullanılmıyordu. Android aynı satırda
     basılı tutunca aynı kartı açıyor. */
  const [report, setReport] = useState<LeagueRowView | null>(null);

  useEffect(() => {
    social
      .league()
      .then((v) => {
        setView(v);
        setResult(v.result);
      })
      .catch(() => setErr(true));
  }, []);

  const dismiss = useCallback(() => {
    setResult(null);
    void social.leagueSeen().catch(() => {
      /* işaretlenemezse gelecek açılışta yine çıkar; zararsız */
    });
  }, []);

  /* Hata durumu Android'de ikonlu boş kart; web'de yalnız sönük bir cümleydi
     ve sayfa boşmuş gibi duruyordu. Arkadaş tablosu zaten bu kartı kullanıyor,
     iki sekme aynı görünüyor. */
  if (err)
    return (
      <EmptyCard
        icon={PodiumIcon}
        tint="var(--color-sky)"
        title={t("leaderboard.couldn_t_load_leaderboard")}
        text={t("social.err_offline")}
      />
    );
  /* İSKELET GERÇEK DÜZENİN ÖLÇÜSÜNDE. Eskiden altı düz blok çiziliyordu ve
     tablo başlığının (lig adı + kalan gün) yeri hiç ayrılmıyordu: veri gelince
     liste aşağı kayıyordu. Mobil `LeagueBoard` da başlık satırını ayrı ayırıp
     satırları gerçek yükseklikte çiziyor. */
  if (!view)
    return (
      <div className="flex flex-col gap-3">
        <SkeletonCard>
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <SkeletonLine variant="bodyStrong" width={140} />
              <SkeletonLine variant="caption" width="70%" className="mt-1" />
            </div>
            <SkeletonPill width={68} height={20} />
          </div>
        </SkeletonCard>
        <RowSkeleton rows={6} height={52} />
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {result ? <ResultCard result={result} onDismiss={dismiss} /> : null}

      <section className="card overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b px-5 py-3.5" style={{ borderColor: "var(--border)" }}>
          <div className="min-w-0">
            <h2 className="truncate font-bold">{t(tierKey(view.tier))}</h2>
            <p className="muted text-xs">{t("lbw.league_sub")}</p>
          </div>
          <span className="muted shrink-0 text-xs">
            {view.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: view.daysLeft })}
          </span>
        </div>

        {view.rows.length < 2 ? (
          /* Android burada ikonlu boş kart gösteriyor. Web'de yalnız iki satır
             metin vardı; tablo başlığı (lig adı, kalan gün) üstte duruyor ve
             altındaki boşluk yükleniyormuş gibi görünüyordu. Kart kendi
             başlığını koruduğu için yalnız karo eklendi. */
          <div className="flex flex-col items-center gap-2 p-6 text-center">
            <span
              className="flex items-center justify-center rounded-tile on-fill"
              style={{ width: 52, height: 52, background: "var(--color-sky)" }}
            >
              <PodiumIcon size={26} />
            </span>
            <p className="mt-1 text-h3">{t("league.alone")}</p>
            <p className="muted text-body">{t("league.alone_sub")}</p>
          </div>
        ) : (
          <ol>
            {view.rows.map((r, i) => (
              <LeagueRow
                key={r.userId}
                row={r}
                lang={lang}
                zone={zoneOf(i + 1, view)}
                /* Kuşak sınırı bir ÇİZGİ: son yükselen ile ilk kalanın arasına,
                   son kalanla ilk düşenin arasına. Kullanıcı "kaç sıra kaldı"yı
                   saymadan görsün. */
                edge={view.promote > 0 && i + 1 === view.promote ? "up" : view.demote > 0 && i + 1 === view.rows.length - view.demote ? "down" : null}
                edgeLabel={
                  view.promote > 0 && i + 1 === view.promote
                    ? t("league.promote_zone")
                    : view.demote > 0 && i + 1 === view.rows.length - view.demote
                      ? t("league.demote_zone")
                      : ""
                }
                onReport={setReport}
              />
            ))}
          </ol>
        )}

        <p className="border-t px-5 py-2.5 text-center text-xs font-semibold" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          {view.promote > 0
            ? t("league.explain_up", { n: view.promote })
            : view.rows.length >= 2 && view.demote === 0
              ? t("league.explain_top")
              : t("league.explain_none")}
          {view.demote > 0 ? ` · ${t("league.explain_down", { n: view.demote })}` : ""}
        </p>
      </section>

      <ReportDialog
        open={report !== null}
        kind="user"
        refId={report?.userId ?? ""}
        content={report?.name ?? ""}
        onClose={() => setReport(null)}
      />
    </div>
  );
}

function zoneOf(rank: number, view: LeagueView): "up" | "down" | null {
  if (view.promote > 0 && rank <= view.promote) return "up";
  if (view.demote > 0 && rank > view.rows.length - view.demote) return "down";
  return null;
}

function LeagueRow({
  row,
  lang,
  zone,
  edge,
  edgeLabel,
  onReport,
}: {
  row: LeagueRowView;
  lang: ReturnType<typeof useLang>;
  zone: "up" | "down" | null;
  edge: "up" | "down" | null;
  edgeLabel: string;
  onReport: (row: LeagueRowView) => void;
}) {
  const t = useT();
  const tint = zone === "up" ? ZONE_UP : zone === "down" ? ZONE_DOWN : null;
  return (
    <>
      <li
        className="flex items-center gap-3 border-t px-5 py-2.5 first:border-t-0"
        style={{
          borderColor: "var(--border)",
          background: row.isMe ? "color-mix(in srgb, var(--color-brand) 8%, transparent)" : undefined,
        }}
      >
        <span className="w-6 shrink-0 text-center text-sm font-black tabular-nums" style={{ color: tint ?? "var(--text-muted)" }}>
          {row.rank}
        </span>
        <Avatar userId={row.userId} name={row.name} size={32} ring={tint} />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">
          {row.username && !row.isMe ? (
            <Link href={`/u/${row.username}`} prefetch={false}>
              {row.name ?? t("social.unnamed")}
            </Link>
          ) : (
            (row.name ?? t("social.unnamed"))
          )}
          {row.isMe ? (
            <span
              className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              style={{ background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)", color: "var(--color-brand)" }}
            >
              {t("social.you")}
            </span>
          ) : null}
        </span>
        {row.streak > 0 ? (
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold tabular-nums" style={{ color: "var(--color-flame)" }} title={t("social.days_streak", { n: row.streak })}>
            <FlameIcon size={13} />
            {row.streak}
          </span>
        ) : null}
        <span className="w-16 shrink-0 text-right text-sm font-bold tabular-nums" style={{ color: "var(--color-brand)" }}>
          {formatNumber(row.xp, lang)}
        </span>
        {row.isMe ? null : (
          <button
            type="button"
            onClick={() => onReport(row)}
            aria-label={t("leaderboard.report_hint", { name: row.name ?? t("social.student") })}
            title={t("user.report")}
            className="faint shrink-0 rounded-lg p-1 hover:text-[color:var(--text-muted)]"
          >
            <FlagIcon size={13} />
          </button>
        )}
      </li>
      {edge ? (
        <li aria-hidden className="flex items-center gap-2 px-5 py-1">
          <span className="h-px flex-1" style={{ background: edge === "up" ? ZONE_UP : ZONE_DOWN }} />
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: edge === "up" ? ZONE_UP : ZONE_DOWN }}>
            {edgeLabel}
          </span>
          <span className="h-px flex-1" style={{ background: edge === "up" ? ZONE_UP : ZONE_DOWN }} />
        </li>
      ) : null}
    </>
  );
}

/**
 * Geçen haftanın sonucu — bir kez gösterilir, kapatılınca sunucuda işaretlenir.
 * Sayfayı kesmiyor, tablonun üstünde bir kart olarak duruyor: haber iyi de olsa
 * kötü de olsa kullanıcının o an yapacağı iş bu haftanın turu.
 */
function ResultCard({ result, onDismiss }: { result: NonNullable<LeagueView["result"]>; onDismiss: () => void }) {
  const t = useT();
  const lang = useLang();
  const up = result.outcome === "promoted";
  const down = result.outcome === "demoted";
  const tint = up ? "var(--color-mint)" : down ? "var(--color-rose)" : "var(--color-sky)";
  return (
    <section className="card flex items-center gap-3 p-4" style={{ borderColor: tint }}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile" style={{ background: `color-mix(in srgb, ${tint} 16%, transparent)`, color: tint }}>
        <TrophyIcon size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-h3">
          {t(up ? "league.result_promoted" : down ? "league.result_demoted" : "league.result_stayed", {
            league: t(tierKey(result.nextTier)),
          })}
        </p>
        <p className="muted text-caption">{t("league.result_rank", { rank: result.rank, xp: formatNumber(result.xp, lang) })}</p>
      </div>
      <button className="btn btn-primary shrink-0 px-3.5 py-2 text-caption" onClick={onDismiss}>
        {t("league.result_go")}
      </button>
    </section>
  );
}
