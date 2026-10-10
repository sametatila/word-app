"use client";

import { glossFor, spokenGloss, type GlossWord } from "@/lib/option-label";
import { glossVoice } from "@/lib/tts/voices";
import { apiFetch } from "@/lib/api-fetch";
import { newBatchId } from "@/lib/answer-queue";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { WalkUnlock } from "@/lib/premium/unlock";
import { miss } from "@/lib/errors";
import { motion } from "framer-motion";
import { COURSE_KEY, readLocal, selectedVoice, speakSegments, stopSpeaking, type SpeechSegment } from "@/components/speak-button";
import { useT, useLang } from "@/lib/i18n/client";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { ReportLink, snapshot } from "@/components/report-flag";
import { ReportDialog } from "@/components/report-dialog";
import { targetRef, type ReportTarget } from "@/lib/report";
import { RoundExit } from "@/components/round-exit";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { formatPercent, nativeLangName, type NativeLang } from "@/lib/i18n/dict";
import { courseName, speechLocaleOf } from "@/lib/courses";
import { useListen } from "@/components/use-listen";
import { recognitionCtor, requestMicrophone } from "@/components/microphone";
import { spokenMatches } from "@/components/games/types";
import { parseConfirm, parseSkip, skipWord } from "@/lib/voice-intent";
import { useWakeLock } from "@/components/use-wake-lock";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StatRow, CoverBody, StateBody } from "@/components/flow";
import { resultText, shareText } from "@/lib/share";
import { ShareIcon } from "@/components/icons";
import { sharedAudioContext } from "@/lib/audio-context";
import { pocketWalkCue } from "@/components/pocket-audio";
import { afterMs, withDeadline } from "@/components/pocket-clock";
import { play, resetCombo, type WalkCue } from "@/lib/sfx";
import { track } from "@/lib/track";
import { CorrectIcon, InboxIcon, NewWordsIcon, ResumeIcon, SkillSpeakingIcon, SpeakerIcon, WalkIcon, WrongIcon } from "@/components/icons";
import type { Answer, Round, RoundWord, SessionPayload, SessionProgress } from "@/lib/types";
import { localDay } from "@/lib/day";
import { vibrate } from "@/lib/fx";

/**
 * Yürürken modu — ekransız kelime turu.
 *
 * Uygulamanın tamamı bir ekrana bakmayı gerektiriyordu. Oysa eller serbest
 * konuşma döngüsü konuşmalarda zaten çalışıyordu: cevap sesli okunuyor, okuma
 * biter bitmez mikrofon kendiliğinden açılıyor, söylenen doğrudan gidiyor.
 * Aynı döngü kelime turuna taşındığında ortaya bambaşka bir kullanım anı
 * çıkıyor — yürürken, bulaşık yıkarken, otobüste.
 *
 * Yön bilerek ÜRETİM: Türkçe duyuluyor, Almanca söyleniyor. Ekranda şık
 * işaretlemek tanımadır; ağızdan çıkarmak ise dilin asıl kullanıldığı iş ve
 * ekrana bakmadan yapılabilecek tek alıştırma türü.
 *
 * Tur, ekrandaki turun TA KENDİSİ: aynı `/api/session` kuyruğu okunuyor ve
 * cevaplar aynı uca gidiyor. Yani ekranda başlayıp kulakla devam etmek (ya da
 * tersi) mümkün; SRS, günlük hedef, seri ve rozetler hiçbir şeyin farkında
 * olmuyor. Ayrı bir "sesli mod ilerlemesi" kurmak, aynı emeği ikinci bir
 * yerde saymak olurdu.
 *
 * Cevaplar `speak` adıyla kaydediliyor. Yazma oyununun hanesine yazmak
 * kolaydı ama profil ekranındaki oyun başarısı tablosunu bozardı: ikisi
 * farklı beceri.
 *
 * Telefon cepteyken üç şey ayrıca çözülmek zorunda kaldı:
 *
 *   - **Ekran kapanınca tanıyıcı susuyor.** Tarayıcıda arka planda konuşma
 *     tanıma yok; kilitli telefonda dinleyen bir sekme, mikrofonu görünmez
 *     biçimde açık tutmak olurdu. Tek dürüst çözüm ekranın kapanmasını
 *     engellemek (`useWakeLock`).
 *   - **Sayfa görünmez olursa tur yanmamalı.** Başka bir uygulamaya geçilince
 *     tanıyıcı anında boş dönüyordu ve yirmi tur saniyeler içinde "duyamadım"
 *     diye tükeniyordu. Görünürlük gidince tur DURUYOR.
 *   - **Tur bitince telefonu çıkarmak gerekmemeli.** Oturum sonunda soru sesli
 *     soruluyor ve cevap sesli alınıyor: "devam edelim mi?" → "evet".
 *
 * Ekran KAPANDIĞINDA ne olacağı ayrı bir sorun. Ekran kilidi yalnızca boşta
 * kalmayı engelliyor; kullanıcı güç tuşuna basıp telefonu cebine attığında
 * ekran yine kapanıyor ve konuşma tanıyıcı susuyor. Bu bir eksik değil,
 * Chromium'un Android'e özel kararı: sayfa gizlenince tanıma iptal ediliyor
 * (Blink `SpeechRecognition::PageVisibilityChanged`), kendi ses kanalını
 * verme (`start(track)`) ve cihaz-üstü API de Android Chrome'da yok.
 *
 * Bu yüzden ekran HİÇ kapanmıyor, iki kipin ikisinde de:
 *
 *   - **Ekranda** — konuşmayla birebir aynı: tarayıcının kendi tanıyıcısı, başka
 *     hiçbir şey. Mikrofon akışı tutulmuyor, okuma oyunlardaki boşluksuz
 *     yoldan. Sebebi ölçüldü: mikrofon akışı oturum başında alınıp (parçaları
 *     kapalı) tutulduğunda, sahibin telefonunda altı dinlemenin altısı
 *     `browser:end` ile bitti — tanıyıcı açılıyor, hata vermeden ve hiçbir şey
 *     duymadan kapanıyor. Android eşzamanlı kayıtta sesi üstteki uygulamanın
 *     kendi akışına veriyor, tanıyıcı servisi sessizlik alıyor; aynı akış
 *     Bluetooth'ta çıkışı telefon yoluna (SCO) düşürüp okumayı da bozuyordu.
 *     Boş dinleme "duyamadım"dır, kip değişmez.
 *   - **Cepte** — "Cebe koy" ekranı KARARTIYOR ama kapatmıyor (`darken`):
 *     siyah katman + tam ekran + ekran kilidi. Ekran teknik olarak açık
 *     kaldığı için tanıyıcı cepte de aynen çalışıyor.
 *
 * Ekran yine de kapanırsa (güç tuşu) tur DURUR ve sebebi sesle söylenir:
 * mikrofon kilitli ekranda istenemiyor, o an yapılacak dürüst şey yok.
 *
 * Eskiden ekran GERÇEKTEN kapalıyken de çalışan bir cep yolu vardı (mikrofon
 * + sürekli kayıt + sessiz döngü, cevaplar sunucuda yazıya). Cihaz testi
 * (HyperOS, 2026-08-28) ekran kapanınca sistemin mikrofonu susturduğunu
 * gösterdi; yol kaldırıldı (2026-09-17). Tanıyıcısı OLMAYAN tarayıcılar için
 * kalan kayıt + sunucu parçası da kalktı (2026-09-27): ekran açıkken ses
 * sunucuya gönderilmiyor. Tanıyıcı yoksa tur başlamıyor ("unsupported"),
 * oturum içinde ölürse tur duruyor ve sebebi sesle söyleniyor.
 *
 * Her dinleme ve her geçiş kayda geçiyor (`walk_listen`, `walk_switch`):
 * "Web Speech gerçekten devrede mi" sorusu veriyle cevaplansın.
 */

type Status =
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "done"
  | "empty"
  | "error"
  | "unsupported"
  | "denied"
  /* Bugünkü ücretsiz turlar bitti (403 premium_required) — 2026-09-25. */
  | "locked"
  /* Premium'un günlük kötüye kullanım tavanı doldu (429). */
  | "fair_use";

/** Ekranda ne olduğunu söyleyen tek satır — bakan biri için. */
type Phase = "speaking" | "listening" | "judging";

/**
 * "Bilmiyorum" cevabına kısa motive — yanlış saymadan, uzun konuşmadan.
 *
 * Öğrenci cevabı bilmiyorsa "bilmiyorum/pas/fikrim yok" diyor; buna 15-20
 * ifadeyle değil, ceza da vermeden, kısa bir cesaretle karşılık veriyoruz ve
 * doğrusunu okuyoruz. Rastgele biri seçiliyor ki hep aynı cümle olmasın.
 */
type T = (key: string, vars?: Record<string, string | number>) => string;

function encourage(t: T): string {
  // Mobil seçenekleri TEK anahtarda boru işaretiyle taşıyor (`walk.encourage`);
  // web aynı sözlüğü okuduğu için aynı biçimi ayrıştırıyor.
  const list = t("walk.encourage").split("|").filter(Boolean);
  return list[Math.floor(Math.random() * list.length)] ?? "";
}

/**
 * Anlamın SESLİ hâli — metin ve ses BİRLİKTE seçiliyor.
 *
 * Karşılık hangi dildeyse ses de o dilde: Türkçe bir metni Almanca anlatım
 * sesiyle okutmak, kulakta anlamsız bir şey üretir.
 *
 * Metin `glossFor`dan geliyor, yani tur havuzuyla AYNI kuraldan: anadilde
 * karşılığı olmayan kelime zaten tura girmiyor (sunucu süzüyor), dolayısıyla
 * buraya karşılıksız bir kelime gelmemeli. Geldiğinde Türkçeye düşmek yerine
 * boş segment dönüyor — yanlış dilde okumaktansa okumamak.
 */
function glossSegment(word: GlossWord, lang: NativeLang): SpeechSegment {
  // Okunan metin `spokenGloss`: ekranla aynı karşılık, ayırt edici parantez virgülle ("o, erkek").
  const text = spokenGloss(word, lang);
  if (!text) return { lang: "tr", text: "", narration: false };
  /* Karşılık KELİME KATMANI: anlatım sesiyle (Emel) değil, seçilen karakterin anadil sesiyle ve yalnız
     önceden üretilmiş dosyadan (`word`). Anlatım bayrağı kalıyor ama ses açıkça verildiği için belirleyici
     değil; `word` parçası öncesindeki anlatımla BİRLEŞMİYOR (birleşen metin tabloda olmazdı). */
  return { lang, text, narration: true, voice: glossVoice(lang, selectedVoice()), word: true };
}

/**
 * Hedef kelimenin parçası — kullanıcının SEÇTİĞİ ses, kelime katmanı.
 *
 * Burada `{ lang: "de", text }` yazılıydı ve ses parçanın dilinden türüyordu: sabit konuşma sesi (Katja),
 * İngilizce kursta da Almanca ses. Seçim ekranında Aras'ı seçen kullanıcı yürüyüşte Katja duyuyordu.
 */
function targetSegment(text: string): SpeechSegment {
  const voice = selectedVoice();
  return { lang: voice.startsWith("en") ? "en" : "de", text, voice, word: true };
}

/**
 * Duyulmayan cevabın karşılığı.
 *
 * Sessizlik YANLIŞ sayılmıyor. Sokakta, otobüste ya da cepteki telefonda
 * mikrofonun bir turu kaçırması olağan; onu hata yazmak tekrar planını
 * bozardı — kelime gerçekten unutulduğu için değil, gürültü yüzünden öne
 * çekilirdi. Duyulmayan tur cevapsız geçiliyor ve doğru karşılık okunuyor.
 */
