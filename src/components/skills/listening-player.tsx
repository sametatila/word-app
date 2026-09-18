"use client";

import { COURSE_KEY, dialogueSegments, prefetchEachSegment, readLocal, speakSegments, stopSpeaking } from "@/components/speak-button";
import { useTargetLang } from "./player-context";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ListeningExercise } from "@/lib/skills/types";
import { PlayerShell, ResultCard, useSkillFinish } from "./player-shell";
import { GlossPanel, QuestionList } from "./quiz";
import { ListenButton, type ListenState } from "@/components/listen-button";
import { useT } from "@/lib/i18n/client";

/**
 * Dinleme egzersizi.
 *
 * SES KULLANICININ SEÇTİĞİ SES. Metin eskiden tarayıcının kendi sentezine
 * (`speechSynthesis`) veriliyordu: Ayarlar'da Katja ya da Conrad seçmiş
 * kullanıcı burada cihazın rastgele Almanca sesini duyuyordu, hız da seviye
 * tablosundan geliyordu. Uygulamanın geri kalanı gibi artık `speakGerman`
 * (nöral ses, profil sesi; yalnız ağ yoksa tarayıcıya düşer) ve dinlemeye
 * ayrılmış hız kademesi (`listen` / `listenSlow`, bkz. `rateFor`).
 *
 * KONUŞMACI BAŞINA AYRI SES. Metin `segments` olarak, konuşmacı etiketiyle
 * geliyor ve etiket ekranda transkriptte gösteriliyordu — ama ses tarafında
 * hiç okunmuyordu: iki kişilik bir konuşma tek ağızdan çalıyordu, yani
 * dinleme alıştırmasının ölçtüğü asıl iş (kimin ne dediğini ayırmak) kulakla
 * yapılamıyordu. Artık `dialogueSegments` kadroyu kuruyor.
 */
