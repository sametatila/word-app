"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { VoicePicker } from "@/components/voice-picker";
import { Mascot } from "@/components/mascot";
import { defaultVoice, type VoiceId } from "@/lib/tts/voices";
import { AlertIcon, CheckIcon, LogoMark } from "@/components/icons";
import { track } from "@/lib/track";

const COURSES = [
  { id: "de", title: "Almanca", subtitle: "Hochdeutsch", desc: "Goethe A1–C1 kelime hazinesi, sınav formatında okuma, dinleme ve yazma." },
  { id: "gsw-zh", title: "Zürih Almancası", subtitle: "Züritüütsch", desc: "İsviçre'nin Zürih lehçesi: günlük konuşma dili, Hochdeutsch köprüsüyle." },
];

const GOALS = [
  { id: "work", title: "İş", desc: "Toplantı, e-posta, görüşme — iş yerinde rahat konuşmak." },
  { id: "daily", title: "Günlük hayat", desc: "Komşu, market, doktor, resmi daire — yaşadığım yerde yaşamak." },
  { id: "exam", title: "Sınav", desc: "Goethe / telc / ÖSD sertifikası, dil şartı." },
  { id: "swiss", title: "İsviçre", desc: "Zürih'te yaşam: lehçeyi anlamak, Hochdeutsch ile yazmak." },
];

const LEVELS = [
  { id: "A1", desc: "Yeni başlıyorum" },
  { id: "A2", desc: "Temel günlük dili biliyorum" },
  { id: "B1", desc: "Kendimi genel konularda ifade ederim" },
  { id: "B2", desc: "İş ve toplum dilini anlarım" },
  { id: "C1", desc: "Akademik ve soyut dile hâkimim" },
];

type Step = 0 | 1 | 2 | 3;

/**
 * İlk giriş akışı (plan WP-65): dört ekran, her biri tek karar.
 *   1. İsim + kurs (+ ses)   2. Hedef: neden Almanca?
 *   3. Seviye: ölçelim mi, biliyor musun?   4. "Bugünkü planın hazır"
 *
 * Hedef (`profiles.goal`) görev ve içerik önerilerini etkiler; seviye ya
 * yerleştirme testinden (WP-40) ya da kullanıcının kendi seçiminden gelir —
 * iki yolda da karar kullanıcının. Erdi her ekranda rehber; her ekranın
 * ilerleme noktası var ki "daha ne kadar var" belli olsun.
 */
