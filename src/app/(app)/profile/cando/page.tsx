import { PageBack } from "@/components/page-back";
import { CandoCard } from "@/components/cando-card";

export const metadata = { title: "Yapabildiklerim" };

/**
 * "Yapabildiklerim" (WP-43) — web'de HİÇBİR YERDEN açılamıyordu.
 *
 * `CandoCard` yazılmış, `/api/cando` çalışıyor ve `cando-map` ders/egzersiz
 * başına ifadeleri üretiyordu; eksik olan tek şey bileşeni çizen bir sayfaydı.
 * Mobilde aynı liste Profil › "Yapabildiklerim" satırından açılıyor, web'de
 * karşılığı yoktu — aynı hesap, iki platformda iki farklı ürün oluyordu.
 *
 * Kendi sayfasında duruyor (profildeki karta gömülmüyor): liste seviye başına
 * uzun ve kendi sekmelerini taşıyor; profilin altında bir bölüm olarak durursa
 * sayfanın gerisini bastırır. Mobildeki yerleşim de böyle.
 */
export default function CandoPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <PageBack fallback="/profile" title="Yapabildiklerim" subtitle="Kanıtladığın beceriler, seviye seviye" />
      <CandoCard />
    </div>
  );
}
