"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { CheckIcon, ChevronIcon, MicIcon, SparkIcon } from "@/components/icons";
import { SkeletonLine } from "@/components/skeleton";
import { legalPath } from "@/lib/legal";
import { useLang, useT } from "@/lib/i18n/client";
import {
  decideAiConsent,
  fetchAiConsent,
  registerAiConsentHost,
  type AiConsentProcessor,
  type AiConsentPurpose,
} from "@/lib/ai-consent-client";

/**
 * Yapay zekâ işleme rızası diyaloğu — mobil `M/src/ui/AiConsentSheet.tsx`in
 * karşılığı.
 *
 * Apple'ın 5.1.2(i) retlerinde istenen dört şey sırayla ekranda: NE
 * gönderiliyor, KİME (sağlayıcılar adıyla, gizlilik politikasının tablosundan),
 * göndermeden ÖNCE izin ve politikaya bağlantı. Play'in belirgin açıklama
 * kuralı da aynı şeyi istiyor: olumlu bir eylemle onay, başka açıklamalarla
 * paketlenmemiş. Web'de mağaza yok ama gönderilen veri aynı; söylenen de aynı.
 *
 * İKİ DÜĞME AYNI AĞIRLIKTA DEĞİL AMA İKİSİ DE AÇIK. Bu bir sistem izni öncesi
 * ekranı değil (orada tek "Devam" düğmesi beklenir); bir VERİ PAYLAŞIMI rızası
 * ve reddetmek kabul etmek kadar kolay olmalı. "Yapay zekâ olmadan devam et"
 * kararı kaydediliyor ve diyalog bir daha kendiliğinden açılmıyor.
 *
 * Esc ya da zemine dokunmak karar YAZMIYOR: kullanıcı okumadan kapattıysa ne
 * evet ne hayır dedi; o istek yedeğine düşüyor ve bir sonraki yapay zekâ
 * çağrısında yeniden soruluyor. Odak tuzağı, Esc ve arka planın
 * etkisizleşmesi `<dialog>`un işi (bkz. `confirm-dialog`).
 */

/**
 * Sağlayıcı listesi — mikrofon açıklaması (`mic-disclosure`) da aynı bileşeni
 * kullanıyor ki iki diyalog alıcıları aynı biçimde saysın.
 *
 * Kap zeminsiz ve çizgili: iskelet çubukları `surface-2` rengiyle çiziliyor
 * (`components/skeleton`), `surface-2` zeminli bir kutuda görünmezlerdi.
 */
