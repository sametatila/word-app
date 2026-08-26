"use client";

import { useEffect, useState } from "react";
import { SettingRow } from "@/components/setting-row";
import { HandshakeIcon } from "@/components/icons";
import { track } from "@/lib/track";

/**
 * Davet kartı.
 *
 * Uygulamadaki sosyal mekaniklerin hepsi (haftalık sıralama, günün turu,
 * paylaşılabilir sonuç) İNSAN gerektiriyor ve ölçüm sırasında toplam yedi
 * kişi vardı. Yedi kişilik bir sıralama tablosu bir tablo değil, bir liste.
 *
 * Eksik olan mekanik değildi, davet etmenin yoluydu: uygulamanın hiçbir
 * yerinde "bunu birine göster" düğmesi yoktu. Kart tam olarak bunu yapıyor
 * ve başka hiçbir şey yapmıyor — kod yok, ödül yok, davet sayacı yok.
 * Bu uygulama satılmıyor; büyümesi gereken tek şey masanın etrafındaki
 * kişi sayısı.
 */
export function InviteCard() {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  // `src=invite`: davetle gelen açılış invite_open olayı olarak sayılıyor (WP-80).
  const text = `Almanca çalışıyorum, sen de gel: haftalık sıralamada yarışalım. ${origin}/?src=invite`;

  async function invite() {
    track("share");
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
    } catch {
      /* paylaşım sayfası kapatıldıysa panoya düşülür */
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* pano da yoksa kullanıcı adresi zaten görüyor */
    }
  }

  return (
    /* Kart değil satır. Bir başlık, iki satır açıklama ve tam genişlikte bir
       düğme, tek bir paylaş eylemi için 146 piksel harcıyordu; ayarların geri
       kalanı satır ritmine geçince bu kart tek başına eski biçimde kalıyordu.
       İlk cümle üç özelliği sayıp hepsinin neden tek başına anlamsız olduğunu
       anlatıyordu — ikna metni bile olsa kullanıcıya kendi uygulamasını
       tanıtıyordu. Kalan cümle davetin ne işe yaradığını söylüyor. */
    <section className="card">
      <SettingRow title="Birini çağır" sub="Bağlantıyı gönder, aynı tabloda yarışın">
        <button
          onClick={() => void invite()}
          className="btn btn-primary h-9 px-3.5 text-xs"
        >
          <HandshakeIcon size={15} />
          <span className="ml-1.5">{copied ? "Kopyalandı" : "Paylaş"}</span>
        </button>
      </SettingRow>
    </section>
  );
}
