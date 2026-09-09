"use client";

/**
 * Oyun sesleri.
 *
 * Uygulamada on kelime oyunu, süre baskılı bir hayatta kalma turu ve günün
 * turu vardı — hepsi sessizdi. Geri bildirim yalnızca titreşim ve ekrandaki
 * geçiş çizgisiydi; titreşim ise masaüstünde hiç yok, telefonda da sistem
 * ayarıyla kapatılabiliyor. Yani bir cevabın doğru olduğu bazı cihazlarda
 * SADECE renkle anlaşılıyordu.
 *
 * Sesin buradaki işi süslemek değil, üç şeyi söylemek:
 *
 *   1. **"Cevabın alındı."** Dokunuşla ses arasındaki gecikme sıfıra yakın
 *      olmalı — bu yüzden ses dosyası yok, tonlar WebAudio ile yerinde
 *      üretiliyor. İndirilecek bir şey olmadığı için ilk cevap da anında
 *      seslidir; ağ yavaşsa bile.
 *   2. **"Üst üste doğru gidiyorsun."** Doğru sesi sabit değil: her ardışık
 *      doğruda bir basamak yükseliyor. Yükselen perde, ekrana bakmadan bile
 *      serinin sürdüğünü anlatan tek işaret; oyunlarda "combo" hissini
 *      kuran şey de tam olarak budur.
 *   3. **"Bir şey kazandın."** Etap, rekor ve rozet açılışı ayrı ezgiler
 *      taşıyor; hepsi aynı sesi çalarsa hiçbiri olay olmaz.
 *
 * Perde ladderi bilerek **pentatonik**: hangi basamaktan hangisine atlanırsa
 * atlansın uyumsuz aralık çıkmaz. Kromatik bir dizi kullanılsaydı 7. doğruda
 * kulağı tırmalayan bir aralık duyulur, "kombo yükseliyor" hissi bozulurdu.
 *
 * Ses varsayılan olarak AÇIK ama tek anahtarla kapanıyor ve tercih cihazda
 * kalıyor (tema gibi). Kapalıyken ana kazanç düğümü sıfırlanıyor — her nota
 * yine planlanıyor ama duyulmuyor; böylece açma/kapama anında etki ediyor.
 */

import { sharedAudioContext } from "@/lib/audio-context";

const STORAGE_KEY = "lernomi-sound";

/**
 * Ana ses seviyesi.
 *
 * Konuşma sentezi (kelimenin Almanca okunuşu) çoğu zaman bu tonlarla aynı
 * anda çalıyor. Efekt konuşmanın önüne geçerse telaffuz duyulmaz — bu yüzden
 * tavan bilerek alçak.
 */
const MASTER = 0.55;

/** Ardışık doğrularda tırmanılan pentatonik basamaklar (C majör pentatonik). */
const LADDER = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];

/**
 * Kombo bu süre kadar sessiz kalırsa sıfırlanır.
 *
 * Sayaç oyunların değil sesin kendi belleğinde: on oyunun her birine "kaçıncı
 * doğrudasın" parametresi eklemek, aynı bilgiyi on bir yerde taşımak olurdu.
 * Oturumu kapatıp yarım saat sonra dönen kullanıcının ilk doğrusu ise
 * merdivenin tepesinden başlamamalı — zaman aşımı bunu çözüyor.
 */
const COMBO_IDLE_MS = 25_000;

/** Aynı olayın iki kez seslenmesini engelleyen pencere. */
const DEDUPE_MS = 240;

export type Cue =
  | "micon"
  | "micoff"
  | "premium"
  | "correct"
  | "wrong"
  | "tap"
  | "start"
  | "stage"
  | "perfect"
  | "record"
  | "unlock"
  | "finish"
  | "danger";

let enabled: boolean | null = null;
let master: GainNode | null = null;
let masterCtx: AudioContext | null = null;

let combo = 0;
let lastCorrectAt = 0;
let lastCue: Cue | "" = "";
let lastCueAt = 0;

export function soundEnabled(): boolean {
  if (enabled !== null) return enabled;
  try {
    enabled = localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    enabled = true;
  }
  return enabled;
}

export function setSoundEnabled(next: boolean) {
  enabled = next;
  try {
    if (next) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, "off");
  } catch {
    /* depolama kapalıysa tercih yalnızca bu oturum boyunca geçerli olur */
  }
  if (master) master.gain.value = next ? MASTER : 0;
  // Açılışta tek bir önizleme notası: anahtarın ne yaptığı duyulmadan anlaşılmaz.
  if (next) play("tap");
}

/**
 * Ana kazanç düğümü.
 *
 * Bağlam askıdaysa (kullanıcı henüz hiçbir şeye dokunmadıysa) hiçbir şey
 * planlanmıyor: askıdaki bağlama iş vermek, ses hiç açılmazsa birikip
 * açıldığı anda hepsini birden çalar.
 */
