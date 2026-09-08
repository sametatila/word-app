"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DailyPlayer } from "@/components/daily-player";
import { WalkPlayer } from "@/components/walk-player";
import { ChallengePlayer } from "@/components/challenge-player";

/**
 * Öğren'in yan modları — her biri KENDİ ADRESİNDE.
 *
 * Üçü de oturum oynatıcısının bir DURUMU idi (`status === "daily" | "walk" |
 * "challenge"`): `/learn` açılıyor, oyunun başlangıç kartındaki bir döşemeye
 * dokunuluyor ve aynı adreste başka bir mod başlıyordu. Adres değişmediği için
 * paylaşılamıyor, yer imine alınamıyor, tarayıcı geri düğmesiyle çıkılamıyordu
 * — ve moddan çıkmak, oynatıcının o durumu bırakıp yeniden oturum kurması
 * demekti.
 *
 * Mobilde üçü de kök yığında ayrı ekran (`RootStack`: Daily, Walk, Challenge
 * karşılığı). Burada da öyle: çıkış merkeze döner, geri düğmesi çalışır.
 *
 * `router.refresh()` çıkışta bir kez: mod XP/seri kazandırmış olabilir ve
 * merkez o sayıları sunucudan okuyor.
 */
export function ModeScreen({ mode }: { mode: "daily" | "walk" | "challenge" }) {
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
      {mode === "daily" ? <DailyPlayer onExit={onExit} /> : null}
      {mode === "walk" ? <WalkPlayer onExit={onExit} /> : null}
      {mode === "challenge" ? <ChallengePlayer onExit={onExit} /> : null}
    </div>
  );
}
