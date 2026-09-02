"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { SettingRow, Switch } from "@/components/setting-row";
import { errorText, social, type SocialMeView } from "@/lib/social/client";
import type { PublicUser, Visibility } from "@/lib/social/types";

const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "Herkese açık", sub: "Profil ve kilometre taşları herkese görünür" },
  { key: "friends", label: "Arkadaşlar", sub: "İstatistik ve akış yalnız arkadaşlarına" },
  { key: "private", label: "Gizli", sub: "Yalnız adın; aramada tam kullanıcı adıyla" },
];

/**
 * Sosyal ve gizlilik ayarları. Kullanıcı adı ayrı kaydedilir (14 günde bir
 * değişir, sunucu sayar); geri kalan anahtarlar dokununca yazılır. Engel
 * listesi burada — engellediğini görmenin tek yeri, çünkü engellenen
 * profilde artık görünmüyor.
 */
export function SocialSettings({ initial }: { initial: SocialMeView }) {
  const [me, setMe] = useState(initial);
  const [username, setUsername] = useState(initial.username);
  const [bio, setBio] = useState(initial.bio ?? "");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState<(PublicUser & { since: string })[] | null>(null);

  useEffect(() => {
    social.blocks().then((r) => setBlocked(r.blocked)).catch(() => setBlocked([]));
  }, []);

  async function save(patch: Record<string, unknown>, done = "Kaydedildi") {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const next = await social.updateMe(patch);
      setMe(next);
      setUsername(next.username);
      setMsg(done);
    } catch (e) {
      setMsg(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  const dirtyName = username.trim().toLowerCase() !== me.username;
  const dirtyBio = (bio.trim() || "") !== (me.bio ?? "");

  return (
    <section id="social" className="card mt-4 overflow-hidden">
      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-bold">Sosyal ve gizlilik</h2>
        <p className="muted text-xs">Arkadaşların seni nasıl bulur, ne görür.</p>
      </div>

      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <label className="text-sm font-bold" htmlFor="username">Kullanıcı adı</label>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="muted text-sm">@</span>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            maxLength={20}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
          />
          <button className="btn btn-primary h-9 px-3 text-xs" disabled={busy || !dirtyName || me.usernameChangeAvailableIn > 0} onClick={() => void save({ username: username.trim() }, "Kullanıcı adı güncellendi")}>
            Kaydet
          </button>
        </div>
        <p className="muted mt-1 text-[11px]">
          3-20 karakter; küçük harf, rakam, alt çizgi. {me.usernameChangeAvailableIn > 0 ? `${me.usernameChangeAvailableIn} gün sonra değiştirilebilir.` : "14 günde bir değişir."} Profil bağlantın: /u/{me.username}
        </p>
      </div>

      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <label className="text-sm font-bold" htmlFor="bio">Kısa tanıtım</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, 140))}
          rows={2}
          placeholder="Neden Almanca? Bir cümle yeter."
          className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        />
        <div className="mt-1 flex items-center justify-between">
          <span className="muted text-[11px] tabular-nums">{bio.length}/140</span>
          <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy || !dirtyBio} onClick={() => void save({ bio: bio.trim() || null })}>
            Kaydet
          </button>
        </div>
      </div>

      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <p className="text-sm font-bold">Görünürlük</p>
        <div className="mt-2 flex flex-col gap-1.5">
          {VIS.map((v) => (
            <button
              key={v.key}
              className={`chip justify-start text-left ${me.visibility === v.key ? "chip-active" : ""}`}
              aria-pressed={me.visibility === v.key}
              disabled={busy}
              onClick={() => void save({ visibility: v.key })}
            >
              <span className="block text-xs font-bold">{v.label}</span>
              <span className="muted block text-[11px]">{v.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <SettingRow title="Arkadaşlık isteği kabul et" sub="Kapalıysa seni kimse ekleyemez; sen ekleyebilirsin">
        <Switch on={me.allowRequests} disabled={busy} label="Arkadaşlık isteği" onChange={(v) => void save({ allowRequests: v })} />
      </SettingRow>
      <div className="border-t" style={{ borderColor: "var(--border)" }} />
      <SettingRow title="Önerilerde görün" sub="Ortak arkadaşı olanlara ve aynı seviyedekilere önerilirsin">
        <Switch on={me.showInSuggestions} disabled={busy} label="Önerilerde görün" onChange={(v) => void save({ showInSuggestions: v })} />
      </SettingRow>
      <div className="border-t" style={{ borderColor: "var(--border)" }} />
      <SettingRow title="Kilometre taşlarımı paylaş" sub="Seri, rozet ve görev haberlerin arkadaşlarının akışına düşer">
        <Switch on={me.showActivity} disabled={busy} label="Kilometre taşlarımı paylaş" onChange={(v) => void save({ showActivity: v })} />
      </SettingRow>

      {msg ? (
        <p className="px-4 pb-3 text-xs" style={{ color: msg.includes("aydedildi") || msg.includes("üncellendi") ? "var(--color-mint)" : "var(--color-rose)" }}>
          {msg}
        </p>
      ) : null}

      <div className="border-t px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <p className="text-sm font-bold">Engellenenler</p>
        {blocked === null ? (
          <p className="muted mt-1 text-xs">Yükleniyor</p>
        ) : blocked.length ? (
          <ol className="mt-2 divide-y divide-[color:var(--border)]">
            {blocked.map((b) => (
              <li key={b.userId} className="flex items-center gap-3 py-2" style={{ borderColor: "var(--border)" }}>
                <Avatar userId={b.userId} name={b.name} size={28} />
                <span className="min-w-0 flex-1 truncate text-sm">
                  {b.name ?? "İsimsiz"} {b.username ? <span className="muted text-xs">@{b.username}</span> : null}
                </span>
                <button
                  className="btn btn-ghost h-8 px-3 text-xs"
                  disabled={busy}
                  onClick={() => {
                    setBusy(true);
                    social
                      .unblock(b.userId)
                      .then(() => setBlocked((prev) => (prev ?? []).filter((x) => x.userId !== b.userId)))
                      .catch((e) => setMsg(errorText(e)))
                      .finally(() => setBusy(false));
                  }}
                >
                  Kaldır
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="muted mt-1 text-xs">Kimseyi engellemedin.</p>
        )}
      </div>
    </section>
  );
}
