"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { SettingRow, Switch } from "@/components/setting-row";
import { SkeletonLine } from "@/components/skeleton";
import { errorText, social, type SocialMeView } from "@/lib/social/client";
import type { PublicUser, Visibility } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName } from "@/lib/courses";
/* Sınırlar sunucunun kendi kuralından: üç yerde yazılı bir sayı er geç
   ayrışır (bkz. `lib/social/username`). */
import { BIO_MAX, USERNAME_CHANGE_COOLDOWN_DAYS, USERNAME_MAX } from "@/lib/social/username";

const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "socialsettings.vis_public", sub: "socialsettings.vis_public_sub" },
  { key: "friends", label: "social.tab_friends", sub: "socialsettings.vis_friends_sub" },
  { key: "private", label: "socialsettings.vis_private", sub: "socialsettings.vis_private_sub" },
];

/**
 * Sosyal ve gizlilik ayarları. Kullanıcı adı ayrı kaydedilir (14 günde bir
 * değişir, sunucu sayar); geri kalan anahtarlar dokununca yazılır. Engel
 * listesi burada — engellediğini görmenin tek yeri, çünkü engellenen
 * profilde artık görünmüyor.
 */
/**
 * `bare`: kendi adresinde çizilirken başlık şeridi çizilmiyor — sayfanın h1'i
 * zaten "Sosyal ve gizlilik" diyor, kartın içindeki ikinci başlık onu
 * tekrarlardı.
 */
