/// <reference types="node" />
import { readFileSync } from "node:fs";
import path from "node:path";
import { SFX_NOTES, type SfxKind } from "../src/lib/sfxNotes";

/**
 * SFX nota tablosu — TEK kaynak `src/lib/sfxNotes.ts`, iki NATIVE kopya.
 *
 * NEDEN TEST: aynı tablo üç dilde üç dosyada duruyor ve hiçbiri ötekini bilmiyor.
 * Kotlin kopyası ilk günden `render-sfx.py --kotlin` çıktısıydı; Swift kopyası ELLE
 * yazılmıştı, yani tabloyu değiştiren biri Android'i yeniden üretip iOS'u sessizce
 * geride bırakabilirdi. Ayrışma derlemeyi kırmaz, testi kırmaz, gözle de görünmez:
 * yalnız ekran kapalıyken — yürüyüş modunun tek kullanım biçiminde — iki platform
 * farklı ses çıkarır. Betiğin artık `--swift` çıktısı da var; burası ikisinin de
 * gerçekten yapıştırıldığını doğruluyor.
 *
 * Ekran AÇIKKEN çalan iki yol (WebView köprüsü ve mp3 yedeği) zaten doğrudan bu
 * dosyadan besleniyor, kopya taşımıyorlar.
 */
const KOK = path.join(__dirname, "..");
const oku = (p: string) => readFileSync(path.join(KOK, p), "utf8");

/** Bir blok metnindeki `[...]` / `doubleArrayOf(...)` satırlarını sayı dizilerine çevirir. */
function notalar(blok: string): number[][] {
  const out: number[][] = [];
  for (const m of blok.matchAll(/(?:doubleArrayOf\(|\[)\s*([-0-9eE.,\s+]+?)\s*[)\]]/g)) {
    const sayilar = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);
    if (sayilar.length && sayilar.every((n) => Number.isFinite(n))) out.push(sayilar);
  }
  return out;
}

const TURLER = Object.keys(SFX_NOTES) as SfxKind[];

describe("SFX nota tablosu iki native kopyada da aynı", () => {
  const kotlin = oku("android/app/src/main/java/com/lernomi/speech/LernomiSpeechModule.kt");
  const swift = oku("ios/Lernomi/LernomiSpeech.swift");

  it.each(TURLER)("%s — Kotlin (Android) kaynakla aynı", (tur) => {
    const m = kotlin.match(new RegExp(`"${tur}"\\s*->\\s*listOf\\(([\\s\\S]*?)\\n\\s*\\)`));
    expect(m).not.toBeNull();
    expect(notalar(m![1])).toEqual(SFX_NOTES[tur]);
  });

  it.each(TURLER)("%s — Swift (iOS) kaynakla aynı", (tur) => {
    const m = swift.match(new RegExp(`case\\s+"${tur}"\\s*:\\s*\\n\\s*return\\s*\\[([\\s\\S]*?)\\n\\s*\\]`));
    expect(m).not.toBeNull();
    expect(notalar(m![1])).toEqual(SFX_NOTES[tur]);
  });

  it("iki native kopya da TÜM türleri taşıyor — yenisi eklenince ikisi birden", () => {
    // Eksik bir tür `default`/`else` dalına düşer ve sessizce "tap" sesi çalar:
    // yanlış ses, hata değil. Sayının kendisi de kilitli ki kopyalar birbirinden
    // habersiz büyümesin. Yedi → on iki: turun açılışı, rozet açılışı, süre
    // uyarısı, rekor ve kusursuz tur webde vardı, mobilde yoktu (web-parity
    // §11.15) — beşi de eklendi ve iki native kopyaya yeniden üretildi.
    // On iki → on üç: etap bitiş sesi (etap duraklaması mobilde hiç yoktu).
    expect(TURLER.length).toBe(13);
    for (const tur of TURLER) {
      expect(kotlin).toContain(`"${tur}" -> listOf(`);
      expect(swift).toContain(`case "${tur}":`);
    }
  });
});
