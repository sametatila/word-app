"use client";

import { useCallback, useEffect, useRef } from "react";
import { speakThen } from "@/components/speak-button";
import { roundHoldRemaining } from "@/lib/mascot-hold";

/**
 * Turun kapanışını yöneten yardımcı — ve sökülürken bekleyen her şeyi iptal eder.
 *
 * Oyunlar cevabı aldıktan sonra turu hemen kapatmıyor: önce doğru karşılık
 * okunuyor, sonra (yanlışsa) ekrandaki düzeltmenin okunması için kısa bir pay
 * bekleniyor. Yani her turun sonunda BEKLEYEN iki şey oluyor — süren bir
 * okuma ve bir zamanlayıcı.
 *
 * İkisi de kimsenin sahiplenmediği işlerdi:
 *
 *   - `speakThen` bir iptal işlevi döndürüyor ama hiçbir oyun onu tutmuyordu.
 *     Ses hiç çalmazsa diye kurduğu altı saniyelik emniyet zamanlayıcısı,
 *     bileşen sökülse bile çalışmaya devam ediyordu.
 *   - Payı bekleyen zamanlayıcıyı yalnızca iki oyun temizliyordu, o ikisi de
 *     eksik: sökülme sırasında okuma HÂLÂ sürüyorsa temizlik boşa gidiyor,
 *     çünkü okuma bittiğinde geri çağrı ÇALIŞIP yeni bir zamanlayıcı kuruyor —
 *     bu kez temizleyecek kimse kalmamış oluyor.
 *
 * Burada ikisi tek yerden yönetiliyor: yeni bir kapanış başlarken öncekinin
 * kalıntısı siliniyor, bileşen sökülürken de bekleyen ne varsa iptal ediliyor.
 */
export function useRoundExit() {
  const cancelSpeech = useRef<(() => void) | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const abort = useCallback(() => {
    cancelSpeech.current?.();
    cancelSpeech.current = null;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => abort, [abort]);

  /**
   * Kapanışı, Erdi'nin şeridi getirme koreografisi bitene kadar erteler
   * (bkz. lib/mascot-hold). Koreografi yoksa hemen kapatır.
   */
  const finish = useCallback((done: () => void) => {
    const wait = roundHoldRemaining();
    if (!wait) {
      done();
      return;
    }
    timer.current = setTimeout(done, wait);
  }, []);

  /**
   * Metni okur, okuma bitince turu kapatır.
   *
   * `tail` verilirse kapanış o kadar geciktirilir — yanlış cevapta ekranda
   * beliren düzeltmenin okunması için.
   */
  const speakAndExit = useCallback(
    (
      text: string,
      done: () => void,
      opts: { tail?: number; maxWaitMs?: number; onDuration?: (ms: number) => void } = {},
    ) => {
      abort();
      const { tail = 0, ...speech } = opts;
      cancelSpeech.current = speakThen(
        text,
        () => {
          cancelSpeech.current = null;
          if (!tail) {
            finish(done);
            return;
          }
          timer.current = setTimeout(() => finish(done), tail);
        },
        speech,
      );
    },
    [abort, finish],
  );

  /** Sessiz kapanış — okunacak bir şey olmayan turlar için. */
  const exitAfter = useCallback(
    (ms: number, done: () => void) => {
      abort();
      timer.current = setTimeout(() => finish(done), ms);
    },
    [abort, finish],
  );

  /**
   * Bekleyeni iptal et. Tur değişiminde gerekiyor: bazı oyunlar cevabı bir
   * etkiden veriyor ve bileşen sökülmeden yeni tura geçebiliyor.
   */
  return { speakAndExit, exitAfter, abortExit: abort };
}