function bus(): { c: AudioContext; out: GainNode } | null {
  const c = sharedAudioContext();
  if (!c || c.state !== "running") return null;
  if (!master || masterCtx !== c) {
    master = c.createGain();
    master.gain.value = soundEnabled() ? MASTER : 0;
    master.connect(c.destination);
    masterCtx = c;
  }
  return { c, out: master };
}

/**
 * Tek nota.
 *
 * @param at    bağlam zamanına göre gecikme (sn)
 * @param freq  perde (Hz)
 * @param dur   sönüm süresi (sn)
 * @param peak  tepe kazanç
 * @param wave  dalga biçimi
 * @param to    verilirse perde `dur` boyunca buraya kayar (kaygan iniş/çıkış)
 */
function note(
  at: number,
  freq: number,
  dur: number,
  peak: number,
  wave: OscillatorType = "sine",
  to?: number,
) {
  const b = bus();
  if (!b) return;
  const { c, out } = b;
  const t = c.currentTime + at;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = wave;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t + dur);

  // Sıfırdan başlayan kısa bir yükseliş: doğrudan tepe değerle başlamak
  // hoparlörde "tık" sesi üretir.
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

  osc.connect(gain).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

/** Kombo merdivenini başa sarar — yeni tur başlarken çağrılır. */
export function resetCombo() {
  combo = 0;
  lastCorrectAt = 0;
}

/** Şu anki kombo basamağı (0 tabanlı) — arayüz aynı eşiği kullanmak isterse. */
export function comboStep(): number {
  return combo;
}

/**
 * YÜRÜYÜŞ MODUNUN SESLERİ — mobil ile BİREBİR aynı.
 *
 * Bu üçü buradaki öteki seslerden ayrı duruyor ve bilerek: gövdesi
 * `mobile/src/lib/sfxNotes.ts`teki nota tablosundan KOPYALANDI, sentez modeli de
 * mobilin WebView köprüsünde çalan modelin aynısı. Sebep bütünlük — yürüyüş modu
 * iki platformda aynı ürün ve kullanıcı ekrana bakmadan yalnız sesi duyuyor;
 * "mikrofon açıldı" işareti iki cihazda farklı çalarsa mod öğrenilmiyor.
 *
 * Web'in kendi sesleri (correct/wrong/start/…) başka bir tasarım: pentatonik
 * kombo merdiveni, oyunlar için. Onlara DOKUNULMADI — uygulamanın her yerinde
 * çalıyorlar ve burada değiştirmek yürüyüş modunun dışına taşardı.
 *
 * Nota: [freq, start, dur, peak, wave, glide, lp, attack, hold, release]
 *   wave 0 sine · 1 triangle · 2 square — glide: hedef Hz (0 yok)
 *   lp: alçak geçiren kesim Hz (0 yok, Q 0.7) — hold 0: pluck · 1: tut, son `release`te in
 */
