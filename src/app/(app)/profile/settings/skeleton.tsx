"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { TileSlot } from "@/components/flow-skeleton";
import { useShell } from "@/components/app-shell";
import type { SettingsPanel } from "@/components/settings-nav";
import { supportsMockExams } from "@/lib/mock-exams";
import { Group, Row, SETTINGS_TITLE } from "@/components/settings-section";
import { Btn, PasswordRowsSkeleton, SessionRowSkeleton, SettingRowSlot, SignInMethodsSkeleton, SwitchSlot, Words } from "@/components/settings-skeleton";
import type { SettingsSection } from "@/components/profile-form";
import { useLang, useT } from "@/lib/i18n/client";
import { LANG_LABEL } from "@/lib/i18n/dict";
import { courseName, courseSub, coursesForNative, offeredNativeLangs, selectableCourses } from "@/lib/courses";
import { voicesFor } from "@/lib/tts/voices";
import { canVibrate } from "@/lib/fx";
import { USERNAME_CHANGE_COOLDOWN_DAYS } from "@/lib/social/username";
import { SettingsFrame } from "./frame";

/**
 * AYARLAR İSKELETİ — açılan grubun KENDİ şekli.
 *
 * Eskisi hangi grup açılırsa açılsın Öğrenme'yi çiziyordu: Gizlilik'e giden
 * kullanıcı önce kurs kutuları ve kaydırıcılar görüyor, sonra ekran bambaşka
 * bir düzene atlıyordu. Grup adresten okunuyor (`usePathname`; `loading.tsx`
 * prop almıyor) ya da elle veriliyor (`/friends/settings` Gizlilik'e yönleniyor).
 *
 * Yazısı BİLİNEN her yer (başlık, satır etiketleri, düğme adları) gerçek
 * çeviriyle ve gerçek yazı sınıfıyla, görünmez çiziliyor: genişlik ve sarılma
 * her dilde ve her ekranda gerçeğiyle aynı. Yalnız veriye bağlı yerler
 * (değerler, e-posta, oturumlar) sabit çubuk. Kutular gerçek sınıflarla
 * (`Group`, `Row`, `option`, `chip`, `btn`): biri değişirse iskelet de değişir.
 * Ortak parçalar `components/settings-skeleton`ta (bileşenlerin kendi yükleme
 * hâli de onları çiziyor).
 *
 * YALNIZ PANEL (2026-09-29 Samet: web ayarlar masaüstü düzeni). Başlık ve
 * sol menü `layout.tsx`te, gezinirken yerinde duruyor; iskelet onları ikinci
 * kez çizmiyor — çizseydi gerçek menünün yanında ikinci bir menü belirirdi.
 * Düzenin DIŞINDAKİ iki yönlendirme adresi (`/friends/settings`,
 * `/notifications`) çerçeveyle birlikte çiziyor: `SettingsPageSkeleton`.
 */

const SECTIONS: SettingsSection[] = ["learning", "app", "account", "security", "privacy", "about"];
const PANELS: SettingsPanel[] = [...SECTIONS, "reminders", "subscription"];
const PANEL_TITLE: Record<SettingsPanel, string> = { ...SETTINGS_TITLE, reminders: "notifications.reminders", subscription: "settings.group_subscription" };

/** İçinde bağlantı olan iki satırlık satır (Güvenlik, Hesabı sil): sağda 18'lik şevron. */
function LinkRowSlot({ title, sub }: { title: string; sub: string }) {
  return (
    <Row>
      <div className="flex items-center gap-3 py-1.5">
        <span className="min-w-0 flex-1">
          <Words className="block text-strong" text={title} />
          <Words className="muted block text-caption" text={sub} />
        </span>
        <span className="w-[18px] shrink-0" />
      </div>
    </Row>
  );
}

/**
 * `SettingsNav` — sıra ve etiketler gerçeği; değerler (kurs, e-posta, plan)
 * veriye bağlı, çubuk. İki biçim gerçeğiyle aynı: `list` telefon listesi
 * (kart, 38'lik karo, değer, şevron yeri), `sidebar` masaüstü menüsü
 * (kartsız, 44'lük satır, 32'lik karo, açık satır zemini).
 */
