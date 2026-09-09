import type { LegalDocDefault } from "./types";

/**
 * Destek ve iletişim sayfası — koddaki VARSAYILAN metin, üç dilde.
 *
 * NEREDEN GELDİ. 2026-09-09'a kadar bu metin JSX'ti (src/content/legal/support.tsx).
 * Panelden düzenlenebilir olması istenince markdown'a çevrildi — elle
 * kopyalanarak değil, sayfaların GERÇEK ÇIKTISINDAN üretilerek: bir cümlenin
 * yolda kaybolmadığının tek kanıtı, basılan şeyin kendisiyle karşılaştırmaktı.
 * Dönüşüm iki yönde de doğrulandı: iOS bayrağı açık ve kapalı hâlleriyle eski
 * çıktıya birebir eşleşiyor.
 *
 * BU DOSYA VARSAYILAN, KAYNAK DEĞİL. Yürürlükteki metin `legal_documents`
 * tablosunda; orada satır yoksa (yeni kurulum, boş veritabanı, okuma hatası)
 * burası basılıyor. Panelde bir şey bozulursa geri dönülecek yer burası.
 *
 * ELLE DÜZENLENEBİLİR ama düzenleme yayına ÇIKMAZ: veritabanında o belgenin
 * satırı varsa üstyazım kazanır. Buradaki metni değiştirmek yalnız yeni
 * kurulumları ve "varsayılana dön" düğmesini etkiler.
 */