export function ProcessorList({ processors, failed }: { processors: AiConsentProcessor[] | null; failed: boolean }) {
  const t = useT();
  return (
    <div className="rounded-panel border px-3 py-2.5" style={{ borderColor: "var(--border)" }} aria-busy={processors === null && !failed}>
      <p className="muted text-micro uppercase tracking-eyebrow">{t("aiconsent.providers")}</p>
      {failed ? (
        <p aria-live="polite" className="mt-1 text-caption" style={{ color: "var(--color-danger)" }}>
          {t("aiconsent.load_failed")}
        </p>
      ) : processors === null ? (
        <div className="mt-1 space-y-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <SkeletonLine variant="strong" width="40%" />
              <SkeletonLine variant="caption" width="75%" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="mt-1 space-y-1.5">
          {processors.map((p) => (
            <li key={p.name}>
              <p className="text-strong">{p.name}</p>
              <p className="muted text-caption">
                {p.purpose} · {p.region}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function copyOf(purpose: AiConsentPurpose, t: (key: string) => string) {
  return purpose === "ai_text"
    ? {
        title: t("aiconsent.text_title"),
        lead: t("aiconsent.text_lead"),
        points: [t("aiconsent.text_what"), t("aiconsent.text_why"), t("aiconsent.text_without"), t("aiconsent.change_later")],
        decline: t("aiconsent.decline_text"),
      }
    : {
        title: t("aiconsent.voice_title"),
        lead: t("aiconsent.voice_lead"),
        points: [t("aiconsent.voice_what"), t("aiconsent.voice_without"), t("aiconsent.change_later")],
        decline: t("aiconsent.decline_voice"),
      };
}

function AiConsentDialog({
  purpose,
  open,
  onDone,
}: {
  purpose: AiConsentPurpose;
  open: boolean;
  onDone: (granted: boolean) => void;
}) {
  const t = useT();
  const lang = useLang();
  const basligId = useId();
  const aciklamaId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const baslikRef = useRef<HTMLHeadingElement>(null);
  const [processors, setProcessors] = useState<AiConsentProcessor[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [busy, setBusy] = useState<"allow" | "decline" | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  /*
   * AŞAĞIDA DAHA FAZLASI VAR İŞARETİ.
   *
   * 320×568'de kaydırılan alana ~175 piksel kalıyor: simge, başlık ve açıklama
   * sığıyor, metnin gönderileceği SAĞLAYICILARIN listesi ise iki büyük
   * düğmenin altında, görünmeyen bir kaydırmada kalıyordu. Rıza verilen şeyin
   * kendisi görünmeden "İzin ver"e basılabiliyordu ve kaydırılabildiğine dair
   * hiçbir iz yoktu. Kaydırılacak içerik varken alanın dibinde bir solma ve
   * "kaydır" oku çiziliyor; dibe inilince kalkıyor.
   */
  const govde = useRef<HTMLDivElement>(null);
  const [asagi, setAsagi] = useState(false);
  const olcAsagi = useCallback(() => {
    const el = govde.current;
    if (!el) return;
    setAsagi(el.scrollHeight - el.scrollTop - el.clientHeight > 8);
  }, []);
  useEffect(() => {
    const el = govde.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    olcAsagi();
    const ro = new ResizeObserver(olcAsagi);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [olcAsagi, processors]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      /* ODAK BAŞLIKTA. `showModal` odağı ilk odaklanabilir öğeye veriyor ve
         o öğe (politika bağlantısı; onay düğmesi liste yüklenene kadar kapalı)
         kaydırılan içeriğin DİBİNDE: küçük ekranda kutu, başlığı ve ne
         gönderildiğini atlayıp listenin sonundan açılıyordu. Okunmadan
         karar verilmesin diye diyalog baştan açılıyor. */
      baslikRef.current?.focus();
    }
    if (!open && el.open) el.close();
  }, [open]);

  /* Alıcılar SUNUCUDAN, arayüz dilinde: politikanın tablosuyla aynı liste
     (bkz. `api/consent`). İstemcide ikinci bir kopya olsaydı politika değişip
     uygulama güncellenmeden eski bir listeye izin alınabilirdi. */
  useEffect(() => {
    if (!open) return;
    let dead = false;
    setProcessors(null);
    setFailed(false);
    fetchAiConsent(lang)
      .then((info) => {
        if (!dead) setProcessors(info.processors[purpose] ?? []);
      })
      .catch(() => {
        if (!dead) setFailed(true);
      });
    return () => {
      dead = true;
    };
  }, [open, purpose, lang, attempt]);

  const copy = copyOf(purpose, t);
  /* İzin, alıcılar GÖRÜLMEDEN verilemez: liste yüklenmediyse onay düğmesi
     kapalı. Reddetmek her durumda mümkün. */
  const canAllow = processors !== null && !failed && busy === null;

  async function allow() {
    if (!canAllow) return;
    setBusy("allow");
    setSaveFailed(false);
    try {
      await decideAiConsent(purpose, true);
      onDone(true);
    } catch {
      /* Yazılamayan izin verilmiş sayılmaz: sunucu kapısı onu görmeden
         isteği yine geri çevirirdi. Diyalog açık kalıyor, yeniden denenebilir. */
      setSaveFailed(true);
      setBusy(null);
    }
  }

  async function decline() {
    if (busy) return;
    setBusy("decline");
    /* Ret yazılamazsa da isteğin cevabı "hayır": veri gitmiyor. Yazılamadığı
       için diyalog bir sonraki çağrıda yeniden sorabilir — yanlış yön değil. */
    try {
      await decideAiConsent(purpose, false);
    } catch {
      /* yut */
    }
    onDone(false);
  }

  /* Kayıt sürerken Esc kapatmıyor: yazılmakta olan bir karar yarıda "hayır"a dönmesin. */
  const dismiss = () => {
    if (!busy) onDone(false);
  };

  const Icon = purpose === "ai_text" ? SparkIcon : MicIcon;
  return (
    <dialog
      ref={ref}
      aria-labelledby={basligId}
      aria-describedby={aciklamaId}
      onCancel={(e) => {
        e.preventDefault();
        dismiss();
      }}
      onClick={(e) => {
        if (e.target === ref.current) dismiss();
      }}
      className="card m-auto w-[min(32rem,calc(100vw-2rem))] overflow-hidden backdrop:bg-black/55"
      style={{ color: "var(--text)" }}
    >
      {/* Düğmeler kaydırılan içeriğin DIŞINDA: uzun bir sağlayıcı listesi iki
          seçeneği ekranın altına itmesin (mobilde de sabit alt şerit). Esnek
          düzen diyaloğun kendisine verilmiyor — `display` sınıfı kapalı
          `<dialog>`u da görünür yapardı. Dolgu da iç kaplarda: diyaloğun
          kendi dolgusu önyüz sıfırlamasıyla zaten 0. */}
      <div className="flex max-h-[calc(100dvh-3rem)] flex-col">
        <div className="relative flex min-h-0 flex-1 flex-col">
        <div ref={govde} onScroll={olcAsagi} className="min-h-0 flex-1 overflow-y-auto px-5 pt-5 short:pt-4">
          <div className="flex flex-col items-center gap-3 text-center">
            {/* Simge süs: kısa ekranda yerini sağlayıcı listesine bırakıyor. */}
            <span
              className="flex h-[72px] w-[72px] items-center justify-center rounded-card on-fill glow-tint short:hidden"
              style={{ background: "var(--color-brand)", "--tint-fill": "var(--color-brand)" } as React.CSSProperties}
            >
              <Icon size={36} />
            </span>
            <h2 id={basligId} ref={baslikRef} tabIndex={-1} className="text-h2 outline-none">{copy.title}</h2>
            <p id={aciklamaId} className="muted text-body">{copy.lead}</p>
          </div>

          <div className="mt-4">
            <ProcessorList processors={processors} failed={failed} />
            {failed ? (
              <button type="button" onClick={() => setAttempt((n) => n + 1)} className="btn btn-ghost mt-2 w-full px-4 py-2.5 text-body">
                {t("common.try_again")}
              </button>
            ) : null}
          </div>

          <ul className="mt-4 flex flex-col gap-3">
            {copy.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--brand-soft)", color: "var(--on-brand-soft)" }}
                >
                  <CheckIcon size={14} />
                </span>
                <span className="text-body">{p}</span>
              </li>
            ))}
          </ul>

          {/* YENİ SEKMEDE. Aynı sekmede açılan politika sayfası uygulama
              kabuğunun dışında: diyalog sökülür ve bekleyen istek cevapsız
              "hayır"a düşerdi. Mobil de politikayı uygulama içi tarayıcıda,
              ekranı kapatmadan açıyor. */}
          <Link
            href={legalPath("privacy", lang)}
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 mb-1 block text-center text-strong"
            style={{ color: "var(--color-brand)" }}
          >
            {t("micdisclosure.read_privacy_policy")}
          </Link>
        </div>
          {asagi ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-end justify-center pb-1"
              style={{ background: "linear-gradient(to bottom, transparent, var(--surface))" }}
            >
              <ChevronIcon size={18} className="muted" />
            </div>
          ) : null}
        </div>

        <div className="border-t px-5 pb-5 pt-3 short:pb-4" style={{ borderColor: "var(--hairline)" }}>
          {saveFailed ? (
            <p role="alert" className="mb-2 text-center text-caption" style={{ color: "var(--color-danger)" }}>
              {t("aiconsent.save_failed")}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => void allow()}
            disabled={!canAllow}
            aria-busy={busy === "allow"}
            className="btn btn-primary w-full px-5 py-4 short:py-3 disabled:opacity-60"
          >
            {t("aiconsent.allow")}
          </button>
          <button
            type="button"
            onClick={() => void decline()}
            disabled={busy !== null}
            aria-busy={busy === "decline"}
            className="btn btn-ghost mt-2 w-full px-5 py-3 disabled:opacity-60"
          >
            {copy.decline}
          </button>
        </div>
      </div>
    </dialog>
  );
}

/**
 * Kabukta TEK diyalog. API yakalayıcısı (`lib/api-fetch`) izin isteyen bir 403
 * aldığında `requestAiConsent` üzerinden buraya geliyor; aynı amaç için aynı
 * anda gelen istekler aynı cevabı bekliyor (bkz. `lib/ai-consent-client`).
 *
 * Her istek diyaloğu `key` ile YENİDEN kuruyor: bir önceki sorunun yarım kalmış
 * durumu (yüklenen liste, "kaydedilemedi" satırı, meşgul düğme) yenisine
 * taşınmasın. Kapanış ise aynı öğe üzerinde `close()` ile — tarayıcı odağı
 * diyaloğu açan denetime o zaman geri veriyor.
 */
export function AiConsentHost() {
  const [req, setReq] = useState<{ purpose: AiConsentPurpose; open: boolean; seq: number } | null>(null);
  const resolver = useRef<((granted: boolean) => void) | null>(null);

  useEffect(() => {
    registerAiConsentHost(
      (purpose) =>
        new Promise<boolean>((resolve) => {
          resolver.current?.(false); // yarım kalan bir önceki soru varsa "hayır" sayılır
          resolver.current = resolve;
          setReq((r) => ({ purpose, open: true, seq: (r?.seq ?? 0) + 1 }));
        }),
    );
    return () => {
      registerAiConsentHost(null);
      resolver.current?.(false);
      resolver.current = null;
    };
  }, []);

  const done = useCallback((granted: boolean) => {
    resolver.current?.(granted);
    resolver.current = null;
    setReq((r) => (r ? { ...r, open: false } : r));
  }, []);

  return req ? <AiConsentDialog key={req.seq} purpose={req.purpose} open={req.open} onDone={done} /> : null;
}