export type WalkCue = "micon" | "micoff" | "premium";
export const WALK_NOTES: Record<WalkCue, number[][]> = {
  micon: [
    [523.25, 0.0, 0.17, 0.05, 2, 0, 2400, 0.004, 0, 0],
    [523.25, 0.0, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [783.99, 0.06, 0.17, 0.05, 2, 0, 2400, 0.004, 0, 0],
    [783.99, 0.06, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
  ],
  micoff: [
    [783.99, 0.0, 0.17, 0.05, 2, 0, 1800, 0.004, 0, 0],
    [783.99, 0.0, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
    [523.25, 0.06, 0.17, 0.05, 2, 0, 1800, 0.004, 0, 0],
    [523.25, 0.06, 0.2, 0.16, 0, 0, 0, 0.004, 0, 0],
  ],
  premium: [
    [261.63, 0.0, 1.05, 0.1, 1, 0, 1100, 0.09, 1, 0.55],
    [392.0, 0.0, 1.05, 0.08, 1, 0, 1100, 0.09, 1, 0.55],
    [523.25, 0.1, 0.34, 0.13, 0, 0, 0, 0.03, 0, 0],
    [783.99, 0.24, 0.34, 0.12, 0, 0, 0, 0.03, 0, 0],
    [1046.5, 0.38, 0.46, 0.12, 0, 0, 0, 0.035, 0, 0],
    [1046.5, 0.38, 0.3, 0.025, 2, 0, 1200, 0.02, 0, 0],
  ],
};

/** Nota tablosunu çalar — mobilin köprüye enjekte ettiği sentezin birebiri. */
function playNotes(notes: number[][]) {
  const b = bus();
  if (!b) return;
  const t0 = b.c.currentTime + 0.01;
  for (const n of notes) {
    const [f, st, dur, peak, wave, glide, lp, atk, hold, rel] = n;
    const t = t0 + st;
    const o = b.c.createOscillator();
    const g = b.c.createGain();
    o.type = wave === 2 ? "square" : wave === 1 ? "triangle" : "sine";
    o.frequency.setValueAtTime(f, t);
    if (glide > 0) o.frequency.exponentialRampToValueAtTime(Math.max(20, glide), t + dur);
    let src: AudioNode = o;
    if (lp > 0) {
      const q = b.c.createBiquadFilter();
      q.type = "lowpass";
      q.Q.value = 0.7;
      q.frequency.setValueAtTime(lp, t);
      o.connect(q);
      src = q;
    }
    const a = atk || 0.004;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    if (hold >= 0.5) {
      g.gain.setValueAtTime(peak, t + dur - rel);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    } else {
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    }
    src.connect(g).connect(b.out);
    o.start(t);
    o.stop(t + dur + 0.03);
  }
}

/** Bir yürüyüş sesinin süresi (ms) — jingle'dan sonra konuşmayı başlatan yer kullanıyor. */
export function walkCueMs(cue: WalkCue): number {
  return Math.round(Math.max(...WALK_NOTES[cue].map((n) => n[1] + n[2])) * 1000) + 20;
}

function correctCue() {
  const now = Date.now();
  if (now - lastCorrectAt > COMBO_IDLE_MS) combo = 0;
  lastCorrectAt = now;

  const root = LADDER[Math.min(combo, LADDER.length - 1)];
  combo++;

  // İki nota: kök ve beşlisi. Tek nota "tık" gibi duyuluyor, aralık ise
  // küçük bir "tamam" cümlesi kuruyor.
  note(0, root, 0.1, 0.2);
  note(0.05, root * 1.5, 0.17, 0.15);
  // Komboda yükseldikçe üstte ince bir parıltı beliriyor: aynı ezgi ama
  // gitgide daha "kazanılmış" duyuluyor.
  if (combo >= 4) note(0.05, root * 3, 0.12, 0.05, "triangle");
}

function wrongCue() {
  combo = 0;
  // Aşağı kayan kısa bir nota. Sert değil: yanlış cevap zaten kaybettirici,
  // ses ayrıca cezalandırmamalı — yalnızca "bu değildi" demeli.
  note(0, 233.08, 0.18, 0.16, "triangle", 174.61);
  note(0.03, 116.54, 0.22, 0.08);
}

/** Bir dizi notayı sırayla çalar. */
function arpeggio(freqs: number[], step: number, dur: number, peak: number, wave: OscillatorType = "sine") {
  freqs.forEach((f, i) => note(i * step, f, dur, peak, wave));
}

export function play(cue: Cue) {
  if (typeof window === "undefined") return;
  if (!soundEnabled()) {
    // Kapalıyken bile kombo sayacı akmalı: ses açıldığında merdiven
    // kullanıcının gerçekte kaçıncı doğruda olduğunu göstersin.
    if (cue === "correct") combo++;
    if (cue === "wrong") combo = 0;
    return;
  }

  const now = Date.now();
  if (cue === lastCue && now - lastCueAt < DEDUPE_MS) return;
  lastCue = cue;
  lastCueAt = now;

  switch (cue) {
    // Yürüyüş modunun üç sesi — mobille birebir aynı tablo (bkz. WALK_NOTES).
    case "micon":
    case "micoff":
    case "premium":
      return playNotes(WALK_NOTES[cue]);
    case "correct":
      return correctCue();
    case "wrong":
      return wrongCue();
    case "tap":
      return note(0, 1174.66, 0.035, 0.07);
    case "start":
      // Turun açılışı: alçaktan yükseğe iki nota — "başlıyoruz".
      return arpeggio([392.0, 587.33], 0.08, 0.14, 0.13);
    case "stage":
      // Etap bitti: küçük bir majör üçlü.
      return arpeggio([523.25, 659.25, 783.99], 0.075, 0.18, 0.15);
    case "perfect":
      // Etabın tamamı doğru: aynı üçlü ama oktavla taçlanıyor.
      arpeggio([523.25, 659.25, 783.99, 1046.5], 0.07, 0.2, 0.16);
      return note(0.28, 1567.98, 0.35, 0.09, "triangle");
    case "record":
      // Rekor: yükselen dörtlü + altında tutulan bir beşli.
      arpeggio([523.25, 698.46, 880.0, 1174.66], 0.085, 0.24, 0.17);
      return note(0, 261.63, 0.65, 0.07);
    case "unlock":
      // Rozet açıldı: parıltı. Yukarıdan aşağı değil, aşağıdan yukarı —
      // açılan şey bir kapı, kapanan bir şey değil.
      arpeggio([880.0, 1174.66, 1318.51], 0.06, 0.22, 0.13, "triangle");
      return note(0.18, 1760.0, 0.5, 0.06);
    case "finish":
      // Oturum özeti: yumuşak, kapanışlı bir kadans.
      arpeggio([659.25, 523.25, 392.0], 0.11, 0.3, 0.14);
      return note(0.22, 261.63, 0.6, 0.08);
    case "danger":
      // Hayatta kalma turunda süre azalırken: alçak, kısa uyarı tıkı.
      return note(0, 349.23, 0.07, 0.12, "square");
  }
}
