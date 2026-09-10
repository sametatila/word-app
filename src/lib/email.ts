import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { LEGAL_ENTITY } from "@/lib/legal";
import { translate, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";
import { redisClient, warnRedisOnce } from "@/lib/auth/redis";

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

/**
 * ALICI BAŞINA SAATLİK TAVAN.
 *
 * Hız sınırları IP başına sayıyor; farklı IP'lerden aynı adrese posta
 * yağdırmanın önünde bir şey yoktu. Doğrulama ve sıfırlama uçları kimlik
 * istemediği için bu, bir kurbanın gelen kutusunu doldurmanın ve SMTP
 * kotasını tüketmenin yoluydu.
 *
 * Tavan ADRESE bağlı, gönderen akışa değil: kim tetiklerse tetiklesin aynı
 * kutuya saatte en çok bu kadar posta düşüyor. Gerçek kullanıcı bu sayıya
 * çarpmıyor — doğrulama, sıfırlama ve bildirim postaları bir arada bile
 * saatte birkaç tane.
 *
 * Redis yoksa TAVAN YOK (açığa düş): posta göndermeyi bir önbelleğin
 * varlığına bağlamak, kayıt akışını Redis kesintisinde durdururdu.
 */
const MAIL_CAP_PER_HOUR = 10;

async function overMailCap(to: string): Promise<boolean> {
  try {
    const r = redisClient();
    if (!r) return false;
    const k = `lernomi:mailcap:${to.trim().toLowerCase()}`;
    const count = await r.incr(k);
    if (count === 1) await r.expire(k, 3600);
    return count > MAIL_CAP_PER_HOUR;
  } catch (err) {
    warnRedisOnce(err);
    return false;
  }
}

export async function sendEmail(to: string, subject: string, html: string, text: string): Promise<void> {
  if (!emailConfigured) {
    console.log(`[email] SMTP tanımsız — gönderilmedi: ${to} · ${subject}`);
    return;
  }
  if (await overMailCap(to)) {
    // İngilizce: sunucu log'u, arayüz dizgisi değil.
    console.warn(`[email] hourly cap reached for ${to}, not sent: ${subject}`);
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

/**
 * Kod şablonu — düğmesiz.
 *
 * Öteki postalar bir bağlantıya götürüyor; bu posta KODUN KENDİSİNİ taşıyor.
 * Bağlantı koymamak bilinçli: giriş kodunu tıklanabilir bir adresin arkasına
 * saklamak, kullanıcıyı tam da oltalamanın taklit ettiği harekete alıştırır.
 * Kod büyük ve seçilebilir duruyor, gerisi metin.
 */
function codeTemplate(lang: NativeLang, heading: string, body: string, code: string, note: string): string {
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#faf9f5;font-family:-apple-system,Segoe UI,sans-serif;color:#141413">
  <div style="max-width:480px;margin:0 auto;padding:32px 24px">
    <div style="font-size:22px;font-weight:800;color:#c87318;margin-bottom:16px">Lernomi</div>
    <h1 style="font-size:20px;margin:0 0 12px">${heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#555;margin:0 0 20px">${body}</p>
    <div style="font-size:32px;font-weight:800;letter-spacing:8px;background:#fff;border:1px solid #e6e4dd;border-radius:12px;padding:18px 12px;text-align:center">${code}</div>
    <p style="font-size:12px;color:#999;margin:24px 0 0;line-height:1.6">${note}</p>
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

/**
 * "Parolan değiştirildi" — sıfırlama tamamlandıktan SONRA gidiyor.
 *
 * Hesap devralmanın kullanıcıya görünen tek erken uyarısı bu. Sıfırlamayı
 * yapan saldırgansa kullanıcı bunu ancak bu postadan öğrenir; bu yüzden
 * eylem düğmesi yeniden sıfırlamaya götürüyor — "ben değilsem hemen geri al"
 * yolu tek dokunuş uzakta olsun.
 */
export function passwordChangedEmail(resetUrl: string, lang: NativeLang = DEFAULT_NATIVE): { subject: string; html: string; text: string } {
  const tr = (k: string, vars?: Record<string, string | number>) => translate(lang, k, vars);
  return {
    subject: tr("email.changed.subject"),
    html: template(lang, tr("email.changed.heading"), tr("email.changed.body"), tr("email.changed.cta"), resetUrl),
    text: tr("email.changed.text", { url: resetUrl }),
  };
}

/**
 * "Bu adreste zaten hesabın var" — var olan bir e-postayla kayıt denenince.
 *
 * Kayıt ucu hesabın varlığını SIZDIRMIYOR: var olan adrese de yeni kayıtmış
 * gibi 200 dönüyor (better-auth sign-up.mjs, sentetik yanıt). Doğru karar,
 * ama tek başına bırakıldığında kullanıcı hiç gelmeyecek bir doğrulama
 * postası bekliyordu. OWASP'ın önerdiği çıkış yolu bu: ekranda hiçbir şey
 * değişmez, gerçek adresin SAHİBİNE durumu anlatan bir posta gider.
 */
export function accountExistsEmail(resetUrl: string, lang: NativeLang = DEFAULT_NATIVE): { subject: string; html: string; text: string } {
  const tr = (k: string, vars?: Record<string, string | number>) => translate(lang, k, vars);
  return {
    subject: tr("email.exists.subject"),
    html: template(lang, tr("email.exists.heading"), tr("email.exists.body"), tr("email.exists.cta"), resetUrl),
    text: tr("email.exists.text", { url: resetUrl }),
  };
}

/**
 * İkinci adım kodu — parola doğrulandıktan SONRA gidiyor.
 *
 * Kod tek kullanımlık ve kısa ömürlü; süresi ve deneme hakkı sunucudaki
 * eklenti yapılandırmasında (bkz. lib/auth/server two-factor). Metin ayrıca
 * "bunu sen istemediysen parolan başkasının elinde" uyarısını taşıyor: kodu
 * beklemeyen bir kullanıcı için bu postanın kendisi bir ihlal alarmıdır.
 */
export function twoFactorCodeEmail(code: string, lang: NativeLang = DEFAULT_NATIVE): { subject: string; html: string; text: string } {
  const tr = (k: string, vars?: Record<string, string | number>) => translate(lang, k, vars);
  return {
    subject: tr("email.twofactor.subject"),
    html: codeTemplate(lang, tr("email.twofactor.heading"), tr("email.twofactor.body"), code, tr("email.twofactor.note")),
    text: tr("email.twofactor.text", { code }),
  };
}
