import { redirect } from "next/navigation";

/**
 * Dersler LİSTESİ artık Patika'ya yönleniyor.
 *
 * Aynı içeriğin iki yüzeyi vardı: burası (kıvrılan ders yolu) ve `/immersion`
 * (Patika). İkisi aynı dersleri, aynı sırayla, aynı ilerlemeyle gösteriyordu;
 * fark yalnız çizimdeydi. Alt gezinmede zaten yalnız Patika duruyor — bu sayfa
 * oynatıcı sonlarından ve zayıf nokta kartından açılıyor, yani kullanıcı ders
 * bitirdikten sonra kendini BAŞKA bir ders ekranında buluyordu.
 *
 * Mobilde böyle bir ikilik yok: tek bir Patika var (`PathScreen`). Web de öyle.
 *
 * DERSİN KENDİSİ (`/lessons/[id]`) ve modül sınavı (`/lessons/boss/…`)
 * duruyor — kaldırılan yalnızca LİSTE. Patika'nın ünite adımları da oraya
 * bağlanıyor (bkz. lib/immersion/hub `hrefFor`).
 *
 * Adres bir yönlendirme olarak kalıyor, silinmiyor: dışarıya verilmiş
 * bağlantılar (paylaşılan bağlantı, yer imi, eski bildirim) sessizce ölmemeli.
 */
export default function LessonsIndexRedirect() {
  redirect("/immersion");
}
