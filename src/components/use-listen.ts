"use client";

import { useCallback, useEffect, useRef } from "react";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { cueListen } from "@/lib/lessons/cues";

/**
 * Bir kez konuşma dinleyip duyduğunu veren kanca.
 *
 * Tanıyıcının kendisi `microphone.ts` içinde ortak ama DİNLEME DÖNGÜSÜ her
 * ekranda yeniden yazılıyordu; asıl zor kısım da o değil, döngünün bitiş
 * koşulları. Üç zamanlayıcı gerekiyor ve üçü de farklı bir soruna karşı:
 *
 *   - **Duraklama.** Tanıyıcı "bitti" demeyi sevmiyor; konuşma bittikten
 *     sonra saniyelerce açık kalabiliyor. Konuşma başladıktan sonra kısa bir
 *     sessizlik turu kapatıyor.
 *   - **Sessizlik.** Kendiliğinden açılan mikrofona kimse konuşmazsa (telefon
 *     cepte, ortam gürültülü) döngü sonsuza kadar bekler. Tavan koyuluyor.
 *   - **Tek teslim.** `onresult`, `onend` ve `onerror` aynı turda arka arkaya
 *     gelebiliyor; sonucun iki kez teslim edilmesi çağıran tarafta iki cevap
 *     demek olurdu.
 *
 * Ekrana bakmayan kullanıcı için mikrofonun açıldığı KULAĞA da söyleniyor
 * (`cueListen`): işaretsiz açılan mikrofon ya boşluğa konuşturuyor ya da
 * sessiz bekletiyor.
 */

export type ListenResult = {
  /** Tanıyıcının adayları, en iyisi başta. Hiç duyulmadıysa boş. */
  alternatives: string[];
  /** Varsa adayların güven değerleri — `judgeSpeech` yalnızca varsa kullanır. */
  confidences: number[];
};

export type ListenOptions = {
  /** Tanıma dili: "de-DE", "de-CH", "tr-TR". */
  lang: string;
  /** Konuşma başladıktan sonra kaç ms sessizlik turu kapatır. */
  pauseMs?: number;
  /** Hiç konuşulmazsa kaç ms sonra vazgeçilir. */
  silenceMs?: number;
};

export function useListen() {
  const rec = useRef<Recognition | null>(null);
  const stopped = useRef(false);

  useEffect(
    () => () => {
      stopped.current = true;
      rec.current?.abort();
    },
    [],
  );

  /** Tanıyıcıyı susturur — okuma başlarken ya da ekrandan çıkarken. */
  const cancel = useCallback(() => {
    rec.current?.abort();
    rec.current = null;
  }, []);

  const listen = useCallback(
    ({ lang, pauseMs = 1400, silenceMs = 9000 }: ListenOptions): Promise<ListenResult> => {
      const Ctor = recognitionCtor();
      if (!Ctor) return Promise.resolve({ alternatives: [], confidences: [] });

      return new Promise<ListenResult>((resolve) => {
        const r = new Ctor();
        rec.current = r;
        r.lang = lang;
        r.interimResults = true;
        r.maxAlternatives = 5;
        r.continuous = false;

        let best: string[] = [];
        let confidences: number[] = [];
        let delivered = false;
        let pause: ReturnType<typeof setTimeout> | null = null;
        let silence: ReturnType<typeof setTimeout> | null = null;

        const clear = () => {
          if (pause) clearTimeout(pause);
          if (silence) clearTimeout(silence);
          pause = null;
          silence = null;
        };

        const deliver = () => {
          if (delivered) return;
          delivered = true;
          clear();
          rec.current = null;
          resolve({ alternatives: best, confidences });
        };

        r.onresult = (e) => {
          const last = e.results[e.results.length - 1];
          const alts: string[] = [];
          const confs: number[] = [];
          for (let i = 0; i < (last?.length ?? 0); i++) {
            const t = last[i]?.transcript?.trim();
            if (t) {
              alts.push(t);
              confs.push(last[i]?.confidence ?? 0);
            }
          }
          if (alts.length) {
            best = alts;
            confidences = confs;
          }
          // Konuşma başladı: sessizlik tavanı kalkıyor, duraklama payı kuruluyor.
          if (silence) clearTimeout(silence);
          silence = null;
          if (pause) clearTimeout(pause);
          pause = setTimeout(() => r.stop(), pauseMs);
        };
        r.onerror = deliver;
        r.onend = deliver;

        try {
          r.start();
          cueListen();
          silence = setTimeout(() => {
            r.stop();
            deliver();
          }, silenceMs);
        } catch {
          deliver();
        }
      });
    },
    [],
  );

  return { listen, cancel, requestMicrophone, stopped };
}
