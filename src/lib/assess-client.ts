"use client";

import { overallScore, type AssessRequest, type Assessment } from "@/lib/assess-prompts";
import { translate, DEFAULT_NATIVE } from "@/lib/i18n/dict";
import { localDay } from "@/lib/day";
import { track } from "@/lib/track";

/**
 * `/api/assess` istemci yardımcısı (WP-03).
 *
 * Bileşenler `fetch`i kendileri yazmasın: zaman aşımı, iptal, hata kodlarının
 * anlamı ve sağlayıcı yokken ne yapılacağı burada tek yerde. Sonuç ya bir
 * değerlendirmedir ya da neden alınamadığıdır; ikisinde de bileşen bir şey
 * gösterebilir — "AI değerlendirmesi şu an kapalı" bir hata ekranı değil,
 * kural tabanlı yedeğin yanındaki bir satır (`fallbackAssessment`).
 */

export type AssessFailure =
  | "premium"
  | "not_configured"
  | "quota"
  | "too_long"
  | "timeout"
  | "aborted"
  | "invalid"
  | "upstream"
  | "unauthorized"
  | "bad_request";

export type AssessResponse =
  | { ok: true; result: Assessment; cached: boolean; provider: string | null }
  | { ok: false; reason: AssessFailure };

/**
 * Tek cevaplık değerlendirmede bekleme tavanı.
 *
 * Alt çizgisiz yazılı: `check:parity`nin ortak sayısal sabit taraması
 * `20_000` biçimini görmüyor ve mobildeki aynı adlı sabitle karşılaştırma
 * tam da bu yüzden kaçıyordu.
 */
export const ASSESS_TIMEOUT_MS = 20000;

/**
 * Rol yapma sınavının puanlanmasında bekleme tavanı.
 *
 * Konuşmanın TAMAMI gönderiliyor, tek bir cümle değil; model yanıtı buna
 * göre uzun sürüyor. Mobil bu çağrıda baştan beri otuz saniye bekliyordu
 * (`RoleplayExamScreen`, `timeoutMs: 30_000`), web ise varsayılan yirmiyle
 * yetiniyordu: uzun bir konuşma webde zaman aşımına düşerken mobilde
 * puanlanıyordu — aynı sınav, aynı cevap, farklı sonuç. Sayı artık iki
 * tarafta aynı adla yazılı.
 */
export const ASSESS_ROLEPLAY_TIMEOUT_MS = 30000;

/** Kullanıcıya gösterilecek kısa açıklama. */
export const ASSESS_FAILURE_KEYS: Record<AssessFailure, string> = {
  // Bir HATA değil bir KAPI: ücretsiz katmanın yapay zekâ değerlendirme hakkı
  // bitmiş. Genel hata metniyle göstermek kullanıcıya "bir şey bozuldu" dedirtir.
  premium: "assess.fail_premium",
  not_configured: "assess.fail_not_configured",
  /* WEB'E ÖZEL ANAHTAR. Bu satırın metni platforma göre GERÇEKTEN farklı:
     webde hak dolunca kural tabanlı yedek gösteriliyor (`fallbackAssessment`),
     mobilde puan hiç verilmiyor. Ama aynı ANAHTAR altında iki metin taşımak
     sessiz bir gölgeleme demekti (`{...base, ...web}` içinde web kazanıyor);
     ayrı ad, farkı görünür kılıyor. */
  quota: "assessw.fail_quota",
  too_long: "assess.fail_too_long",
  timeout: "assess.fail_timeout",
  aborted: "",
  invalid: "assess.fail_invalid",
  upstream: "assess.fail_upstream",
  unauthorized: "assess.fail_unauthorized",
  bad_request: "assess.fail_bad_request",
};

