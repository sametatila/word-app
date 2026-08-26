"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authApi } from "@/lib/auth/api";
import { AlertIcon, CheckIcon } from "@/components/icons";
import { VoicePicker } from "@/components/voice-picker";
import { InstallGuide } from "@/components/install-guide";
import { PushSettings } from "@/components/push-settings";
import { SoundSettings } from "@/components/sound-settings";
import { InviteCard } from "@/components/invite-card";
import { PageBack } from "@/components/page-back";
import { ThemeSetting } from "@/components/theme-toggle";
import { defaultVoice, type VoiceId } from "@/lib/tts/voices";

type Initial = {
  displayName: string;
  dailyGoal: number;
  newPerDay: number;
  level: string;
  course: string;
  voice: string | null;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
};

const COURSES = [
  { id: "de", label: "Almanca", sub: "Hochdeutsch" },
  { id: "gsw-zh", label: "Zürih Almancası", sub: "Züritüütsch" },
];

const LEVELS = [
  { id: "A1", label: "A1", desc: "Yeni başlıyorum" },
  { id: "A2", label: "A2", desc: "Temel günlük dili biliyorum" },
  { id: "B1", label: "B1", desc: "Kendimi genel konularda ifade ederim" },
  { id: "B2", label: "B2", desc: "İş ve toplum dilini anlarım" },
  { id: "C1", label: "C1", desc: "Akademik ve soyut dile hâkimim" },
];

/**
 * Ayarlar ekranı.
 *
 * Eskiden profilin kendisiydi: kimlik başlığı, araya giren ilerleme kartları
 * ve en altta ayarlar. Sesi kapatmak isteyen biri her seferinde bütün profili
 * geçmek zorundaydı. Artık ayrı bir sayfa (/profile/ayarlar) ve profilden tek
 * dokunuşla açılıyor — kimlik orada kalıyor, buraya yalnızca değiştirilen
 * şeyler geliyor.
 */
