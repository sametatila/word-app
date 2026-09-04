import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Giden e-posta — SMTP tek kaynak.
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
      secure: PORT === 465, // 465 → örtük TLS; 587 → STARTTLS
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
    await transport().sendMail({ from: FROM, to, subject, html, text });
  } catch (err) {
    // Kayıt/sıfırlama akışı e-posta yüzünden 500 vermesin; hata log'lanır.
    console.error("[email] gönderim başarısız", err);
  }
}

/** Ortak şablon: sade, tek eylem düğmesi. Metin sürümü sesli okuyucu/istemci için. */
function template(heading: string, body: string, cta: string, url: string): string {
  const safeUrl = url.replace(/"/g, "&quot;");
  return `<!doctype html><html lang="tr"><body style="margin:0;background:#faf9f5;font-family:-apple-system,Segoe UI,sans-serif;color:#141413">
  <div style="max-width:480px;margin:0 auto;padding:32px 24px">
    <div style="font-size:22px;font-weight:800;color:#c87318;margin-bottom:16px">Lernomi</div>
    <h1 style="font-size:20px;margin:0 0 12px">${heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#555;margin:0 0 24px">${body}</p>
    <a href="${safeUrl}" style="display:inline-block;background:#c87318;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600;font-size:15px">${cta}</a>
    <p style="font-size:12px;color:#999;margin:28px 0 0;word-break:break-all">Düğme çalışmazsa: ${safeUrl}</p>
  </div></body></html>`;
}

export function verificationEmail(url: string): { subject: string; html: string; text: string } {
  return {
    subject: "Lernomi — e-posta adresini doğrula",
    html: template("E-postanı doğrula", "Lernomi hesabını kullanmaya başlamak için e-posta adresini doğrula.", "E-postamı doğrula", url),
    text: `Lernomi e-posta doğrulama\n\nAdresini doğrulamak için: ${url}`,
  };
}

export function resetEmail(url: string): { subject: string; html: string; text: string } {
  return {
    subject: "Lernomi — parola sıfırlama",
    html: template("Parolanı sıfırla", "Parolanı sıfırlamak için aşağıdaki bağlantıya dokun. İstemediysen bu e-postayı yok say.", "Parolamı sıfırla", url),
    text: `Lernomi parola sıfırlama\n\nParolanı sıfırlamak için: ${url}\n\nİstemediysen yok say.`,
  };
}
