"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mascot } from "@/components/mascot";
import { CheckIcon, SpeakerIcon } from "@/components/icons";
import { speakGerman } from "@/components/speak-button";
import { track } from "@/lib/track";
import { firstWordsFor, type FirstWord } from "@/lib/first-words";
import { readOnboardingPrefs } from "@/lib/onboarding-prefs";
import { useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";

/**
 * Hesap açmadan önce kısa bir ISINMA — beş kelime, sesli, örnekli.
 *
 * Mobilde bu ekran (`FirstPracticeScreen`) onboarding ile giriş duvarının
 * ARASINDA duruyor ve bir ürün kararı: kullanıcı değer görmeden hesap açmıyor.
 * Web'de karşılığı yoktu, açılış sayfasının bütün çağrıları doğrudan giriş
 * duvarına gidiyordu.
 *
 * Sunucu YOK: kelimeler statik (`lib/first-words`), ilerleme kaydedilmiyor,
 * anonim oturum gerekmiyor. Isınmanın işi öğretmek değil, ne olduğunu
 * göstermek.
 *
 * Akış kelime başına iki dokunuş: önce "anlamını gör" (kullanıcı tahmin etsin
 * diye anlam gizli), sonra "sonraki kelime". Sonuncuda düğme hesap açmaya
 * götürüyor.
 */
const withArtikel = (w: FirstWord) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

export function FirstPractice() {
  const course = useCourse();
  const t = useT();
  const router = useRouter();
  const [words, setWords] = useState<FirstWord[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState(false);

  // Kurs ve seviye onboarding'de seçildi ve cihazda duruyor; sunucuda henüz
  // kullanıcı yok. İlk render'da depolama okunamadığı için kelimeler efektte.
  useEffect(() => {
    const p = readOnboardingPrefs();
    setWords(firstWordsFor("tr", p.course ?? "de", p.level ?? "A1"));
  }, []);

  const w = words?.[idx];

  // Kelime başına bir kez seslendir. `words` ve `idx` dışındaki bağımlılıklar
  // aynı kelimeyi tekrar okuturdu.
  useEffect(() => {
    if (!w) return;
    track("first_practice", idx);
    speakGerman(withArtikel(w));
    setSeen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, words]);

  /*
    Isınma seti olmayan paritede ekran hiç durmuyor: boş bir kart göstermek
    yerine doğrudan giriş duvarına. Onboarding bu yolu zaten seçtirmiyor; bu,
    adresin doğrudan açılmasına karşı savunma.
  */
  useEffect(() => {
    if (words && words.length === 0) router.replace("/login?mode=signup");
  }, [words, router]);

  if (!words || !w) return null;

  const last = idx + 1 >= words.length;
  /* ÜÇ ANAHTAR HİÇBİR SÖZLÜKTE YOKTU (`fp.*`) ve `translate` bulamadığı
     anahtarı OLDUĞU GİBİ döndürüyor: düğmede sırayla "fp.see_meaning",
     "fp.next_word", "fp.create_account" yazıyordu - hem de kayıt yolunun
     ortasında. Karşılıkları mobil sözlükte hazırdı (`firstpractice.*`).
     Kapı görmedi çünkü `i18n-check`in tarayıcısı üçnokta içindeki anahtarı
     tanımıyordu; o boşluk da bu commit'te kapandı. */
  const label = t(!seen ? "firstpractice.see_meaning" : last ? "firstpractice.create_account" : "firstpractice.next_word");

  function primary() {
    if (!seen) {
      setSeen(true);
      return;
    }
    if (last) {
      track("first_practice_done", words!.length);
      router.push("/login?mode=signup");
      return;
    }
    setIdx((n) => n + 1);
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{
              width: `${((idx + (seen ? 1 : 0)) / words.length) * 100}%`,
              background: "var(--color-brand-500)",
            }}
          />
        </div>
        <span className="muted text-caption tabular-nums">
          {idx + 1}/{words.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="text-caption uppercase tracking-widest" style={{ color: "var(--color-brand)" }}>
          {t("firstpractice.first_words")}
        </p>
        <p className="text-display">{withArtikel(w)}</p>

        <button
          type="button"
          onClick={() => speakGerman(withArtikel(w))}
          aria-label={t("firstpractice.listen_word", { word: w.de })}
          className="pressable flex items-center gap-2 rounded-full px-4 py-2 text-strong"
          style={{
            background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
            color: "var(--color-brand)",
          }}
        >
          <SpeakerIcon size={18} /> {t("firstpractice.listen")}
        </button>

        {seen ? (
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-h2">{w.tr}</p>
            <div className="card mt-1 px-4 py-3">
              <p className="text-strong" lang={course}>
                {w.ex}
              </p>
              <p className="muted mt-0.5 text-caption">{w.exTr}</p>
            </div>
          </div>
        ) : (
          <Mascot mood="idle" size={96} />
        )}
      </div>

      <button type="button" onClick={primary} className="btn btn-primary w-full py-4">
        {seen && last ? <CheckIcon size={20} /> : null}
        {label}
      </button>
      <p className="muted mt-3 text-center text-caption">{t("firstpractice.save_note")}</p>
    </main>
  );
}
