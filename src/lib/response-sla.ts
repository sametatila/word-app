/**
 * GERİ DÖNÜŞ SÜRELERİ — panelin "kime, ne zamana kadar, nasıl dönülür" rehberi.
 *
 * Tek kaynak: moderasyon ve mağaza sayfalarındaki süre rozetleri, ana paneldeki
 * "Geri dönüş bekleyenler" kartı ve uyarı motorunun Telegram mesajları hepsi
 * buradaki tanımı kullanıyor. Süreler destek sayfasındaki sözle birebir
 * (`content/legal/defaults/support.ts`: mesajlar genellikle 2 iş günü,
 * bildirimler genellikle 48 saat; Samet 2026-09-28). Sayfadaki söz
 * değişirse burası da değişir.
 *
 * Kapsam: uygulama içi bildirimler ve mağaza yorumları. E-postayla gelen
 * destek ve KVKK/GDPR başvuruları panelde izlenmiyor (Samet'in kararı).
 *
 * Saf modül (sunucu ve istemci ortak): veri okumaz.
 */

export type QueueId = "user_report" | "ai_report" | "content_feedback" | "store_review";

export type SlaDef = {
  label: string;
  /** Takvim saati hedefi. */
  hours?: number;
  /** İş günü hedefi (Pzt–Cum, İstanbul günü). */
  businessDays?: number;
  /** Hedefin insan okuyacağı hâli. */
  target: string;
  /** Kuyruğun panel adresi. */
  path: string;
  /** Hedefin dayanağı: neden bu süre. */
  basis: string;
};

export const RESPONSE_SLA: Record<QueueId, SlaDef> = {
  user_report: {
    label: "Kullanıcı şikâyeti",
    hours: 48,
    target: "48 saat",
    path: "/admin/moderation",
    basis: "Destek sayfası: bildirimlere genellikle 48 saat içinde bakılır. Başka bir kişiye dokunuyor (taciz, taklit); mağaza kuralları hızlı işlenmesini bekliyor.",
  },
  ai_report: {
    label: "Yapay zekâ bildirimi",
    hours: 48,
    target: "48 saat",
    path: "/admin/moderation",
    basis: "Destek sayfası: bildirimlere genellikle 48 saat içinde bakılır. Play üretken yapay zekâ politikası insan incelemesi istiyor.",
  },
  content_feedback: {
    label: "İçerik geri bildirimi",
    hours: 7 * 24,
    target: "7 gün",
    path: "/admin/moderation/content",
    basis: "Yazım, çeviri, yanlış cevap gibi öğrenme içeriği hataları: düzeltme commit + deploy ister; herkese açık bir söz yok, iç hedef.",
  },
  store_review: {
    label: "Cevapsız 1-2★ yorum",
    businessDays: 2,
    target: "2 iş günü",
    path: "/admin/reviews#yorumlar",
    basis: "Destek sayfası: mesajlara genellikle 2 iş günü içinde yanıt. Düşük puanlı cevapsız yorum mağaza sıralamasını en çok etkileyen şey.",
  },
};

/** Kuyruk özeti (`lib/response-queue` hesaplıyor; tip burada ki istemci bileşeni sunucu modülüne dokunmasın). */
export type QueueSummary = { queue: QueueId; open: number; soon: number; late: number; oldest: string | null; error?: string };

/** Sürenin bu oranı geçince "yaklaşıyor" (sarı, Telegram uyarısı). */
export const SLA_SOON = 0.75;

const TZ = "Europe/Istanbul";
const DAY_MS = 86_400_000;
const WEEKDAY = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" });
const isWeekend = (ms: number) => {
  const d = WEEKDAY.format(ms);
  return d === "Sat" || d === "Sun";
};

/** Hedef an (ms). İş gününde hafta sonu sayılmaz: cuma akşamı gelen yorumun süresi salı akşamı dolar. */
export function slaDue(queue: QueueId, createdMs: number): number {
  const def = RESPONSE_SLA[queue];
  if (def.hours != null) return createdMs + def.hours * 3_600_000;
  let t = createdMs;
  let left = def.businessDays ?? 0;
  while (left > 0) {
    t += DAY_MS;
    if (!isWeekend(t)) left--;
  }
  return t;
}

export type SlaLevel = "ok" | "soon" | "late";
export type SlaState = { due: number; leftMs: number; level: SlaLevel };

export function slaState(queue: QueueId, created: string | number | Date, now = Date.now()): SlaState | null {
  const c = created instanceof Date ? created.getTime() : typeof created === "number" ? created : Date.parse(created);
  if (!Number.isFinite(c)) return null;
  const due = slaDue(queue, c);
  const span = due - c;
  const leftMs = due - now;
  const level: SlaLevel = leftMs <= 0 ? "late" : span > 0 && (now - c) / span >= SLA_SOON ? "soon" : "ok";
  return { due, leftMs, level };
}