const UNHEARD_IS_NOT_WRONG = true;

/** Anlatım tarafının tanıyıcı etiketi — arayüz dili neyse o dinleniyor. */
const NATIVE_TAG: Record<NativeLang, string> = { tr: "tr-TR", en: "en-US", de: "de-DE" };

/**
 * Mikrofonun çalışmadığına ne zaman karar verilir.
 *
 * Mikrofon gerçekten çalışmıyorsa (izin geri alınmış, başka uygulama
 * kullanıyor, sayfa arka planda) her tur anında boş dönüyor ve yirmi turluk
 * oturum saniyeler içinde tükeniyor — kullanıcı cebinden çıkardığında tur
 * bitmiş oluyor.
 *
 * Ölçüt bilerek "üst üste" DEĞİL, "son N turun M'si". Tarayıcı tanıyıcısı
 * bozuk durumdayken bile arada bir çöp metin döndürebiliyor; ardışıklık
 * arayan bir sayaç o tek metinle sıfırlanıyor ve koruma hiç devreye
 * girmiyordu. Ölçümde tam olarak bu oldu: kırk beş saniyede altı tur yandı,
 * sayaç hiç üçe ulaşmadı.
 *
 * Pencere dar tutuldu: gerçekten konuşan biri gürültülü bir sokakta iki tur
 * kaçırabilir, dört turun üçünü kaçırmaz.
 */
const UNHEARD_WINDOW = 4;
const UNHEARD_LIMIT = 3;

/** Onay sorusunda cevabı beklerken tanınan sessizlik tavanı. */
const CONFIRM_SILENCE_MS = 7000;

/**
 * Cevap için beklenen en uzun süre.
 *
 * Artık sabit bir pencere DEĞİL, üst sınır: dinleme konuşma bitince
 * kendiliğinden kapanıyor (bkz. use-listen). Bu yüzden cömert olabiliyor —
 * düşünmesi gereken kullanıcı beklenirken, hızlı cevap veren beklemiyor.
 *
 * Önceki 3,5 saniyelik sabit pencere sorunun ta kendisiydi: kullanıcı Türkçeyi
 * duyar duymaz konuşmaya başlıyor, kaydedici henüz ayağa kalkmamış oluyor ve
 * kelimenin BAŞI kayda girmiyordu. Whisper baştan okuduğu için sonuç doğrudan
 * uydurma oluyordu.
 */
const ANSWER_WINDOW_MS = 8000;
/**
 * Tarayıcı tanıyıcısında hiç konuşma gelmezse kaç ms beklenir.
 *
 * Eskiden 4 saniyeydi ve arkasında bir gerekçe vardı: boş dinlemenin ardından
 * kayıt yolu da deneniyordu, tavan uzun tutulunca bekleme ikiye katlanıyordu.
 * O ikinci deneme artık yok — görünürken tek yol tanıyıcı — yani tavan
 * düşünme süresine göre kurulabiliyor. Dört saniyeyi aşan iki cevap eskiden
 * tanıyıcıyı oturum boyunca kapatıyordu; kullanıcının "ekran açıkken
 * Deepgram'a gidiyor" diye gördüğü şey buydu.
 */
const BROWSER_SILENCE_MS = 9000;
/**
 * Tanıyıcının bu oturumda kullanılamaz olduğunu söyleyen hata kodları.
 *
 * Bunlar "kullanıcı sustu" değil "mikrofon yok" demek: izin geri alınmış,
 * cihaz başka uygulamada, servis kapalı. Boş dinleme ("no-speech") ve
 * gizlenince iptal ("aborted") bu listede DEĞİL — onlar geçici.
 */
const BROWSER_DEAD = new Set(["not-allowed", "service-not-allowed", "audio-capture", "language-not-supported", "start-failed"]);
/**
 * Turlar arası nefes — "aşırı hızlı" geçişleri yavaşlatır (cepte de geçerli).
 *
 * 850 → 450: turun her adımı zaten bir okumayı bekliyor (her cümle ayrı bir
 * ses isteği) ve üstüne konan bu es akışı gereğinden ağır yapıyordu. Mobil
 * karşılığı `WalkModeScreen` `gap(320)`.
 */
const GAP_MS = 450;
/**
 * DÜZELTMEDEN SONRA UZUN ES (Samet, 2026-10-07): "Doğrusu: der Tisch" ile sıradaki kelimenin
 * anlamı arka arkaya okununca tek cümle gibi duyuluyor, düzeltme bir sonraki soruyla
 * karışıyordu. Mobil `WalkModeScreen` aynı değer.
 */
const CORRECTION_GAP_MS = 1200;

/**
 * Ağ isteklerinin üst sınırı.
 *
 * Cepteki telefon uyku kipine yaklaştıkça ağ yavaşlıyor; zaman aşımı olmayan
 * bir istek turu dakikalarca dondurabiliyor. Cevap gönderimi kaybolursa SRS
 * bozulmuyor (sunucu son duruma göre çalışıyor), yani beklemek pahalı, vazgeçmek
 * ucuz.
 */
const NET_TIMEOUT_MS = 10_000;

/**
 * Bir okumanın en fazla süresi.
 *
 * Zincirin kendi parça korumaları var (bkz. speak-button) ama bu ONLARIN da
 * çuvallamasına karşı son kapı: `say` çözülmezse tur o satırda kalıyor ve
 * kullanıcı hiçbir şey duymuyor. Dört parçalık en uzun tanıtım bile on
 * saniyeyi geçmiyor, otuz saniye rahat bir tavan.
 */
const SPEAK_CAP_MS = 30_000;

/**
 * Bir dinlemenin en fazla süresi.
 *
 * Pencerenin kendisi zaten sınırlı; buradaki pay kaydediciye, ağa ve yazıya
 * çevirmeye. Süre dolarsa "duyulmadı" sayılıyor — turun donması değil.
 */
const HEAR_SLACK_MS = 15_000;

function withArtikel(w: RoundWord): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

/** Turdaki kelimeler — eşleştirme turu beş kelime taşıyor, gerisi bir. */
function wordsOf(round: Round): RoundWord[] {
  return round.game === "match" ? round.words : [round.word];
}

/** Gelen her kuyruk bir tur: ücretsizde kalan hak bir azalıyor (premium'da gösterilmiyor). */
const spendRound = (w: WalkUnlock | null): WalkUnlock | null =>
  w && !w.premium ? { ...w, used: w.used + 1, remaining: Math.max(0, w.remaining - 1) } : w;

