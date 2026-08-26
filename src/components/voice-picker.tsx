"use client";

import { useState } from "react";
import { voicesFor, resolveVoice, type VoiceId } from "@/lib/tts/voices";
import { speakWithVoice } from "@/components/speak-button";
import { CheckIcon, SpeakerIcon } from "@/components/icons";

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

const SAMPLE: Record<string, string> = {
  de: "Der neue Vertrag gilt für alle Beschäftigten.",
  "gsw-zh": "De nöi Vertrag gilt für alli Bschäftigte.",
};

export function VoicePicker({
  course,
  value,
  onChange,
  compact = false,
}: {
  course: string;
  value: string | null;
  onChange: (voice: VoiceId) => void;
  /**
   * Ayarlar kipi: tek satır, açıklama yok, dinleme düğmesi simgeye iniyor.
   *
   * Geniş kip ilk kurulum için: ses o an ilk kez seçiliyor ve iki sesin farkı
   * ancak açıklamayla ve rahat bir dinle düğmesiyle anlatılabiliyor. Ayarlarda
   * ise kullanıcı sesini çoktan tanıyor; orada gereken tek şey diğerine
   * geçebilmek, iki kartlık 230 piksel değil.
   */
  compact?: boolean;
}) {
  const [playing, setPlaying] = useState<string | null>(null);
  const options = voicesFor(course);
  // Kurs değiştiğinde eski kursun sesi seçili kalabilir; gösterilen seçim
  // her zaman gerçekte kullanılacak ses olmalı.
  const selected = resolveVoice(course, value);
  const sample = SAMPLE[course === "gsw-zh" ? "gsw-zh" : "de"];

  function preview(voice: VoiceId) {
    setPlaying(voice);
    speakWithVoice(sample, voice);
    // Sentez birkaç saniye sürebiliyor; gösterge sabit bir süre sonra sönüyor.
    // Gerçek bitişe bağlamıyoruz çünkü önizleme sesi kesilebilir de.
    setTimeout(() => setPlaying((p) => (p === voice ? null : p)), 3500);
  }

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {options.map((v) => {
          const active = selected === v.id;
          return (
            <div
              key={v.id}
              className={`option flex items-center gap-2 py-2 pl-3 pr-2 ${
                active ? "option-picked" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => onChange(v.id)}
                aria-pressed={active}
                className="min-w-0 flex-1 text-left"
              >
                <span className="block truncate text-sm font-bold">{v.label}</span>
                <span className="muted block truncate text-[11px]">{v.gender}</span>
              </button>
              {active ? (
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--color-brand-600)" }}
                >
                  <CheckIcon size={11} />
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => preview(v.id)}
                className="chip flex h-8 w-8 shrink-0 items-center justify-center"
                aria-label={`${v.label} sesini dinle`}
                title="Dinle"
              >
                <SpeakerIcon size={14} />
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((v) => {
        const active = selected === v.id;
        return (
          <div
            key={v.id}
            className={`option relative p-4 text-left ${active ? "option-picked" : ""}`}
          >
            <button
              type="button"
              onClick={() => onChange(v.id)}
              aria-pressed={active}
              className="block w-full text-left"
            >
              {active ? (
                <span
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--color-brand-600)" }}
                >
                  <CheckIcon size={13} />
                </span>
              ) : null}
              <p className="font-bold">
                {v.label} <span className="muted text-xs font-normal">{v.gender}</span>
              </p>
              <p className="muted mt-1.5 text-xs leading-relaxed">{v.note}</p>
            </button>

            <button
              type="button"
              onClick={() => preview(v.id)}
              className="btn btn-ghost mt-3 h-8 px-3 text-xs"
              aria-label={`${v.label} sesini dinle`}
            >
              <SpeakerIcon size={13} />
              <span className="ml-1.5">{playing === v.id ? "Çalıyor…" : "Dinle"}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