/** "31 sa kaldı" · "2 g 4 sa kaldı" · "5 sa gecikti". */
export function slaText(s: SlaState): string {
  const abs = Math.abs(s.leftMs);
  const h = Math.floor(abs / 3_600_000);
  const d = Math.floor(h / 24);
  const span = d >= 1 ? `${d} g ${h % 24} sa` : h >= 1 ? `${h} sa` : `${Math.max(1, Math.round(abs / 60_000))} dk`;
  return s.leftMs > 0 ? `${span} kaldı` : `${span} gecikti`;
}

/* ───────────────────────── Nasıl dönülür ───────────────────────── */

export const RESPONSE_GUIDE: Record<QueueId, { title: string; steps: string[] }> = {
  user_report: {
    title: "Kullanıcı şikâyetine nasıl dönülür",
    steps: [
      "Şikâyet edilen hesabın adını, kullanıcı adını ve profilini aç; 'toplam şikâyet / engel' kırmızıysa tek şikâyet değil, örüntü var.",
      "Ad ya da kullanıcı adı hakaret, taklit ya da uygunsuzsa: 'Adı sıfırla + kapat'. Kişi yeni ad seçebilir; yeni ad da süzgeçten geçer.",
      "Taciz, tehdit ya da tekrar eden ihlal: kullanıcı sayfasından hesabı askıya al, sonra şikâyeti 'Gereği yapıldı' ile kapat ve nota ne yaptığını yaz.",
      "Dayanak yoksa (yanlış anlama, zevk farkı): 'Asılsız'. Nota kısa gerekçe yaz; itiraz gelirse buradan bakılır.",
      "Karar verildiği anda bildiren kişiye uygulama içinde tarafsız bir sonuç bildirimi gider (DSA m.16(5)); ayrıca e-posta gerekmez.",
      "Hayati tehlike, çocuk istismarı ya da suç şüphesi: panelde bekletme, yetkililere bildir ve hesabı hemen askıya al.",
    ],
  },
  ai_report: {
    title: "Yapay zekâ bildirimine nasıl dönülür",
    steps: [
      "Çıktının kendisini oku (kartta anlık görüntü var); bildiren açıklama yazdıysa onu da.",
      "Zararlı, saldırgan ya da uygunsuz çıktı: 'Gereği yapıldı'; notta istemi mi, modeli mi, süzgeci mi etkilediğini yaz ve tekrarlıyorsa geliştirme işi aç.",
      "Yanlış bilgi ya da yanlış değerlendirme (puan, düzeltme): 'Gereği yapıldı'; aynı hedefte birden çok bildirim varsa İçerik geri bildirimi grubuna bak.",
      "Çıktı doğru ve uygunsa: 'Asılsız', nota kısa gerekçe.",
      "Bildirene sonuç bildirimi otomatik gider.",
    ],
  },
  content_feedback: {
    title: "İçerik geri bildirimine nasıl dönülür",
    steps: [
      "Grubu aç: aynı hedefi kaç kişi, hangi nedenle bildirmiş; anlık görüntü öğrencinin gördüğü hâl.",
      "Hata gerçekse ve hemen yayından kalkmalıysa (yanlış cevap anahtarı, bozuk ses): 'İçeriği kapat'. Madde düzelene kadar kullanıcıya gösterilmez.",
      "Düzeltme kaynakta yapılır (`data/**` ya da `src/lib/**`), kapılar (`check:*`) geçince commit + push; deploy içerik yayınını kendisi yapar. Sonra grubu 'Gereği yapıldı' ile kapat, nota commit'i yaz.",
      "Hata değilse (öğrenci yanlış anlamış, bilerek yanlış örnek): 'Asılsız'. Sık yanlış anlaşılıyorsa açıklamayı netleştirmeyi düşün.",
      "Grup kapatılınca her bildirene tek sonuç bildirimi gider.",
    ],
  },
  store_review: {
    title: "Mağaza yorumuna nasıl dönülür",
    steps: [
      "Cevap mağaza konsolundan verilir (bu panel yazmaz): 'Konsolda cevapla ↗'.",
      "Yorumun dilinde cevap ver; teşekkür et, sorunu somut adla an, ne yapıldığını ya da ne yapılacağını söyle. Kişisel veri, sipariş numarası ya da e-posta isteme; gerekiyorsa destek adresine yönlendir.",
      "Hata bildirimi: panelde Hatalar ve İçerik geri bildirimi'nde aynı sorun var mı bak; düzeltildiyse hangi sürümde olduğunu yaz.",
      "Abonelik, ödeme, iade: satın alma ve iadeyi mağaza yürütür; Play'de Play › Abonelikler, iOS'ta Ayarlar › Apple Hesabı › Abonelikler yolunu ver.",
      "Tartışmaya girme, savunmaya geçme; yorumcu cevaptan sonra puanını güncelleyebilir.",
      "Aşağıdaki şablonlar başlangıç noktası: yorumu okuyup kişiselleştir, kopyala-yapıştır cevap mağazada kötü görünür.",
    ],
  },
};

