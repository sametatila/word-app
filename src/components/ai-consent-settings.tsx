"use client";

import { useCallback, useEffect, useState } from "react";
import { SettingRow, Switch } from "@/components/setting-row";
import { useLang, useT } from "@/lib/i18n/client";
import {
  decideAiConsent,
  fetchAiConsent,
  onAiConsentChange,
  requestAiConsent,
  type AiConsentPurpose,
  type AiConsentState,
} from "@/lib/ai-consent-client";

/**
 * Yapay zekâ rızasının Ayarlar'daki iki anahtarı — mobil `SettingsScreen`
 * Gizlilik satırının karşılığı (orada yalnız metin anahtarı var; ses izni
 * mobilde yürüyüş açıklamasından ve mikrofon onayının geri alınmasından
 * yönetiliyor, webde telaffuz puanı da sesi gönderdiği için ikisi de burada).
 *
 * "Hayır" diyen kullanıcıya diyalog bir daha KENDİLİĞİNDEN açılmıyor
 * (`aiConsentShouldPrompt`); fikrini değiştirmenin yeri burası. Bu yüzden:
 *
 *   AÇMAK diyalogdan geçiyor: izin, sağlayıcılar adıyla gösterilmeden
 *   verilmez — anahtar tek başına bir onay yazmıyor.
 *   KAPATMAK tek dokunuş: geri almak vermek kadar kolay olmalı.
 *
 * Anahtar SUNUCUDAKİ durumu gösteriyor, dokunulan hâli değil: diyalog
 * kapatıldıysa ya da kayıt düştüyse yeniden okunan durum geçerli.
 */
export function AiConsentSettings() {
  const t = useT();
  const lang = useLang();
  const [states, setStates] = useState<Record<AiConsentPurpose, AiConsentState> | null>(null);
  const [busy, setBusy] = useState<AiConsentPurpose | null>(null);

  const refresh = useCallback(() => {
    fetchAiConsent(lang)
      .then((info) => setStates({ ai_text: info.statuses.ai_text.state, ai_voice: info.statuses.ai_voice.state }))
      .catch(() => {
        /* okunamadı: anahtarlar kapalı ve dokunulmaz kalıyor, yanlış bir durum göstermiyor */
      });
  }, [lang]);

  /* Karar başka bir yerden de yazılabiliyor (diyalog, mikrofon onayının geri
     alınması); her yazımdan sonra yeniden okunuyor. */
  useEffect(() => {
    refresh();
    return onAiConsentChange(refresh);
  }, [refresh]);

  async function toggle(purpose: AiConsentPurpose, next: boolean) {
    if (busy) return;
    setBusy(purpose);
    try {
      if (next) await requestAiConsent(purpose);
      else await decideAiConsent(purpose, false);
    } catch {
      /* ağ yok: anahtar yeniden okunan durumu gösteriyor */
    }
    setBusy(null);
    refresh();
  }

  return (
    <>
      <SettingRow title={t("aiconsent.text_title")} sub={t("aiconsent.settings_text_sub")}>
        <Switch
          on={states?.ai_text === "granted"}
          onChange={(next) => void toggle("ai_text", next)}
          disabled={!states || busy !== null}
          label={t("aiconsent.text_title")}
        />
      </SettingRow>
      <SettingRow title={t("aiconsent.settings_voice")} sub={t("aiconsent.settings_voice_sub")}>
        <Switch
          on={states?.ai_voice === "granted"}
          onChange={(next) => void toggle("ai_voice", next)}
          disabled={!states || busy !== null}
          label={t("aiconsent.settings_voice")}
        />
      </SettingRow>
    </>
  );
}