export const SUPPORT_DEFAULT: Record<"tr" | "en" | "de", LegalDocDefault> = {
  tr: {
    title: "Destek ve iletişim",
    description: "Lernomi'ye nasıl ulaşacağın: destek adresi, yanıt süresi, hangi konu için hangi kanal, ve uygulama içindeki bildirme ve engelleme yolları.",
    summary: [],
    body: `Bir sorun mu var, bir şey mi soracaksın? Buradan bize ulaşabilirsin. Gelen her mesaja bir insan bakıyor; otomatik yanıt kullanmıyoruz.

## Ne için nereye yazmalı

|---|---|
| **Uygulamada bir sorun, hata ya da önerin var** | Destek adresine yaz. Hangi cihazı ve uygulama sürümünü kullandığını eklersen çok yardımcı olur (Profil › Ayarlar'ın en altında yazıyor). |
| **Hesabını ve verilerini silmek istiyorsun** | Kendin yapabilirsin: uygulamada Profil › Ayarlar › Hesap › Hesabı sil, ya da web'de [hesap silme sayfası]({{link:deleteAccount}}). Silme geri alınamaz ve mağaza aboneliğini ayrıca iptal etmen gerekir. |
| **Verilerine erişmek, düzeltmek ya da silinmesini istemek (KVKK / GDPR)** | Türkiye'den KVKK başvuruları: {{privacyEmailTr}}. AB, AEA ve Birleşik Krallık'tan GDPR başvuruları: {{privacyEmailEu}}. Hesabındaki e-posta adresinden yazman kimlik doğrulaması için yeterli. Süreler ve hakların [gizlilik politikasının]({{link:privacy}}) 10. bölümünde. |
| **Abonelik, ödeme ya da iade** | Abonelik satın alma, yenileme, iptal ve iade işlemleri mağaza üzerinden yürür; bunları biz işleyemiyoruz. Android'de [Play › Abonelikler](https://play.google.com/store/account/subscriptions){{ifIos}}, iOS'ta Ayarlar › Apple Hesabı › Abonelikler ve iade için [reportaproblem.apple.com](https://reportaproblem.apple.com){{/ifIos}}. Mağaza tarafında çözülmeyen bir durumda bize yaz, elimizden geleni yaparız. |
| **Uygunsuz bir içeriği ya da bir kullanıcıyı bildirmek istiyorsun** | En hızlısı uygulamanın içinden: yapay zekâ yanıtlarının altındaki **Bildir**, kullanıcılar için profildeki **Bildir** ve **Engelle**. Bildirimlere insan bakıyor. Acil ya da ciddi bir durumda doğrudan destek adresine de yazabilirsin. |
| **Basın, iş birliği ya da hukuki bildirim** | Destek adresine yaz, doğru kişiye ulaştırırız. Hukuki tebligat için aşağıdaki yazışma adresi geçerlidir. |

## Kime yazıyorsun

{{entityBlock:publisher}}

Uygulamayı mağazalarda yayımlayan ve destek yükümlülüğünü taşıyan taraf. Veri sorumlusu ayrı bir kişidir ve gizlilik politikasının 1. bölümünde yazılıdır.

[support@lernomi.app](mailto:support@lernomi.app)

## Uygulamanın içinden

- Bu sayfaya uygulamadan da ulaşabilirsin: Profil › Ayarlar › Destek ve iletişim.
- Yapay zekâ karakterleri gerçek kişi değildir; bu, konuşmanın başında ve ekranda kalıcı olarak yazılıdır.
- Engellediğin bir kullanıcıyla birbirinizi görmezsiniz; engelleme ve bildirim karşı tarafa gösterilmez.`,
  },
  en: {
    title: "Support and contact",
    description: "How to reach Lernomi: the support address, response time, which channel for which topic, and the in-app reporting and blocking paths.",
    summary: [],
    body: `Something wrong, or a question? This is how you reach us. A person reads every message; we do not use automated replies.

## What to write where

|---|---|
| **You hit a problem or bug, or have a suggestion** | Write to the support address. Telling us your device and app version helps a lot (it is at the bottom of Profile › Settings). |
| **You want to delete your account and data** | You can do it yourself: in the app, Profile › Settings › Account › Delete account, or on the web the [account deletion page]({{link:deleteAccount}}). Deletion cannot be undone, and you must cancel a store subscription separately. |
| **You want to access, correct or erase your data (KVKK / GDPR)** | KVKK requests from Türkiye: {{privacyEmailTr}}. GDPR and UK GDPR requests from the EU, EEA and the United Kingdom: {{privacyEmailEu}}. Writing from the e-mail address on your account is enough to verify your identity. Deadlines and your rights are in section 10 of the [privacy policy]({{link:privacy}}). |
| **Subscription, payment or refund** | Buying, renewing, cancelling and refunding a subscription is handled by the store; we cannot process these ourselves. On Android: [Play › Subscriptions](https://play.google.com/store/account/subscriptions){{ifIos}}; on iOS: Settings › Apple Account › Subscriptions, and [reportaproblem.apple.com](https://reportaproblem.apple.com) for refunds{{/ifIos}}. If the store does not resolve it, write to us and we will do what we can. |
| **You want to report objectionable content or a user** | Fastest from inside the app: **Report** under AI replies, and **Report** and **Block** on a user's profile. Reports are reviewed by a person. For anything urgent or serious you can also write to support directly. |
| **Press, partnership or legal notice** | Write to the support address and we will route it. For formal legal service, the postal address below applies. |

## Who you are writing to

{{entityBlock:publisher}}

The party that publishes the app in the stores and carries the support obligation. The data controller is a different person and is named in section 1 of the privacy policy.

[support@lernomi.app](mailto:support@lernomi.app)

## From inside the app

- You can reach this page from the app too: Profile › Settings › Support and contact.
- AI characters are not real people; this is stated at the start of a conversation and stays visible on screen.
- If you block someone, neither of you sees the other; blocks and reports are never shown to the other party.`,
  },
  de: {
    title: "Support und Kontakt",
    description: "So erreichst du Lernomi: Support-Adresse, Antwortzeit, welcher Kanal für welches Thema, und die Melde- und Blockierwege in der App.",
    summary: [],
    body: `Etwas funktioniert nicht, oder du hast eine Frage? So erreichst du uns. Jede Nachricht liest ein Mensch; automatische Antworten gibt es nicht.

## Was gehört wohin

|---|---|
| **Du hast ein Problem, einen Fehler oder einen Vorschlag** | Schreib an die Support-Adresse. Gerät und App-Version helfen sehr (sie stehen unten in Profil › Einstellungen). |
| **Du möchtest dein Konto und deine Daten löschen** | Das kannst du selbst: in der App Profil › Einstellungen › Konto › Konto löschen, oder im Web über die [Seite zur Kontolöschung]({{link:deleteAccount}}). Die Löschung ist endgültig, und ein Store-Abonnement musst du zusätzlich kündigen. |
| **Du möchtest auf deine Daten zugreifen, sie berichtigen oder löschen lassen (DSGVO / KVKK)** | KVKK-Anträge aus der Türkei: {{privacyEmailTr}}. DSGVO- und UK-GDPR-Anträge aus der EU, dem EWR und dem Vereinigten Königreich: {{privacyEmailEu}}. Es genügt, von der E-Mail-Adresse deines Kontos zu schreiben. Fristen und Rechte stehen in Abschnitt 10 der [Datenschutzerklärung]({{link:privacy}}). |
| **Abonnement, Zahlung oder Erstattung** | Kauf, Verlängerung, Kündigung und Erstattung eines Abonnements wickelt der Store ab; wir können das nicht selbst bearbeiten. Unter Android: [Play › Abonnements](https://play.google.com/store/account/subscriptions){{ifIos}}; unter iOS: Einstellungen › Apple-Account › Abonnements, für Erstattungen [reportaproblem.apple.com](https://reportaproblem.apple.com){{/ifIos}}. Löst der Store es nicht, schreib uns — wir tun, was wir können. |
| **Du möchtest anstößige Inhalte oder eine Person melden** | Am schnellsten in der App: **Melden** unter KI-Antworten sowie **Melden** und **Blockieren** im Profil einer Person. Meldungen prüft ein Mensch. In dringenden oder ernsten Fällen kannst du auch direkt an den Support schreiben. |
| **Presse, Kooperation oder rechtliche Mitteilung** | Schreib an die Support-Adresse, wir leiten es weiter. Für förmliche Zustellungen gilt die Postanschrift unten. |

## An wen du schreibst

{{entityBlock:publisher}}

Die Partei, die die App in den Stores veröffentlicht und die Supportpflicht trägt. Der Verantwortliche im Datenschutzsinn ist eine andere Person und in Abschnitt 1 der Datenschutzerklärung genannt.

[support@lernomi.app](mailto:support@lernomi.app)

## Aus der App heraus

- Diese Seite erreichst du auch aus der App: Profil › Einstellungen › Support und Kontakt.
- KI-Figuren sind keine echten Personen; das steht zu Beginn eines Gesprächs und bleibt auf dem Bildschirm sichtbar.
- Wenn du jemanden blockierst, seht ihr euch gegenseitig nicht mehr; Blockierungen und Meldungen werden der anderen Seite nie angezeigt.`,
  },
};
