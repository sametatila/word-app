"use client";

import { useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { useRouter } from "next/navigation";
import { clearOnboardingPrefs, hasOnboardingPrefs, readOnboardingPrefs } from "@/lib/onboarding-prefs";

/**
 * Misafirken verilen kararları hesaba TAŞIR.
 *
 * Akış mobildeki gibi: onboarding → ilk kelimeler → hesap. Kurs, seviye, ad ve
 * günlük hedef o sırada sunucuya yazılamıyor (kullanıcı henüz yok) ve cihazda
 * bekliyor. Giriş yapılır yapılmaz buraya düşüyorlar.
 *
 * Mobildeki karşılığı `AuthContext.adoptAccount`.
 *
 * BİR KEZ: `ref` ile korunuyor, çünkü kabuk her gezinmede yeniden çizilebiliyor
 * ve aynı yamayı iki kez göndermek zararsız ama gereksiz. Depolama da hemen
 * temizleniyor — kararlar artık profilde.
 *
 * BAŞARISIZLIKTA SUSUYOR ve kayıtları SİLMİYOR: ağ yoksa bir sonraki açılışta
 * yeniden denenir. Kullanıcıya gösterilecek bir hata yok, çünkü isteyeceği bir
 * eylem de yok — seçtikleri Ayarlar'da zaten değiştirilebilir.
 */
export function OnboardingAdopt() {
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !hasOnboardingPrefs()) return;
    done.current = true;
    const p = readOnboardingPrefs();
    const body: Record<string, unknown> = {};
    if (p.displayName) body.displayName = p.displayName;
    if (p.course) body.course = p.course;
    if (p.voice) body.voice = p.voice;
    if (p.goal) body.goal = p.goal;
    if (p.level) body.level = p.level;
    if (p.dailyGoal) body.dailyGoal = p.dailyGoal;
    if (p.nativeLang) body.nativeLang = p.nativeLang;
    if (Object.keys(body).length === 0) {
      clearOnboardingPrefs();
      return;
    }
    void (async () => {
      try {
        const res = await apiFetch("/api/profile", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) return;
        clearOnboardingPrefs();
        // Sunucu bileşenleri kursu/seviyeyi okumuş durumda; tazelenmezse
        // kullanıcı ilk ekranda eski varsayılanları görürdü.
        router.refresh();
      } catch {
        /* ağ yok — bir sonraki açılışta yeniden denenir */
      }
    })();
  }, [router]);

  return null;
}
