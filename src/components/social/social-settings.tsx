"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { SettingRow, Switch } from "@/components/setting-row";
import { SkeletonLine } from "@/components/skeleton";
import { errorText, social, type SocialMeView } from "@/lib/social/client";
import type { PublicUser, Visibility } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";
import { Group, Row } from "@/components/settings-section";
import { Field, InsetList } from "@/components/field";
/* Sınırlar sunucunun kendi kuralından: üç yerde yazılı bir sayı er geç
   ayrışır (bkz. `lib/social/username`). */
import { USERNAME_CHANGE_COOLDOWN_DAYS, USERNAME_MAX } from "@/lib/social/username";

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
 * `part` (2026-09-28): sosyal ayarlar Ayarlar'a taşındı. `username` Ayarlar ›
 * Hesap kartının içinde bir bölüm (kart dışarıda), `privacy` Ayarlar ›
 * Gizlilik grubu (görünürlük, izinler, engellenenler; `children` grubun
 * sonuna eklenen bölümler, ör. veri ve onaylar).
 *
 * GİZLİLİK STANDART GRUP (2026-09-30, Samet: ayar kutuları aynı dili
 * konuşmuyordu). Kendi kartını çiziyordu ve bölüm başlıkları koyu
 * `text-strong` idi; öteki grupların küçük sönük etiketi ile çizgisi yoktu,
 * "Veri ve onaylar" da ayrı başlıklı ikinci bir kutuydu. Artık `Group`/`Row`
 * (mobil `SocialPrivacy` aynı).
 */
export function SocialSettings({ initial, part, children }: { initial: SocialMeView; part: "username" | "privacy"; children?: React.ReactNode }) {
  const t = useT();
  const lang = useLang();
  const [me, setMe] = useState(initial);
  const [username, setUsername] = useState(initial.username);
  /* Mesajın TONU ayrı tutuluyor. Önce metnin içinde "aydedildi"/"üncellendi"
     aranıyordu; çeviriyle birlikte her başarı iletisi kırmızıya dönerdi. */
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState<(PublicUser & { since: string })[] | null>(null);

  /* Engel listesi yalnız Gizlilik'te çiziliyor; Hesap'taki kullanıcı adı
     bölümü onu boşuna okuyordu. */
  useEffect(() => {
    if (part !== "privacy") return;
    social.blocks().then((r) => setBlocked(r.blocked)).catch(() => setBlocked([]));
  }, [part]);

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

  if (part === "username") {
    /* Ad kutusuyla aynı hizada: kutunun önündeki "@" kalktı (mobilde de yok),
       kutu kenardan başlıyor. Yardım ve ileti alan bloğunun satırları
       (`components/field.tsx`: kutu → yardım 8). */
    return (
      <Field
        help={`${t("socialsettings.username_rule")} ${
          me.usernameChangeAvailableIn > 0
            ? t("socialsettings.username_wait", { n: me.usernameChangeAvailableIn })
            : t("socialsettings.username_cooldown", { n: USERNAME_CHANGE_COOLDOWN_DAYS })
        } ${t("socialsettings.profile_link", { path: `/u/${me.username}` })}`}
      >
        <div className="flex items-center gap-2">
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
            aria-label={t("socialsettings.username")}
            /* Ad kutusuyla aynı boy (48; mobil de öyle). */
            className="input min-w-0 flex-1"
          />
          <button className="btn btn-primary h-9 px-3 text-caption" disabled={busy || !dirtyName || me.usernameChangeAvailableIn > 0} onClick={() => void save({ username: username.trim() }, t("socialsettings.username_updated"))}>
            {t("common.save")}
          </button>
        </div>
        {msg ? (
          <p role={msg.ok ? "status" : "alert"} className="mt-2 text-caption" style={{ color: msg.ok ? "var(--color-mint)" : "var(--color-rose)" }}>
            {msg.text}
          </p>
        ) : null}
      </Field>
    );
  }

  return (
    <Group>
      <Row label={t("socialsettings.visibility")}>
        {/* TEK SEÇİMLİK LİSTE RADYO GRUBUDUR — Android aynı üçlüyü
            `accessibilityRole="radio"` ile veriyor (`SocialSettingsScreen`). */}
        <div role="radiogroup" aria-label={t("socialsettings.visibility")} className="flex flex-col gap-1.5">
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
      </Row>

      <Row label={t("socialsettings.permissions")}>
        <InsetList>
          <SettingRow title={t("socialsettings.perm_requests")} sub={t("socialsettings.perm_requests_sub")}>
            <Switch on={me.allowRequests} disabled={busy} label={t("socialsettings.perm_requests")} onChange={(v) => void save({ allowRequests: v })} />
          </SettingRow>
          <SettingRow title={t("socialsettings.perm_suggest")} sub={t("socialsettings.perm_suggest_sub")}>
            <Switch on={me.showInSuggestions} disabled={busy} label={t("socialsettings.perm_suggest")} onChange={(v) => void save({ showInSuggestions: v })} />
          </SettingRow>
          <SettingRow title={t("socialsettings.perm_activity")} sub={t("socialsettings.perm_activity_sub")}>
            <Switch on={me.showActivity} disabled={busy} label={t("socialsettings.perm_activity")} onChange={(v) => void save({ showActivity: v })} />
          </SettingRow>
        </InsetList>
        {/* HATA `alert`, BASARI `status` (bkz. `premium-paywall`). */}
        {msg ? (
          <p role={msg.ok ? "status" : "alert"} className="mt-2 text-caption" style={{ color: msg.ok ? "var(--color-mint)" : "var(--color-rose)" }}>
            {msg.text}
          </p>
        ) : null}
      </Row>

      <Row label={t("socialsettings.blocked_title")}>
        {/* "Yükleniyor" yazısı yerine satırın yeri: liste gelince bölüm
            yerinden oynamıyor (Android `SocialSettingsScreen` aynı). */}
        {blocked === null ? (
          <SkeletonLine variant="caption" width="60%" />
        ) : blocked.length ? (
          <ol className="inset-list">
            {blocked.map((b) => (
              <li key={b.userId} className="flex items-center gap-3">
                <Avatar userId={b.userId} name={b.name} avatar={b.avatar} size={28} />
                <span className="min-w-0 flex-1 truncate text-body">
                  {b.name ?? t("social.unnamed_short")} {b.username ? <span className="muted text-caption">@{b.username}</span> : null}
                </span>
                <button
                  className="btn btn-ghost h-9 px-3 text-caption"
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
          <p className="muted text-caption">{t("socialsettings.you_haven_t_blocked_anyone")}</p>
        )}
      </Row>
      {children}
    </Group>
  );
}