export function ProfileForm({
  userId,
  initial,
  accountName,
  authEnabled,
}: {
  initial: Initial;
  accountName: string | null;
  /** Armanın türetildiği hesap kimliği — sıralamadakiyle aynı görünsün diye. */
  userId: string;
  authEnabled: boolean;
}) {
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [dailyGoal, setDailyGoal] = useState(initial.dailyGoal);
  const [newPerDay, setNewPerDay] = useState(initial.newPerDay);
  const [level, setLevel] = useState(initial.level);
  const [course, setCourse] = useState(initial.course);
  const [voice, setVoice] = useState<string | null>(initial.voice);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // İsim boş bırakılamıyor (bkz. api/profile): sunucu zaten reddediyor, burada
  // kaydet düğmesini kapatmak kullanıcıya sebebini önceden gösteriyor.
  const cleanName = displayName.trim().replace(/\s+/g, " ");
  const nameOk = cleanName.length >= 2;

  async function save() {
    if (!nameOk) {
      setSaveError("Görünen ad boş bırakılamaz.");
      return;
    }
    setSaving(true);
    setSaved(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName: cleanName, dailyGoal, newPerDay, level, course, voice }),
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
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <PageBack fallback="/profile" title="Ayarlar" subtitle="Öğrenme, uygulama ve hesap" />

      {/*
        AYARLAR İKİYE AYRILDI.

        Önce beş ayrı kart vardı — "Ayarlar", "Uygulama olarak kur", davet, ses
        ve bildirim — ve aralarına ilerleme kartları da karışıyordu. Hepsi aynı
        ağırlıkta beyaz kutulardı, yani sayfa "önce bakılacak şeyler, sonra
        değiştirilecek şeyler" diye okunmuyordu.

        Şimdi iki başlık var: ÖĞRENME (turun nasıl kurulacağı) ve UYGULAMA
        (cihazda nasıl çalışacağı). Aradaki fark kullanıcının aradığı şeyin
        farkı: biri "günde kaç kelime", diğeri "sesi kapat".
      */}
      <section className="card space-y-5 p-5">
        <h2 className="font-bold">Öğrenme</h2>

        <div>
          <span className="muted mb-1.5 block text-sm font-semibold">Kursun</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {COURSES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCourse(c.id);
                  // Ses kursa bağlı: Zürih metnini Almanca sesle okutmak
                  // bu değişikliğin çözdüğü sorunun ta kendisiydi.
                  setVoice(defaultVoice(c.id));
                }}
                className={`option px-3 py-3 text-left ${course === c.id ? "option-correct" : ""}`}
              >
                <span className="block text-sm font-bold">{c.label}</span>
                <span className="muted block text-xs">{c.sub}</span>
              </button>
            ))}
          </div>
          {course !== initial.course ? (
            <p
              className="mt-2 rounded-xl px-3 py-2 text-xs"
              style={{
                background: "color-mix(in srgb, var(--color-brand) 10%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              Kelimeler ve tekrar kuyruğun yeni kursa geçer. Diğer kurs silinmez.
            </p>
          ) : null}
        </div>

        <div>
          <span className="muted mb-1.5 block text-sm font-semibold">Seslendirme</span>
          <VoicePicker
            course={course}
            value={voice}
            onChange={(v: VoiceId) => setVoice(v)}
          />
        </div>

        <label className="block">
          <span className="muted mb-1.5 block text-sm font-semibold">Görünen ad</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={60}
            placeholder="Adın"
            className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand)]"
          />
        </label>

        <div>
          <span className="muted mb-1.5 block text-sm font-semibold">Seviyen</span>
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
          {/* Havuzun nasıl kurulduğu (çoğu bu seviyeden, bir kısmı alttan,
              bitince üst seviye) bir kez öğrenilen şeydi ve her ayar açılışında
              dört satır yer kaplıyordu. Kalan tek ek bilgi kullanıcıyı
              ilgilendiren tek şey: bu düğmeyi ondan başkası çevirmiyor. */}
          <p className="muted mt-1.5 text-xs">
            {LEVELS.find((l) => l.id === level)?.desc}. Seviyeni <strong>yalnızca sen</strong>{" "}
            değiştirirsin.
          </p>
        </div>

        {/* Tekrar mantığı eskiden ayrı bir "Tekrar sistemi" kartındaydı: dört
            satır, hiçbir eylem yok, ayarların altında duran bir öğretici.
            Bilginin ait olduğu yer burası — hedefi ayarlayan kişinin merak
            ettiği tek şey o sayının neyi belirlediği. */}
        <p className="muted -mb-2 text-xs">
          Tekrar zamanları cevabının hızına ve doğruluğuna göre kendiliğinden hesaplanır.
        </p>
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
          <button
            onClick={() => void save()}
            disabled={saving || !nameOk}
            className="btn btn-primary px-6 py-3 disabled:opacity-60"
          >
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
          {saved ? (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 text-sm font-semibold text-[color:var(--color-mint)]"
            >
              <CheckIcon size={16} /> Kaydedildi
            </motion.span>
          ) : null}
        </div>
        {saveError ? (
          <p
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
            style={{
              background: "color-mix(in srgb, var(--color-rose) 12%, transparent)",
              color: "var(--color-rose)",
            }}
          >
            <AlertIcon size={16} /> {saveError}
          </p>
        ) : null}
      </section>

      {/* Uygulama ayarları tek kartta, ayırıcı çizgilerle. Sıra bir kuralı
          izliyor: iPhone'da bildirim ancak uygulama ana ekrana eklenmişken
          çalışıyor, o yüzden kurulum bildirimden önce geliyor. */}
      <section className="card divide-y divide-[color:var(--border)] overflow-hidden">
        <div className="p-5">
          <h2 className="mb-3 font-bold">Uygulama</h2>
          <InstallGuide tone="plain" />
        </div>
        {/*
          Tema seçimi üst başlıktan buraya indi. Orada her ekranda duran bir
          düğmeydi ama günde bir kez bile dokunulmayan bir tercih; başlıkta
          yer kaplıyor ve avatarla birlikte dar telefonlarda taşıyordu.
          Ayarın evi ayarlar.
        */}
        <ThemeSetting />
        <SoundSettings bare />
        <PushSettings bare />
      </section>

      {/* Davet kendi kartında kalıyor: bir ayar değil, bir çağrı. */}
      <InviteCard />

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
        <span className="text-[color:var(--color-brand)]">
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[color:var(--color-brand)] surface-2"
      />
    </label>
  );
}