export function WalkPlayer({ onExit, walk = null }: { onExit: () => void; walk?: WalkUnlock | null }) {
  const t = useT();
  /*
    GÜNLÜK TUR (2026-09-25). Ücretsizde günde 3 tur, ekran açık; her
    `/api/session?walk=1` isteği (tur sonundaki "devam" dahil) sunucuda bir tur
    sayılıyor. Sayfa durumu yüklemeden ÖNCE okudu; her gelen kuyrukta kalan
    tur burada bir azaltılıyor, kapakta söylenen buna göre.
  */
  const [walkNow, setWalkNow] = useState<WalkUnlock | null>(walk);
  const router = useRouter();
  const lang = useLang();
  // Hedef dilin adı ekranda geçiyor; kurs cihazdaki aynadan okunuyor (mobil
  // `currentCourseId()` ile aynı kaynak).
  const course = readLocal(COURSE_KEY) ?? "de";
  const [status, setStatus] = useState<Status>("loading");
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");
  /* `id` ve `game`: içerik bildirimi bayrağının hedefi (ekrandaki kelime). */
  const [prompt, setPrompt] = useState<{ tr: string; de: string; id: number; game: string } | null>(null);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | "unheard" | "skip" | null>(null);
  /** Şu an sorulan şey bir kelime değil, "devam edelim mi?" onayı. */
  const [asking, setAsking] = useState(false);
  /**
   * Tanıyıcının duyduğu metin.
   *
   * Ekranda gösteriliyor ve sebebi bir hata ayıklama kolaylığı değil, güven:
   * "doğru söyledim ama yanlış saydı" şikâyetinin tek cevabı, ne duyduğunu
   * göstermek. Kullanıcı kendi kulağıyla karşılaştırabildiğinde sorunun
   * telaffuzunda mı yoksa tanıyıcıda mı olduğunu anında görüyor.
   */
  const [heardText, setHeardText] = useState("");
  /* Açık içerik bildirimi (hedef + açılış anındaki anlık görüntü). Yürüyüşte
     bildirim TURU DURAKLATIYOR: döngü kelimeyi birkaç saniyede değiştiriyor ve
     kart yeniden çiziliyor, yani kartın içindeki bir pencere yazılırken
     kapanırdı. Pencere duraklama ekranında açık kalıyor, tur oradan sürüyor. */
  const [wordReport, setWordReport] = useState<{ target: ReportTarget; snap: string } | null>(null);
  /**
   * Tarayıcının kendi tanıyıcısı kullanılabiliyor mu — TEK yakalama yolu.
   *
   * Tur başında soruluyor; tanıyıcı oturum içinde kalıcı bir hatayla ölürse
   * (`BROWSER_DEAD`) düşüyor ve tur duruyor. Ref, çünkü döngü her turda
   * yeniden kurulmuyor.
   */
  const browserRef = useRef(false);
  /** Süren dinlemenin iptal düğmesi — süre dolunca ya da tur durunca basılıyor. */
  const hearCtl = useRef<AbortController | null>(null);
  /**
   * Ekran KARANLIK ama açık — "cep kilidi".
   *
   * Cihaz testinde (Xiaomi HyperOS, 2026-08-28) ekran KAPANINCA HyperOS'un güç
   * yöneticisi (`whetstone`/`AwareResourceControl`) Chrome'un mikrofonunu
   * susturuyor: cep yolu (kayıt + sunucu) o cihazlarda kodla çalıştırılamıyor.
   * Ama susturma yalnız ekran kapalıyken; ekran AÇIK kalırsa tarayıcının kendi
   * tanıyıcısı (ekranda kusursuz çalışan yol) cepte de çalışır. Bu yüzden ekranı
   * kapatmak yerine simsiyah bir katmanla örtüyoruz: ekran teknik olarak açık,
   * mikrofon çalışıyor, ama kullanıcı cebe koyunca ne ışık ne kazara dokunma.
   */
  const [screenDark, setScreenDark] = useState(false);
  const darkOverlay = useRef<HTMLDivElement | null>(null);
  /** Tur ortasında "Bitir" onayı açık mı. */
  const [quit, setQuit] = useState(false);
  /* Ayrilmanin oteki yollari da ayni onaya bagli (yenileme, sekme, kenar
     cubugu bagalantilari). Android'de kosul `inSession`; burada karsiligi
     "oynuyor ya da duraklatildi". */
  const ayril = useLeaveGuard(status === "playing" || status === "paused");
  /** Karanlık katmandan çıkış: kısa sürede üç dokunuş (cepte kazara açılmasın). */
  const darkTaps = useRef<number[]>([]);
  /**
   * "Cebe koy" bir dinlemenin ORTASINDA basıldı: o dinleme iptal edildi ve
   * kelime bir kez daha sorulacak — kullanıcı düğmeye basarken kelimeyi
   * kaçırmış olabilir, o kelimeyi "duyulmadı" saymak haksızlık olurdu.
   */
  const reask = useRef(false);
  /**
   * Döngünün bir sonraki dinlemeden önce okuyacağı duyuru.
   *
   * Düğmeden doğrudan `say` çağırmak ölçülmüş bir hataydı: döngünün süren
   * okumasını iptal ediyor, döngü o okumanın bitişini otuz saniyelik tavana
   * kadar bekliyordu. Okuyan tek yer döngü; düğme yalnız not bırakıyor.
   */
  const announce = useRef<string | null>(null);
  /**
   * Dinleme DIŞINDA cebe kondu (oturum başında ya da iki dinleme arasında): cep
   * anonsu SIRADAKİ kelimeden ÖNCE okunmalı. `announce` bir sonraki `hearOnce`'ta
   * (kelimeden SONRA) okunuyor; bu "önce kelime, sonra cebe konuldu" sırasını
   * veriyordu (bkz. darken/loop).
   */
  const pocketPreroll = useRef(false);
  /** Duraklatılmış turdan dönülüyor: döngü ilk okumasında "Devam ediyoruz" der. */
  const resumePreroll = useRef(false);
  /** Teslim işaretinin ("weiter") ne olduğu yürüyüşe girişte bir kez okunur. */
  const hintDone = useRef(false);
  /** Tur bir sebeple bitti mi — sökülürken ikinci bir `walk_end` yazılmasın. */
  const ended = useRef(false);
  /** `?diag=1`: son dinlemelerin yolu ve sonucu ekranda — telefonda bir bakışta. */
  const [diag, setDiag] = useState<string[] | null>(null);
  /** Bu yürüyüşte sorulan kelimeler — devam turunda tekrar sorulmasın diye.
      Duraklatıp dönmek yeni bir yürüyüş DEĞİL: liste bileşen ömrü boyunca tutuluyor. */
  const askedIds = useRef<Set<number>>(new Set());
  /**
   * Duraklatılan turun dönüş noktası: hükmü VERİLMEMİŞ ilk tur.
   *
   * Eskiden dönüş `index`ten (o an çalan tur) başlıyordu. Geri bildirim okunurken
   * ya da "devam edelim mi?" sorusunda duraklatılınca cevabı alınmış kelime
   * yeniden soruluyordu: sayaç, bitiş ekranı ve paylaşım iki kez sayıyor, son
   * kelime SRS'e ikinci kez gidiyor, `session_done` iki kez yazılıyordu.
   */
  const resumeAt = useRef(0);
  /** Oturumun bitişi (`finish` sesi + `session_done`) yazıldı mı — onay sorusunda duraklatıp dönünce tekrar yazılmasın. */
  const finished = useRef(false);
  /** Duraklamanın başladığı an — dönüşte `startedAt` bu kadar ileri kayıyor, gönderilen süre yalnız ETKİN süre. */
  const pausedAt = useRef<number | null>(null);
  /**
   * Turu durduran işlev, ref üzerinden.
   *
   * `hear` bu dosyada `stopAll`tan ÖNCE tanımlanıyor ve doğrudan çağırmak
   * bildirimden önce kullanmak olurdu. Ref sırayı bozmadan bağlıyor.
   */
  const pauseRef = useRef<() => void>(() => {});
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  /* Bitis ekraninin kutlama esigi - Android ile ayni hesap
     (`WalkModeScreen` `donePct`). */
  const donePct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;

  const { listen, cancel } = useListen();
  /** Çalışan döngünün jetonu — duraklat/çık geç gelen adımları geçersiz kılar. */
  const run = useRef(0);
  const startedAt = useRef(Date.now());
  const pending = useRef<Answer[]>([]);
  const missed = useRef<SessionProgress["missed"]>([]);
  /** Sunucudaki oturuma ait sayaç — kaydedilen ilerleme bundan yazılıyor. */
  const tallyRef = useRef({ correct: 0, total: 0 });
  /**
   * Yürüyüşün tamamına ait sayaç.
   *
   * Ayrı tutuluyor çünkü ikisi farklı şeyi ölçüyor: sunucuya yazılan ilerleme
   * O oturumun ilerlemesi olmak zorunda (yoksa ikinci oturum 20/20 dolu
   * başlar), ekranda görülmesi gereken ise kullanıcının bu yürüyüşte toplam
   * ne yaptığı.
   */
  const walkRef = useRef({ correct: 0, total: 0, sessions: 1 });
  /* Bitiş ekranının "yeni kelime" ve "süre" sayıları — `walkRef` gibi
     YÜRÜYÜŞÜN tamamına ait (mobil tur başına sıfırlıyor, çünkü orada sayaç
     da tur başına). Süre ilk başlangıçtan bitişe; bitiş anı bir kez
     yazılıyor ki ekran yeniden çizildikçe kaymasın. */
  const taught = useRef(0);
  const walkBegan = useRef<number | null>(null);
  const endedAt = useRef<number | null>(null);
  /** Devam turu boş geldi: bitiş ekranında "devam" yok, not var (mobil `noMore`). */
  const [noMore, setNoMore] = useState(false);
  /** Son turların duyuldu/duyulmadı geçmişi — pencere bunun üstünde. */
  const heardLog = useRef<boolean[]>([]);
  const { acquire, release } = useWakeLock();
  /** Okumanın bitişini bekleyen söz — iptal edilirse elle çözülür. */
  const speakDone = useRef<(() => void) | null>(null);

  // ── Sunucu konuşması ────────────────────────────────────────────────

  const load = useCallback(async () => {
    try {
      // walk=1: sunucu yürüyüşe özel TEMİZ kuyruğu kuruyor (tam 20 tur, kelime
      // başına tek "speak", araya birkaç yeni; bkz. buildWalk) ve session_state'e
      // dokunmuyor. Client tarafı benzersizleştirme (eski walkQueue) artık gereksiz.
      /*
        GÜN İSTEMCİNİN YEREL GÜNÜ. Adres `day` taşımıyordu ve uç, gün gelmezse
        SUNUCUNUN UTC gününe düşüyor (`clampDay`). Gece yarısına yakın yürüyen
        kullanıcının cevapları yanlış güne yazılıyordu: günlük istatistik ve
        seri o günden hesaplanıyor. Aynı sayfanın oturum oynatıcısı ve mobilin
        yürüyüşü baştan beri yerel günü gönderiyor.
      */
      const res = await apiFetch(`/api/session?day=${localDay()}&walk=1`, {
        cache: "no-store",
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
      });
      const gate = await walkGate(res);
      if (gate) {
        track("premium_gate", 0, "walk");
        return setStatus(gate);
      }
      if (!res.ok) return setStatus("error");
      /* Kuyruk geldi = bir tur sayıldı. */
      setWalkNow(spendRound);
      const data = (await res.json()) as SessionPayload & { resume?: SessionProgress | null };
      if (!data.rounds.length) return setStatus("empty");
      setSession(data);
      const at = Math.min(data.resume?.index ?? 0, data.rounds.length - 1);
      setIndex(at);
      resumeAt.current = at;
      finished.current = false;
      if (data.resume) {
        tallyRef.current = { correct: data.resume.correct, total: data.resume.total };
        setTally(tallyRef.current);
        missed.current = data.resume.missed;
      } else {
        /* Bitiş ekranındaki "Devam" yeni oturumu buradan yüklüyor: önceki oturumun
           sayıları sonraki oturumun sesli özetine karışmasın. */
        tallyRef.current = { correct: 0, total: 0 };
        setTally(tallyRef.current);
        missed.current = [];
      }
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Cevapları SRS'e gönderir (`/api/answers`).
   *
   * Yürüyüş DURUM TUTMUYOR (bkz. buildWalk): `session_state`'e hiç dokunmuyor,
   * çünkü o satır normal oturumla paylaşılıyor ve ilerleme yazmak normal turu
   * ezerdi. Bu yüzden `progress` GÖNDERİLMİYOR (yollanırsa `/api/answers`
   * `saveSessionProgress`'i çağırıp o satırı yazardı). Cevabı olmayan adım
   * (tanıtım) hiçbir şey göndermiyor. Cevaplanan kelime SRS'te ileri gittiği
   * için sonraki yürüyüşte kendiliğinden geri gelmiyor; aynı yürüyüş içinde de
   * `?skip=` onu dışarıda tutuyor.
   */
  const flush = useCallback(async (final: boolean) => {
    const batch = pending.current;
    pending.current = [];
    if (!batch.length) return;
    try {
      /* Tekrar kimliği: bağlantı koparsa anlık tekrar aynı turu iki kez saydırmıyor (bkz. lib/answer-queue). */
      const res = await apiFetch("/api/answers", {
        replay: true,
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          batch: newBatchId(),
          answers: batch,
          day: localDay(),
          seconds: final ? Math.round((Date.now() - startedAt.current) / 1000) : 0,
        }),
        keepalive: true,
      });
      if (!res.ok) return;
      const data = (await res.json()) as { totalXp: number; currentStreak: number };
      window.dispatchEvent(
        new CustomEvent("lernomi:stats", {
          detail: { xp: data.totalXp, streak: data.currentStreak },
        }),
      );
    } catch {
      /* çevrimdışıysa cevaplar bu tur için kaybolur; SRS bozulmaz */
    }
  }, []);

  // ── Ses ve mikrofon ────────────────────────────────────────────────

  /** Okur ve bitmesini bekler. İptal edilirse söz elle çözülür, döngü kilitlenmez. */
  const say = useCallback((segments: SpeechSegment[]): Promise<void> => {
    // Tur bittiyse (Bitir/Duraklat/ekran kapandı) hiçbir okuma başlamıyor.
    // Bug: "devam edelim mi?" okuması ağa çıkmıştı, kullanıcı Bitir'e basıp
    // ana ekrana döndü ve gecikmeli ses ORADA çaldı. Bekleyen okumayı da
    // burada kesiyoruz; çalan okumayı stopSpeaking (stopAll) durduruyor.
    if (ended.current) {
      stopSpeaking();
      return Promise.resolve();
    }
    const spoken = new Promise<void>((resolve) => {
      speakDone.current = resolve;
      /*
        Yol GÖRÜNÜRLÜĞE göre, kipe değil. Sayfa görünürken oyunlarla aynı
        boşluksuz WebAudio yolu — "okuma oyunlardaki gibi olmalı" şikâyetinin
        bir yarısı buydu, ses öğesi zinciri ayrı bir kulak veriyordu. Yalnızca
        sayfa gizliyken ses ÖĞESİ yolu zorlanıyor: telefon kilitlendiğinde
        `AudioContext` askıya alınıyor ve WebAudio ile çalan her şey susuyor;
        ses öğeleri çalmaya devam ediyor. Karartılmış cepte ekran açık kalıyor
        ve WebAudio çalışıyor — background'a erken geçmenin sebebi yok.
      */
      const background = typeof document !== "undefined" && document.visibilityState === "hidden";
      /* ANLATIM KARAKTERİN SESİYLE. Yönergeler ("Yeni kelime.", "Doğrusu:") anlatım sesine (Emel/Jenny/Katja)
         gidiyordu; kelime ve anlamı Defne/Aras okuduğu için bir turda iki ayrı kişi konuşuyordu. Artık seçilen
         karakterin anadil sesi, önceden üretilmiş kaydı varsa o (`k=n`, bkz. speak-button `ownNarration`). */
      const sel = selectedVoice();
      const own = segments.map((s) =>
        s.narration && !s.voice ? { ...s, voice: glossVoice(s.lang as NativeLang, sel), ownNarration: true } : s,
      );
      speakSegments(
        own,
        () => {
          speakDone.current = null;
          resolve();
        },
        undefined,
        { background },
      );
    });
    // Son kapı: okuma çözülmezse tur burada kalırdı (bkz. SPEAK_CAP_MS).
    return withDeadline(spoken, SPEAK_CAP_MS, undefined);
  }, []);

  /** Diag paneline bir satır — yalnız `?diag=1` ile açıkken tutuluyor. */
  const note = useCallback((line: string) => {
    setDiag((d) => (d ? [...d.slice(-5), line] : d));
  }, []);

  /**
   * Mikrofon açıldı / kapandı işaretleri — MOBİLLE AYNI SES.
   *
   * Yürüyüş modunun tamamı ekrana bakmadan kullanılıyor; mikrofonun ne zaman
   * dinlediğini söyleyen tek şey bu iki ton. Eskiden yalnız AÇILIŞ vardı
   * (`cueListen`, konuşmaların işareti) ve kapanış hiç duyulmuyordu: kullanıcı
   * konuşmayı ne zaman bitireceğini bilemiyordu. Mobilde ikisi de var ve
   * ayrı seslerdi; artık üçü de tek nota tablosundan geliyor (`WALK_NOTES`).
   *
   * İki çalma yolu: `AudioContext` çalışıyorsa WebAudio, çalışmıyorsa (henüz
   * uyandırılmadı ya da askıya alındı) `<audio>` öğesi (bkz. pocket-audio).
   */
  const walkCue = useCallback((kind: WalkCue) => {
    const ctx = sharedAudioContext();
    if (ctx && ctx.state === "running") play(kind);
    else pocketWalkCue(kind);
  }, []);
  const cue = useCallback(() => walkCue("micon"), [walkCue]);

  /**
   * Bir cevabı tarayıcının tanıyıcısıyla dinler ve duyduğu adayları döndürür.
   *
   * Tek yol bu: ses kaydedilmiyor, sunucuya gönderilmiyor (2026-09-27).
   */
  const hearOnce = useCallback(
    async (
      /** Hangi taraf dinleniyor: anlatım dili ("native") ya da hedef dil ("target"). */
      side: "target" | "native",
      windowMs: number,
      /** Ara sonuç bunu geçerse dinleme HEMEN kapanır (bkz. use-listen). */
      accept?: (alternatives: string[]) => boolean,
      signal?: AbortSignal,
    ): Promise<string[]> => {
      const visible = () => typeof document === "undefined" || document.visibilityState === "visible";

      // Düğmeden bırakılan not burada okunuyor — döngünün kendi sırasında.
      if (announce.current) {
        const text = announce.current;
        announce.current = null;
        // Not sözlükten, yani arayüz dilinde: parça da o dilde (sabit "tr" Türkçe sesle okutuyordu).
        await say([{ lang, text, narration: true }]);
        if (signal?.aborted) return [];
      }

      /*
        Boş dinleme "duyamadım"dır, kip değişmez. Gizlenen sayfada tur zaten
        duruyor (görünürlük dinleyicisi), orada dinlenmiyor.
      */
      if (!browserRef.current || !visible()) return [];
      const startedAt = Date.now();
      const heard = await listen({
        // Hedef taraf kursun tanıyıcı dili: sabit "de-DE" İngilizce kursta cevabı Almanca dinliyordu.
        lang: side === "native" ? NATIVE_TAG[lang] : speechLocaleOf(course),
        silenceMs: BROWSER_SILENCE_MS,
        maxMs: windowMs,
        accept,
        // İşaret tanıyıcı BAŞLADIKTAN sonra çalıyor: kullanıcı bipi duyduğu
        // anda mikrofon zaten dinliyor, yani bipi beklemesi gerekmiyor.
        onOpen: cue,
      });
      const outcome = heard.alternatives.length ? "ok" : heard.error ?? (heard.silent ? "silence" : "end");
      track("walk_listen", 0, `browser:${outcome}`);
      note(`tarayıcı ${outcome} ${Date.now() - startedAt} ms${heard.alternatives[0] ? ` "${heard.alternatives[0]}"` : ""}`);
      if (heard.alternatives.length) return heard.alternatives;
      if (signal?.aborted) return [];

      /*
        Tanıyıcı GERÇEKTEN öldü (izin geri alındı, mikrofon başka yerde,
        servis kapalı): tur duruyor ve sebebi sesle söyleniyor. Eskiden burada
        kayıt + sunucu yoluna geçiliyordu; ekran açıkken ses sunucuya
        gönderilmediği için artık geçilecek bir yol yok.
      */
      if (heard.error && BROWSER_DEAD.has(heard.error)) {
        browserRef.current = false;
        track("walk_switch", 1, "dead");
        await say([{ lang, narration: true, text: t("walk.browser_stt_dead_stop") }]);
        pauseRef.current();
      }
      return [];
    },
    [cue, listen, note, say, lang, t, course],
  );

  /**
   * Dinlemenin süreye bağlanmış hâli — döngünün kullandığı budur.
   *
   * İçerideki her yolun kendi sınırı var ama hiçbiri kesin değil: tanıyıcı
   * `onend` vermeyebiliyor, kaydedici parça üretmeyi bırakabiliyor, ağ
   * kopabiliyor. Bunların hepsi aynı sonucu veriyordu — tur o satırda donuyor
   * ve kullanıcı cepteki telefondan bir daha hiçbir şey duymuyor.
   *
   * Süre dolarsa "duyulmadı" dönüyor VE içerideki iş iptal ediliyor: eskiden
   * süresi dolan dinleme arkada kaydı bitirip sunucuya da gönderiyordu
   * (üretimde aynı saniyede iki çağrı), sonraki sorunun sesine karışıyordu.
   */
  const hear = useCallback(
    async (
      /** Hangi taraf dinleniyor: anlatım dili ("native") ya da hedef dil ("target"). */
      side: "target" | "native",
      windowMs: number,
      accept?: (alternatives: string[]) => boolean,
    ): Promise<string[]> => {
      hearCtl.current?.abort();
      const ctl = new AbortController();
      hearCtl.current = ctl;
      const heard = await withDeadline(
        hearOnce(side, windowMs, accept, ctl.signal),
        windowMs + HEAR_SLACK_MS,
        null as string[] | null,
      );
      /* Dinleme bitti: denetleyici bırakılıyor. Kalırsa `darken` iki dinleme
         arasında da "dinleme sürüyor" sanıp yeniden sorma işareti bırakıyordu ve
         sonraki DOĞRU cevap atılıp kelime bir kez daha soruluyordu. */
      if (hearCtl.current === ctl) hearCtl.current = null;
      /* MİKROFON KAPANDI SESİ YOK (Samet, 2026-09-17). Kapanışı duyuran ton,
         hemen ardından gelen doğru/yanlış sesiyle art arda çalıyor ve akışı
         ağırlaştırıyordu; kararın sesi zaten kapanışı da haber veriyor.
         Duyulmadı/teslim durumlarında sesin yerini okuma alıyor. */
      if (heard === null) {
        ctl.abort();
        /* Kind'ın biçimi ötekilerle aynı olmalı: `walk_listen` panosu adı
           iki parçaya ayırıyor (`kaynak:sonuç`) ve tek parçalı bir ad orada
           kaynaksız kalıyordu. Bekçi hangi kaynağın takıldığını bilmiyor,
           aşama adı veriliyor — `record:failed` ile aynı kural. */
        track("walk_listen", 0, "hear:deadline");
        return [];
      }
      return heard;
    },
    [hearOnce],
  );

  const stopAll = useCallback(() => {
    run.current++;
    stopSpeaking();
    cancel();
    hearCtl.current?.abort();
    speakDone.current?.();
    speakDone.current = null;
  }, [cancel]);

  /*
    Sökülürken tanıyıcı (`stopAll` → `cancel`) ve tam ekran da bırakılıyor.
    Kullanıcı "geri dön" düğmesine basmadan çıkarsa (sekme değişimi, geri
    gitme, uygulamanın başka bir yerine geçme) tam ekran açık kalırdı.
  */
  useEffect(
    () => () => {
      // Geri hareketi ya da sekme değişimiyle çıkış da bir bitiş: kayda geçsin,
      // yoksa dışarıdan "takıldı"dan ayırt edilemiyor (60 günde hiç walk_end yoktu).
      if (!ended.current && run.current > 0) track("walk_end", 6);
      stopAll();
      try {
        if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
      } catch {
        /* önemsiz */
      }
    },
    [stopAll],
  );

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("diag")) setDiag([]);
  }, []);

  /** Tam ekrandan çık — sistem çubuklarını geri getirir. */
  const exitFullscreen = useCallback(() => {
    try {
      if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {});
    } catch {
      /* önemsiz */
    }
  }, []);

  /** Karanlık kilidi kapat: katman kalkar, tam ekrandan çıkılır. */
  const exitDark = useCallback(() => {
    darkTaps.current = [];
    setScreenDark(false);
    exitFullscreen();
    track("walk_switch", 0, "dark-exit");
  }, [exitFullscreen]);

  /**
   * KARANLIK ORTU: ODAK VE ESCAPE.
   *
   * Dugumdeki `onKeyDown` ise yaramazdi - ortuya odak verilmedigi surece hic
   * atesleme almaz. `achievement-unlock`un kalibi izleniyor: ortu gelince
   * odagi aliyor, pencere dinleyicisi Escape'i yakaliyor, ortu kalkinca odak
   * geldigi yere donuyor.
   */
  useEffect(() => {
    if (!screenDark) return;
    const geri = document.activeElement as HTMLElement | null;
    darkOverlay.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      exitDark();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      geri?.focus?.();
    };
  }, [screenDark, exitDark]);


  // Tur oynamıyorsa karanlık katman ve tam ekran kalkar (duraklat/çık/bitti sonrası).
  useEffect(() => {
    if (status !== "playing") {
      setScreenDark(false);
      exitFullscreen();
    }
  }, [status, exitFullscreen]);

  // Kullanıcı sistem hareketiyle tam ekrandan çıkarsa (yukarı kaydırma, geri)
  // katman da kalksın — yoksa çubuklar geri gelir ama siyah katman kalır ve
  // kullanıcı ne olduğunu anlamaz.
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) setScreenDark(false);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  /**
   * Sunucudan taze bir tur — oturum bitince devam etmek için.
   *
   * Bu yürüyüşte SORULAN kelimeler dışarıda bırakılıyor. Yanlış bilinen
   * kelime tekrar borcuna düştüğü için hemen geri geliyordu ve kullanıcı aynı
   * kelimeleri arka arkaya duyuyordu. Aralıklı tekrar açısından doğru, yürüyüş
   * açısından yanlış: kelime yarın yine karşına çıkacak, on dakika sonra
   * çıkmasının öğretici bir karşılığı yok.
   */
  const fetchSession = useCallback(async (): Promise<SessionPayload | "locked" | "fair_use" | null> => {
    try {
      const skip = [...askedIds.current].join(",");
      const res = await apiFetch(`/api/session?day=${localDay()}&walk=1${skip ? `&skip=${skip}` : ""}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(NET_TIMEOUT_MS),
      });
      /* Devam da bir tur: hak yoksa kapı burada kapanıyor — "kelime kalmadı" DEĞİL. */
      const gate = await walkGate(res);
      if (gate) return gate;
      if (!res.ok) return null;
      setWalkNow(spendRound);
      return (await res.json()) as SessionPayload;
    } catch {
      return null;
    }
  }, []);

  /**
   * "Devam edelim mi?" — sesli sorulur, sesli cevaplanır.
   *
   * Anlaşılmayan cevap EVET ya da HAYIR sayılmıyor, soru bir kez
   * tekrarlanıyor. Emin olunamayan bir cevabı evet saymak kullanıcıyı
   * istemediği bir tura sokar, hayır saymak turu sessizce bitirir; ikisi de
   * tekrar sormaktan kötü.
   */
  const askContinue = useCallback(
    async (correct: number, total: number): Promise<"yes" | "no"> => {
      const summary =
        total > 0
          ? t("walk.tour_done_continue", { total, correct })
          : `${t("common.round_done")}. ${t("walk.continue_q")}`;
      setAsking(true);
      setVerdict(null);
      try {
      for (let attempt = 0; attempt < 2; attempt++) {
        // Kullanıcı bu soru okunurken/dinlenirken Bitir'e bastıysa (ended)
        // ikinci denemeye HİÇ geçilmiyor: yoksa taze bir `say` jetonu alıp
        // "Devam edelim mi?" ana ekrana dönüldükten sonra çalıyordu.
        if (ended.current) return "no";
        setPhase("speaking");
        setPrompt(null);
        await say([
          {
            lang,
            narration: true,
            text: attempt === 0 ? summary : t("walk.continue_yes_no"),
          },
        ]);
        if (ended.current) return "no";
        setPhase("listening");
        const heard = await hear(
          "native",
          CONFIRM_SILENCE_MS,
          (alts) => parseConfirm(alts[0] ?? "", lang) !== null,
        );
        /* Onay dinlenirken cebe kondu: kesik dinleme bir deneme sayılmıyor (ikinci
           denemede "anlaşılmadı" sayılıp turu bitirmesin), işaret de sonraki
           oturumun ilk cevabına sızmasın. Anons sonraki dinlemeden önce okunuyor. */
        if (reask.current) {
          reask.current = false;
          attempt--;
          continue;
        }
        const intent = parseConfirm(heard[0] ?? "", lang);
        if (intent === "yes") return "yes";
        if (intent === "no") return "no";
      }
      // İki kez sorulup anlaşılmadıysa durmak doğru: cevap veremeyen kişi
      // büyük olasılıkla artık orada değil.
      return "no";
      } finally {
        setAsking(false);
      }
    },
    [hear, say, lang, t],
  );

  // ── Turun kendisi ──────────────────────────────────────────────────

  const loop = useCallback(
    async (rounds: Round[], from: number) => {
      const token = ++run.current;
      const alive = () => token === run.current;

      // Dış döngü OTURUMLAR üzerinde: yirmi tur bitince sesli onay alınıp
      // taze bir tur çekiliyor. Böylece telefonu cepten çıkarmadan devam
      // edilebiliyor — modun bütün anlamı zaten bu.
      let current = rounds;
      let start = from;

      // Geri bildirim okunurken duraklatıldıysa o turun cevabı kuyrukta kaldı
      // (bkz. settle): önce o gidiyor. Oturumun son turuysa süre de onunla.
      if (pending.current.length) {
        await flush(start >= current.length);
        if (!alive()) return;
      }

      // Oturum başı, bir kez okunuyor (devam turları while'ın içinde):
      //   • Cebe kondu ise ("Cebe koy, başla") çıkış anonsu — SIRADAKİ kelimeden
      //     ÖNCE, "önce kelime sonra cebe konuldu" sırası olmasın diye.
      //   • Teslim işaretinin ne olduğu ("weiter") — girişte bir kez (hintDone).
      const preroll: SpeechSegment[] = [];
      if (resumePreroll.current) {
        resumePreroll.current = false;
        preroll.push({ lang, narration: true, text: t("walk.continuing") });
      }
      if (pocketPreroll.current) {
        pocketPreroll.current = false;
        preroll.push({ lang, narration: true, text: t("walk.pocket_announce") });
      }
      if (!hintDone.current) {
        hintDone.current = true;
        preroll.push(
          { lang, narration: true, text: t("walk.skip_hint_before") },
          /* Teslim sözcüğü HEDEF DİLDE: sabit "weiter" yazılıydı ve İngilizce
             kursta öğrenciye almanca bir sözcük okunuyordu. */
          // Seçilen karakterin sesi, kelime katmanı (bkz. `targetSegment`).
          targetSegment(skipWord(course)),
          { lang, narration: true, text: t("walk.skip_hint_after") },
        );
      }
      if (preroll.length) {
        setPhase("speaking");
        await say(preroll);
        if (!alive()) return;
      }

      while (true) {
      for (let i = start; i < current.length; i++) {
        if (!alive()) return;
        setIndex(i);
        const round = current[i];
        const results: Answer[] = [];
        const words = wordsOf(round);
        /*
          Turun SON kelimesi hükme bağlandı: cevaplar kuyruğa, dönüş noktası bir
          ileri. Geri bildirimden ÖNCE çağrılıyor ve sayaçla aynı eşzamanlı blokta:
          okuma ya da es sırasında duraklatılırsa dönüşte bu tur yeniden sorulmuyor,
          cevap da kaybolmuyor (döngü girişinde ya da çıkışta gönderiliyor).
        */
        const settle = (word: RoundWord) => {
          if (word !== words[words.length - 1]) return;
          pending.current.push(...results);
          results.length = 0;
          resumeAt.current = i + 1;
        };

        for (const word of words) {
          if (!alive()) return;
          const target = withArtikel(word);
          /* İki dinleme arasında cebe kondu: anons bu kelimeden ÖNCE (bkz. darken). */
          const pocketNote: SpeechSegment[] = pocketPreroll.current
            ? [{ lang, narration: true, text: t("walk.pocket_announce") }]
            : [];
          pocketPreroll.current = false;
          // Sesli anlamı aynı öteki kelimeler de doğru cevap ("o" → er / es); sunucu `buildWalk` kuruyor.
          const accepted = [target, word.de, ...(round.game === "speak" ? round.alternatives ?? [] : [])];

          // Yeni kelime: sorulmuyor, tanıtılıyor. Ekranda da öyle çalışıyor.
          if (round.game === "intro") {
            setPrompt({ tr: glossFor(word, lang)?.text ?? "", de: target, id: word.id, game: round.game });
            setVerdict(null);
            setPhase("speaking");
            await say([
              ...pocketNote,
              { lang, narration: true, text: t("walk.new_word") },
              targetSegment(target),
              glossSegment(word, lang),
              targetSegment(target),
            ]);
            if (!alive()) return;
            results.push({
              wordId: word.id,
              game: "intro",
              correct: true,
              latencyMs: 0,
              hintUsed: true,
            });
            taught.current += 1;
            settle(word);
            continue;
          }

          // Kuyruk zaten sunucuda benzersiz (bkz. buildWalk); bu işaret yalnızca
          // DEVAM turunun `?skip=` listesini besliyor — aynı yürüyüşte aynı
          // kelime ikinci kez gelmesin.
          askedIds.current.add(word.id);

          setPrompt({ tr: glossFor(word, lang)?.text ?? "", de: target, id: word.id, game: round.game });
          setVerdict(null);

          // Soru: Türkçe karşılık okunuyor, ardından mikrofon açılıyor.
          setPhase("speaking");
          await say([...pocketNote, glossSegment(word, lang)]);
          if (!alive()) return;

          setPhase("listening");
          const askedAt = Date.now();
          // Doğru cevap duyulur duyulmaz dinleme kapanıyor: beklenen cevap
          // belliyken duraklama payının dolmasını beklemenin karşılığı yok.
          const ask = () =>
            hear(
              "target",
              ANSWER_WINDOW_MS,
              // Doğru cevap DA teslim işareti ("weiter") de dinlemeyi erken
              // kapatır: cevap veren de teslim eden de pencerenin dolmasını beklemesin.
              (alts) => spokenMatches(alts, accepted) || alts.some((h) => parseSkip(h, course)),
            );
          let heard = await ask();
          if (!alive()) return;
          // "Cebe koy" dinlemenin ortasına denk geldi: önce kısa duyuru, sonra
          // KELİME yeniden okunuyor (kullanıcı basarken kaçırmasın), sonra dinleme.
          // Döngü: yeniden dinlemede de basılırsa işaret sonraki kelimeye sızmasın.
          while (reask.current) {
            reask.current = false;
            setPhase("speaking");
            const pre = announce.current;
            announce.current = null;
            await say([...(pre ? [{ lang, narration: true, text: pre }] : []), glossSegment(word, lang)]);
            if (!alive()) return;
            setPhase("listening");
            heard = await ask();
            if (!alive()) return;
          }

          setPhase("judging");
          // Kabul mantığı yazma oyunuyla AYNI (bkz. games/types, spokenMatches):
          // artikel aranmıyor, umlaut katlanıyor, fazladan kelime bağışlanıyor.
          // Önceki hâli `judgeSpeech`ti ve tek kelimelik cevapta çok katıydı:
          // tanıyıcı artikeli düşürünce ("die Katze" → "Katze") doğru cevap
          // yanlış sayılıyordu.
          const said = heard.find((h) => h.trim()) ?? "";
          const unheard = !said;
          // Doğruluk ÖNCE. Teslim ("weiter", "weiß nicht") yalnız cevap hedefe
          // UYMADIĞINDA aranıyor — böylece hedefin kendisi bu kelimelerden biri
          // olsa bile doğru cevap yanlışlıkla teslim sayılmıyor.
          const ok = !unheard && spokenMatches(heard, accepted);
          // Teslim YANLIŞ değil: ceza yok, kısa motive + doğrusu. İşaret ALMANCA
          // veriliyor çünkü de-DE tanıyıcı Türkçe "bilmiyorum"u yakalayamıyor.
          const skipped = !unheard && !ok && heard.some((h) => parseSkip(h, course));
          setHeardText(said);

          // Pencere her turda güncelleniyor: duyulan da duyulmayan da giriyor.
          // "Bilmiyorum" DUYULDU sayılıyor (mikrofon çalışıyor), sadece cevap değil.
          heardLog.current.push(!unheard);
          if (heardLog.current.length > UNHEARD_WINDOW) heardLog.current.shift();
          const misses = heardLog.current.filter((h) => !h).length;

          // "Bilmiyorum": tekrar planına DOKUNMA (yanlış değil), doğrusunu oku.
          if (skipped) {
            setVerdict("skip");
            settle(word);
            await say([
              // İki ayrı parça: her biri kendi kaydıyla (birleşik metin tabloda yok, bkz. scripts/tts-walk-jobs).
              { lang, narration: true, text: encourage(t) },
              { lang, narration: true, text: t("walk.correct_is") },
              targetSegment(target),
            ]);
            if (!alive()) return;
            /* Düzeltme esi ekran kapalıyken de (`pocket-clock` cepte de sayıyor): karışıklık en
               çok yürürken oluyor. */
            await new Promise<void>((r) => afterMs(CORRECTION_GAP_MS, r));
            if (!alive()) return;
            continue;
          }

          if (unheard && UNHEARD_IS_NOT_WRONG) {
            setVerdict("unheard");

            // Dar bir pencerede biriken sessizlik bir gürültü değil, bir arıza
            // işareti: mikrofon başka bir uygulamada, izin geri alınmış ya da
            // sayfa arka planda.
            if (misses >= UNHEARD_LIMIT) {
              // Bu noktada mikrofon gerçekten çalışmıyor: izin geri alınmış,
              // başka bir uygulama kullanıyor ya da tarayıcı tanıyıcısıyla
              // çalışılıyor ve sayfa arka planda. Devam etmek yirmi turu
              // saniyeler içinde tüketirdi.
              // Eski hâli tarayıcı yolunda "ekranın açık kalması gerekiyor" diyordu;
              // ekran zaten açıkken bu, kullanıcıya yanlış bir sebep söylemekti.
              await say([
                { lang, narration: true, text: t("walk.mic_silent") },
              ]);
              if (!alive()) return;
              track("walk_end", 3);
              ended.current = true;
              heardLog.current = [];
              setStatus("paused");
              void release();
              return;
            }

            settle(word);
            await say([
              { lang, narration: true, text: t("walk.not_heard") },
              targetSegment(target),
            ]);
            if (!alive()) return;
            await new Promise<void>((r) => afterMs(CORRECTION_GAP_MS, r));
            if (!alive()) return;
            continue;
          }

          /* Titresim de var: ekran kapaliyken ya da cepteyken KARARI
              bildiren tek kanal ses ve titresim. Android bunu baştan beri
              veriyor (`WalkModeScreen`), web vermiyordu. */
          setVerdict(ok ? "correct" : "wrong");
          /* SESI `vibrate` CALIYOR (`lib/fx`: once `play`, sonra titresim).
             Buraya `vibrate` eklenirken var olan `play` cagrisi kalmis ve ses
             iki kez isteniyordu; tek duyulmasi `sfx`in yineleme penceresine
             kalmisti. Mobilde ayni artik `game/rounds`ta duruyordu. */
          vibrate(ok ? "correct" : "wrong");
          results.push({
            wordId: word.id,
            game: "speak",
            correct: ok,
            latencyMs: Date.now() - askedAt,
            hintUsed: false,
            ...miss(ok, "pronunciation"),
          });
          tallyRef.current = {
            correct: tallyRef.current.correct + (ok ? 1 : 0),
            total: tallyRef.current.total + 1,
          };
          walkRef.current.correct += ok ? 1 : 0;
          walkRef.current.total += 1;
          // Ekranda yürüyüşün toplamı görünüyor: kullanıcı için anlamlı olan
          // "bu yürüyüşte ne yaptım", sunucudaki oturumun sayacı değil.
          setTally({ correct: walkRef.current.correct, total: walkRef.current.total });
          settle(word);

          if (!ok) {
            if (!missed.current.some((m) => m.id === word.id)) {
              // Anlam ANADİLDE (özet listesi onu gösteriyor); alan adı tarihsel.
              missed.current.push({ id: word.id, de: target, tr: glossFor(word, lang)?.text ?? "", en: glossFor(word, lang)?.sub ?? null });
            }
            // Yanlışta doğrusu okunuyor: ekransız akışta düzeltmeyi görmenin
            // başka yolu yok.
            await say([
              { lang, narration: true, text: t("walk.correct_is") },
              targetSegment(target),
            ]);
          } else {
            await say([targetSegment(target)]);
          }
          if (!alive()) return;
          /*
            Turlar arasında kısa bir nefes.

            Ekran açık yolda tanıyıcı doğru cevabı duyar duymaz kapanıyor ve
            sonraki soru hemen okunuyordu — "aşırı hızlı" bunun içindi. Küçük
            bir es kulağa daha rahat geliyor.
          */
          if (!ok || document.visibilityState === "visible") {
            await new Promise<void>((r) => afterMs(ok ? GAP_MS : CORRECTION_GAP_MS, r));
            if (!alive()) return;
          }
        }

        const last = i >= current.length - 1;
        await flush(last);
        if (!alive()) return;
      }

      if (!alive()) return;
      /* Onay sorusunda duraklatılıp dönülünce döngü buraya düşüyor: bitiş bir kez yazılır. */
      if (!finished.current) {
        finished.current = true;
        play("finish");
        /* Yürüyüş turunun bitişi de KİND taşıyor: kind'sız yazıldığında rapor
           onu karışık turlarla aynı kovaya koyuyordu. Mobil `WalkModeScreen`
           bu olayı HİÇ yazmıyor - orası ayrı bir eksik (bkz. §11.31). */
        track("session_done", tallyRef.current.correct, "walk");
      }

      const again = await askContinue(tallyRef.current.correct, tallyRef.current.total);
      if (!alive()) return;
      if (again === "no") {
        track("walk_end", 1);
        ended.current = true;
        setPhase("speaking");
        await say([{ lang, narration: true, text: t("walk.goodbye") }]);
        void release();
        endedAt.current = Date.now();
        setStatus("done");
        return;
      }

      setPhase("speaking");
      await say([{ lang, narration: true, text: t("walk.continuing") }]);
      const fetched = await fetchSession();
      if (!alive()) return;
      if (fetched === "locked" || fetched === "fair_use") {
        track("premium_gate", 0, "walk");
        track("walk_end", 2);
        ended.current = true;
        void release();
        endedAt.current = Date.now();
        setStatus(fetched);
        return;
      }
      const next = fetched;
      if (!next?.rounds.length) {
        track("walk_end", 2);
        ended.current = true;
        await say([{ lang, narration: true, text: t("walk.no_more") }]);
        endedAt.current = Date.now();
        setNoMore(true);
        setStatus("done");
        return;
      }

      // Sunucudaki oturum sayacı sıfırlanıyor, yürüyüşün toplamı devam ediyor.
      current = next.rounds;
      start = 0;
      resumeAt.current = 0;
      finished.current = false;
      setSession(next);
      setIndex(0);
      tallyRef.current = { correct: 0, total: 0 };
      missed.current = [];
      walkRef.current.sessions += 1;
      startedAt.current = Date.now();
      resetCombo();
      play("start");
      }
    },
    [askContinue, course, fetchSession, flush, hear, release, say, lang, t],
  );

  /**
   * Başla.
   *
   * AÇIKLAMA VE SES RIZASI YOK (2026-09-27). Eskiden mikrofon açılmadan önce
   * uygulama içi bir açıklama ve sunucudaki `ai_voice` rızası isteniyordu,
   * çünkü tanıyıcısı olmayan tarayıcıda ses sunucuya ve konuşma tanıma
   * sağlayıcılarına gidiyordu. Web artık hiç ses göndermiyor; mikrofon izni
   * tarayıcının kendi diyaloğunda soruluyor, konuşmalardaki gibi. Mobil
   * açıklama (ekran kapalı yürüyüş sesi sunucuya gönderiyor) ayrı ve yerinde.
   */
  function begin(mode: "pocket" | "screen") {
    // Tanıyıcı yoksa ekran karartılmadan önce söyleniyor (karanlık katman
    // "desteklenmiyor" ekranını örterdi).
    if (!recognitionCtor()) return setStatus("unsupported");
    /* DURAKLATILMIŞ TURA DÖNÜŞ SESLE KARŞILANIYOR. Duyuru doğrudan okunmuyor,
       döngünün ön okumasına bırakılıyor (`resumePreroll`): döngü ilk işi
       olarak onu okuyor ve ardından kelimeyi — araya kelime karışmıyor. */
    if (status === "paused") resumePreroll.current = true;
    if (mode === "pocket") darken();
    void start(resumeAt.current);
  }

  async function start(from: number) {
    const rounds = session?.rounds;
    if (!rounds?.length) return;

    /*
      Tek yakalama yolu tarayıcının kendi tanıyıcısı: sunucuya hiçbir şey
      gitmiyor. Yoksa (ör. Firefox) tur başlamıyor ve hangi tarayıcıda
      çalıştığı söyleniyor — ses başka bir yola gönderilmiyor. Tanıyıcı izin
      isteminden ÖNCE soruluyor: kullanılamayacak bir mikrofon için izin
      istenmesin.

      Mikrofon akışı burada TUTULMUYOR (yalnız izin doğrulanıyor): tutulan
      akış tarayıcı tanıyıcısını sağırlaştırıyor — sahibin telefonunda altı
      dinlemenin altısı boş — ve Bluetooth'ta okumayı telefon yoluna
      düşürüyordu.
    */
    browserRef.current = Boolean(recognitionCtor());
    if (!browserRef.current) return setStatus("unsupported");
    const permission = await requestMicrophone();
    if (permission === "denied") return setStatus("denied");

    // Ekran kilidi DOKUNUŞUN İÇİNDE; WebAudio bağlamı da burada uyandırılıyor
    // (konuşmanın işareti ve boşluksuz okuma ona bağlı).
    void acquire();
    sharedAudioContext();
    resetCombo();
    heardLog.current = [];
    /* Duraklamadan dönüş aynı oturum: saat sıfırlanmıyor, duraklama kadar
       ileri kayıyor (sunucuya giden süre etkin süre). `askedIds` de korunuyor. */
    if (pausedAt.current !== null) startedAt.current += Date.now() - pausedAt.current;
    else startedAt.current = Date.now();
    pausedAt.current = null;
    if (walkBegan.current === null) walkBegan.current = Date.now();
    endedAt.current = null;
    setNoMore(false);
    ended.current = false;
    reask.current = false;
    setStatus("playing");
    track("walk_start", from);
    void loop(rounds, from);
  }

  /**
   * "Cebe koy" — ekranı KARARTIR ama kapatmaz (bkz. `screenDark`).
   *
   * Ekran açık kaldığı için tarayıcının tanıyıcısı (ekrandaki kusursuz yol)
   * cepte de çalışıyor; HyperOS'un ekran-kapanınca-sustur davranışına hiç
   * girilmiyor. Wake lock tur başında zaten alındı; burada teyit ediliyor.
   *
   * TAM EKRAN şart: siyah katman yalnız web sayfasını örter, Android'in üst
   * durum çubuğu (saat/pil) ve alt gezinme düğmeleri sayfanın ÜSTÜNDE kalır ve
   * cepte kazara basılabilir (geri, ana ekran, hatta arama). `requestFullscreen`
   * ikisini de gizliyor — kullanıcı dokunuşunun içinden çağrıldığı için izinli.
   */
  function darken() {
    if (screenDark) return;
    void acquire();
    darkTaps.current = [];
    setScreenDark(true);
    try {
      void document.documentElement.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
    } catch {
      /* fullscreen reddedilirse katman yine örter, yalnız sistem çubukları kalır */
    }
    track("walk_switch", 1, "dark");
    // Anons kısa: uzun açıklama akışı boğuyordu.
    if (hearCtl.current && !hearCtl.current.signal.aborted) {
      // Kelime DİNLENİRKEN cebe kondu: süren dinleme iptal edilip önce anons,
      // sonra kelime tekrar okunup yeniden dinleniyor (reask) — kullanıcı
      // darken'a basarken kelimeyi kaçırmasın. Tanıyıcı da DURDURULUYOR:
      // işaret yalnız döngüye gidiyordu, tanıyıcı açık kalıp cevabı alıyor,
      // döngü de onu atıp kelimeyi yeniden soruyordu.
      announce.current = t("walk.pocket_announce");
      reask.current = true;
      hearCtl.current.abort();
      cancel();
    } else {
      // Başlangıçta ("Cebe koy, başla") ya da iki dinleme arasında cebe kondu:
      // anons SIRADAKİ kelimeden ÖNCE okunmalı (bkz. loop) — yoksa "önce
      // kelime, sonra cebe konuldu" sırası oluyordu.
      pocketPreroll.current = true;
    }
  }

  /** Karanlık katmana dokunuş — 1,2 sn içinde üç kez olursa çıkılır. */
  function onDarkTap() {
    const now = Date.now();
    darkTaps.current = [...darkTaps.current.filter((t) => now - t < 1200), now];
    if (darkTaps.current.length >= 3) exitDark();
  }

  /**
   * Turu duraklatır.
   *
   * `announce` YALNIZ kullanıcının kendi duraklatmasında: otomatik duruşların
   * (tanıyıcı öldü, rıza yok, mikrofon susuyor) sebebi zaten çağıran tarafından
   * okunuyor, üstüne bir de "tur duraklatıldı" demek o cümleyi keserdi.
   *
   * Sıra önemli: önce döngü ve ÇALAN okuma susturuluyor (`stopAll`), sonra
   * duyuru okunuyor. Duyuru döngünün `say`ini kullanamaz — o artık geçersiz bir
   * jetona bağlı; ekran kapanma uyarısı da aynı sebeple doğrudan okuyor.
   */
  function pause(announce = false) {
    if (!ended.current) track("walk_end", 6);
    ended.current = true;
    stopAll();
    void release();
    setStatus("paused");
    if (!announce) return;
    speakSegments(
      [{ lang, narration: true, text: t("walk.paused_spoken") }],
      undefined,
      undefined,
      { background: typeof document !== "undefined" && document.visibilityState === "hidden" },
    );
  }

  useEffect(() => {
    pauseRef.current = () => pause();
  });

  /* Duraklamanın her yolu (düğme, ekran kapandı, mikrofon susuyor, tanıyıcı
     öldü) buradan geçiyor: başlangıç anı tek yerde yazılıyor (bkz. `pausedAt`). */
  useEffect(() => {
    if (status === "paused" && pausedAt.current === null) pausedAt.current = Date.now();
  }, [status]);

  /* Turu KAPATMAK ile ekrandan CIKMAK ayri: kenar cubugundan bir bagantiya
     gidildiginde turun sesi, mikrofonu ve tam ekrani kapanmali ama gidilecek
     yer `onExit`in yeri degil, tiklanan bagantidir. */
  function teardown() {
    if (!ended.current && status === "playing") track("walk_end", 6);
    ended.current = true;
    stopAll();
    void release();
    exitFullscreen();
    // Geri bildirim okunurken duraklatılıp çıkıldıysa o turun cevabı kuyrukta (bkz. settle).
    void flush(false);
  }

  function leave() {
    teardown();
    onExit();
  }

  /**
   * Ekran kapanınca (ya da sayfa gizlenince) tur DURUYOR — ama SESSİZCE değil.
   *
   * Mikrofon kilitli ekranda istenemiyor, tanıyıcı da gizli sayfada susuyor;
   * yapılabilecek dürüst tek şey sebebi ve çaresini söylemek. Ekranı
   * kapatmadan cebe koymak zaten mümkün: "Cebe koy" ekranı karartıyor ama
   * açık tutuyor (bkz. `darken`).
   */
  useEffect(() => {
    if (status !== "playing") return;
    const onChange = () => {
      if (document.visibilityState === "hidden") {
        /* TUR ZATEN BİTTİYSE HİÇBİR ŞEY. "Bitir" ya da duraklatma turu kapatıp
           ekranı da değiştirdiğinde (sayfadan ayrılma, sekme değişimi) bu
           dinleyici hâlâ bağlıydı ve İKİNCİ bir bitiş yazıyordu: üretimde
           16 Eylül 21:51:15'te aynı yürüyüş için hem 6 (elle çıkıldı) hem 5
           (ekran kapandı) var. Mobilde bu koruma baştan beri vardı (`endWalk`
           `walkEnded`); "yürüyüş nasıl bitti" sorusunun tek cevabı olmalı. */
        if (ended.current) return;
        /*
          Sıra önemli: önce döngü durduruluyor (yoksa yarıda kalan bir okuma
          duyuruyla çakışır), sonra sebep söyleniyor. Duyuru döngünün `say`ini
          kullanmıyor çünkü o artık geçersiz bir jetona bağlı.
        */
        track("walk_end", 5);
        ended.current = true;
        stopAll();
        void release();
        setStatus("paused");
        speakSegments(
          [
            {
              lang,
              narration: true,
              text: t("walk.screen_off_warning"),
            },
          ],
          undefined,
          undefined,
          { background: true },
        );
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [status, stopAll, release, lang, t]);

  // ── Görünüm ────────────────────────────────────────────────────────

  /**
   * Sayaç SORU turlarını sayar, öğretme (intro) turlarını DEĞİL.
   *
   * Eskiden `rounds.length` idi ve öğretme turları da paydaya giriyordu: üstte
   * "7 / 20" yazarken bitiş ekranı "4 doğru / 12" diyordu — aynı turun iki ayrı
   * paydası. Öğretme turu bir soru değil, cevabı da yok; bitişteki toplam zaten
   * yalnız soruları sayıyor. Mobil bunu böyle yapıyor, ikisi artık aynı.
   */
  const rounds = session?.rounds ?? [];
  const total = rounds.filter((r) => r.game !== "intro").length || rounds.length;
  const step = Math.min(
    total,
    rounds.slice(0, index).filter((r) => r.game !== "intro").length +
      (rounds[index] && rounds[index].game !== "intro" ? 1 : 0),
  );

  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (status === "loading") return <Frame role="status" busy><p className="muted">{t("walk.preparing")}</p></Frame>;

  if (status === "error")
    return (
      <FlowColumn>
        <StateBody alert title={t("walk.error_title")} body={t("walk.error_sub")} />
        {/* YERİNDE TEKRAR DENEME. Tek çıkış "Geri dön"dü: geçici bir ağ
            hatası kullanıcıyı yürüyüş modundan tamamen atıyordu -- oysa
            metnin kendisi "bağlantını kontrol edip tekrar dene" diyor.
            Android'deki sıra: birincil "tekrar dene", ikincil çıkış. */}
        <FlowActions
          primary={{ label: t("common.try_again"), onClick: () => { setStatus("loading"); void load(); } }}
          close={leave}
        />
      </FlowColumn>
    );

  /* TUR HAKKI BİTTİ (2026-09-25): ücretsizde günde 3 tur. Kilit, yarın
     yenileneceği ve Premium'la ekran kapalıyken de, günlük tur beklemeden
     yürüneceği söyleniyor. */
  if (status === "locked" || status === "fair_use")
    return (
      <FlowColumn>
        <StateBody
          title={t(status === "locked" ? "unlock.walk_spent" : "gate.fair_use", { n: walkNow?.perDay ?? 0 })}
          body={status === "locked" ? t("plan.pro_pocket_walk") : undefined}
        />
        <FlowActions
          primary={status === "locked" ? { label: t("unlock.premium_now"), onClick: () => router.push("/premium") } : { label: t("common.close"), onClick: leave }}
          close={status === "locked" ? leave : null}
        />
      </FlowColumn>
    );

  /* BUGÜNLÜK KELİME YOK — mobille aynı metin (`walkmode.done_no_more*`);
     iki platform aynı boş kuyruğu iki ayrı cümleyle anlatıyordu. */
  if (status === "empty")
    return (
      <FlowColumn>
        <StateBody title={t("walkmode.done_no_more")} body={t("walkmode.done_no_more_sub")} />
        <FlowActions primary={{ label: t("common.close"), onClick: leave }} />
      </FlowColumn>
    );

  if (status === "unsupported")
    return (
      <FlowColumn>
        <StateBody title={t("walk.unsupported_title")} body={t("walk.unsupported_sub")} />
        <FlowActions primary={{ label: t("common.close"), onClick: leave }} />
      </FlowColumn>
    );

  /* İZİN YOK: metin "izin verip tekrar dene" diyordu ama deneyecek düğme
     yoktu; mobil aynı yerde birincil düğmeyle yeniden istiyor. Tarayıcıda
     ayarları açmanın yolu yok — "tekrar dene" izni yeniden soruyor. */
  if (status === "denied")
    return (
      <FlowColumn>
        <StateBody title={t("walk.denied_title")} body={t("walk.denied_sub")} />
        <FlowActions
          primary={{ label: t("common.try_again"), onClick: () => void start(resumeAt.current) }}
          close={leave}
        />
      </FlowColumn>
    );

  /* İçerik bildirimi: ekrandaki kelime (yürüyüş sesli; ses sorunu da buradan).
     Başlıkta değil: hükümden SONRA kelime kartının altında ve duraklamada —
     yürürken ekrana bakılmıyor, bildirmek için durulan anlar bunlar. */
  const openWordReport = () => {
    if (!prompt) return;
    const snap = snapshot({ de: prompt.de, gloss: prompt.tr, heard: heardText || undefined, verdict });
    if (status === "playing") pause();
    setWordReport({ target: { type: "word", id: String(prompt.id), game: prompt.game }, snap });
  };
  const reportWord = (className: string) =>
    prompt ? (
      /* `inline`: sol baş kuralının tek istisnası (`report-flag` `ReportLink`); yürüyüş kartı ortalı. */
      <ReportLink onClick={openWordReport} label={t("report.flag_a11y")} className={className} inline />
    ) : null;

  if (status === "ready" || status === "paused") {
    /* Bugün kalan tur — bu tur sayıldıktan SONRAKİ sayı; son turdaysa satır yok. */
    const walkLine = walkNow && !walkNow.premium && walkNow.remaining > 0 ? t("unlock.walk_left", { n: walkNow.remaining }) : null;
    /* Kaldığın yer: kapakta da duraklamada da aynı satır. */
    const where = (
      <FlowNote
        text={
          <>
            <span className="muted">{t("walk.where_you_left")} </span>
            <strong>{Math.max(1, step)}</strong>
            <span className="muted"> / {t("walk.n_rounds", { n: total })}</span>
          </>
        }
      />
    );
    /*
      İki başlatma: "Cebe koy" ekranı karartarak başlatır (fullscreen düğme
      dokunuşunun içinde alınıyor, sonra tur); "Ekran açık" normal. Ekran
      açık başlayan da tur içinde "Cebe koy"a basabilir.
    */
    const actions = (
      <FlowActions
        primary={{ label: t(status === "paused" ? "walk.pocket_continue" : "walk.pocket_start"), onClick: () => begin("pocket") }}
        secondary={{ label: t(status === "paused" ? "walk.screen_continue" : "walk.screen_start"), onClick: () => begin("screen") }}
        close={leave}
      />
    );
    return (
      <FlowColumn>
        {status === "paused" ? (
          /* DURAKLAMA — durum şablonu (bekleniyor = düşünen maskot). */
          <>
            <StateBody title={t("walk.paused")} body={t("walk.paused_note")} />
            {prompt ? <div className="flex justify-center">{reportWord("")}</div> : null}
            {wordReport ? (
              <ReportDialog
                open
                kind="content"
                refId={targetRef(wordReport.target)}
                content={wordReport.snap}
                surface="walk"
                target={wordReport.target}
                onClose={() => setWordReport(null)}
              />
            ) : null}
          </>
        ) : (
          /* KAPAK ŞABLONU — mobil `WalkModeScreen` kapağıyla aynı kural
             satırları (eski iki paragraflık tanıtım bunlara bölündü).
             Cebe koyma talimatı (`walk.intro_2`) WEB'E ÖZEL: mobilde ekran
             gerçekten kapanıyor, karartma düğmesi yok. */
          <CoverBody
            icon={<WalkIcon size={28} />}
            tint="var(--color-violet-500)"
            eyebrow={t("learn.walk_mode")}
            title={t("walkmode.listen_and_say_it")}
            pitch={t("walkmode.cover_pitch")}
            rules={[
              { icon: <SpeakerIcon size={16} />, text: t("walkmode.rule_hint", { nativeLang: nativeLangName(lang) }) },
              { icon: <SkillSpeakingIcon size={16} />, text: t("walkmode.rule_say", { target: courseName(course, lang) }) },
              { icon: <NewWordsIcon size={16} />, text: t("walkmode.rule_teach") },
              { icon: <CorrectIcon size={16} />, text: t("walkmode.rule_verdict") },
              { icon: <ResumeIcon size={16} />, text: t("walkmode.rule_continue") },
            ]}
            note={t("walk.intro_2")}
          />
        )}
        {where}
        {walkLine ? <FlowNote icon={<WalkIcon size={16} />} text={walkLine} /> : null}
        {actions}
      </FlowColumn>
    );
  }

  if (status === "done") {
    const doneMin = Math.max(1, Math.round(((endedAt.current ?? Date.now()) - (walkBegan.current ?? startedAt.current)) / 60000));
    return (
      /* SONUÇ ŞABLONU — mobil `WalkModeScreen` bitişiyle aynı alanlar: band →
         üç sayı → notlar → Devam / Paylaş / Bitir. Halka kalktı (bandın ana
         sayısı aynı bilgi); kutlama eşiği eskisi gibi %60. Sonucu duyuran
         bandın kendi `role="status"`u (bkz. 11.337). */
      <FlowColumn celebrate={tally.total > 0 && donePct >= 60}>
        <ResultHero
          eyebrow={t("learn.walk_mode")}
          title={t("walkmode.done_title")}
          figure={`${tally.correct}/${tally.total || 0}`}
          sub={t("walkmode.done_saved")}
        />
        {tally.total > 0 ? (
          <StatRow
            items={[
              { value: formatPercent(donePct, lang), label: t("summary.accuracy") },
              ...(taught.current > 0 ? [{ value: String(taught.current), label: t("walkmode.stat_new") }] : []),
              { value: t("time.minutes_short", { m: doneMin }), label: t("walkmode.stat_time") },
            ]}
          />
        ) : null}
        {/* Birden fazla tur yapıldığında sayılar yürüyüşün TOPLAMI; bunu söyleyen
            satır web'e özel, çünkü mobil sayacı tur başına sıfırlıyor. */}
        {walkRef.current.sessions > 1 ? <FlowNote text={t("walk.n_rounds", { n: walkRef.current.sessions })} /> : null}
        {noMore ? <FlowNote icon={<InboxIcon size={16} />} text={t("walkmode.done_no_more_sub")} /> : null}
        <FlowActions
          primary={noMore ? { label: t("common.close"), onClick: leave } : { label: t("common.continue"), onClick: () => { setStatus("loading"); void load(); } }}
          secondary={tally.total > 0 ? { label: t("common.share"), icon: <ShareIcon size={19} />, onClick: () => void shareText(resultText(lang, course, tally.correct, tally.total), "result") } : null}
          close={noMore ? null : leave}
        />
      </FlowColumn>
    );
  }

  // playing
  return (
    <Frame>
      {/*
        Karanlık kilit — ekranı örter ama kapatmaz. Tüm dokunmaları yutar
        (cepte kazara basılmasın); çıkış için üç dokunuş. Ekran açık kaldığı
        için tanıyıcı çalışmaya devam ediyor, akış kulakta sürüyor.
      */}
      {screenDark ? (
        <div
          onClick={onDarkTap}
          /* ORTU KENDINI DUYURUYOR VE KLAVYEYE BIR CIKIS BIRAKIYOR.
             Iki ayri kusur vardi:

             1. Ortu ekranin tamamini kapatiyor ve etkilesim kipini
                degistiriyor ("ekran karanlik ama acik - seni dinliyorum"),
                ama hicbir sey bunu duyurmuyordu: sesli okuyucu kullanan biri
                ortunun geldigini ogrenmiyordu.
             2. Cikis yalnizca UC DOKUNUSTU. Dokunmalarin yutulmasi bilincli
                (cepte kazara basilmasin) ama klavye kullanan biri icin bu bir
                KLAVYE TUZAGI: ortu her seyi kapatiyor, tiklamalar yutuluyor ve
                disari cikan hicbir tus yok (WCAG 2.1.2). Escape eklendi -
                kazara basilan bir tus degil, bilincli bir cikis; uc dokunus
                kurali dokunmatikte oldugu gibi kaliyor.

             Bu ortu WEB'E OZEL (anahtarlari `i18n/web`de): mobilde ekran
             gercekten kapaniyor, taklit bir karartmaya gerek yok. Yani burada
             Android'e bakilacak bir karsilik yok, olcut mutlak. */
          role="status"
          ref={darkOverlay}
          tabIndex={-1}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-end outline-none"
          style={{ background: "#000", touchAction: "none" }}
        >
          <p className="mb-24 px-8 text-center text-caption leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            {t("walk.dark_listening")}
            <br />
            {t("walk.dark_exit")}
          </p>
        </div>
      ) : null}

      {/* ÇIKIŞ BAŞLIKTA DA: tur sürerken tek çıkış sayfanın en altındaki
          "Bitir" düğmesiydi ve ekran kaydırılmadan görünmüyordu. Android'in
          kip başlığında 44 px'lik bir kapat karosu var (`WalkModeScreen`
          `topBar`) ve o da bu onayı açıyor. */}
      <div className="mb-4 flex items-baseline justify-between gap-3 text-caption">
        <RoundExit onExit={() => setQuit(true)} labelKey="walkmode.exit_walk_mode" />
        <span className="muted flex-1">{Math.max(1, step)} / {total}</span>
        <span className="flex items-center gap-2">
          {/* Kip ekranda: cepte (ekran karartıldı) mı, ekran açık mı. Yakalama
              yolu ikisinde de tarayıcının tanıyıcısı. */}
          <span
            className="rounded-full px-2 py-0.5 text-micro uppercase tracking-eyebrow"
            style={{
              background: screenDark
                ? "color-mix(in srgb, var(--color-mint-500) 14%, transparent)"
                : "color-mix(in srgb, var(--color-flame-500) 14%, transparent)",
              color: screenDark ? "var(--color-mint)" : "var(--color-flame)",
            }}
          >
            {t(screenDark ? "walk.chip_pocket" : "walk.chip_screen")}
          </span>
          <span className="muted tabular-nums">
            {t("common.n_correct", { correct: tally.correct, total: tally.total })}
          </span>
        </span>
      </div>

      {/* Ekran ikincil: asıl akış kulakta. Yine de bakan biri ne olduğunu
          bir bakışta görmeli — bu yüzden tek büyük satır. */}
      <motion.div
        key={`${index}-${phase}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[9rem] flex-col items-center justify-center text-center"
      >
        {asking ? (
          <>
            <motion.span
              animate={phase === "listening" ? { scale: [1, 1.15, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)", color: "var(--color-mint)" }}
            >
              <SkillSpeakingIcon size={28} />
            </motion.span>
            <p className="mt-3 text-h3">{t("walk.continue_q")}</p>
            <p className="muted mt-1 text-body">
              {phase === "listening" ? t("walk.say_yes_no") : "…"}
            </p>
          </>
        ) : phase === "listening" ? (
          <>
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: "var(--brand-tint)",
                color: "var(--color-brand)",
              }}
            >
              <SkillSpeakingIcon size={28} />
            </motion.span>
            <p className="mt-3 text-h3">{prompt?.tr}</p>
            <p className="muted mt-1 text-body">{t("walk.say_target", { target: courseName(course, lang) })}</p>
          </>
        ) : verdict ? (
          <>
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background:
                  verdict === "correct"
                    ? "color-mix(in srgb, var(--color-mint-500) 14%, transparent)"
                    : verdict === "wrong"
                      ? "color-mix(in srgb, var(--color-flame-500) 14%, transparent)"
                      : "var(--surface-2)",
                color: verdict === "correct" ? "var(--color-mint)" : verdict === "wrong" ? "var(--color-flame)" : "var(--color-brand)",
              }}
            >
              {verdict === "correct" ? <CorrectIcon size={28} /> : verdict === "wrong" ? <WrongIcon size={28} /> : <SkillSpeakingIcon size={28} />}
            </span>
            <p className="mt-3 text-h3">{prompt?.de}</p>
            <p className="muted mt-1 text-body">
              {verdict === "correct"
                ? t("common.correct")
                : verdict === "unheard"
                  ? t("walk.not_heard")
                  : verdict === "skip"
                    ? t("walk.skip_ok")
                    : prompt?.tr}
            </p>
            {verdict === "wrong" && heardText ? (
              <p className="muted mt-2 text-caption">
                {t("walk.i_heard")} <span className="font-semibold">“{heardText}”</span>
              </p>
            ) : null}
            {reportWord("mt-2")}
          </>
        ) : (
          <>
            <p className="text-h3">{prompt?.tr ?? "…"}</p>
            <p className="muted mt-1 text-body">{t("walk.speaking")}</p>
          </>
        )}
      </motion.div>

      {diag ? (
        <div
          className="mt-4 rounded-panel px-3 py-2 font-mono text-micro leading-snug"
          style={{ background: "rgba(17,17,19,0.92)", color: "#efefec" }}
        >
          <div style={{ opacity: 0.6 }}>dinlemeler · yol: tarayıcı</div>
          {diag.length ? diag.map((l, i) => <div key={i}>{l}</div>) : <div>—</div>}
        </div>
      ) : null}

      {/* Düğmeler bilerek büyük: yürürken ve bakmadan basılıyor. */}
      {/*
        "Cebe koy" ekranı KARARTIR ama kapatmaz: cihaz testinde (HyperOS) ekran
        kapanınca sistem mikrofonu susturuyor, ekran açık kalınca tanıyıcı
        çalışıyor. Tanıyıcı öldüyse (tur duruyor) gösterilmiyor.
      */}
      {browserRef.current ? (
        <button onClick={darken} className="btn btn-primary mt-6 w-full px-5 py-4 text-h3">
          {t("walk.pocket_darken")}
        </button>
      ) : null}
      <button onClick={() => pause(true)} className={`btn btn-ghost ${browserRef.current ? "mt-2" : "mt-6"} w-full px-5 py-4 text-h3`}>
        {t("walk.pause")}
      </button>
      {/* TUR ORTASINDA SORULUYOR. "Bitir" tek dokunuşta turu kapatıyordu;
          Android aynı yerde soruyor ("Bu tur yarım kalır; öğrendiklerin
          kaydedilir") çünkü yürüyüşte düğmeye kazara basmak kolay ve tur
          sesli sürdüğü için ekrana bakılmıyor. Bitmiş turun "Bitir"i
          sorulmuyor: orada bitirecek bir şey kalmadı -- Android'de de
          koşul `inSession`. */}
      <ConfirmDialog
        open={quit || ayril.pending !== null}
        title={t("walkmode.end_walk")}
        message={t("walkmode.back_message")}
        confirmLabel={t("common.finish")}
        destructive
        onConfirm={() => { setQuit(false); if (ayril.pending) { teardown(); ayril.leave(); } else leave(); }}
        onCancel={() => { setQuit(false); ayril.stay(); }}
      />
      <button onClick={() => setQuit(true)} className="btn btn-ghost mt-2 w-full px-5 py-3">
        {t("common.finish")}
      </button>
    </Frame>
  );
}

/**
 * `role` DISARIDAN: Frame yuruyusun butun durumlarini sariyor (izin, hata,
 * oynama, bitis) ve `role="status"`u burada sabitlemek tur yururken de canli
 * bolge acmak olurdu. Sonucu duyuran yalniz bitis dali. Ayni kalip
 * `boss-player`da da var.
 */
function Frame({ children, role, busy }: { children: React.ReactNode; role?: "status" | "alert"; busy?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div role={role} aria-busy={busy ? "true" : undefined} className="card p-6">{children}</div>
    </div>
  );
}

/**
 * Yürüyüş kapısının cevabı: 403 premium_required → "locked", 429 → "fair_use".
 * Başka her şey null (çağıran kendi hata dalına bakar).
 */
async function walkGate(res: Response): Promise<"locked" | "fair_use" | null> {
  if (res.status === 429) return "fair_use";
  if (res.status !== 403) return null;
  const j = (await res.clone().json().catch(() => null)) as { error?: string } | null;
  return j?.error === "premium_required" ? "locked" : null;
}
