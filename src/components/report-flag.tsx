"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ReportIcon } from "@/components/icons";
import { ReportDialog } from "@/components/report-dialog";
import { targetRef, type ReportSurface, type ReportTarget } from "@/lib/report";
import type { Round } from "@/lib/types";
import { useT } from "@/lib/i18n/client";

/**
 * İçerik bildirimi — "⚑ Bildir" (`docs/plan/content-feedback.md` › Arayüz).
 * ÖĞRENME İÇERİĞİ için: kelime, soru, sınav maddesi. Yapay zekâ çıktılarının
 * bildirimi ayrı bir tür (`ReportDialog kind="assessment"` vb.) ama aynı
 * bağlantıyı (`ReportLink`) çiziyor.
 *
 * ANLIK GÖRÜNTÜ AÇILIŞTA ALINIYOR. `content` bir işlev olabilir: soru,
 * şıklar ve kullanıcının cevabı bayrağa basıldığı andaki hâliyle panele
 * gidiyor; her çizimde JSON kurmak gerekmiyor.
 *
 * YERİ CEVAPTAN SONRA (2026-09-28, Duolingo/Babbel düzeni). Bayrak soru
 * ekranındaydı (başlık karosu, ilerleme satırı, soru başlığı) ve cevap
 * vermeden önce dikkati bölüyordu. Artık bildirim cevaptan sonraki geri
 * bildirimde: tur katmanında "Devam"ın solunda (`RoundReportScope`),
 * alıştırmada sorunun açıklamasının altında, sınavda sonuç listesinin her
 * maddesinde. Sınav sürerken hiçbir yerde yok. Mobil `ReportFlag` aynı yerler.
 *
 * Tek biçim: yapay zekâ çıktılarının altındaki bağlantıyla AYNI görünüş
 * (`ReportLink`). Başlık karosu (`tile`) ve kart içi ikon kalktı. Yeri de
 * aynı kural: bildirdiği içeriğin altında sol başta (`ReportLink`).
 */
