import { ERROR_TYPES, isErrorType, type ErrorType } from "@/lib/errors";

/**
 * AI değerlendirme — istemler, tipler ve ayrıştırıcı (plan WP-03).
 *
 * `coach-prompts.ts` ile aynı gerekçeyle `server-only` DEĞİL: istemci
 * bileşenleri tipleri, `scripts/assess-eval.ts` istemleri kullanıyor. Test
 * üretimde çalışan istemi ölçmeli, kendi kopyasını değil.
 *
 * Tek uç, dört tür: serbest cümle, serbest yazma, konuşma dökümü, rol yapma.
 * Hepsi aynı rubriği döner; farklı olan şey ne beklendiği (bir cümle mi,
 * bir paragraf mı, bir diyalog mu) ve hangi hataların sayılacağı (konuşma
 * dökümünde noktalama ve büyük harf sayılmaz — tanıyıcı yazmaz).
 */

export type AssessKind = "sentence" | "writing" | "speaking" | "roleplay";
export const ASSESS_KINDS: AssessKind[] = ["sentence", "writing", "speaking", "roleplay"];

export type AssessLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export const ASSESS_LEVELS: AssessLevel[] = ["A1", "A2", "B1", "B2", "C1"];

export type AssessTask = {
  /** Görev metni, Türkçe ya da Almanca: "Kafede kahve iste." */
  prompt: string;
  /** Tek hedef cümle/kalıp (çeviri, dönüştürme). */
  target?: string;
  /** Kullanılması beklenen kalıp/kelimeler (rol yapma, yazma). */
  targets?: string[];
  /** Kısıtlar: "en az 40 kelime", "Perfekt kullan". */
  constraints?: string[];
};

export type AssessAnswer = {
  text: string;
  /** Konuşma: tanıyıcının n-best listesi (ilk eleman `text` ile aynı olabilir). */
  transcript?: string[];
};

export type AssessRequest = {
  kind: AssessKind;
  level: AssessLevel;
  task: AssessTask;
  answer: AssessAnswer;
  /** Egzersiz kimliği — kayıt ve gelişim grafiği için. */
  exerciseId?: string;
  locale?: "tr";
};

export type AssessScore = {
  /** Görev yerine getirildi mi (0–4). */
  task: number;
  grammar: number;
  vocab: number;
  structure: number;
  /** 0–100, dört ölçütün ağırlıklı toplamı. */
  overall: number;
};

export type AssessError = {
  /** Cevap metninde karakter aralığı [başlangıç, bitiş) — bulunamazsa [0,0]. */
  span: [number, number];
  /** Hatalı parça, olduğu gibi. */
  wrong: string;
  type: ErrorType;
  fix: string;
  why_tr: string;
};

export type Assessment = {
  score: AssessScore;
  errors: AssessError[];
  corrected: string;
  praise_tr: string;
  next_tip_tr: string;
};

/** Cevap uzunluğu sınırı: bir paragraf. Üstü hem pahalı hem pedagojik değil. */
export const ASSESS_MAX_CHARS = 1500;

const LEVEL_EXPECTATIONS: Record<AssessLevel, string> = {
  A1: "Basit ana cümleler, Präsens, temel kelime sırası (fiil ikinci sırada), artikel ve zamirler. Perfekt ya da yan cümle beklenmez; doğru kullanılmışsa ödüllendir, kullanılmamışsa cezalandırma.",
  A2: "Perfekt ve Präteritum (sein/haben), Modalverben, Dativ/Akkusativ edatları, weil/dass ile yan cümle, ayrılabilir fiiller. Basit bağlaçlarla bağlanmış cümleler.",
  B1: "Yan cümle çeşitliliği (wenn, obwohl, damit), Konjunktiv II ile nezaket, Passiv Präsens, Relativsatz, Genitiv temel. Metinde bağlantı ve akış beklenir.",
  B2: "Karmaşık yan cümleler, Passiv çeşitleri, Konjunktiv II ve I temel, Partizip yapıları, Nominalisierung, kayıt (resmî/gayriresmî) farkı. Argüman kurma, bağlaç çeşitliliği.",
  C1: "Doğal ve idiomatik ifade, ince kayıt farkları, karmaşık sözdizimi, ileri bağlaçlar, üslup tutarlılığı. Küçük yapaylıklar bile puanı düşürür.",
};

