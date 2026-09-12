import { NextResponse } from "next/server";
import { targetLangOf } from "@/lib/courses";
import { getUserId, getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { examById, SECTION_TITLE_KEYS, SECTION_TITLE_TARGET, type ExamSectionId } from "@/lib/exam";
import { localiseExam } from "@/lib/lessons/native-server";
import { translate, formatPercent, isNativeLang, DEFAULT_NATIVE } from "@/lib/i18n/dict";
import { moduleExamPlan } from "@/lib/lessons/module-exam";

export const dynamic = "force-dynamic";

/**
 * Sertifika (WP-41): geçilmiş bir sınav için paylaşılabilir SVG.
 *
 * Yalnız sahibine ve yalnız geçilmiş, deneme olmayan sınav için. PDF yok:
 * SVG her yerde açılıyor ve tarayıcı "yazdır → PDF" ile aynı sonucu veriyor.
 *
 * Kâğıtta bölüm yüzdelerinin yanında **yapabilirlik listesi** var. Sebebi:
 * "%78" bir hafta sonra hiçbir şey ifade etmiyor, "Ich kann im Restaurant
 * bestellen" ise sınavın ne olduğunu tek satırda söylüyor. Sertifikanın
 * gösterilme sebebi de bu — puan değil, kazanılan iş.
 */
function esc(s: string): string {
  return s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

/** Belgenin hedef dildeki yüzü — arayüz metni DEĞİL, kâğıdın kendi dili. */
const CERT_FACE: Record<"de" | "en", { levelExam: string; moduleExam: string; exam: string; module: string; canDo: string }> = {
  de: { levelExam: "Niveauprüfung", moduleExam: "Modulprüfung", exam: "Prüfung", module: "Modul", canDo: "DAS KANN ICH JETZT" },
  en: { levelExam: "Level exam", moduleExam: "Module exam", exam: "Exam", module: "Module", canDo: "THIS IS WHAT I CAN DO NOW" },
};

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const exam = await examById(userId, Number(id));
  if (!exam || !exam.passed || exam.trial) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const info = await getUserInfo();
  const profile = await ensureProfile(userId, info?.name);
  // Sertifika bölüm adlarını kullanıcının dilinde yazıyor. Dil ÇEREZDEN değil
  // profilden: bu ucu mobil de çağırıyor ve orada web çerezimiz yok.
  const lang = isNativeLang(profile.nativeLang) ? profile.nativeLang : DEFAULT_NATIVE;
  const name = esc(profile.displayName ?? info?.name ?? translate(lang, "social.student"));
  /* Sertifikanın Almanca yüzü sabit; altındaki karşılık öğrencinin dilinde.
     `canDo` kâğıdın kendisinden okunuyor — `examCando` ayrı bir çağrı olsaydı
     çevrilmemiş bir ikinci kopya döndürürdü. */
  const plan = await localiseExam(
    /* Sertifika kâğıdı öğrencinin KURSUNDAN geliyor: planlar kursa göre
       anahtarlı ve kurs adı koda yazılmıyor. */
    exam.module === null ? undefined : moduleExamPlan(profile.course ?? "de", exam.level, exam.module),
    lang,
  );
  /*
    SERTİFİKANIN YÜZÜ ÖĞRENİLEN DİLİN YÜZÜ.
    Almanca sabitti ("Niveauprüfung", "Modul", "DAS KANN ICH JETZT") ve bu iki
    kurs varken görünmez bir varsayımdı: İngilizce kursu bitiren öğrenci
    paylaşacağı belgede Almanca başlıklar görüyordu. Altındaki karşılık zaten
    öğrencinin kendi dilinde (`translate(lang, …)`) — değişen yalnız hedef dil
    yüzü. 2026-09-12'de ölçüldü: seviye sınavı iki kursta da çalışıyor, yani
    bu belge İngilizce kursta bugün üretilebiliyor.
  */
  const target = targetLangOf(profile.course);
  const face = CERT_FACE[target];
  const kicker = exam.kind === "level"
    ? `${exam.level} · ${face.levelExam}`
    : `${face.moduleExam} ${plan?.code ?? `${exam.level}.${(exam.module ?? 0) + 1}`}`;
  const title = plan ? plan.titleDe : exam.kind === "level" ? `${face.exam} ${exam.level}` : `${face.module} ${(exam.module ?? 0) + 1}`;
  const subtitle = plan ? plan.titleTr : "";
  const date = exam.at.slice(0, 10);
  const cando = (plan?.canDo ?? []).slice(0, 5);

  const rowTop = 330;
  const rows = exam.sections
    .map(
      (s, i) =>
        `<text x="72" y="${rowTop + i * 26}" font-size="15" fill="#5b4636">${esc(SECTION_TITLE_TARGET[target][s.id as ExamSectionId] ?? s.id)} · ${esc(SECTION_TITLE_KEYS[s.id as ExamSectionId] ? translate(lang, SECTION_TITLE_KEYS[s.id as ExamSectionId]) : s.id)}</text>` +
        `<text x="380" y="${rowTop + i * 26}" font-size="15" fill="#5b4636" text-anchor="end">%${s.pct}</text>`,
    )
    .join("");
  const candoRows = cando
    .map(
      (c, i) =>
        `<text x="430" y="${rowTop + i * 44}" font-size="14" fill="#3b2a1e">✓ ${esc(c.de.length > 52 ? `${c.de.slice(0, 51)}…` : c.de)}</text>` +
        `<text x="444" y="${rowTop + i * 44 + 17}" font-size="12" fill="#8a6a4f">${esc(c.tr.length > 56 ? `${c.tr.slice(0, 55)}…` : c.tr)}</text>`,
    )
    .join("");
  const height = Math.max(560, rowTop + Math.max(exam.sections.length * 26, cando.length * 44) + 110);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}">
  <rect width="800" height="${height}" rx="24" fill="#fbf6ef"/>
  <rect x="20" y="20" width="760" height="${height - 40}" rx="18" fill="none" stroke="#c8792d" stroke-width="3"/>
  <g font-family="sans-serif">
    <text x="400" y="80" text-anchor="middle" font-size="20" fill="#8a6a4f" letter-spacing="4">LERNOMI</text>
    <text x="400" y="120" text-anchor="middle" font-size="16" fill="#8a6a4f">${esc(kicker)}</text>
    <text x="400" y="166" text-anchor="middle" font-size="34" font-weight="700" fill="#3b2a1e">${esc(title)}</text>
    ${subtitle ? `<text x="400" y="196" text-anchor="middle" font-size="17" fill="#8a6a4f">${esc(subtitle)}</text>` : ""}
    <text x="400" y="240" text-anchor="middle" font-size="18" fill="#5b4636">${esc(translate(lang, "certw.this_document"))}</text>
    <text x="400" y="278" text-anchor="middle" font-size="28" font-weight="700" fill="#c8792d">${name}</text>
    <text x="400" y="306" text-anchor="middle" font-size="16" fill="#5b4636">${esc(translate(lang, "certw.awarded_to", { pct: formatPercent(exam.total, lang) }))}</text>
    <text x="72" y="${rowTop - 22}" font-size="13" font-weight="700" fill="#8a6a4f">${esc(translate(lang, "certw.sections"))}</text>
    ${cando.length ? `<text x="430" y="${rowTop - 22}" font-size="13" font-weight="700" fill="#8a6a4f">${esc(face.canDo)}</text>` : ""}
    ${rows}
    ${candoRows}
    <text x="72" y="${height - 44}" font-size="14" fill="#8a6a4f">${date}</text>
    <text x="728" y="${height - 44}" text-anchor="end" font-size="14" fill="#8a6a4f">${esc(translate(lang, "certw.pass_rule"))}</text>
  </g>
</svg>`;
  return new NextResponse(svg, { headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "private, max-age=3600" } });
}