export async function askAssess(
  req: AssessRequest,
  opts: { signal?: AbortSignal; timeoutMs?: number } = {},
): Promise<AssessResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), opts.timeoutMs ?? ASSESS_TIMEOUT_MS);
  const onOuter = () => controller.abort("aborted");
  opts.signal?.addEventListener("abort", onOuter, { once: true });

  try {
    const res = await fetch("/api/assess", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...req, day: localDay() }),
      signal: controller.signal,
    });
    if (res.ok) {
      const data = (await res.json()) as { result: Assessment; cached: boolean; provider: string | null };
      return { ok: true, result: data.result, cached: data.cached, provider: data.provider };
    }
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    const reason = refusal(res.status, err);
    if (reason === "premium") {
      /* KİLİDE TAKILAN AN ÖLÇÜLÜYOR. `premium_gate` iki platformun da kayıt
         defterinde yazılıydı ("paywall'ı hangi kısıt besliyor, oradan
         görülür") ama hiçbiri göndermiyordu: paywall'ı GÖRENLER sayılıyor,
         oraya İTEN kilit sayılmıyordu. Tür adı sunucunun kendi sözlüğünden
         (`lib/premium/gates` `PREMIUM_GATES`). */
      track("premium_gate", 0, req.kind === "writing" || req.kind === "sentence" ? "writing" : "speaking");
    }
    return { ok: false, reason };
  } catch {
    const why = controller.signal.reason;
    return { ok: false, reason: why === "timeout" ? "timeout" : why === "aborted" ? "aborted" : "upstream" };
  } finally {
    clearTimeout(timer);
    opts.signal?.removeEventListener("abort", onOuter);
  }
}

/**
 * Neden reddedildi — durum kodu tablosu.
 *
 * `askAssess`ten AYRI duruyor ki tablo yan etkisiz kalsın: kilit ölçümü
 * (`premium_gate`) kararı verildikten SONRA, tek yerde yapılıyor. Mobil
 * karşılığı `lib/assessFail` `assessFailure` ve iki tablo satır satır aynı
 * (parity §104).
 */
function refusal(status: number, err: { error?: string }): AssessFailure {
  switch (status) {
    /*
      403 iki ayrı şey olabilir ve ikisi çok farklı: premium kapısı (ücretsiz
      katmanın hakkı bitti) ya da yetkisizlik. Ayırt edilmezse premium reddi
      `default` dalına düşüp "geçersiz istek" diye gösteriliyordu — kullanıcı
      bir şeyin bozulduğunu sanıyor, oysa kapıya çarpmış.
    */
    case 403:
      return err.error === "premium_required" ? "premium" : "unauthorized";
    case 401:
      return "unauthorized";
    case 413:
      return "too_long";
    case 429:
      return "quota";
    case 502:
      return "invalid";
    case 503:
      return err.error === "not_configured" ? "not_configured" : "upstream";
    default:
      return "bad_request";
  }
}

/** Yedek değerlendirmenin dayandığı kontrol listesi — ekranda madde madde gösterilir. */
/**
 * Yedek denetim maddesi.
 *
 * Metin DEĞİL anahtar taşıyor: madde hem sunucuda kuruluyor hem üç ayrı
 * ekranda gösteriliyor, çeviri ise gösterildiği yerde yapılıyor. `kind` ayrıca
 * çağıranların maddeyi TANIMASINI sağlıyor — önceden `label.startsWith("Kalıp")`
 * yazılıydı, yani mantık Türkçe metne bağlıydı ve çeviri onu sessizce bozardı.
 */
export type FallbackCheck = {
  kind: "min_words" | "target" | "capital" | "punctuation" | "target_lang";
  key: string;
  vars?: Record<string, string | number>;
  ok: boolean;
};

export type FallbackAssessment = Assessment & {
  offline: true;
  checks: FallbackCheck[];
  words: number;
};

const MIN_WORDS: Record<AssessRequest["kind"], number> = {
  sentence: 3,
  writing: 30,
  speaking: 3,
  roleplay: 6,
};