export function CourseOnboarding({ initialName = "" }: { initialName?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState(initialName);
  const [course, setCourse] = useState("de");
  const [voice, setVoice] = useState<VoiceId>(defaultVoice("de"));
  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState("A1");
  const [levelMode, setLevelMode] = useState<"pick" | "measure" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanName = name.trim().replace(/\s+/g, " ");
  const nameOk = cleanName.length >= 2;

  async function save(extra: Record<string, unknown>): Promise<boolean> {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName: cleanName, course, voice, goal, level, ...extra }),
      });
      if (!res.ok) throw new Error(String(res.status));
      return true;
    } catch {
      setError("Kaydedilemedi — bağlantını kontrol edip tekrar dene.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function finishWithLevel() {
    if (await save({ level })) {
      track("nav", 0, "onboarding:level");
      setStep(3);
    }
  }
  async function goMeasure() {
    // Profil önce kaydedilir (isim/kurs/hedef); seviye testin sonunda yazılır.
    if (await save({ level: "A1" })) {
      track("nav", 0, "onboarding:placement");
      router.push("/placement");
    }
  }

  const dots = (
    <ol className="mb-5 flex items-center gap-2" aria-label={`Adım ${step + 1} / 4`}>
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= step ? "var(--color-brand)" : "var(--surface-2)" }} />
      ))}
    </ol>
  );

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-4 py-10">
      <div className="mb-6 flex items-center gap-2.5">
        <LogoMark size={36} />
        <div>
          <h1 className="text-lg font-bold">{step === 0 ? "Hoş geldin!" : step === 1 ? "Neden Almanca?" : step === 2 ? "Seviyen" : "Hazırsın"}</h1>
          <p className="muted text-xs">Adım {step + 1} / 4 · sonradan profilden değiştirebilirsin</p>
        </div>
      </div>
      {dots}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
          {step === 0 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="wave" size={72} stage="onboarding" />
                <p className="muted text-sm leading-relaxed">Ben Erdi. Sana yol göstereceğim — önce adını ve hangi Almancayı öğreneceğini söyle.</p>
              </div>
              <h2 className="mb-2 mt-5 font-bold">Sana nasıl seslenelim?</h2>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="given-name" placeholder="Adın" aria-label="Adın" className="option w-full px-4 py-3 text-base" />
              <p className="muted mt-1.5 text-xs">Sıralamada bu isim görünecek.</p>
              <h2 className="mb-2 mt-6 font-bold">Hangi dili öğrenmek istiyorsun?</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {COURSES.map((c) => {
                  const active = course === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCourse(c.id);
                        setVoice(defaultVoice(c.id));
                      }}
                      className={`option relative p-4 text-left ${active ? "option-picked" : ""}`}
                    >
                      {active ? (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: "var(--color-brand-600)" }}>
                          <CheckIcon size={13} />
                        </span>
                      ) : null}
                      <p className="font-bold">{c.title}</p>
                      <p className="text-xs font-semibold text-[color:var(--color-brand)]">{c.subtitle}</p>
                      <p className="muted mt-1.5 text-xs leading-relaxed">{c.desc}</p>
                    </button>
                  );
                })}
              </div>
              <h2 className="mb-2 mt-6 font-bold">Hangi sesi dinlemek istersin?</h2>
              <VoicePicker course={course} value={voice} onChange={setVoice} />
              <button
                type="button"
                onClick={() => {
                  if (!nameOk) return setError("Sana nasıl sesleneceğimizi yaz — sıralamada bu isim görünecek.");
                  setError(null);
                  if (course === "gsw-zh" && !goal) setGoal("swiss");
                  setStep(1);
                }}
                className="btn btn-primary mt-7 w-full px-6 py-3.5 text-base"
              >
                Devam
              </button>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="think" size={72} stage="onboarding" />
                <p className="muted text-sm leading-relaxed">Hedefin görevleri ve içerik önerilerini şekillendirir — iş için e-posta, günlük hayat için komşu sohbeti.</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => {
                  const active = goal === g.id;
                  return (
                    <button key={g.id} type="button" onClick={() => setGoal(g.id)} className={`option relative p-4 text-left ${active ? "option-picked" : ""}`}>
                      {active ? (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: "var(--color-brand-600)" }}>
                          <CheckIcon size={13} />
                        </span>
                      ) : null}
                      <p className="font-bold">{g.title}</p>
                      <p className="muted mt-1.5 text-xs leading-relaxed">{g.desc}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep(0)} className="btn btn-ghost px-4 py-3 text-sm">
                  Geri
                </button>
                <button type="button" disabled={!goal} onClick={() => setStep(2)} className="btn btn-primary flex-1 px-6 py-3 text-base disabled:opacity-60">
                  Devam
                </button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="idle" size={72} stage="onboarding" />
                <p className="muted text-sm leading-relaxed">Seviyeni 12 dakikalık bir testle ölçebiliriz ya da kendin seçersin. İki yolda da sonradan değiştirmek serbest.</p>
              </div>
              <div className="mt-5 grid gap-3">
                <button type="button" onClick={() => setLevelMode("measure")} className={`option p-4 text-left ${levelMode === "measure" ? "option-picked" : ""}`}>
                  <p className="font-bold">Seviyemi ölçelim</p>
                  <p className="muted mt-1 text-xs">Kelime, dilbilgisi, okuma, dinleme — en çok 15 dakika, sonunda öneri + beceri profili.</p>
                </button>
                <button type="button" onClick={() => setLevelMode("pick")} className={`option p-4 text-left ${levelMode === "pick" ? "option-picked" : ""}`}>
                  <p className="font-bold">Seviyemi biliyorum</p>
                  <p className="muted mt-1 text-xs">Kendin seç; iyi gittikçe sistem yukarı taşır, zorlanırsan alta indirir.</p>
                </button>
              </div>
              {levelMode === "pick" ? (
                <>
                  <div className="mt-4 grid gap-2 sm:grid-cols-5">
                    {LEVELS.map((l) => (
                      <button key={l.id} type="button" onClick={() => setLevel(l.id)} className={`option px-3 py-3 text-sm font-bold ${level === l.id ? "option-correct" : ""}`}>
                        {l.id}
                      </button>
                    ))}
                  </div>
                  <p className="muted mt-1.5 text-xs">{LEVELS.find((l) => l.id === level)?.desc}.</p>
                </>
              ) : null}
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="btn btn-ghost px-4 py-3 text-sm">
                  Geri
                </button>
                {levelMode === "measure" ? (
                  <button type="button" disabled={saving} onClick={() => void goMeasure()} className="btn btn-primary flex-1 px-6 py-3 text-base disabled:opacity-60">
                    {saving ? "Hazırlanıyor…" : "Teste başla"}
                  </button>
                ) : (
                  <button type="button" disabled={saving || levelMode !== "pick"} onClick={() => void finishWithLevel()} className="btn btn-primary flex-1 px-6 py-3 text-base disabled:opacity-60">
                    {saving ? "Kaydediliyor…" : `${level} ile devam`}
                  </button>
                )}
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <div className="flex items-start gap-3">
                <Mascot mood="cheer" size={80} stage="onboarding" />
                <div>
                  <p className="font-bold">Bugünkü planın hazır, {cleanName}.</p>
                  <p className="muted mt-1 text-sm leading-relaxed">
                    {course === "gsw-zh" ? "Zürih Almancası" : "Almanca"} · {LEVELS.find((l) => l.id === level)?.id} · hedef: {GOALS.find((g) => g.id === goal)?.title ?? "—"}. Öğren ekranında seni kısa bir kelime turu, sıradaki ders ve bir beceri egzersizi bekliyor.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  router.push("/learn");
                  router.refresh();
                }}
                className="btn btn-primary mt-7 w-full px-6 py-3.5 text-base"
              >
                Öğrenmeye başla
              </button>
            </>
          ) : null}

          {error ? (
            <p className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm" style={{ background: "color-mix(in srgb, var(--color-rose) 12%, transparent)", color: "var(--color-rose)" }}>
              <AlertIcon size={16} /> {error}
            </p>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
