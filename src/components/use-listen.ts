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
  /** Konuşma başladıktan sonra en fazla ne kadar dinlenir. */
  maxMs?: number;
  /**
   * Ara sonuç yeterliyse turu HEMEN kapatır.
   *
   * Tanıyıcı bir cevabı çoktan anlamışken duraklama payının dolmasını
   * beklemek, kullanıcının cepteki telefonda hissettiği tek şey: beklemek.
   * Beklenen cevap belliyken (kelime turu, evet/hayır onayı) o payın hiçbir
   * karşılığı yok — ara sonuç zaten tutuyorsa tur biter.
   *
   * Yalnızca KAPATMAK için kullanılıyor, kabul kararı için değil: son sözü
   * yine çağıran taraf söylüyor.
   */
  accept?: (alternatives: string[]) => boolean;
  /**
   * Mikrofon açıldığı anda çalışır — varsayılan işitsel işaret.
   *
   * Çağıran taraf kendi işaretini verebilsin diye açıldı: dersin WebAudio
   * işareti ekran kapalıyken susuyor ve cepteki kullanıcı mikrofonun
   * açıldığını yalnızca kulağıyla anlayabiliyor.
   */
  onOpen?: () => void;
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
    ({
      lang,
      pauseMs = 900,
      silenceMs = 9000,
      maxMs = 6000,
      accept,
      onOpen = cueListen,
    }: ListenOptions): Promise<ListenResult> => {
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
        let cap: ReturnType<typeof setTimeout> | null = null;

        const clear = () => {
          if (pause) clearTimeout(pause);
          if (silence) clearTimeout(silence);
          if (cap) clearTimeout(cap);
          pause = null;
          silence = null;
          cap = null;
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
          // Beklenen cevap zaten duyulduysa beklemenin karşılığı yok.
          if (best.length && accept?.(best)) {
            try {
              r.stop();
            } catch {
              /* zaten kapanmışsa önemsiz */
            }
            deliver();
            return;
          }
          // Konuşma başladı: sessizlik tavanı kalkıyor, duraklama payı kuruluyor.
          if (silence) clearTimeout(silence);
          silence = null;
          if (pause) clearTimeout(pause);
          pause = setTimeout(() => r.stop(), pauseMs);

          /*
            Konuşma başladıktan sonra da bir ÜST SINIR gerekiyor.

            Duraklama payı her ara sonuçta sıfırlanıyor; gürültülü bir ortamda
            tanıyıcı ara sonuç üretmeyi sürdürdüğü sürece sayaç hiç dolmuyor ve
            tur kapanmıyordu. Kullanıcının gördüğü "bekliyor da bekliyor" buydu.
            Tavan yalnızca bir kez kuruluyor: her sonuçta yenilenseydi aynı
            sonsuz döngü olurdu.
          */
          if (!cap) cap = setTimeout(() => r.stop(), maxMs);
        };
        r.onerror = deliver;
        r.onend = deliver;

        try {
          r.start();
          onOpen();
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
