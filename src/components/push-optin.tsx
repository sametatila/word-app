"use client";

import { track } from "@/lib/track";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CloseIcon, CorrectIcon, NotificationsIcon } from "@/components/icons";
import {
  currentSubscription,
  iosNeedsInstall,
  permissionDenied,
  pushSupported,
  subscribeToPush,
  vapidKey,
} from "@/lib/push-client";
import { PUSH_PRIME_SNOOZE_DAYS } from "@/lib/profile-limits";
import { useT } from "@/lib/i18n/client";
import { IconLine } from "@/components/icon-line";

/**
 * Hatırlatma izni isteme kartı.
 *
 * **Ne zaman sorulduğu, nasıl sorulduğundan önemli.** Bu kart oturum özetinin
 * içinde duruyor, yani kullanıcı bir turu bitirip XP'sini gördükten hemen
 * sonra. Girişte ya da ilk açılışta sorulan izin, henüz hiçbir şey yaşamamış
 * birine "seni rahatsız edebilir miyim" demektir ve reddedilir; reddedilen
 * izin tarayıcıda kalıcıdır — ikinci bir şans yoktur.
 *
 * Metin de bu yüzden bildirimden değil, kullanıcının az önce kazandığı
 * şeyden söz ediyor: korunacak bir seri, tekrarı gelecek kelimeler.
 */

const DISMISS_KEY = "lernomi:push-dismissed";

type State = "hidden" | "ask" | "busy" | "done" | "ios";

export function PushOptIn({ streak }: { streak: number }) {
  const t = useT();
  const [state, setState] = useState<State>("hidden");

  useEffect(() => {
    if (!vapidKey) return; // anahtar yoksa özellik yok; kart da yok

    let dismissed = false;
    try {
      const at = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
      dismissed = at > Date.now() - PUSH_PRIME_SNOOZE_DAYS * 86400000;
    } catch {
      /* depolama kapalı olabilir */
    }
    if (dismissed) return;

    // iPhone'da Safari sekmesinde PushManager hiç tanımlı olmuyor; izin
    // istemek imkânsız, yapılacak tek şey kurulumu anlatmak.
    if (iosNeedsInstall()) {
      setState("ios");
      return;
    }

    if (!pushSupported() || permissionDenied()) return;

    void currentSubscription()
      .then((sub) => setState(sub ? "hidden" : "ask"))
      .catch(() => setState("ask"));
  }, []);

  function dismiss() {
    track("push_optin", 2);
    close();
  }

  function close() {
    setState("hidden");
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* yoksay */
    }
  }

  async function enable() {
    setState("busy");
    try {
      const ok = await subscribeToPush();
      track("push_optin", ok ? 1 : 0);
      if (ok) setState("done");
      else close(); // izin verilmedi
    } catch (err) {
      console.error("[push] abone olunamadı", err);
      close();
    }
  }

  if (state === "hidden") return null;

  if (state === "done") {
    return (
      <Card tone="mint">
        <span
          className="flex items-center gap-2 text-strong"
          style={{ color: "var(--color-mint)" }}
        >
          <CorrectIcon size={16} /> {t("pushw.reminders_on")}
        </span>
        <p className="muted mt-1 text-caption">
          {t("pushw.optin_done")}
        </p>
      </Card>
    );
  }

  if (state === "ios") {
    return (
      <Card tone="brand" onClose={dismiss}>
        <p className="text-strong">{t("pushw.want_reminders")}</p>
        <p className="muted mt-1 text-caption">
          {t("pushw.ios_note")}
        </p>
      </Card>
    );
  }

  return (
    /*
      Zil yerine uyuyan Nomi.

      Zil genel bir simge; kartın söylediği şey ise özel: "çalışmadığın bir
      günde seni dürteyim mi?". Uyuyan mirket o cümlenin birebir resmi ve
      istenen izni tek bakışta anlatıyor. Uyku klibi neşeli boşta-beklemeye
      geçmiyor (STICKY), yani kart açık kaldığı sürece anlamını koruyor.
    */
    <Card
      tone="brand"
      onClose={state === "ask" ? close : undefined}
    >
      <p className="text-strong">
        {streak > 0 ? t("pushw.keep_streak", { n: streak }) : t("pushw.remind_tomorrow")}
      </p>
      <p className="muted mt-1 text-caption">
        {t(streak > 0 ? "pushw.remind_body" : "pushw.remind_note")}
      </p>
      <button
        onClick={() => void enable()}
        disabled={state === "busy"}
        className="btn btn-primary mt-3 w-full px-4 py-2.5 text-body disabled:opacity-60"
      >
        {t(state === "busy" ? "authw.wait" : "pushw.enable")}
      </button>
    </Card>
  );
}

function Card({
  tone,
  onClose,
  icon,
  children,
}: {
  tone: "brand" | "mint";
  onClose?: () => void;
  /** Sol yuva; verilmezse zil. */
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const t = useT();
  const color = tone === "mint" ? "var(--color-mint)" : "var(--color-brand)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-6 mt-4 flex items-start gap-3 rounded-panel px-4 py-3"
      /* Marka tinti koyu temada nötr (`--brand-tint`; 2026-09-29 Samet: seçim B). */
      style={{ background: tone === "mint" ? `color-mix(in srgb, ${color} 12%, transparent)` : "var(--brand-tint)" }}
    >
      {/* İçerik hep `text-strong` bir başlıkla açılıyor: ikon onun satırında. */}
      <IconLine className="text-strong" style={{ color }}>
        {icon ?? <NotificationsIcon size={18} />}
      </IconLine>
      <div className="min-w-0 flex-1">{children}</div>
      {onClose ? (
        <button
          onClick={onClose}
          aria-label={t("common.close")}
          className="muted hit-8 shrink-0 rounded-chip p-1 hover:text-[color:var(--text)]"
        >
          <CloseIcon size={15} />
        </button>
      ) : null}
    </motion.div>
  );
}
