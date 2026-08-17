import { ImageResponse } from "next/og";

/**
 * Paylaşılan bağlantının önizleme görseli.
 *
 * Uygulamanın hiçbir yayılma yolu yoktu ve bağlantı paylaşıldığında
 * WhatsApp ya da X'te yalnızca çıplak bir adres görünüyordu — tıklanma
 * oranını en çok düşüren şey bu. Görsel kodla üretiliyor: tek bir PNG
 * dosyasını elle güncel tutmak, sayılar değiştikçe unutulan bir iş olurdu.
 */

export const alt = "Wortspiel — Almanca kelimeleri oynayarak öğren";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "linear-gradient(135deg, #0e1020 0%, #1a1638 55%, #2a1f52 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Marka satırı */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.5 }}>Wortspiel</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.15,
            marginTop: 44,
            letterSpacing: -2,
          }}
        >
          Almanca kelimeleri oynayarak öğren
        </div>

        <div style={{ display: "flex", fontSize: 34, color: "#b6b9d8", marginTop: 30 }}>
          A1–C1 · 10 oyun · tekrarı kendi planlayan sistem
        </div>

        {/* İki kurs — ürünün eşi olmayan yanı burada duruyor. */}
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["Hochdeutsch", "Züritüütsch", "Türkçe anlatım"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 27,
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