const KIND_BRIEF: Record<AssessKind, string> = {
  sentence:
    "Öğrenci TEK CÜMLE yazdı (çeviri, dönüştürme ya da verilen kelimeyle cümle kurma). Görev puanı: istenen anlam/yapı karşılandı mı. Uzunluk ölçüt değil.",
  writing:
    "Öğrenci bir metin yazdı (mesaj, e-posta, kısa anlatı, görüş). Görev puanı: istenen bütün noktalara değinildi mi, uzunluk ve kayıt uygun mu. Yapı puanı: giriş/gelişme, bağlaçlar, akış.",
  speaking:
    "Metin bir KONUŞMA TANIYICI dökümü: noktalama, büyük harf ve ß/ss ayrımı hata SAYILMAZ; tanıyıcının yazım tercihleri öğrencinin değildir. Değerlendirilen şey söylenenin dilbilgisi, kelime seçimi ve görevi karşılayıp karşılamadığı. Telaffuz hatası ancak döküm açıkça başka bir kelimeye kaydıysa (schon/schön gibi) 'pronunciation' olarak yazılır.",
  roleplay:
    "Metin bir rol yapma konuşmasında öğrencinin söyledikleri (sırayla, her satır bir tur). Görev puanı: senaryonun amacı (sipariş vermek, randevu almak…) gerçekleşti mi ve hedef kalıplar kullanıldı mı. Karşı tarafın replikleri değerlendirilmez.",
};

/**
 * Sistem istemi — tür ve seviyeye göre.
 *
 * Neden JSON'u istemle istiyoruz da sağlayıcının JSON modunu değil: üç
 * sağlayıcı da OpenAI biçimini konuşuyor ama JSON modunun davranışı
 * modelden modele farklı (bazısı şemayı yok sayıyor, bazısı boş döndürüyor).
 * İstemdeki şema + toleranslı ayrıştırıcı (`parseAssessment`) hepsinde aynı
 * çalışıyor; geçersiz çıktı 502 ile dürüstçe geri çevriliyor.
 */
export function assessSystemPrompt(kind: AssessKind, level: AssessLevel): string {
  return `Sen Almanca öğrenen Türk öğrencilerin yazılı ve sözlü üretimini değerlendiren deneyimli bir Almanca öğretmenisin. Öğrencinin seviyesi CEFR ${level}.

${KIND_BRIEF[kind]}

${level} SEVİYESİNDEN BEKLENEN: ${LEVEL_EXPECTATIONS[level]}

RUBRİK (her ölçüt 0–4):
- task: görev karşılandı mı. 4 tam, 3 küçük eksik, 2 kısmen, 1 çok az, 0 konu dışı/boş.
- grammar: dilbilgisi doğruluğu seviyeye göre. 4 hatasız ya da seviyenin üstünde yapı denemesinde tek küçük hata, 3 anlamı bozmayan 1–2 hata, 2 birkaç hata ama anlaşılır, 1 sık hata, 0 anlaşılmaz.
- vocab: kelime seçimi ve çeşitlilik. Yanlış kelime, Türkçeden birebir çeviri, seviyeye göre fakir dağarcık puan düşürür.
- structure: cümle kurma ve bağlama (cümle için: kelime sırası ve cümlenin bütünlüğü; metin için: akış, bağlaçlar, kayıt).

HATA LİSTESİ: her gerçek hata için bir madde. "wrong" alanı öğrencinin metninden BİREBİR kopya (değiştirme, kısaltma), "fix" doğru biçim, "why_tr" Türkçe tek cümle gerekçe — kuralı söyle, sadece doğrusunu değil ("Dativ ister çünkü 'mit' her zaman Dativ alır"). type şu listeden: ${ERROR_TYPES.join(", ")}.
- article: yanlış/eksik artikel. plural: çoğul biçim. case: hâl (Dativ/Akkusativ/Genitiv) hatası. verb_position: fiilin cümledeki yeri. conjugation: fiil çekimi/zaman. spelling: yazım (büyük harf dâhil; konuşma dökümünde sayma). meaning: yanlış kelime/anlam. word_order: fiil dışı sıra hatası. pronunciation: yalnız konuşmada. listening: kullanma.
- Doğru olanı hata yazma. Emin değilsen yazma. Üslup tercihini hata sayma; gerekiyorsa next_tip_tr'de söyle.

corrected: öğrencinin metninin düzeltilmiş hâli — anlamı ve yapısını koru, yeniden yazma. Hata yoksa metni olduğu gibi ver.
praise_tr: Türkçe, tek cümle, somut: neyi iyi yaptı (kalıp, yapı, kelime). Boş övgü yok.
next_tip_tr: Türkçe, tek cümle: bir sonraki denemede yapacağı EN önemli tek şey.

ÇIKTI: yalnızca aşağıdaki JSON, başka hiçbir şey (açıklama, markdown, kod bloğu yok):
{"score":{"task":0,"grammar":0,"vocab":0,"structure":0},"errors":[{"wrong":"","type":"","fix":"","why_tr":""}],"corrected":"","praise_tr":"","next_tip_tr":""}`;
}