function fold(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** "en az 40 kelime" gibi bir kısıttan sayıyı çeker. */
function minWordsFrom(constraints: string[] | undefined): number | null {
  for (const c of constraints ?? []) {
    const m = c.match(/en az\s+(\d+)\s+kelime|mindestens\s+(\d+)\s+w[oö]rter/i);
    if (m) return Number(m[1] ?? m[2]);
  }
  return null;
}

/**
 * Kural tabanlı asgari değerlendirme — sağlayıcı yokken.
 *
 * Dürüst olmak gerekir: bu dilbilgisini ölçmez, ölçemez. Ölçebildiği şey
 * görevin biçimsel kısmı: uzunluk, hedef kalıpların geçip geçmediği, cümle
 * başı büyük harf ve nokta (yazmada), Almanca yazıldığı (Türkçe karakter
 * yoksa). Dilbilgisi/kelime puanı bu yüzden verilmez (2 = "bilinmiyor"
 * değil; alt puanlar yalnız görev ve yapı üzerinden). Ekranda "AI kapalı"
 * satırıyla birlikte gösterilir; hiçbir zaman gerçek değerlendirme gibi
 * sunulmaz (`offline: true`).
 */
export function fallbackAssessment(
  req: AssessRequest,
  /**
   * Geri bildirim metinleri ARAYÜZ metni; Türkçe sabit yazılıydı ve AI
   * kapalıyken İngilizce/Almanca arayüzde Türkçe cümleler çıkıyordu.
   * Verilmezse Türkçeye düşer (eski çağıranlar kırılmasın diye).
   */
  t: (key: string, vars?: Record<string, string | number>) => string = (k, v) => translate(DEFAULT_NATIVE, k, v),
): FallbackAssessment {
  const text = req.answer.text.trim();
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const folded = ` ${fold(text)} `;
  const checks: FallbackCheck[] = [];

  const minWords = minWordsFrom(req.task.constraints) ?? MIN_WORDS[req.kind];
  checks.push({ kind: "min_words", key: "assess.min_words", vars: { min: minWords, n: words }, ok: words >= minWords });

  const targets = req.task.targets ?? (req.task.target ? [req.task.target] : []);
  let hit = 0;
  for (const t of targets) {
    // Kalıbın ilk anlamlı kelimesi yeter: "Ich hätte gern" için "haette" ya da "gern".
    const stems = fold(t)
      .split(" ")
      .filter((w) => w.length >= 3);
    const ok = stems.length ? stems.some((w) => folded.includes(` ${w} `) || folded.includes(` ${w}`)) : false;
    if (ok) hit++;
    checks.push({ kind: "target", key: "assess.target", vars: { pattern: t }, ok });
  }

  if (req.kind === "writing" || req.kind === "sentence") {
    checks.push({ kind: "capital", key: "assess.capital", ok: /^[A-ZÄÖÜ]/.test(text) });
    checks.push({ kind: "punctuation", key: "assess.punctuation", ok: /[.!?]$/.test(text) });
  }
  const turkishChars = /[çğışİ]/.test(text);
  checks.push({ kind: "target_lang", key: "assess.target_lang", ok: !turkishChars });

  const passed = checks.filter((c) => c.ok).length;
  const ratio = checks.length ? passed / checks.length : 0;
  const task = Math.round(ratio * 4);
  const structure = targets.length ? Math.round((hit / targets.length) * 4) : task;
  // Dilbilgisi ve kelime ölçülemiyor: nötr 2 — genel puanı ne şişirir ne batırır.
  const score = { task, grammar: 2, vocab: 2, structure };

  const missing = targets.filter((_, i) => !checks[1 + i]?.ok);
  return {
    offline: true,
    checks,
    words,
    score: { ...score, overall: overallScore(score) },
    errors: [],
    corrected: text,
    praise_tr:
      words >= minWords
        ? t("assessfb.length_ok")
        : words > 0
          ? t("assessfb.length_short")
          : "",
    next_tip_tr: missing.length
      ? t("assessfb.try_phrase", { phrase: missing[0] })
      : turkishChars
        ? t("assessfb.turkish_chars")
        : t("assessfb.retry_when_ai"),
  };
}
