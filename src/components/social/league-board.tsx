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
        role="alert"
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
              <SkeletonLine variant="strong" width={140} />
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

      {/*
        KOMPOZİSYON ANDROID'İN (`social/LeagueBoard`): tablo bir kart DEĞİL.
        Üstte bölüm başlığı (lig adı, büyük harfli sönük etiket) ve sağında
        kalan gün; altında ayrı kartlar, aralarında 8 boşluk.

        `lbw.league_sub` satırı WEB'E AİT ve kalıyor: Android'de karşılığı
        yok ama bir süs değil, ligin ne olduğunu söyleyen tek cümle — web'de
        sekme çubuğu altında bağlam daha zayıf.
      */}
      <section>
        <div className="mb-2 ml-1 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="muted truncate text-caption uppercase tracking-eyebrow">{t(tierKey(view.tier))}</h2>
            <p className="muted text-caption">{t("lbw.league_sub")}</p>
          </div>
          <span className="muted shrink-0 text-caption">
            {view.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: view.daysLeft })}
          </span>
        </div>

        {view.rows.length < 2 ? (
          /* Android burada ikonlu boş kart gösteriyor. Web'de yalnız iki satır
             metin vardı; tablo başlığı (lig adı, kalan gün) üstte duruyor ve
             altındaki boşluk yükleniyormuş gibi görünüyordu. Kart kendi
             başlığını koruduğu için yalnız karo eklendi. */
          <div className="card flex flex-col items-center gap-2 p-4 text-center">
            <span
              className="flex items-center justify-center rounded-tile on-fill"
              style={{ width: 52, height: 52, background: "var(--color-sky)" }}
            >
              <PodiumIcon size={26} />
            </span>
            <p className="mt-1 text-h3">{t("league.alone")}</p>
            {/* Açıklama satırı KABUĞUN ölçüsünde: `EmptyCard` sönük `caption`
                yazıyor, burada `body` vardı — aynı boş hâl iki platformda iki
                ayrı puntoyla okunuyordu (Android `EmptyCard` da caption). */}
            <p className="muted text-caption">{t("league.alone_sub")}</p>
          </div>
        ) : (
          <ol className="space-y-2">
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

        {/* Açıklama Android'de `micro`, sönük, ortalı ve üstünde 12 boşluk. */}
        <p className="muted mt-3 text-center text-micro">
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
      {/* SATIR BIR KART (Android `social/LeagueBoard`): `radii.lg`, 12 dolgu,
          1 piksel kenarlik, aralarinda 8 bosluk. Kendi satirin marka tintli
          zemin ve marka kenarligi aliyor; kusaktaki satirin kenarligi kusagin
          rengi (Android orada ayrica `softShadow(tint, 4)` kullaniyor -
          webin karsiligi renkli golge). */}
      <li
        className={`flex items-center gap-3 rounded-panel border p-3${tint ? " glow-tint-sm" : ""}`}
        style={{
          background: row.isMe ? "var(--brand-soft)" : "var(--surface)",
          borderColor: row.isMe ? "var(--color-brand-500)" : (tint ?? "var(--hairline)"),
          ...(tint ? ({ "--tint-fill": tint } as React.CSSProperties) : null),
        }}
      >
        <span className="w-[30px] shrink-0 text-center text-h3 tabular-nums" style={{ color: tint ?? "var(--text-muted)" }}>
          {row.rank}
        </span>
        <Avatar userId={row.userId} name={row.name} avatar={row.avatar} size={40} ring={tint} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-strong">
          {row.username && !row.isMe ? (
            <Link href={`/u/${row.username}`} prefetch={false}>
              {/* Yedek `social.student` — bkz. `daily-player`. Aynı kişinin
                  bildirme düğmesi zaten "öğrenci" diyordu. */}
              {row.name ?? t("social.student")}
            </Link>
          ) : (
            (row.name ?? t("social.student"))
          )}
          {row.isMe ? (
            <span
              className="ml-2 rounded-full px-1.5 py-0.5 text-micro uppercase tracking-eyebrow"
              style={{ background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)", color: "var(--color-brand)" }}
            >
              {t("social.you")}
            </span>
          ) : null}
          </span>
          {/* SERİ ADIN ALTINDA, CÜMLEYLE. Web sağda çıplak bir sayı
              gösteriyordu (ekran okuyucuya "5" diye okunuyordu, cümle yalnız
              `aria-label`daydı); Android adın altına `{n} gün seri` yazıyor. */}
          {row.streak > 0 ? (
            <span className="mt-0.5 flex items-center gap-1">
              <FlameIcon size={12} style={{ color: "var(--color-flame)" }} />
              <span className="muted text-micro">{t("social.days_streak", { n: row.streak })}</span>
            </span>
          ) : null}
        </span>
        {/* XP'NİN BİRİMİ DE YAZILI — Android sayının altına `XP` koyuyor. */}
        <span className="shrink-0 text-right">
          <span className="block text-h3 tabular-nums" style={row.isMe ? { color: "var(--color-brand)" } : undefined}>
            {formatNumber(row.xp, lang)}
          </span>
          <span className="muted block text-micro">XP</span>
        </span>
        {row.isMe ? null : (
          <button
            type="button"
            onClick={() => onReport(row)}
            aria-label={t("leaderboard.report_hint", { name: row.name ?? t("social.student") })}
            title={t("user.report")}
            className="faint hit-8 shrink-0 rounded-chip p-1 hover:text-[color:var(--text-muted)]"
          >
            <FlagIcon size={13} />
          </button>
        )}
      </li>
      {edge ? (
        <li aria-hidden className="flex items-center gap-2 py-1">
          <span className="h-px flex-1" style={{ background: edge === "up" ? ZONE_UP : ZONE_DOWN }} />
          <span className="text-micro uppercase tracking-eyebrow" style={{ color: edge === "up" ? ZONE_UP : ZONE_DOWN }}>
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
  /* Yumuşak tintin zemini ailenin 500'ü, mürekkebi takma ad (bkz. `tint-soft`). */
  const fill = up ? "var(--color-mint-500)" : down ? "var(--color-rose-500)" : "var(--color-sky-500)";
  return (
    <section className="card flex items-center gap-3 p-4" style={{ borderColor: tint }}>
      <span
        className="tint-soft flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
        style={{ "--tint-fill": fill, "--tint-ink": tint } as React.CSSProperties}
      >
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
