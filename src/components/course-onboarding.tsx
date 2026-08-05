"use client";

import { useState } from "react";
import { VoicePicker } from "@/components/voice-picker";
import { defaultVoice, type VoiceId } from "@/lib/tts/voices";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertIcon, CheckIcon, LogoMark } from "@/components/icons";

const COURSES = [
  {
    id: "de",
    title: "Almanca",
    subtitle: "Hochdeutsch",
    desc: "Goethe A1–C1 kelime hazinesi, sınav formatında okuma, dinleme ve yazma.",
  },
  {
    id: "gsw-zh",
    title: "Zürih Almancası",
    subtitle: "Züritüütsch",
    desc: "İsviçre'nin Zürih lehçesi: günlük konuşma dili, Hochdeutsch köprüsüyle.",
  },
];

const LEVELS = [
  { id: "A1", desc: "Yeni başlıyorum" },
  { id: "A2", desc: "Temel günlük dili biliyorum" },
  { id: "B1", desc: "Kendimi genel konularda ifade ederim" },
  { id: "B2", desc: "İş ve toplum dilini anlarım" },
  { id: "C1", desc: "Akademik ve soyut dile hâkimim" },
];

/** İlk giriş: kurs + başlangıç seviyesi. Sonradan profilden değiştirilebilir. */
export function CourseOnboarding() {
  const router = useRouter();
  const [course, setCourse] = useState("de");
  const [voice, setVoice] = useState<VoiceId>(defaultVoice("de"));
  const [level, setLevel] = useState("A1");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ course, level, voice }),
      });
      if (!res.ok) throw new Error(String(res.status));
      router.push("/learn");
      router.refresh();
    } catch {
      setError("Kaydedilemedi — bağlantını kontrol edip tekrar dene.");
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex items-center gap-2.5">
          <span className="brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white">
            <LogoMark size={22} />
          </span>
          <div>
            <h1 className="text-xl font-bold">Hoş geldin!</h1>
            <p className="muted text-sm">İki soruyla başlayalım — sonra profilden değiştirebilirsin.</p>
          </div>
        </div>

        <h2 className="mb-2 font-bold">Hangi dili öğrenmek istiyorsun?</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {COURSES.map((c) => {
            const active = course === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCourse(c.id);
                  // Ses kursa bağlı: Zürih'e geçince Almanca ses anlamsız kalır.
                  setVoice(defaultVoice(c.id));
                }}
                className={`option relative p-4 text-left ${active ? "option-picked" : ""}`}
              >
                {active ? (
                  <span
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white"
                    style={{ background: "var(--color-brand-500)" }}
                  >
                    <CheckIcon size={13} />
                  </span>
                ) : null}
                <p className="font-bold">{c.title}</p>
                <p className="text-xs font-semibold text-[color:var(--color-brand-500)]">
                  {c.subtitle}
                </p>
                <p className="muted mt-1.5 text-xs leading-relaxed">{c.desc}</p>
              </button>
            );
          })}
        </div>

        <h2 className="mb-2 mt-6 font-bold">Hangi sesi dinlemek istersin?</h2>
        <VoicePicker course={course} value={voice} onChange={setVoice} />

        <h2 className="mb-2 mt-6 font-bold">Seviyen ne?</h2>
        <div className="grid gap-2 sm:grid-cols-5">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLevel(l.id)}
              className={`option px-3 py-3 text-sm font-bold ${level === l.id ? "option-correct" : ""}`}
            >
              {l.id}
            </button>
          ))}
        </div>
        <p className="muted mt-1.5 text-xs">
          {LEVELS.find((l) => l.id === level)?.desc}. Bu bir başlangıç noktası — iyi gittikçe
          sistem seni yukarı taşır, zorlanırsan alta indirir.
        </p>

        <button
          type="button"
          onClick={() => void start()}
          disabled={saving}
          className="btn btn-primary mt-7 w-full px-6 py-3.5 text-base disabled:opacity-60"
        >
          {saving ? "Hazırlanıyor…" : "Öğrenmeye başla"}
        </button>
        {error ? (
          <p
            className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            style={{
              background: "color-mix(in srgb, var(--color-rose-500) 12%, transparent)",
              color: "var(--color-rose-500)",
            }}
          >
            <AlertIcon size={16} /> {error}
          </p>
        ) : null}
      </motion.div>
    </main>
  );
}