export function ListeningPlayer({ exercise, backHref }: { exercise: ListeningExercise; backHref?: string }) {
  const t = useT();
  const lang = useTargetLang();
  const { finish, state, reset } = useSkillFinish(exercise, exercise.questions.length);
  const [correct, setCorrect] = useState(0);
  const [round, setRound] = useState(0);
  /* Nöral ses her tarayıcıda çalıyor, tarayıcı sentezi yalnız yedek; "ses yok"
     durumu artık yalnız ses öğesi de sentez de olmayan ortamda kalıyor. */
  const [available, setAvailable] = useState<boolean | null>(null);
  /** Oynatma koşusunun kimliği — durdurulan koşunun geç gelen bitişi yok sayılır. */
  const runRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  /** Bu koşuda ses gerçekten başladı mı — başlamadıysa düğme "yükleniyor". */
  const [started, setStarted] = useState(false);
  const [segIdx, setSegIdx] = useState(-1);
  const [playCount, setPlayCount] = useState(0);
  const [slow, setSlow] = useState(false);
  const [showText, setShowText] = useState(false);

  // Gerçek kayıt (statik ses dosyası) varsa TTS yerine o çalınır.
  const hasAudio = exercise.segments.some((s) => s.audio);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /*
    Kadro ÇİZİM SIRASINDA değil, çağrıldığı anda kuruluyor: kurs kimliği
    `localStorage`tan geliyor ve sunucuda çizilen ilk turda orası yok.
    Zürih kursundaki kullanıcı lehçe sesini (Leni/Jan) burada da duyuyor;
    İngilizce egzersizde kurs ne olursa olsun İngilizce kadro kullanılıyor.
  */
  const castNow = useCallback(
    (slowNow: boolean) =>
      dialogueSegments(lang === "en" ? "en" : (readLocal(COURSE_KEY) ?? "de"), exercise.segments, slowNow ? "listenSlow" : "listen"),
    [lang, exercise.segments],
  );

  /*
    ÖN İNDİRME — egzersiz açılır açılmaz.

    Bölümler tek tek, biri bitince öteki çalınıyor (transkript satırının
    vurgulanması buna bağlı) ve her sınırda tam bir gidiş-dönüş vardı: ilk
    dinlemede nöral ses bir-iki saniye sürüyor ve bu bekleme HER replikte
    tekrarlanıyordu. Ses önceden indirilince sınır duyulmaz oluyor.
  */
  useEffect(() => {
    /* TEK TEK, birleştirmeden: burada çalma da replik replik
       (`speakSegments([cast[i]])`) ve birleştirilmiş adres hiç istenmiyor. */
    if (!hasAudio) prefetchEachSegment(castNow(false));
  }, [hasAudio, castNow]);

  useEffect(() => {
    const ok = typeof window !== "undefined" && ("Audio" in window || "speechSynthesis" in window);
    setAvailable(ok);
    if (!ok && !hasAudio) setShowText(true); // hiç ses yoksa egzersiz okumaya dönüşür
    // Jeton bir DOM düğümü değil, sayaç: temizlikte güncel değeri artırmak doğru.
    const runs = runRef;
    return () => {
      runs.current++;
      stopSpeaking();
      audioRef.current?.pause();
    };
  }, [hasAudio]);

  function stop() {
    /*
      Uygulamanın DİĞER sesi de susturuluyor.

      Bu oyuncu kendi `Audio` nesnesini kuruyor ve yalnızca kendi sesini
      durduruyordu. Oysa ders anlatımı ve kelime turu paylaşılan iki ses
      öğesini kullanıyor; oradan yarım kalmış bir okuma varsa bu oyuncunun
      sesi onun ÜSTÜNE biniyor ve iki ses aynı anda duyuluyor. Kullanıcının
      "yankılı" dediği şey bu.
    */
    runRef.current++;
    stopSpeaking();
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(false);
    setSegIdx(-1);
  }

  function endOfRun() {
    setPlaying(false);
    setSegIdx(-1);
    setPlayCount((c) => c + 1);
  }

  /** Statik kayıtları sırayla çalar (gerçek lehçe sesi). */
  function playAudioFrom(start: number, slowNow: boolean, single = false) {
    stop();
    setStarted(true); // statik kayıt: indirme beklemesi yok sayılır
    setPlaying(true);
    const next = (i: number) => {
      if (i >= exercise.segments.length || (single && i > start)) {
        if (single) {
          setPlaying(false);
          setSegIdx(-1);
        } else endOfRun();
        return;
      }
      const src = exercise.segments[i].audio;
      if (!src) {
        next(i + 1);
        return;
      }
      setSegIdx(i);
      const a = new Audio(src);
      a.playbackRate = slowNow ? 0.75 : 1;
      audioRef.current = a;
      a.onended = () => next(i + 1);
      a.onerror = () => {
        setPlaying(false);
        setSegIdx(-1);
      };
      void a.play();
    };
    next(start);
  }

  function play(slowNow: boolean = slow) {
    if (hasAudio) {
      playAudioFrom(0, slowNow);
      return;
    }
    stop();
    const run = runRef.current;
    const cast = castNow(slowNow);
    setStarted(false);
    setPlaying(true);
    const next = (i: number) => {
      if (run !== runRef.current) return;
      if (i >= cast.length) {
        endOfRun();
        return;
      }
      setSegIdx(i);
      /* Bölümler AYRI ayrı çalınıyor, hepsi tek zincirde değil: transkriptte
         hangi satırın okunduğunu göstermek için her bölümün bitişi ayrı
         bilinmeli. Sınırdaki bekleme ön indirmeyle kapatılıyor. */
      speakSegments([cast[i]], () => next(i + 1), () => {
        if (run === runRef.current) setStarted(true);
      }, { onCancelled: () => { if (run === runRef.current) stop(); } });
    };
    next(0);
  }

  /** Transkript satırına dokununca yalnızca o bölümü tekrar dinlet. */
  function playSegment(i: number) {
    if (hasAudio && exercise.segments[i].audio) {
      playAudioFrom(i, slow, true);
      return;
    }
    if (available === false) return;
    stop();
    const run = runRef.current;
    setStarted(false);
    setPlaying(true);
    setSegIdx(i);
    speakSegments(
      [castNow(slow)[i]],
      () => {
        if (run !== runRef.current) return;
        setPlaying(false);
        setSegIdx(-1);
      },
      () => {
        if (run === runRef.current) setStarted(true);
      },
      /* Araya başka bir okuma girerse (aynı ekrandaki sözlükçe düğmesi)
         `onEnd` hiç gelmiyor ve düğme "çalıyor" hâlinde takılı kalıyordu. */
      { onCancelled: () => { if (run === runRef.current) stop(); } },
    );
  }

  function toggleSlow() {
    const next = !slow;
    setSlow(next);
    if (playing && hasAudio && audioRef.current) {
      // Kayıt çalarken hız anında değişir, baştan başlamaya gerek yok.
      audioRef.current.playbackRate = next ? 0.75 : 1;
      return;
    }
    // Sentezlenmiş seste hız dosyanın içinde; baştan yeni hızla başlat.
    if (playing) play(next);
  }

  const listenState: ListenState = playing ? (started ? "playing" : "loading") : playCount > 0 ? "done" : "idle";

  return (
    <PlayerShell exercise={exercise} backHref={backHref}>
      <p className="muted px-1 text-body">{exercise.intro}</p>

      <section className="card mt-3 p-5">
        <div className="flex items-center gap-4">
          <ListenButton
            state={listenState}
            onPress={() => (playing ? stop() : play())}
            disabled={available === false && !hasAudio}
            label={t(playing ? "item.stop" : "item.listen")}
          />
          <div className="min-w-0 flex-1">
            <p className="text-strong">
              {playing
                ? t("listenp.playing", { n: segIdx + 1, total: exercise.segments.length })
                : t(playCount > 0 ? "listenp.done" : "listenp.start")}
            </p>
            <p className="muted mt-0.5 text-caption">
              {t(hasAudio ? "listenp.real_audio" : "listenp.replay_note")}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              {exercise.segments.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-colors"
                  style={{
                    background:
                      playing && i <= segIdx ? "var(--color-brand)" : "var(--surface-2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {/* Basılı kalan çipin DURUMU söylenmeli: ekran okuyucu "yavaş"
              düğmesinin açık mı kapalı mı olduğunu ancak böyle bilir. Mobil
              çipi durumu merkezden veriyor (`ui/Chip` accessibilityState). */}
          <button
            type="button"
            onClick={toggleSlow}
            aria-pressed={slow}
            className={`chip px-3 py-1.5 text-caption ${slow ? "chip-active" : ""}`}
          >
            {t("listenp.slow")}
          </button>
          <button
            type="button"
            onClick={() => setShowText((v) => !v)}
            aria-pressed={showText}
            className={`chip px-3 py-1.5 text-caption ${showText ? "chip-active" : ""}`}
          >
            {t(showText ? "item.hide_text" : "item.show_text")}
          </button>
          {!showText ? (
            <span className="muted text-caption">{t("listenp.hint_listen_first")}</span>
          ) : null}
        </div>

        {available === false && !hasAudio ? (
          <p
            className="mt-3 rounded-panel px-3 py-2 text-caption"
            style={{
              background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
              color: "var(--color-flame)",
            }}
          >
            {t("listenp.no_tts")}
          </p>
        ) : null}
      </section>

      {showText ? (
        <section className="card mt-4 select-text p-5">
          {available ? (
            <p className="muted mb-2 text-micro">{t("listenp.tap_line")}</p>
          ) : null}
          <div className="space-y-2.5">
            {exercise.segments.map((seg, i) => (
              <p
                key={i}
                lang={lang}
                onClick={() => playSegment(i)}
                role={available ? "button" : undefined}
                className={`rounded-chip px-2 py-1 text-body leading-relaxed transition-colors ${
                  playing && i === segIdx ? "surface-2" : ""
                } ${available ? "cursor-pointer hover:bg-[color:var(--surface-2)]" : ""}`}
              >
                {seg.speaker ? (
                  <strong className="mr-1.5 text-[color:var(--color-brand)]">
                    {seg.speaker}:
                  </strong>
                ) : null}
                {seg.text}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <GlossPanel gloss={exercise.gloss} />

      <QuestionList
        key={round}
        questions={exercise.questions}
        onAllAnswered={(c) => {
          setCorrect(c);
          stop();
          void finish(c);
        }}
      />

      <ResultCard
        correct={correct}
        total={exercise.questions.length}
        state={state}
        onRetry={() => {
          stop();
          reset();
          setCorrect(0);
          setRound((r) => r + 1);
        }}
      />
    </PlayerShell>
  );
}
