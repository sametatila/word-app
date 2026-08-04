"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authApi } from "@/lib/auth/api";
import { AlertIcon, CheckIcon } from "@/components/icons";

type Initial = {
  displayName: string;
  dailyGoal: number;
  newPerDay: number;
  level: string;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
};

const LEVELS = [
  { id: "A1", label: "A1", desc: "Yeni başlıyorum" },
  { id: "A2", label: "A2", desc: "Temel günlük dili biliyorum" },
  { id: "B1", label: "B1", desc: "Kendimi genel konularda ifade ederim" },
  { id: "B2", label: "B2", desc: "İş ve toplum dilini anlarım" },
  { id: "C1", label: "C1", desc: "Akademik ve soyut dile hâkimim" },
];

export function ProfileForm({
  initial,
  accountName,
  authEnabled,
}: {
  initial: Initial;
  accountName: string | null;
  authEnabled: boolean;
}) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [dailyGoal, setDailyGoal] = useState(initial.dailyGoal);
  const [newPerDay, setNewPerDay] = useState(initial.newPerDay);
  const [level, setLevel] = useState(initial.level);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName, dailyGoal, newPerDay, level }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2200);
      } else if (res.status === 401) {
        setSaveError("Oturumun sona ermiş. Tekrar giriş yapman gerekiyor.");
      } else {
        setSaveError("Ayarlar kaydedilemedi. Birazdan tekrar dene.");
      }
    } catch {
      setSaveError("İnternet bağlantısı kurulamadı. Bağlantını kontrol et.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <header className="flex items-center gap-4">
        <div className="brand-gradient flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black text-white">
          {(displayName || accountName || "W").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{displayName || accountName || "Öğrenci"}</h1>
          <p className="muted text-sm">
            {initial.totalXp} XP · {initial.currentStreak} günlük seri (en uzun {initial.longestStreak})
          </p>
        </div>
      </header>

      <section className="card space-y-5 p-5">
        <h2 className="font-bold">Ayarlar</h2>

        <label className="block">
          <span className="muted mb-1.5 block text-sm font-semibold">Görünen ad</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={60}
            placeholder="Adın"
            className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand-400)]"
          />
        </label>

        <div>
          <span className="muted mb-1.5 block text-sm font-semibold">Başlangıç seviyen</span>
          <div className="grid gap-2 sm:grid-cols-5">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLevel(l.id)}
                className={`option px-3 py-3 text-sm font-bold ${
                  level === l.id ? "option-correct" : ""
                }`}
                title={l.desc}
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="muted mt-1.5 text-xs">
            {LEVELS.find((l) => l.id === level)?.desc}. Seçtiğin seviyeye <strong>kadar</strong> olan
            tüm kelimeler havuza girer — A1 ve A2 atlanmaz, sıra yine en yaygın kelimelerden başlar.
          </p>
        </div>

        <Slider
          label="Günlük tekrar hedefi"
          value={dailyGoal}
          min={5}
          max={120}
          step={5}
          suffix="tekrar"
          onChange={setDailyGoal}
        />
        <Slider
          label="Günde yeni kelime"
          value={newPerDay}
          min={0}
          max={40}
          step={1}
          suffix="kelime"
          onChange={setNewPerDay}
        />

        <div className="flex items-center gap-3">
          <button onClick={() => void save()} disabled={saving} className="btn btn-primary px-6 py-3">
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
          {saved ? (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-sm font-semibold text-[color:var(--color-mint-500)]"
            >
              <CheckIcon size={16} /> Kaydedildi
            </motion.span>
          ) : null}
        </div>
        {saveError ? (
          <p
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            style={{
              background: "color-mix(in srgb, var(--color-rose-500) 12%, transparent)",
              color: "var(--color-rose-500)",
            }}
          >
            <AlertIcon size={16} /> {saveError}
          </p>
        ) : null}
      </section>

      <section className="card p-5">
        <h2 className="mb-2 font-bold">Tekrar sistemi</h2>
        <p className="muted text-sm">
          Kelimeleri elle tekrar listesine eklemene gerek yok. Her cevabın hızına ve doğruluğuna
          göre bir sonraki gösterim zamanı hesaplanır; zorlandığın kelimeler sık, bildiklerin
          giderek daha seyrek karşına çıkar. Oyun türü de kelimenin ne kadar oturduğuna göre
          otomatik seçilir.
        </p>
      </section>

      <section className="card p-5">
        <h2 className="mb-3 font-bold">Hesap</h2>
        {authEnabled ? (
          <div className="space-y-3">
            <p className="muted text-sm">
              {accountName ? `${accountName} olarak giriş yaptın.` : "Giriş yaptın."} İlerlemen tüm
              cihazlarında senkron.
            </p>
            <button
              onClick={async () => {
                setSigningOut(true);
                try {
                  await authApi("sign-out", {});
                } catch {
                  /* yine de ana sayfaya dön */
                }
                router.push("/");
                router.refresh();
              }}
              disabled={signingOut}
              className="btn btn-ghost px-4 py-2.5 text-sm disabled:opacity-60"
            >
              {signingOut ? "Çıkılıyor…" : "Çıkış yap"}
            </button>
          </div>
        ) : (
          <p className="muted text-sm">
            Neon Auth anahtarları eklendiğinde giriş, kayıt ve çoklu cihaz senkronizasyonu
            kendiliğinden açılır. Şu anda demo modundasın.
          </p>
        )}
      </section>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-sm font-semibold">
        <span className="muted">{label}</span>
        <span className="text-[color:var(--color-brand-500)]">
          {value} {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[color:var(--color-brand-500)] surface-2"
      />
    </label>
  );
}