export function ReportFlag({
  surface,
  target,
  content,
  onOpenChange,
  className = "",
  inline = false,
}: {
  surface: ReportSurface;
  /** Hedef henüz yoksa (soru yükleniyor) bayrak çizilmiyor. */
  target: ReportTarget | null | undefined;
  content: string | (() => string);
  /** Pencere açılınca `true`, kapanınca `false` — süreli turlar sayacı bununla durduruyor. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
  /** Satır içinde (cevap çubuğunda Devam'ın solunda): hizayı satır veriyor. */
  inline?: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState("");
  if (!target) return null;
  const openSheet = () => {
    let text = "";
    try {
      text = typeof content === "function" ? content() : content;
    } catch {
      /* Anlık görüntü kurulamasa da bildirim gidebilmeli: hedef yeterli. */
    }
    setSnap(text);
    setOpen(true);
    onOpenChange?.(true);
  };
  return (
    <>
      <ReportLink onClick={openSheet} label={t("report.flag_a11y")} className={className} inline={inline} />
      <ReportDialog
        open={open}
        kind="content"
        refId={targetRef(target)}
        content={snap}
        surface={surface}
        target={target}
        onClose={() => {
          setOpen(false);
          onOpenChange?.(false);
        }}
      />
    </>
  );
}

/**
 * Uygulamanın TEK bildirim bağlantısı: küçük bayrak + "Bildir", sönük.
 * İçerik bayrağı da yapay zekâ çıktılarının altındaki bağlantılar da bunu
 * çiziyor; iki ayrı görünüş öğrenciye iki ayrı şey gibi geliyordu. Görünen
 * etiket her yerde aynı kısa söz (`conversation.report`); NE bildirildiği
 * ekran okuyucu adında (`label`: "Bu içerikle ilgili sorun bildir", "Bu
 * yanıtı bildir", "Değerlendirmeyi bildir"). Mobil `ui/ReportLink`
 * `ReportButton` aynı düzen.
 *
 * Hedef: 11 px yazı tek başına ~18 px — WCAG 2.2'nin 24'ünün altı. `min-h-6`
 * görünen satırı 24'e, `hit-8` dokunma hedefini her eksende 8 px büyütüyor
 * (~40). `whitespace-nowrap` + `shrink-0`: 320 px'te bile etiket bölünmüyor,
 * dar satırda yanındaki öğe daralıyor.
 *
 * YERİ HER YERDE BAŞTA (sol uç, 2026-10-10, Samet: "bilinçli tasarım değil,
 * tutarsız"). Mobilde soru açıklamasının, sınav dökümünün, kelime kartının
 * altında sağdaydı, sohbet balonunun altında solda; web'de dökümde başlık
 * satırının sağ ucunda, sonuç ekranında ortadaydı. Kural: bildirdiği içeriğin
 * ALTINDA, sol başta; cevap çubuğunda Devam'ın solunda (`inline`). Hizayı
 * bileşen veriyor (`self-start`: esnek sütunda da gerilmiyor), çağıran ekran
 * vermiyor (`check:parity` "BILDIR BASTA"). Tek istisna yürüyüş: tek odaklı,
 * ortalı kartta. Mobil `ReportButton` aynı kural.
 */
export function ReportLink({
  onClick,
  label,
  className = "",
  inline = false,
}: {
  onClick: () => void;
  /** Ekran okuyucu adı: ne bildiriliyor. */
  label: string;
  className?: string;
  /** Satır içinde (yan yana öğelerle): kendi hizasını vermiyor. */
  inline?: boolean;
}) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup="dialog"
      className={`muted hit-8 inline-flex min-h-6 shrink-0 items-center gap-1 whitespace-nowrap text-micro underline-offset-2 hover:underline ${inline ? "" : "self-start"} ${className}`}
    >
      <ReportIcon size={12} />
      <span>{t("conversation.report")}</span>
    </button>
  );
}

/**
 * Tur katmanının bildirimi — oyuncu (tur, meydan okuma, patron) turun hedefini
 * ve anlık görüntüsünü buraya koyuyor, `round-sheet` "Devam"ın soluna çiziyor.
 * On üç oyuna ayrı ayrı prop geçirmek yerine bağlam (bkz. `games/no-hints`).
 * Kapsam yoksa (sınavın kelime bölümü: sınav sürerken bildirim yok) katman
 * bağlantısız kalıyor.
 */
export type RoundReport = {
  surface: ReportSurface;
  target: ReportTarget | null | undefined;
  content: string | (() => string);
  /** Süreli turlar (meydan okuma, patron): pencere açıkken sayaç duruyor, bildirmek süre yemiyor. */
  onOpenChange?: (open: boolean) => void;
};

const RoundReportContext = createContext<RoundReport | null>(null);

export function RoundReportScope({ report, children }: { report: RoundReport; children: ReactNode }) {
  return <RoundReportContext.Provider value={report}>{children}</RoundReportContext.Provider>;
}

export function useRoundReport(): RoundReport | null {
  return useContext(RoundReportContext);
}

/** Anlık görüntü: kısa JSON, boş alanlar atılmış, 4000 karakterle sınırlı. */
export function snapshot(data: Record<string, unknown>): string {
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null || v === "") continue;
    clean[k] = v;
  }
  return JSON.stringify(clean).slice(0, 4000);
}

/**
 * Kelime turunun hedefi — tur, pratik, yürüyüş ve sınavların kelime bölümü
 * aynı kimliği kullanıyor: `word` + `game`. Eşleştirmede ilk kelime (anlık
 * görüntü turun bütününü taşıyor).
 */
export function roundTarget(round: Round): ReportTarget {
  const w = round.game === "match" ? round.words[0] : round.word;
  return { type: "word", id: String(w?.id ?? round.id), game: round.game };
}
