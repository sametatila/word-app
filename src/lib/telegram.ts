import "server-only";

/**
 * Telegram'a işletim uyarısı — sahibin telefonuna düşen tek kanal.
 *
 * NEDEN. Panel yalnız bakıldığında konuşuyordu: cron susması, yedeğin
 * eskimesi, API 5xx, bakımın açık unutulması ancak panel açılınca
 * görünüyordu. 10–13 Eylül'de hatırlatma ucu dört gece 500 döndü ve kimse
 * görmedi. Uyarı motoru (`lib/alerts`) sorunu bulunca buraya yazıyor.
 *
 * Yapılandırma: `TELEGRAM_BOT_TOKEN` (BotFather) ve `TELEGRAM_CHAT_ID`.
 * İkisi de boşsa gönderim sessizce atlanıyor (yerel geliştirme). Sır loga
 * yazılmıyor; hata mesajında adres yok, yalnız HTTP durumu.
 */

export function telegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

/** Telegram HTML kipinde kaçırılması gereken üç karakter. */
export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegram(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: html.slice(0, 4000), parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[telegram] gönderilemedi, HTTP", res.status);
    return res.ok;
  } catch (err) {
    console.error("[telegram] gönderilemedi", (err as Error).name);
    return false;
  }
}
