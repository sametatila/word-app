"use client";

import { useEffect, useState } from "react";
import { AuthNotice } from "@/components/auth-shell";
import { SettingRow } from "@/components/setting-row";
import { authApi } from "@/lib/auth/api";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * Etkin oturumlar — hangi cihazlar hesabıma girmiş, ve "diğerlerinden çık".
 *
 * NEDEN GEREKLİ: `session` tablosu ipAddress ve userAgent'ı baştan tutuyordu,
 * better-auth'un list/revoke uçları da hazırdı — ama hiçbir ekran onları
 * göstermiyordu. Kullanıcının "telefonumu kaybettim", "ortak bilgisayarda açık
 * kalmış" ya da "birisi girmiş olabilir" dediğinde yapabileceği hiçbir şey
 * yoktu; parolayı değiştirmek dışında.
 *
 * İKİ UCUN TAZELİK KOŞULU FARKLI ve tasarım buna göre kuruldu:
 *   - `/list-sessions` TAZE oturum istiyor (freshSessionMiddleware): oturum
 *     24 saatten eskiyse 403 SESSION_NOT_FRESH. Yani listenin görünmediği
 *     zamanlar OLACAK.
 *   - `/revoke-other-sessions` yalnız geçerli bir oturum istiyor
 *     (sensitiveSessionMiddleware), yaşına bakmıyor.
 *
 * Bu yüzden ASIL DÜĞME listeye bağlı değil: liste yüklenmese de "diğer
 * cihazlardan çık" çalışıyor. Güvenlik açısından değerli olan yarı o —
 * kullanıcı en kötü ihtimalle listeyi göremez ama yine de herkesi atabilir.
 *
 * `revoke-sessions` DEĞİL `revoke-other-sessions`: kullanıcı kendini de atmak
 * istemiyor, "benden başka herkes çıksın" diyor.
 */

type Session = {
  id: string;
  token: string;
  createdAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

/**
 * Kaba cihaz etiketi. Amaç kullanıcının SATIRI TANIMASI — "bu benim telefonum
 * mu, yoksa tanımadığım bir şey mi". Tam bir user-agent ayrıştırıcısı bu iş
 * için gereğinden ağır ve zaten yanılıyor; platform + tarayıcı yetiyor.
 */
function deviceLabel(ua: string | null | undefined, unknown: string): string {
  if (!ua) return unknown;
  const platform =
    /android/i.test(ua) ? "Android"
      : /iphone/i.test(ua) ? "iPhone"
        : /ipad/i.test(ua) ? "iPad"
          : /macintosh|mac os/i.test(ua) ? "Mac"
            : /windows/i.test(ua) ? "Windows"
              : /linux/i.test(ua) ? "Linux"
                : null;
  const browser =
    /edg\//i.test(ua) ? "Edge"
      : /opr\/|opera/i.test(ua) ? "Opera"
        : /chrome\//i.test(ua) ? "Chrome"
          : /firefox\//i.test(ua) ? "Firefox"
            : /safari\//i.test(ua) ? "Safari"
              : null;
  const parts = [platform, browser].filter(Boolean);
  return parts.length ? parts.join(" · ") : unknown;
}

export function ActiveSessions() {
  const t = useT();
  const lang = useLang();
  const [rows, setRows] = useState<Session[] | null>(null);
  /** Liste neden yok: taze değil mi, yoksa gerçekten hata mı. */
  const [state, setState] = useState<"loading" | "ok" | "stale" | "failed">("loading");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const res = await authApi<Session[]>("list-sessions");
    if (res.ok) {
      setRows(Array.isArray(res.data) ? res.data : []);
      setState("ok");
      return;
    }
    // 403 SESSION_NOT_FRESH bir arıza değil, kuralın kendisi (bkz. üstteki not).
    setState(res.status === 403 || res.code === "SESSION_NOT_FRESH" ? "stale" : "failed");
  }

  useEffect(() => { void load(); }, []);

  async function revoke(token: string) {
    setBusy(token);
    setMsg(null);
    const res = await authApi("revoke-session", { token });
    setBusy(null);
    if (!res.ok) { setMsg(t("sessions.load_failed")); return; }
    setMsg(t("sessions.revoked"));
    await load();
  }

  async function revokeOthers() {
    setBusy("others");
    setMsg(null);
    const res = await authApi("revoke-other-sessions", {});
    setBusy(null);
    if (!res.ok) { setMsg(t("sessions.load_failed")); return; }
    setMsg(t("sessions.revoked_others"));
    await load();
  }

  if (state === "loading") return null;

  const since = (iso: string) =>
    t("sessions.since", { date: new Date(iso).toLocaleDateString(lang) });

  return (
    <section className="mx-auto mt-4 w-full max-w-3xl">
      <p className="muted mb-2 ml-1 text-caption tracking-wide">{t("sessions.title")}</p>
      <div className="card overflow-hidden">
        {state === "ok" && rows?.length ? (
          <div className="divide-y divide-[color:var(--hairline)]">
            {rows.map((s) => (
              <SettingRow
                key={s.id}
                title={deviceLabel(s.userAgent, t("sessions.unknown_device"))}
                sub={`${since(s.createdAt)}${s.ipAddress ? ` · ${s.ipAddress}` : ""}`}
              >
                <button
                  className="btn-ghost text-xs"
                  disabled={busy === s.token}
                  onClick={() => void revoke(s.token)}
                >
                  {busy === s.token ? "…" : t("sessions.revoke")}
                </button>
              </SettingRow>
            ))}
          </div>
        ) : null}

        <div className="space-y-3 p-4">
          {state === "stale" ? <AuthNotice tone="error">{t("sessions.need_fresh")}</AuthNotice> : null}
          {state === "failed" ? <AuthNotice tone="error">{t("sessions.load_failed")}</AuthNotice> : null}
          {msg ? <AuthNotice tone="success">{msg}</AuthNotice> : null}

          <div className="flex items-center justify-between gap-3">
            <p className="muted text-sm leading-snug">{t("sessions.sub")}</p>
            {/* Liste yüklenmese de çalışıyor: bu uç oturumun YAŞINA bakmıyor. */}
            <button
              type="button"
              className="btn shrink-0 text-xs"
              disabled={busy === "others"}
              onClick={() => void revokeOthers()}
            >
              {busy === "others" ? "…" : t("sessions.revoke_others")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