export function SocialSettings({ initial, course = "de", bare = false }: { initial: SocialMeView; course?: string; bare?: boolean }) {
  const t = useT();
  const lang = useLang();
  const [me, setMe] = useState(initial);
  const [username, setUsername] = useState(initial.username);
  const [bio, setBio] = useState(initial.bio ?? "");
  /* Mesajın TONU ayrı tutuluyor. Önce metnin içinde "aydedildi"/"üncellendi"
     aranıyordu; çeviriyle birlikte her başarı iletisi kırmızıya dönerdi. */
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState<(PublicUser & { since: string })[] | null>(null);

  useEffect(() => {
    social.blocks().then((r) => setBlocked(r.blocked)).catch(() => setBlocked([]));
  }, []);

  async function save(patch: Record<string, unknown>, done?: string) {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const next = await social.updateMe(patch);
      setMe(next);
      setUsername(next.username);
      setMsg({ text: done ?? t("settings.saved"), ok: true });
    } catch (e) {
      setMsg({ text: errorText(e, lang), ok: false });
    } finally {
      setBusy(false);
    }
  }

  const dirtyName = username.trim().toLowerCase() !== me.username;
  const dirtyBio = (bio.trim() || "") !== (me.bio ?? "");

  return (
    <section id="social" className={`card overflow-hidden ${bare ? "" : "mt-4"}`}>
      {bare ? null : (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-bold">{t("socialsettings.social_and_privacy")}</h2>
          <p className="muted text-caption">{t("socialw.settings_sub")}</p>
        </div>
      )}

      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <label className="text-strong" htmlFor="username">{t("socialsettings.username")}</label>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="muted text-body">@</span>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            maxLength={USERNAME_MAX}
            enterKeyHint="done"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder={t("socialsettings.username_2")}
            className="min-w-0 flex-1 rounded-tile border px-3 py-2 text-body"
            style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
          />
          <button className="btn btn-primary h-9 px-3 text-caption" disabled={busy || !dirtyName || me.usernameChangeAvailableIn > 0} onClick={() => void save({ username: username.trim() }, t("socialsettings.username_updated"))}>
            {t("common.save")}
          </button>
        </div>
        <p className="muted mt-1 text-micro">
          {t("socialsettings.username_rule")}{" "}
          {me.usernameChangeAvailableIn > 0
            ? t("socialsettings.username_wait", { n: me.usernameChangeAvailableIn })
            : t("socialsettings.username_cooldown", { n: USERNAME_CHANGE_COOLDOWN_DAYS })}{" "}
          {t("socialsettings.profile_link", { path: `/u/${me.username}` })}
        </p>
      </div>

      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <label className="text-strong" htmlFor="bio">{t("socialsettings.short_bio")}</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, BIO_MAX))}
          rows={2}
          /* ANA DİLDE serbest metin: cümle başı büyük ama otomatik düzeltme
             AÇIK kalıyor — burada düzeltme yardımcı, hedef dilde yazılan
             alanların tersine. Android'de de hiçbiri yoktu; iki taraf
             birlikte düzeltildi. */
          autoCapitalize="sentences"
          placeholder={t("socialsettings.why_one_sentence_is_enough", { lang: courseName(course, lang) })}
          className="mt-1.5 w-full rounded-tile border px-3 py-2 text-body"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        />
        <div className="mt-1 flex items-center justify-between">
          {/* Sınır SABİTTEN: sayaç 140'ı yazıyordu ve `BIO_MAX` değişse
              sayaç yalan söylerdi. Mobilde de aynı kaçak vardı. */}
          <span className="muted text-micro tabular-nums">{bio.length}/{BIO_MAX}</span>
          <button className="btn btn-ghost h-8 px-3 text-caption" disabled={busy || !dirtyBio} onClick={() => void save({ bio: bio.trim() || null })}>
            {t("common.save")}
          </button>
        </div>
      </div>

      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <p className="text-strong">{t("socialsettings.visibility")}</p>
        {/* TEK SEÇİMLİK LİSTE RADYO GRUBUDUR — Android aynı üçlüyü
            `accessibilityRole="radio"` ile veriyor (`SocialSettingsScreen`). */}
        <div role="radiogroup" aria-label={t("socialsettings.visibility")} className="mt-2 flex flex-col gap-1.5">
          {VIS.map((v) => (
            <button
              key={v.key}
              className={`chip justify-start px-3.5 py-2.5 text-left text-caption ${me.visibility === v.key ? "chip-active" : ""}`}
              role="radio"
              aria-checked={me.visibility === v.key}
              disabled={busy}
              onClick={() => void save({ visibility: v.key })}
            >
              <span className="block text-caption">{t(v.label)}</span>
              <span className="muted block text-micro">{t(v.sub)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* İZİNLER başlığı Android'de var: "Görünürlük"ün başlığı olduğu hâlde
          altındaki üç anahtarın başlığı yoktu ve üçü serbestçe asılı
          duruyordu. Başlık, neyin neye ait olduğunu bir bakışta söylüyor. */}
      <p className="border-b px-4 pb-1.5 pt-3 text-strong" style={{ borderColor: "var(--border)" }}>
        {t("socialsettings.permissions")}
      </p>

      <SettingRow title={t("socialsettings.perm_requests")} sub={t("socialsettings.perm_requests_sub")}>
        <Switch on={me.allowRequests} disabled={busy} label={t("socialsettings.perm_requests")} onChange={(v) => void save({ allowRequests: v })} />
      </SettingRow>
      <div className="border-t" style={{ borderColor: "var(--border)" }} />
      <SettingRow title={t("socialsettings.perm_suggest")} sub={t("socialsettings.perm_suggest_sub")}>
        <Switch on={me.showInSuggestions} disabled={busy} label={t("socialsettings.perm_suggest")} onChange={(v) => void save({ showInSuggestions: v })} />
      </SettingRow>
      <div className="border-t" style={{ borderColor: "var(--border)" }} />
      <SettingRow title={t("socialsettings.perm_activity")} sub={t("socialsettings.perm_activity_sub")}>
        <Switch on={me.showActivity} disabled={busy} label={t("socialsettings.perm_activity")} onChange={(v) => void save({ showActivity: v })} />
      </SettingRow>

      {/* HATA `alert`, BASARI `status` (bkz. `premium-paywall`). */}
      {msg ? (
        <p role={msg.ok ? "status" : "alert"} className="px-4 pb-3 text-caption" style={{ color: msg.ok ? "var(--color-mint)" : "var(--color-rose)" }}>
          {msg.text}
        </p>
      ) : null}

      <div className="border-t px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <p className="text-strong">{t("socialsettings.blocked_title")}</p>
        {/* "Yükleniyor" yazısı yerine satırın yeri: liste gelince başlığın
            altı yerinden oynamıyor. Android aynı yerde iskelet satırı
            çiziyor (`SocialSettingsScreen`). */}
        {blocked === null ? (
          <SkeletonLine variant="caption" width="60%" className="mt-1" />
        ) : blocked.length ? (
          <ol className="mt-2 divide-y divide-[color:var(--border)]">
            {blocked.map((b) => (
              <li key={b.userId} className="flex items-center gap-3 py-2" style={{ borderColor: "var(--border)" }}>
                <Avatar userId={b.userId} name={b.name} avatar={b.avatar} size={28} />
                <span className="min-w-0 flex-1 truncate text-body">
                  {b.name ?? t("social.unnamed_short")} {b.username ? <span className="muted text-caption">@{b.username}</span> : null}
                </span>
                <button
                  className="btn btn-ghost h-8 px-3 text-caption"
                  disabled={busy}
                  onClick={() => {
                    setBusy(true);
                    social
                      .unblock(b.userId)
                      .then(() => setBlocked((prev) => (prev ?? []).filter((x) => x.userId !== b.userId)))
                      .catch((e) => setMsg({ text: errorText(e, lang), ok: false }))
                      .finally(() => setBusy(false));
                  }}
                >
                  {t("socialsettings.remove")}
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted mt-1 text-caption">{t("socialsettings.you_haven_t_blocked_anyone")}</p>
        )}
      </div>
    </section>
  );
}