/* ───────────────────────── Yanıt şablonları ───────────────────────── */

export type ReplyTemplate = { id: string; label: string; tr: string; en: string; de: string };

/** Mağaza yorumu cevapları. `[…]` kısımları yoruma göre doldurulur. Play cevabı en çok 350 karakter. */
export const REVIEW_TEMPLATES: ReplyTemplate[] = [
  {
    id: "thanks",
    label: "Teşekkür (olumlu yorum)",
    tr: "Güzel yorumun için çok teşekkürler! [Beğendiği özellik] hakkında yazdıklarını ekiple paylaştık. İyi çalışmalar!",
    en: "Thank you so much for the kind review! We shared what you wrote about [feature] with the team. Happy learning!",
    de: "Vielen Dank für die tolle Bewertung! Was du über [Funktion] geschrieben hast, haben wir mit dem Team geteilt. Viel Erfolg beim Lernen!",
  },
  {
    id: "bug",
    label: "Hata bildirimi",
    tr: "Yaşadığın sorun için özür dileriz. [Sorun] üzerinde çalışıyoruz; düzeltme bir sonraki güncellemede gelecek. Ayrıntı paylaşmak istersen support@lernomi.app adresine yazabilirsin.",
    en: "Sorry about the trouble. We are working on [issue], and the fix will come in the next update. If you would like to share details, write to support@lernomi.app.",
    de: "Entschuldige die Unannehmlichkeiten. Wir arbeiten an [Problem]; die Korrektur kommt mit dem nächsten Update. Wenn du Details teilen möchtest, schreib an support@lernomi.app.",
  },
  {
    id: "fixed",
    label: "Hata düzeltildi",
    tr: "Bildirdiğin [sorun] [sürüm] sürümünde düzeltildi. Güncelleyip yeniden dener misin? Geri bildirimin için teşekkürler!",
    en: "The [issue] you reported is fixed in version [version]. Could you update and give it another try? Thanks for the feedback!",
    de: "Das gemeldete [Problem] ist in Version [Version] behoben. Magst du aktualisieren und es noch einmal versuchen? Danke für die Rückmeldung!",
  },
  {
    id: "content",
    label: "İçerik hatası (yazım, çeviri, yanlış cevap)",
    tr: "Haklısın, [içerik] hatalıydı; düzelttik. Uygulamadaki her ekranda \"Bildir\" düğmesi var, gördüğün hataları oradan da iletebilirsin. Teşekkürler!",
    en: "You are right, [content] was wrong, and we have fixed it. Every screen in the app has a \"Report\" button, so you can send us any mistake you spot from there too. Thank you!",
    de: "Du hast recht, [Inhalt] war fehlerhaft, und wir haben es korrigiert. Auf jedem Bildschirm gibt es die Schaltfläche \"Melden\", über die du Fehler auch direkt schicken kannst. Danke!",
  },
  {
    id: "billing",
    label: "Abonelik / ödeme / iade",
    tr: "Satın alma ve iadeyi mağaza yürütüyor. Aboneliğini Play › Abonelikler (iOS'ta Ayarlar › Apple Hesabı › Abonelikler) üzerinden yönetebilir, iadeyi oradan isteyebilirsin. Sorun sürerse support@lernomi.app adresine yaz.",
    en: "Purchases and refunds are handled by the store. You can manage your subscription and request a refund under Play › Subscriptions (on iOS, Settings › Apple Account › Subscriptions). If the problem continues, write to support@lernomi.app.",
    de: "Käufe und Erstattungen laufen über den Store. Dein Abo verwaltest du unter Play › Abos (auf iOS: Einstellungen › Apple-Account › Abos) und kannst dort auch eine Erstattung anfordern. Wenn das Problem bleibt, schreib an support@lernomi.app.",
  },
  {
    id: "feature",
    label: "Özellik isteği",
    tr: "Önerin için teşekkürler! [İstek] fikrini yol haritamıza not ettik. Görüşlerin Lernomi'yi şekillendiriyor.",
    en: "Thanks for the suggestion! We have added [request] to our roadmap notes. Your feedback shapes Lernomi.",
    de: "Danke für den Vorschlag! Wir haben [Wunsch] für unsere Roadmap notiert. Dein Feedback prägt Lernomi.",
  },
];
