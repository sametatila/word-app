"use client";

import { useEffect, useState } from "react";
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

  const text = `Almanca çalışıyorum, sen de gel: haftalık sıralamada yarışalım. ${origin}`;

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
    <section className="card p-5">
      <h2 className="mb-2 flex items-center gap-2 font-bold">
        <HandshakeIcon size={18} /> Birini çağır
      </h2>
      <p className="muted text-sm">
        Haftalık sıralama, günün turu ve paylaşılan sonuçlar ancak yanında biri varken anlam
        kazanıyor. Bağlantıyı gönder, aynı tabloda yarışın.
      </p>
      <button onClick={() => void invite()} className="btn btn-primary mt-3 px-4 py-2.5 text-sm">
        {copied ? "Bağlantı kopyalandı" : "Davet bağlantısını paylaş"}
      </button>
    </section>
  );
}
