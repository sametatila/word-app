import { ImageResponse } from "next/og";

/**
 * Paylaşılan bağlantının önizleme görseli.
 *
 * Uygulamanın hiçbir yayılma yolu yoktu ve bağlantı paylaşıldığında
 * WhatsApp ya da X'te yalnızca çıplak bir adres görünüyordu — tıklanma
 * oranını en çok düşüren şey bu. Görsel kodla üretiliyor: tek bir PNG
 * dosyasını elle güncel tutmak, sayılar değiştikçe unutulan bir iş olurdu.
 */

export const alt = "Lernomi — Almanca kelimeleri oynayarak öğren";
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
          background: "linear-gradient(135deg, #2c2521 0%, #1e1916 55%, #14100e 100%)",
          color: "#f4eee4",
          fontFamily: "sans-serif",
        }}
      >
        {/*
          Marka satırı.

          Maskot burada raster olarak YOK: `next/og` sunucuda çalışıyor ve
          `public/` altındaki bir dosyayı okumak dağıtım ortamına göre sessizce
          boş dönebiliyor — bozuk bir önizleme, önizlemesiz bağlantıdan daha
          kötü. Kart bu yüzden tipografik, ama rengi maskotun: kestane zemin
          üstünde kehribar.
        */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #eda45d, #c87318)",
              color: "#2f1911",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.5 }}>Lernomi</div>
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

        <div style={{ display: "flex", fontSize: 34, color: "#a79684", marginTop: 30 }}>
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
