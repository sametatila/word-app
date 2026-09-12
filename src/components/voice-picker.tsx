"use client";

import { voicesFor, resolveVoice, type VoiceId } from "@/lib/tts/voices";
import { courseOrDefault } from "@/lib/courses";
import { speakWithVoice } from "@/components/speak-button";
import { SpeakerIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Ses seçimi — hem ilk kurulumda hem profilde aynı bileşen.
 *
 * Tek kural: seçmeden önce **dinlet**. İki sesin farkı yazıyla anlatılamaz ve
 * kullanıcı bu sesi her gün dinleyecek. Bu yüzden her seçenek kendi örnek
 * cümlesini çalıyor; dinlemek seçmek anlamına gelmiyor, iki eylem ayrı.
 *
 * Örnek cümle kursa göre değişiyor ve gerçek içerikten alınmış bir cümle:
 * demo cümlesi kulağa iyi gelip günlük kullanımda hayal kırıklığı yaratabilir.
 */

/**
 * Ses önizlemesinin okuduğu cümle — KURSUN HEDEF DİLİNDE.
 *
 * `en` girdisi YOKTU ve arama `course === "gsw-zh" ? "gsw-zh" : "de"` biçiminde
 * yazılıydı: Zürihçe dışındaki her kurs Almanca cümleye düşüyordu. İngilizce
 * kursu seçen kullanıcı doğru İngilizce sesleri görüyor ama örneği dinlediğinde
 * ses Almanca bir cümleyi okumaya çalışıyordu.
 *
 * Mobil karşılığı (`mobile/src/ui/VoicePicker.tsx`) baştan beri doğruydu; iki
 * kopya `check:parity` ile karşılaştırılıyor, sıra ve metin birebir aynı olmalı.
 */
export const SAMPLE: Record<string, string> = {
  "gsw-zh": "De nöi Vertrag gilt für alli Bschäftigte.",
  de: "Der neue Vertrag gilt für alle Beschäftigten.",
  en: "The new contract applies to all employees.",
};

/*
 * GENİŞ KİP KALDIRILDI — hiçbir yerden çağrılmıyordu.
 *
 * İki kip vardı: "ayarlar" (dar) ve "ilk kurulum" (geniş, açıklamalı iki
 * kart). Ölçüm geniş kipin TEK çağıranı olmadığını gösterdi — ilk kurulum
 * ekranı ses seçtirmiyor (Android'de de öyle: `VoicePicker` yalnız
 * `SettingsScreen`de). Kalan tek şekil Android'inkiyle eşleştirildi.
 */
export function VoicePicker({
  course,
  value,
  onChange,
}: {
  course: string;
  value: string | null;
  onChange: (voice: VoiceId) => void;
}) {
  const t = useT();
  const options = voicesFor(course);
  // Kurs değiştiğinde eski kursun sesi seçili kalabilir; gösterilen seçim
  // her zaman gerçekte kullanılacak ses olmalı.
  const selected = resolveVoice(course, value);
  const sample = SAMPLE[courseOrDefault(course).id] ?? SAMPLE.de;

  /* ÇALIYOR GÖSTERGESİ YOK — Android'de de yok (`ui/VoicePicker` hoparlör
     düğmesi yalnız çalıyor). Gösterge kaldırılan geniş kipe aitti. */
  function preview(voice: VoiceId) {
    speakWithVoice(sample, voice);
  }

  return (
    /*
     * TEK SEÇİMLİK LİSTE RADYO GRUBUDUR — Android aynı listeyi
     * `accessibilityRole="radio"` ile veriyor (`ui/VoicePicker`).
     *
     * ŞEKİL ANDROID'İN: yan yana eşit genişlikte seçenekler (aralık 8),
     * her biri 12 dolgulu ve `radii.lg` yarıçaplı; seçiliyken kenarlık 2 ve
     * marka tinti, değilken 1. İçeride üç satır var — etiket + hoparlör,
     * cinsiyet, ses notu (`textFaint`). Web'de not satırı HİÇ yoktu ve
     * seçimi ayrıca bir onay rozeti anlatıyordu; Android'de rozet yok,
     * seçimi dolgu ve mürekkep söylüyor.
     */
    <div role="radiogroup" aria-label={t("settings.reading_voice")} className="flex gap-2">
      {options.map((v) => {
        const active = selected === v.id;
        return (
          <div
            key={v.id}
            className={`option flex-1 p-3 ${active ? "option-picked" : ""}`}
            style={{ borderWidth: active ? 2 : 1 }}
          >
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onChange(v.id)}
                role="radio"
                aria-checked={active}
                className="min-w-0 flex-1 truncate text-left text-strong"
                style={active ? { color: "var(--color-brand)" } : undefined}
              >
                {v.label}
              </button>
              <button
                type="button"
                onClick={() => preview(v.id)}
                className="hit-8 shrink-0 p-1"
                style={{ color: "var(--color-brand)" }}
                aria-label={t("voice.listen_to", { name: v.label })}
              >
                <SpeakerIcon size={20} />
              </button>
            </div>
            <p className="muted mt-1 text-caption">
              {t(v.gender === "female" ? "voices.female" : "voices.male")}
            </p>
            <p className="mt-1 text-caption" style={{ color: "var(--text-faint)" }}>
              {t(v.noteKey)}
            </p>

          </div>
        );
      })}
    </div>
  );
}
