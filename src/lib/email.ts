import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { LEGAL_ENTITY } from "@/lib/legal";
import { translate, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";

/**
 * Giden e-posta — sağlayıcı **Resend**, taşıma **SMTP**.
 *
 * Bu dosyada "Resend" diye bir bağımlılık aramak boşuna: Resend'in SDK'sı
 * KULLANILMIYOR, SMTP ucu (`smtp.resend.com`) kullanılıyor ve istemci
 * nodemailer. Tercih bilinçli — sağlayıcı değişirse burada tek satır kod
 * değişmiyor, yalnız üç env değeri değişiyor. Belgelerde yalnız "Resend"
 * yazması bir çelişki değil ama okuyanı SDK aramaya götürüyordu; adı bu yüzden
 * artık taşımasıyla birlikte anılıyor.
 *
 * Doğrulama ve parola sıfırlama buradan geçer. SMTP anahtarları (host/user/pass)
 * tanımlıysa gerçek gönderim yapılır; tanımsızsa bağlantı log'a düşer ve
 * `emailConfigured` false olur. Bu bilinçli: auth katmanı e-posta doğrulamayı
 * yalnız SMTP bağlıyken ZORUNLU kılar (bkz. lib/auth/server.ts), böylece
 * sağlayıcı bağlanmadan yapılan bir kayıt doğrulama e-postası bekleyip
 * kilitlenmez — geliştirmede/ilk kurulumda giriş çalışmaya devam eder.
 */
const HOST = process.env.SMTP_HOST;
const PORT = Number(process.env.SMTP_PORT) || 587;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;
const FROM = process.env.SMTP_FROM || "Lernomi <noreply@lernomi.app>";

export const emailConfigured = Boolean(HOST && USER && PASS);

let cached: Transporter | null = null;
function transport(): Transporter {
  if (!cached) {
    cached = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      // 465/2465 örtük TLS; 587/2587 STARTTLS. 2xxx portları, sağlayıcıların
      // giden 25/465/587'yi kapattığı sunucular için Resend'in alternatifi —
      // Netcup tam olarak bunu yapıyor, o yüzden üretimde 2587 kullanılıyor.
      secure: PORT === 465 || PORT === 2465,
      auth: { user: USER, pass: PASS },
    });
  }
  return cached;
}

export async function sendEmail(to: string, subject: string, html: string, text: string): Promise<void> {
  if (!emailConfigured) {
    console.log(`[email] SMTP tanımsız — gönderilmedi: ${to} · ${subject}`);
    return;
  }
  try {
    // Reply-To zorunlu: gönderen noreply@ ve Cloudflare'de catch-all "drop".
    // Kullanıcı doğrulama postasına cevap yazarsa mesajı sessizce kaybederdik;
    // cevaplar okunan kutuya, destek adresine gider.
    await transport().sendMail({ from: FROM, replyTo: LEGAL_ENTITY.supportEmail, to, subject, html, text });
  } catch (err) {
    // Kayıt/sıfırlama akışı e-posta yüzünden 500 vermesin; hata log'lanır.
    console.error("[email] gönderim başarısız", err);
  }
}

/** Ortak şablon: sade, tek eylem düğmesi. Metin sürümü sesli okuyucu/istemci için. */
function template(lang: NativeLang, heading: string, body: string, cta: string, url: string): string {
  const safeUrl = url.replace(/"/g, "&quot;");
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#faf9f5;font-family:-apple-system,Segoe UI,sans-serif;color:#141413">
  <div style="max-width:480px;margin:0 auto;padding:32px 24px">
    <div style="font-size:22px;font-weight:800;color:#c87318;margin-bottom:16px">Lernomi</div>
    <h1 style="font-size:20px;margin:0 0 12px">${heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#555;margin:0 0 24px">${body}</p>
    <a href="${safeUrl}" style="display:inline-block;background:#c87318;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600;font-size:15px">${cta}</a>
    <p style="font-size:12px;color:#999;margin:28px 0 0;word-break:break-all">${translate(lang, "email.fallback_link", { url: safeUrl })}</p>
  </div></body></html>`;
}

/*
  E-POSTALAR DA ARAYÜZ. Doğrulama ve parola sıfırlama metinleri Türkçe SABİT
  yazılıydı: arayüzü İngilizce ya da Almanca olan kullanıcı, hesabını açan ilk
  e-postayı anlamadığı dilde alıyordu. Dil çağıranın verdiği dil (bkz.
  lib/auth/server.ts — çerez, yoksa tarayıcının Accept-Language'i).
*/
export function verificationEmail(url: string, lang: NativeLang = DEFAULT_NATIVE): { subject: string; html: string; text: string } {
  const tr = (k: string, vars?: Record<string, string | number>) => translate(lang, k, vars);
  return {
    subject: tr("email.verify.subject"),
    html: template(lang, tr("email.verify.heading"), tr("email.verify.body"), tr("email.verify.cta"), url),
    text: tr("email.verify.text", { url }),
  };
}

export function resetEmail(url: string, lang: NativeLang = DEFAULT_NATIVE): { subject: string; html: string; text: string } {
  const tr = (k: string, vars?: Record<string, string | number>) => translate(lang, k, vars);
  return {
    subject: tr("email.reset.subject"),
    html: template(lang, tr("email.reset.heading"), tr("email.reset.body"), tr("email.reset.cta"), url),
    text: tr("email.reset.text", { url }),
  };
}
