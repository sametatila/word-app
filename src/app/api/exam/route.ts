import { NextResponse } from "next/server";
import { clampDay } from "@/lib/award";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile, submitAnswers } from "@/lib/session";
import { buildExam, COUNTS as EXAM_COUNTS, examHistory, finishExam, modulePrereq, type ExamSubmission, type ExamSectionId } from "@/lib/exam";
import { moduleExamPlan, hasModuleExams } from "@/lib/conversations/module-exam";
import { LEVEL_SECONDS, MODULE_SECONDS, SECTION_ORDER } from "@/lib/exam-types";
import { localiseExam, nativeExamText } from "@/lib/conversations/native-server";
import { nativeOf, targetLangOf } from "@/lib/courses";
import { buildAnswerKey, sealKey, openKeyFor, gradeObjective, resolveSpokenWritten, blindPaper, objectiveReview, type ExamResponses } from "@/lib/exam-grade";
import { track } from "@/lib/events";
import { cleanDetail, isErrorType } from "@/lib/errors";
import { GAME_LABEL_KEYS, type Answer, type GameId } from "@/lib/types";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const SECTIONS = new Set<ExamSectionId>(["vocab", "grammar", "produce", "reading", "listening", "speaking", "writing"]);

/**
 * Sınav (WP-41 v3).
 *   GET                                  → geçmiş sınavlar
 *   GET ?level=A1&module=2               → kâğıdın KAPAĞI (kâğıdın kendisi değil)
 *   POST {action:"start", level, module?} → kâğıt
 *   POST {action:"finish", level, module?, keyToken, responses, writingScoreToken?, speakingScoreTokens?,
 *         sections (yalnız kelime doğrusu okunur), vocabAnswers?, seconds, day}
 *         keyToken/responses yoksa: eski sözleşme (sections + writingScore/speakingScore), sonuç doğrulanmamış
 *
 * Kapak ayrı bir uç, çünkü sınav başlamadan önce gösterilen şey (hangi
 * modül, ne ölçüyor, kaç dakika) kâğıdın kendisini üretmeyi gerektirmemeli:
 * kapağı görmek için soruları hazırlamak, vazgeçen kullanıcıya o haftanın
 * kâğıdını harcatırdı.
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const level = url.searchParams.get("level");
  const mod = url.searchParams.get("module");
  /*
   * SEVIYE SINAVININ DA KAPAGI VAR (`?level=A1&kind=level`).
   *
   * Modul sinavinin kapagi bastan beri buradaydi ama seviye sinavinin yoktu:
   * "kac dakika surecek, hangi bolumler var" sorusu yalnizca modul sinavinda
   * cevaplaniyordu. Android bu bilgiyi KAGITTAN okuyordu, yani kapagi acmak
   * icin once kagidi uretmek ve `exam_start` yazmak gerekiyordu — vazgecen
   * kullanici baslamis sayiliyordu. Sayilar sabit (`COUNTS.level`,
   * `LEVEL_SECONDS`), kagit gerekmiyor.
   *
   * Seviye sinavinin plani yok: baslik, odak listesi ve deneme bayragi
   * modulun kendine ait. Burada yalniz bolumler ve sure donuyor.
   */
  if (level && url.searchParams.get("kind") === "level") {
    return NextResponse.json(
      { cover: { code: null, titleDe: null, titleTr: null, focus: [], trial: false, seconds: LEVEL_SECONDS, counts: EXAM_COUNTS.level } },
      { headers: { "cache-control": "private, max-age=3600" } },
    );
  }
  if (level && mod !== null) {
    const profile = await ensureProfile(userId);
    /* Modül sınavı planları Almanca yazılmış ve kurs boyutu yok (bkz.
       `hasModuleExams`): kursu olmayan kullanıcıya kapak da gösterilmiyor. */
    const plan = await localiseExam(
      hasModuleExams(profile.course ?? "de") ? moduleExamPlan(profile.course ?? "de", level, Number(mod)) : undefined,
      nativeOf(profile.nativeLang),
    );
    /*
     * DENEME BİLGİSİ DE KAPAKTA. Modülün konuşmaları yeterince geçilmediyse
     * sonuç sayılmıyor; bunu yalnız sınav bittikten sonra söylemek sırayı
     * ters çeviriyordu — kullanıcı sayılmayacağını bilmeden girip yirmi
     * dakika harcıyordu. Android kapakta uyarıyor.
     *
     * Yanıt bu yüzden kullanıcıya bağlı ve önbellek bir saatten bir dakikaya
     * indi: bayrak, kullanıcı modülün son konuşmasını bitirdiği anda
     * değişiyor ve bir saat eski kalması "hâlâ deneme" demek olurdu. Uç yine
     * KÂĞIDI ÜRETMİYOR, o yüzden kapağı açmak haftanın kâğıdını harcamıyor.
     */
    const trial = plan ? !(await modulePrereq(userId, profile?.course ?? "de", level as CefrLevel, Number(mod))) : false;
    /*
     * BÖLÜMLER VE SÜRE DE KAPAKTA. Kâğıt üretilmeden de biliniyorlar: madde
     * sayıları (`EXAM_COUNTS`) ve süre (`MODULE_SECONDS`/`LEVEL_SECONDS`)
     * sabit. Android kapağında ikisi de yazıyor - kullanıcı "ne kadar
     * sürecek, neler sorulacak" sorusunu sınava GİRMEDEN cevaplıyor; webde
     * kapak yalnız başlığı ve odakları gösteriyordu.
     */
    const counts = EXAM_COUNTS.module;
    return NextResponse.json(
      {
        cover: plan
          ? { code: plan.code, titleDe: plan.titleDe, titleTr: plan.titleTr, focus: plan.focus, trial, seconds: MODULE_SECONDS, counts }
          : null,
      },
      /* SAKLATILMIYOR: kapak profilin KURSUNA ve anadiline bağlı ama adres
         yalnız seviye ve modülü taşıyor. `max-age` iken iOS'un NSURLCache'i ve
         tarayıcı, kurs değiştiren kullanıcıya eski kursun kapağını
         döndürüyordu (bkz. aşağıdaki liste notu). */
      { headers: { "cache-control": "private, no-store" } },
    );
  }
  /*
   * Seviyenin modül sınavı LİSTESİ (`?level=A1`, module olmadan).
   *
   * Web bu listeyi sunucu bileşeninde doğrudan `moduleExamPlan`'dan kuruyor;
   * mobilin böyle bir yolu yok ve tek tek kapak çekmek on istek ederdi.
   *
   * YANIT SAKLATILMIYOR. Plan kod içinde sabit ama liste profilin KURSUNDAN ve
   * anadilinden kuruluyor, adres ise yalnız seviyeyi taşıyor. `private,
   * max-age=3600` iken iOS'ta `fetch` NSURLCache'ten geçiyor ve İngilizce B1'den
   * Almanca B1'e geçen hesaba bir saat boyunca İngilizce kursun modül
   * sınavlarını döndürüyordu (2026-09-29: "B1.1 · My career so far"). Liste
   * birkaç sabit satır; önbellek kazancı yok denecek kadar az.
   */
  if (level) {
    const listProfile = await ensureProfile(userId);
    const t = await nativeExamText(nativeOf(listProfile.nativeLang));
    const modules = (hasModuleExams(listProfile.course ?? "de") ? [...Array(21).keys()] : [])
      .map((i) => ({ index: i, plan: moduleExamPlan(listProfile.course ?? "de", level, i) }))
      .filter((m) => m.plan)
      .map(({ index, plan }) => ({ index, code: plan!.code, titleDe: plan!.titleDe, titleTr: t(plan!.titleTr) }));
    return NextResponse.json({ modules }, { headers: { "cache-control": "private, no-store" } });
  }
  try {
    return NextResponse.json({ exams: await examHistory(userId) }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[exam]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const level = body.level as CefrLevel;
  if (!LEVELS.includes(level)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  // `module` DEĞİL: Next'in `no-assign-module-variable` kuralı haklı — CommonJS
  // birlikte çalışabilirliğinde `module` ayrılmış bir addır ve paketleyici onu
  // gölgeleyen bir yerel değişkende beklenmedik davranabilir.
  const moduleNo = typeof body.module === "number" && Number.isInteger(body.module) && body.module >= 0 && body.module <= 20 ? body.module : null;
  const day = clampDay(body.day);
  try {
    const profile = await ensureProfile(userId);
    /*
     * KAGIT URETIM YOLUNDA DA KURS KONTROLU.
     *
     * Modul sinavi planlari Almanca yazilmis ve kurs boyutu yok
     * (`hasModuleExams`). Iki OKUMA yolu bunu zaten uyguluyordu - kapak ucu
     * ve modul listesi - ama URETIM yolu uygulamiyordu: `/api/exam`a
     * dogrudan `{action:"start", module: 3}` gonderen bir Ingilizce kurs
     * kullanicisi Almanca kagit aliyordu.
     *
     * Arayuzden erisilmiyor (iki istemci de listeyi bos aliyor), ama varsayim
     * kagidin URETILDIGI yerde de adiyla durmali: yarin listeye bir baglanti
     * eklendiginde kapi burada bekliyor olacak.
     */
    if (moduleNo !== null && !hasModuleExams(profile.course ?? "de")) {
      return NextResponse.json({ error: "bad_request" }, { status: 400 });
    }
    if (body.action === "start") {
      const paper = await buildExam(userId, profile.course, level, moduleNo, day);
      await track(userId, "exam_start", day, 0, `${paper.kind}:${level}`);
      // F7: nesnel cevap anahtarını mühürleyip istemciye opak keyToken olarak
      // ver — finish'te sunucu bununla puanlar (istemci sayısına güvenmeden).
      const keyToken = sealKey(buildAnswerKey(paper, targetLangOf(profile.course), nativeOf(profile.nativeLang), userId));
      // Kör kâğıt (airtight): yeni istemci `blind:true` isteyince nesnel cevaplar
      // sıyrılır — cevaplar yalnız keyToken'da. Eski istemci bayrak göndermez →
      // tam kâğıt alır (geriye uyumlu, kendi sürümünde airtight olur).
      const sent = body.blind === true ? blindPaper(paper) : paper;
      return NextResponse.json({ paper: sent, keyToken });
    }
    if (body.action === "finish") {
      const raw = Array.isArray(body.sections) ? (body.sections as Record<string, unknown>[]) : [];
      const sections = raw
        .filter((s) => SECTIONS.has(s.id as ExamSectionId) && typeof s.total === "number" && typeof s.correct === "number")
        .map((s) => ({ id: s.id as ExamSectionId, correct: Math.max(0, Math.round(s.correct as number)), total: Math.max(0, Math.min(60, Math.round(s.total as number))) }));
      const kind = moduleNo === null ? ("level" as const) : ("module" as const);
      /* Anahtar bu kullanıcıya, bu türe/seviyeye/modüle bağlı ve süresi geçmemiş
         olmalı (`openKeyFor`). Bağsız eski jeton ya da başka kâğıdın jetonu = yok. */
      const keyToken = typeof body.keyToken === "string" ? body.keyToken : null;
      const key = keyToken ? openKeyFor(keyToken, userId, { kind, level, module: moduleNo }) : null;
      const responses =
        body.responses && typeof body.responses === "object" && !Array.isArray(body.responses) ? (body.responses as ExamResponses) : null;
      if (!sections.length && !(key && responses)) return NextResponse.json({ error: "bad_request" }, { status: 400 });
      const vocabAnswers: Answer[] = [];
      for (const a of (Array.isArray(body.vocabAnswers) ? body.vocabAnswers : []) as Record<string, unknown>[]) {
        if (typeof a.wordId !== "number" || typeof a.game !== "string" || !(a.game in GAME_LABEL_KEYS) || typeof a.correct !== "boolean") continue;
        vocabAnswers.push({
          wordId: a.wordId,
          game: a.game as GameId,
          correct: a.correct,
          latencyMs: typeof a.latencyMs === "number" ? Math.max(0, Math.round(a.latencyMs)) : 0,
          quality: typeof a.quality === "number" ? a.quality : undefined,
          errorType: a.correct === false && isErrorType(a.errorType) ? a.errorType : undefined,
          detail: a.correct === false ? (cleanDetail(a.detail) ?? undefined) : undefined,
        });
      }
      const sub: ExamSubmission = {
        sections,
        vocabAnswers,
        writingScore: typeof body.writingScore === "number" ? Math.max(0, Math.min(100, body.writingScore)) : null,
        speakingScore: typeof body.speakingScore === "number" ? Math.max(0, Math.min(100, body.speakingScore)) : null,
        seconds: typeof body.seconds === "number" ? Math.max(0, Math.min(3 * 3600, Math.round(body.seconds))) : 0,
      };
      /*
       * DOĞRULANMIŞ SINAV — güvenlik denetimi F7, 2026-10-03'te kapandı (O1).
       *
       * Geçerli anahtar + ham seçimler (responses) geldiyse bölümler BÜTÜNÜYLE
       * sunucuda kuruluyor: hangi bölümün var olduğu ve toplamı kâğıttan,
       * nesnel doğrular cevap anahtarından, yazma/konuşma imzalı jetonlardan.
       * İstemcinin `sections` listesinden yalnız kelime doğrusu okunuyor (SRS
       * oyunu, bulanık eşleşme; toplamla sınırlı). Böylece istemci zayıf bir
       * bölümü göndermeyip ağırlığını ötekilere dağıtamıyor.
       *
       * Yazma jetonu yoksa (değerlendirme düştü, istemci yerel tahmin gösterdi)
       * ya da anahtar/seçimler yoksa (keyToken göndermeyen eski mobil istemci)
       * sonuç kaydediliyor ama DOĞRULANMAMIŞ: sertifika, modül tacı ve seviye
       * geçişi vermiyor. Önceden istemcinin saydığı "C1 %100" tek istekle
       * geçmiş sınav ve sertifika oluyordu.
       */
      let verified = false;
      if (key && responses) {
        const graded = gradeObjective(key, responses);
        const sw = resolveSpokenWritten(key, userId, body.writingScoreToken, body.speakingScoreTokens);
        const clientVocab = sections.find((s) => s.id === "vocab")?.correct ?? 0;
        const totals: Record<ExamSectionId, { correct: number; total: number }> = {
          vocab: { correct: Math.min(clientVocab, key.vocabTotal), total: key.vocabTotal },
          grammar: graded.grammar,
          produce: graded.produce,
          reading: graded.reading,
          listening: graded.listening,
          speaking: { correct: 0, total: key.speakingIds.length },
          writing: { correct: 0, total: key.writingIds.length },
        };
        sub.sections = SECTION_ORDER.filter((id) => totals[id].total > 0).map((id) => ({ id, ...totals[id] }));
        sub.speakingScore = sw.speakingScore;
        if (sw.writingScore !== null) sub.writingScore = sw.writingScore;
        verified = key.writingIds.length === 0 || sw.writingScore !== null;
      }
      // Kelime cevapları SRS'e: sınav da bir tekrar (hatalar tipleriyle).
      if (vocabAnswers.length) await submitAnswers(userId, vocabAnswers, day, Math.min(sub.seconds, 3600));
      // trial İSTEMCİDEN ALINMIYOR — F7. Modül ön koşulu sunucuda hesaplanır
      // (buildExam da start'ta aynısını yapar); istemci trial:false gönderip
      // ön koşulsuz bir "geçti"yi roadmap tacına saydıramaz.
      const trial =
        moduleNo === null ? false : !(await modulePrereq(userId, profile.course ?? "de", level as CefrLevel, moduleNo));
      const result = await finishExam(userId, { kind, level, module: moduleNo, trial }, sub, day, { verified });
      // Kör modda istemci döküm/review'ı kâğıttan kuramaz (cevaplar yoktu);
      // sunucu doğru cevapları BİTİŞTE döndürüyor (artık sömürüye yaramaz).
      return NextResponse.json(key && responses ? { ...result, review: objectiveReview(key) } : result);
    }
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  } catch (err) {
    console.error("[exam]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