/** Kullanıcı mesajı: görev + cevap, tırnaksız ve etiketli. */
export function assessUserMessage(req: AssessRequest): string {
  const t = req.task;
  const lines = [`GÖREV: ${t.prompt}`];
  if (t.target) lines.push(`HEDEF: ${t.target}`);
  if (t.targets?.length) lines.push(`BEKLENEN KALIPLAR: ${t.targets.join(" | ")}`);
  if (t.constraints?.length) lines.push(`KISITLAR: ${t.constraints.join("; ")}`);
  lines.push("", "ÖĞRENCİNİN CEVABI:", req.answer.text.trim());
  if (req.kind === "speaking" && req.answer.transcript && req.answer.transcript.length > 1) {
    lines.push("", `TANIYICININ DİĞER ADAYLARI: ${req.answer.transcript.slice(1, 4).join(" | ")}`);
  }
  return lines.join("\n");
}

/** 0–100 genel puan: görev ve dilbilgisi ağır basar. */
export function overallScore(s: { task: number; grammar: number; vocab: number; structure: number }): number {
  const w = s.task * 0.35 + s.grammar * 0.3 + s.vocab * 0.15 + s.structure * 0.2;
  return Math.max(0, Math.min(100, Math.round((w / 4) * 100)));
}

function clampScore(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(4, Math.round(n)));
}

function str(v: unknown, max = 600): string {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

/** Metindeki ilk `{` ile eşleşen `}` arasını alır — model laf kalabalığı yapsa da. */
export function extractJson(text: string): string | null {
  const cleaned = text.replace(/```(?:json)?/gi, "");
  const start = cleaned.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let inStr = false;
  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (inStr) {
      if (ch === "\\") i++;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return cleaned.slice(start, i + 1);
    }
  }
  return null;
}

/** Hatanın metindeki yeri: birebir, sonra küçük harf; bulunamazsa [0,0]. */
function locate(answer: string, wrong: string): [number, number] {
  if (!wrong) return [0, 0];
  let i = answer.indexOf(wrong);
  if (i === -1) i = answer.toLowerCase().indexOf(wrong.toLowerCase());
  return i === -1 ? [0, 0] : [i, i + wrong.length];
}

/**
 * Model çıktısını doğrulanmış değerlendirmeye çevirir; şema tutmuyorsa null.
 *
 * Toleranslı ama sınırlı: eksik `overall` hesaplanır, eksik `errors` boş
 * liste sayılır, geçersiz hata tipi "meaning"e düşer (model listeyi ara sıra
 * Türkçeleştiriyor). Dört alt puandan biri eksikse değerlendirme geçersiz:
 * yarım rubrik yanlış puandan kötüdür.
 */
export function parseAssessment(raw: string, answerText: string, kind: AssessKind): Assessment | null {
  const json = extractJson(raw);
  if (!json) return null;
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
  const s = (data.score ?? {}) as Record<string, unknown>;
  const task = clampScore(s.task);
  const grammar = clampScore(s.grammar);
  const vocab = clampScore(s.vocab);
  const structure = clampScore(s.structure);
  if (task === null || grammar === null || vocab === null || structure === null) return null;
  const score: AssessScore = { task, grammar, vocab, structure, overall: overallScore({ task, grammar, vocab, structure }) };

  const errors: AssessError[] = [];
  if (Array.isArray(data.errors)) {
    for (const item of data.errors.slice(0, 12)) {
      if (typeof item !== "object" || item === null) continue;
      const e = item as Record<string, unknown>;
      const wrong = str(e.wrong, 200);
      const fix = str(e.fix, 200);
      const why = str(e.why_tr ?? e.why, 300);
      if (!wrong && !fix) continue;
      let type: ErrorType = isErrorType(e.type) ? e.type : "meaning";
      // Konuşma dökümünde yazım hatası olmaz; model yine de yazdıysa düşür.
      if (kind === "speaking" && type === "spelling") continue;
      if (kind !== "speaking" && type === "pronunciation") type = "spelling";
      errors.push({ span: locate(answerText, wrong), wrong, type, fix, why_tr: why });
    }
  }

  const corrected = typeof data.corrected === "string" ? data.corrected.trim().slice(0, ASSESS_MAX_CHARS) : "";
  return {
    score,
    errors,
    corrected: corrected || answerText.trim(),
    praise_tr: str(data.praise_tr ?? data.praise, 300),
    next_tip_tr: str(data.next_tip_tr ?? data.next_tip ?? data.tip_tr, 300),
  };
}