const NAV: { id?: SettingsPanel; label: string; value?: boolean }[][] = [
  [
    { id: "learning", label: "settings.group_learning", value: true },
    { id: "app", label: "settings.group_app", value: true },
    { id: "reminders", label: "notifications.reminders" },
  ],
  [
    { id: "account", label: "settings.group_account", value: true },
    { id: "privacy", label: "settings.group_privacy" },
    { id: "subscription", label: "settings.group_subscription", value: true },
  ],
  [{ id: "about", label: "settings.group_about", value: true }],
];

export function SettingsNavSkeleton({ variant = "list", current }: { variant?: "list" | "sidebar"; current?: SettingsPanel }) {
  const t = useT();
  /* Güvenlik Hesap'ın alt sayfası: menüde Hesap vurgulu (`SettingsNav`). */
  const on = current === "security" ? "account" : current;
  if (variant === "sidebar") {
    /* `MenuRow variant="sidebar"`: `min-h-11 gap-3 rounded-panel px-3 py-1.5`,
       32'lik karo, `text-strong` etiket; gruplar `mt-2 border-t pt-2`. */
    const row = (key: string, label: string, active: boolean) => (
      <div
        key={key}
        className="flex min-h-11 w-full items-center gap-3 rounded-panel px-3 py-1.5 text-strong"
        style={active ? { background: "var(--brand-soft)" } : undefined}
      >
        <div className="h-8 w-8 shrink-0 animate-pulse rounded-chip" style={{ background: "var(--surface-2)" }} />
        <Words className="min-w-0 flex-1 truncate" text={label} />
      </div>
    );
    return (
      <div aria-hidden className="flex flex-col">
        {[...NAV, [{ label: "profile.log_out" }]].map((rows, c) => (
          <div key={c} className={`flex flex-col gap-1 ${c ? "mt-2 border-t pt-2" : ""}`} style={c ? { borderColor: "var(--hairline)" } : undefined}>
            {rows.map((r) => row(r.label, t(r.label), !!r.id && r.id === on))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div aria-hidden className="space-y-4">
      {NAV.map((rows, c) => (
        <div key={c} className="card px-4">
          {rows.map((r, i, { length: n }) => (
            <div
              key={r.label}
              className="flex w-full items-center gap-3 py-3"
              style={i < n - 1 ? { borderBottom: "1px solid var(--hairline)" } : undefined}
            >
              {/* `MenuRow`: 38'lik karo, `text-strong` etiket, sönük değer, 20'lik şevron. */}
              <SkeletonTile size={38} />
              <Words className="min-w-0 flex-1 truncate text-strong" text={t(r.label)} />
              {r.value ? <SkeletonLine variant="caption" width={64} /> : null}
              <span className="w-5 shrink-0" />
            </div>
          ))}
        </div>
      ))}
      <Words as="div" className="w-full py-3 text-center text-strong" text={t("profile.log_out")} />
    </div>
  );
}

/** `PageBack`: 44'lük geri düğmesi + `text-h2` başlık (gerçek başlık, görünmez). */
function BackSlot({ title }: { title: string }) {
  return (
    <div aria-hidden className="mb-4 flex items-center gap-3">
      {/* Dokunma tabanı (`globals.css`): düğmedeki `h-11 w-11` en az 2.75rem. */}
      <div className="h-11 w-11 shrink-0 animate-pulse rounded-tile" style={{ minHeight: "2.75rem", minWidth: "2.75rem", background: "var(--surface-2)" }} />
      <div className="min-w-0 flex-1">
        <Words as="div" className="line-clamp-2 break-words text-h2" text={title} />
      </div>
    </div>
  );
}

/**
 * Panelin başlığı — `SettingsPanelTitle`: telefonda `PageBack`, masaüstünde
 * düz `text-h2`.
 */
function PanelTitleSlot({ title }: { title: string }) {
  return (
    <>
      <div className="md:hidden">
        <BackSlot title={title} />
      </div>
      <Words as="div" className="hidden min-h-11 items-center text-h2 md:flex" text={title} />
    </>
  );
}

const noSubscribe = () => () => {};

/** `Row` etiketi: `Row label` görünmez metinle. */
const label = (text: string) => <Words text={text} />;

/** Grupların gövdesi — `ProfileForm` `body[section]` ile aynı sıra ve kutular. */
function SectionBody({ section }: { section: SettingsPanel }) {
  const t = useT();
  const lang = useLang();
  const { course } = useShell();
  /* Titreşim satırı yalnız titreşen cihazda (`SoundSettings`). Sunucu
     bilemez: sunucu çiziminde yok, istemcide hidrasyondan sonra geliyor. */
  const vibrates = useSyncExternalStore(noSubscribe, canVibrate, () => false);

  switch (section) {
    case "learning":
      return (
        <Group>
          <Row label={label(t("settings.language_to_learn"))}>
            <div className="grid grid-cols-2 gap-2">
              {selectableCourses(lang, course).map((c) => (
                <div key={c.id} className="option px-3 py-3 text-left">
                  <Words className="block text-strong" text={courseName(c.id, lang)} />
                  <Words className="muted block text-caption" text={courseSub(c.id, lang)} />
                </div>
              ))}
            </div>
          </Row>
          <Row label={label(t("settings.level"))}>
            <div className="grid grid-cols-5 gap-1.5">
              {["A1", "A2", "B1", "B2", "C1"].map((l) => (
                <Words key={l} as="div" className="option px-1 py-2.5 text-center text-strong" text={l} />
              ))}
            </div>
            {/* Seviyenin açıklaması seçili seviyeye bağlı: çubuk. */}
            <SkeletonLine variant="caption" width="70%" className="mt-2" />
            <Words className="mt-3 inline-block text-caption font-bold" text={t("settings.not_sure_take_placement_test")} />
          </Row>
          <Row label={label(t("settings.daily_goal_reviews_day"))}>
            {/* Formdaki gibi: iki kaydırıcı arası 12, not 8 (`components/field.tsx`). */}
            <div className="space-y-3">
            {[t("settings.daily_goal_short"), t("settings.new_per_day")].map((name) => (
              <div key={name} className="block">
                <span className="mb-1.5 flex items-baseline justify-between text-strong">
                  <Words text={name} />
                  <SkeletonLine variant="strong" width={72} />
                </span>
                {/* Gerçek `.range`, görünmez: satır içi öğenin satır payıyla
                    birlikte yüksekliği tarayıcıdan. Üstünde 6 px çubuk (22 px'in ortası). */}
                <span className="relative block">
                  <input type="range" disabled tabIndex={-1} aria-hidden className="range invisible" />
                  <span className="absolute inset-x-0 block h-1.5 animate-pulse rounded-full" style={{ top: 8, background: "var(--surface-2)" }} />
                </span>
              </div>
            ))}
            </div>
            <Words as="p" className="muted mt-2 text-caption" text={t("settings.srs_note")} />
          </Row>
        </Group>
      );

    case "app": {
      const offered = offeredNativeLangs();
      return (
        <Group>
          <Row label={label(t("settings.app_language"))}>
            {/* `LangSetting bare` — tek dil açıksa hiç çizilmiyor. */}
            {offered.length < 2 ? null : (
              <div>
                <div className="flex gap-1.5">
                  {offered.map((l) => (
                    <span key={l} className="chip px-3 py-1.5 text-caption">
                      <Words text={LANG_LABEL[l]} />
                    </span>
                  ))}
                </div>
                <Words as="p" className="muted mt-2 text-caption leading-snug" text={t("lang.app_language_sub")} />
              </div>
            )}
          </Row>
          <Row label={label(t("settings.sound"))}>
            <div>
              <Words as="p" className="muted mb-2 text-caption" text={t("settings.reading_voice")} />
              {/* `VoicePicker`: kurs bilinmiyor, anadilin ilk kursunun sesleri
                  (her kursta iki ses, notları benzer uzunlukta). */}
              <div className="flex gap-2">
                {voicesFor(coursesForNative(lang)[0]?.id ?? "de").map((v) => (
                  <div key={v.id} className="option flex-1 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Words className="min-w-0 flex-1 truncate text-strong" text={v.label} />
                      {/* Dinle düğmesi: 20'lik ikon + `p-1`. */}
                      <span className="block shrink-0 p-1">
                        <span className="block" style={{ width: 20, height: 20 }} />
                      </span>
                    </div>
                    <Words as="p" className="muted mt-1 text-caption" text={t(v.gender === "female" ? "voices.female" : "voices.male")} />
                    <Words as="p" className="mt-1 text-caption" text={t(v.noteKey)} />
                  </div>
                ))}
              </div>
              {/* `SoundSettings bare`: oyun sesleri (açık: dinle düğmesi + anahtar).
                  Titreşim satırı yalnız titreşen cihazda, sunucu bilemez. */}
              <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
                <div className="inset-list">
                <SettingRowSlot title={t("snd.game_sounds")} sub={t("snd.game_sounds_sub")}>
                  <span className="chip block h-8 w-8" />
                  <SwitchSlot />
                </SettingRowSlot>
                {vibrates ? (
                  <SettingRowSlot title={t("snd.haptics")} sub={t("snd.haptics_sub")}>
                    <SwitchSlot />
                  </SettingRowSlot>
                ) : null}
                </div>
              </div>
            </div>
          </Row>
          <Row label={label(t("settings.appearance"))}>
            {/* `ThemeSetting bare`: surface-2 şerit, içinde üç eşit bölüm. */}
            <div>
              <div className="flex" style={{ background: "var(--surface-2)", borderRadius: "var(--radius-tile)", padding: 4 }}>
                {["settings.theme_system", "settings.theme_light", "settings.theme_dark"].map((k) => (
                  <Words key={k} className="flex-1 py-2.5 text-center text-strong" tone="var(--border)" text={t(k)} />
                ))}
              </div>
            </div>
          </Row>
          <Row>
            {/* Kurulum rehberi, kapalı `Disclosure`. */}
            <div>
              <div className="flex w-full items-center gap-3 py-1">
                <Words className="flex-1 text-strong" text={t("settings.add_to_home")} />
                <Words className="muted shrink-0 text-caption" text={t("settings.add_to_home_hint")} />
                <span className="w-[18px] shrink-0" />
              </div>
            </div>
          </Row>
        </Group>
      );
    }

    case "account":
      /* `LinkedAccounts part="account"`: ad, giriş yöntemleri (çoğu hesapta
         parola + Google), kullanıcı adı, Güvenlik, Hesabı sil. */
      return (
        <Group>
          <Row label={label(t("settings.sec_name"))}>
            <div className="input w-full">
              <SkeletonLine variant="body" width="40%" />
            </div>
          </Row>
          <Row label={label(t("links.title"))}>
            <SignInMethodsSkeleton />
          </Row>
          <Row label={label(t("socialsettings.username"))}>
            <div className="flex items-center gap-2">
              <Words className="text-body" text="@" />
              <div className="input min-w-0 flex-1">
                <SkeletonLine variant="body" width="50%" />
              </div>
              <Btn className="btn btn-primary h-9 px-3 text-caption" text={t("common.save")} />
            </div>
            <Words
              as="p"
              className="muted mt-2 text-caption leading-snug"
              text={`${t("socialsettings.username_rule")} ${t("socialsettings.username_cooldown", { n: USERNAME_CHANGE_COOLDOWN_DAYS })} ${t("socialsettings.profile_link", { path: "/u/username" })}`}
            />
          </Row>
          <LinkRowSlot title={t("settings.group_security")} sub={t("settings.security_sub")} />
          <LinkRowSlot title={t("settings.delete_account")} sub={t("deleteaccount.your_account_and_all_your_data")} />
        </Group>
      );

    case "security":
      /* Parola ve iki adım yalnız parolalı hesapta; çoğunluk o. */
      return (
        <Group>
          <PasswordRowsSkeleton />
          <Row label={label(t("settings.sec_sessions"))}>
            <div className="space-y-3">
              <SessionRowSkeleton />
              <div className="flex items-center justify-between gap-3">
                <Words as="p" className="muted text-body leading-snug" text={t("sessions.sub")} />
                <Btn className="btn btn-tint h-9 shrink-0 px-3 text-caption" text={t("sessions.revoke_others")} />
              </div>
            </div>
          </Row>
        </Group>
      );

    case "privacy":
      return (
        <>
          {/* `SocialSettings part="privacy"`: görünürlük, izinler, engellenenler. */}
          <section className="card divide-y divide-[color:var(--hairline)] overflow-hidden px-4">
            <div className="py-4">
              <Words as="p" className="text-strong" text={t("socialsettings.visibility")} />
              <div className="mt-2 flex flex-col gap-1.5">
                {[
                  ["socialsettings.vis_public", "socialsettings.vis_public_sub"],
                  ["social.tab_friends", "socialsettings.vis_friends_sub"],
                  ["socialsettings.vis_private", "socialsettings.vis_private_sub"],
                ].map(([l, s]) => (
                  <div key={l} className="chip justify-start px-3.5 py-2.5 text-left text-caption">
                    <Words className="block text-caption" text={t(l)} />
                    <Words className="muted block text-micro" text={t(s)} />
                  </div>
                ))}
              </div>
            </div>
            <div className="py-4">
              <Words as="p" className="mb-2 text-strong" text={t("socialsettings.permissions")} />
              <div className="inset-list">
                {["perm_requests", "perm_suggest", "perm_activity"].map((k) => (
                  <SettingRowSlot key={k} title={t(`socialsettings.${k}`)} sub={t(`socialsettings.${k}_sub`)}>
                    <SwitchSlot />
                  </SettingRowSlot>
                ))}
              </div>
            </div>
            <div className="py-4">
              <Words as="p" className="text-strong" text={t("socialsettings.blocked_title")} />
              <SkeletonLine variant="caption" width="60%" className="mt-2" />
            </div>
          </section>
          <Group title={<Words text={t("settings.data_consents")} />}>
            <Row>
              <div className="inset-list">
              <SettingRowSlot title={t("settings.send_usage_data")} sub={t("settings.analytics_sub")}>
                <span className="chip block h-8 px-2.5 text-caption">
                  <Words text={t("settings.privacy_policy_short")} />
                </span>
                <SwitchSlot />
              </SettingRowSlot>
              <SettingRowSlot title={t("aiconsent.text_title")} sub={t("aiconsent.settings_text_sub")}>
                <SwitchSlot />
              </SettingRowSlot>
              <SettingRowSlot title={t("aiconsent.settings_voice")} sub={t("aiconsent.settings_voice_sub")}>
                <SwitchSlot />
              </SettingRowSlot>
              </div>
            </Row>
          </Group>
        </>
      );

    case "about":
      return (
        <>
          <Group>
            <Row>
              <div className="inset-list">
              <SettingRowSlot title={t("settings.privacy_and_terms")} sub={t("settings.privacy_and_terms_sub")}>
                <Btn className="btn btn-ghost h-9 px-3 text-caption" text={t("settings.privacy_policy")} />
                <Btn className="btn btn-ghost h-9 px-3 text-caption" text={t("settings.terms_of_use")} />
              </SettingRowSlot>
              <SettingRowSlot title={t("settings.support_contact")} sub={t("settings.support_contact_sub")}>
                <Btn className="btn btn-ghost h-9 px-3 text-caption" text={t("settings.support_contact")} />
              </SettingRowSlot>
              <SettingRowSlot title={t("settings.impressum")}>
                <Btn className="btn btn-ghost h-9 px-3 text-caption" text={t("settings.impressum")} />
              </SettingRowSlot>
              <SettingRowSlot title={t("settings.oss_licenses")}>
                <Btn className="btn btn-ghost h-9 px-3 text-caption" text={t("settings.oss_licenses")} />
              </SettingRowSlot>
              </div>
            </Row>
          </Group>
          <Words as="p" className="muted pb-2 pt-1 text-center text-caption" text="Lernomi 1.0.0" />
        </>
      );

    case "reminders":
      /* `reminders/page.tsx` + `NotificationSettings`: telefonda ortalı karo ve
         cümle, masaüstünde yalnız cümle; kartta izin satırı (izin durumu
         tarayıcıda, sunucu bilemez — en sık durum: izin yok, yalnız bu satır).
         İzin açıksa üç anahtarın yeri bileşenin kendisinden
         (`notification-settings` `RemindersSlot`) geliyor. */
      return (
        <div className="mx-auto w-full max-w-3xl">
          <div className="space-y-4">
            <div className="flex flex-col items-center px-2 text-center md:hidden">
              <TileSlot shape="card" className="h-[72px] w-[72px]" />
              <Words as="p" className="muted mt-3" text={t("notifications.gentle_nudges_to_keep_your")} />
            </div>
            <Words as="p" className="muted hidden md:block" text={t("notifications.gentle_nudges_to_keep_your")} />
            <section className="card divide-y divide-[color:var(--hairline)] overflow-hidden">
              <SettingRowSlot title={t("notif.channel")} sub={t("pushw.one_a_day")}>
                <SwitchSlot />
              </SettingRowSlot>
            </section>
          </div>
        </div>
      );

    case "subscription":
      /* `SubscriptionSummary`: karo + plan + tek cümle, altında düğme. Plan veri
         (çubuk); cümle en sık durumun, ücretsizin (Premium sloganı). */
      return (
        <Group>
          <Row>
            <div className="flex items-center gap-3">
              <SkeletonTile size={44} />
              <div className="min-w-0 flex-1">
                <SkeletonLine variant="strong" width={88} />
                <Words as="p" className="muted mt-0.5 text-caption leading-snug" text={t(supportsMockExams(course) ? "paywall.pitch_exams" : "paywall.pitch")} />
              </div>
            </div>
          </Row>
          <Row>
            <Btn className="btn flex w-full items-center justify-center px-5 py-3" text={t("profile.go_premium")} />
          </Row>
        </Group>
      );
  }
}

/** Panelin çerçevesi: başlık ve gövde, `space-y-4` sütunda (`ProfileForm`, `reminders`, `subscription`). */
function SectionSkeleton({ section }: { section: SettingsPanel }) {
  const t = useT();
  return (
    <div aria-hidden className="w-full space-y-4">
      <PanelTitleSlot title={t(PANEL_TITLE[section])} />
      <SectionBody section={section} />
    </div>
  );
}

/**
 * Ayarların PANEL iskeleti — bütün yükleme durumları tek yerden, düzenin
 * (`layout.tsx`) içinde. `/profile/settings`in kendi `loading.tsx`i
 * `/profile`dan bir gruba doğrudan gidilirken de çiziliyor (ilk değişen parça
 * `settings`): adres bir grup taşıyorsa o grubu çiz. Grup ADRESTEN
 * (`usePathname`): `useParams` yalnız `[section]`ı görüyordu, Hatırlatmalar
 * ve Abonelik kendi klasöründe.
 *
 * Grupsuz (liste) adreste sayfanın kendisi: telefonda başlık + liste,
 * masaüstünde Öğrenme (`page.tsx`).
 */
export function SettingsSkeleton({ section }: { section?: SettingsPanel }) {
  const t = useT();
  const pathname = usePathname();
  const raw = section ?? (pathname ?? "").split("/")[3];
  if (!raw) {
    return (
      <>
        <div className="md:hidden">
          <BackSlot title={t("settings.settings")} />
          <SettingsNavSkeleton />
        </div>
        <div className="hidden md:block">
          <SectionSkeleton section="learning" />
        </div>
      </>
    );
  }
  /* Bilinmeyen grup 404 olacak; o arada Öğrenme. */
  const s = PANELS.includes(raw as SettingsPanel) ? (raw as SettingsPanel) : "learning";
  return <SectionSkeleton section={s} />;
}

/**
 * Düzenin DIŞINDAN ayarlara yönlenen adreslerin iskeleti: başlık + sol menü
 * (açık grup vurgulu) + panel, `layout.tsx`in çizeceğinin aynısı.
 */
export function SettingsPageSkeleton({ section }: { section: SettingsPanel }) {
  return (
    <SettingsFrame nav={<SettingsNavSkeleton variant="sidebar" current={section} />}>
      <SettingsSkeleton section={section} />
    </SettingsFrame>
  );
}
