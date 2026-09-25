"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { WalkPlayer } from "@/components/walk-player";
import type { WalkUnlock } from "@/lib/premium/unlock";
import { ChallengePlayer } from "@/components/challenge-player";

/**
 * Öğren'in yan modları — her biri KENDİ ADRESİNDE.
 *
 * Hepsi oturum oynatıcısının bir DURUMU idi (`status === "walk" | "challenge"`;
 * Günün turu 2026-09-15'te kaldırıldı): `/learn` açılıyor, oyunun başlangıç kartındaki bir döşemeye
 * dokunuluyor ve aynı adreste başka bir mod başlıyordu. Adres değişmediği için
 * paylaşılamıyor, yer imine alınamıyor, tarayıcı geri düğmesiyle çıkılamıyordu
 * — ve moddan çıkmak, oynatıcının o durumu bırakıp yeniden oturum kurması
 * demekti.
 *
 * Mobilde ikisi de kök yığında ayrı ekran (`RootStack`: Walk, Challenge
 * karşılığı). Burada da öyle: çıkış merkeze döner, geri düğmesi çalışır.
 *
 * `router.refresh()` çıkışta bir kez: mod XP/seri kazandırmış olabilir ve
 * merkez o sayıları sunucudan okuyor.
 */
export function ModeScreen({ mode, walk = null }: { mode: "walk" | "challenge"; walk?: WalkUnlock | null }) {
  const router = useRouter();

  /*
    "Oyun ortasındayım" sinyali — rozet kutlaması kabukta duruyor ve tetiği her
    turdan sonra atılan `lernomi:stats`. Sinyal olmasaydı tam ekran bir kutlama
    yürüyüş modunun ortasında belirir, kutlama olmaktan çıkıp kesinti olurdu.
    Oturum oynatıcısı aynı sinyali kendi durumundan atıyor; modlar ayrı adrese
    taşınınca bu iş buraya düştü.
  */
  useEffect(() => {
    const send = (busy: boolean) => {
      window.dispatchEvent(new CustomEvent("lernomi:busy", { detail: { busy } }));
    };
    send(true);
    return () => send(false);
  }, []);

  const onExit = () => {
    router.push("/learn");
    router.refresh();
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {mode === "walk" ? <WalkPlayer onExit={onExit} walk={walk} /> : null}
      {mode === "challenge" ? <ChallengePlayer onExit={onExit} /> : null}
    </div>
  );
}
