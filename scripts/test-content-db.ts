import "dotenv/config";
import { eq, inArray, like } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentFlags, contentReleaseItems, contentReleases } from "@/lib/db/schema";
import { disableItem, enableItem, promote, promoteDueDrafts, publish, type PackInput } from "@/lib/content/publish";
import {
  body,
  disabledItemsOf,
  exerciseDisabled,
  invalidatePointer,
  conversationDisabled,
  manifest,
  paperDisabled,
  releaseDiff,
  pointer,
  readItem,
} from "@/lib/content/read";
import { legacyNativeManifest } from "@/lib/legacy-names";
import { FULL_PACK } from "@/lib/content/ids";
import { packItemsAt } from "@/lib/content/serve";

/**
 * İÇERİK TESLİM HATTININ VERİTABANI TESTİ.
 *
 * Buradaki tek soru trafik: hattın değeri, hiçbir şey değişmediğinde HİÇBİR
 * ŞEY göndermemesinde ve bir kelime değiştiğinde YALNIZ o maddeyi
 * göndermesinde. Delta yanlış hesaplanırsa kimse fark etmez — uygulama
 * çalışmaya devam eder, yalnız her kullanıcı her gün 27 MB indirir. Sessiz ve
 * pahalı bir kusur; bu yüzden kapı burada.
 *
 * İkinci soru kapı: kapılı paketin manifestte görünmemesi ve gövdesinin
 * herkese açık uçtan dönmemesi. O kapı kırılırsa premium içerik tek liste
 * okumasıyla sızar.
 *
 * ÜRETİMDE KOŞMAZ: adres localhost/127.0.0.1 değilse baştan reddediyor.
 * CANLI GÖSTERGEYİ GEÇİCİ OLARAK DEVRALIR: kendi sürümlerini canlıya alıyor,
 * sonunda hepsini siliyor ve önceki canlı sürümü geri veriyor.
 */
const url = process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL ?? "";
const host = url ? new URL(url).hostname : "";
if (host !== "localhost" && host !== "127.0.0.1") {
  console.error(`Yalnız yerel veritabanı: ${host || "(adres yok)"} reddedildi`);
  process.exit(2);
}

let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

const FREE = "tests/free";
const GATED = "papers/tests";

function pack(entries: Record<string, unknown>): PackInput {
  return new Map(Object.entries(entries));
}

async function restore(previousLive: number | null) {
  const mine = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(eq(contentReleases.publishedBy, "test:content-db"));
  const versions = mine.map((r) => r.version);
  if (versions.length > 0) {
    await db.delete(contentReleaseItems).where(inArray(contentReleaseItems.release, versions));
    await db.delete(contentReleases).where(inArray(contentReleases.version, versions));
  }
  await db.delete(contentFlags).where(like(contentFlags.pack, "tests/%"));
  await db.delete(contentFlags).where(eq(contentFlags.pack, GATED));
  await db.delete(contentFlags).where(like(contentFlags.pack, "conversations/%"));
  await db.delete(contentFlags).where(like(contentFlags.pack, "skills/%"));
  await db.delete(contentFlags).where(like(contentFlags.pack, "papers/%"));
  await db.delete(contentFlags).where(like(contentFlags.pack, "quiz/%"));
  /* Gövdeler hash adresli ve paylaşılabilir; testinkileri ancak başka hiçbir
     sürüm kullanmıyorsa siliyoruz. */
  await db.execute(
    `delete from content_items ci
       where ci.created_at > now() - interval '1 hour'
         and not exists (select 1 from content_release_items ri where ri.hash = ci.hash)`,
  );
  if (previousLive) await promote(previousLive, null);
  invalidatePointer();
}

async function main() {
  const [was] = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(eq(contentReleases.status, "live"))
    .limit(1);
  const previousLive = was?.version ?? null;

  try {
    const by = "test:content-db";

    /* 1. İLK YAYIN. */
    const first = await publish(
      new Map([
        [FREE, pack({ a: { t: "bir" }, b: { t: "iki" }, c: { t: "üç" } })],
        [GATED, pack({ p1: { t: "kâğıt" } })],
      ]),
      { by, note: "test 1" },
    );
    check("ilk yayın sürüm açıyor", first.version > 0 && !first.unchanged, JSON.stringify(first));
    check("madde sayısı doğru", first.items === 4, `items=${first.items}`);

    /* 2. AYNI İÇERİK: yeni sürüm YOK. Her deploy bir sürüm açsaydı sürüm
       listesi kullanılamaz, geri alma anlamsız olurdu. */
    const again = await publish(
      new Map([
        [FREE, pack({ a: { t: "bir" }, b: { t: "iki" }, c: { t: "üç" } })],
        [GATED, pack({ p1: { t: "kâğıt" } })],
      ]),
      { by, note: "test 1 tekrar" },
    );
    check("aynı içerik yeni sürüm açmıyor", again.unchanged && again.version === first.version);

    /* 3. TEK KELİME DEĞİŞTİ: delta tam olarak bir madde olmalı. */
    const second = await publish(
      new Map([
        [FREE, pack({ a: { t: "bir" }, b: { t: "İKİ" }, c: { t: "üç" } })],
        [GATED, pack({ p1: { t: "kâğıt" } })],
      ]),
      { by, note: "test 2" },
    );
    check("değişiklik yeni sürüm açıyor", second.version > first.version && !second.unchanged);
    check("yalnız değişen gövde yazılıyor", second.fresh === 2, `fresh=${second.fresh} (madde + paket arşivi)`);

    invalidatePointer();
    const delta = await manifest(FREE, first.version);
    check("delta tek madde taşıyor", delta.i.length === 1 && delta.i[0].i === "b", JSON.stringify(delta.i));
    check("delta silinen madde taşımıyor", delta.x.length === 0, JSON.stringify(delta.x));
    check("delta paket arşivini taşıyor", delta.f !== null);

    /* 4. MADDE DÜŞTÜ: eski istemci onu atmayı bilmeli. */
    const third = await publish(
      new Map([
        [FREE, pack({ a: { t: "bir" }, b: { t: "İKİ" } })],
        [GATED, pack({ p1: { t: "kâğıt" } })],
      ]),
      { by, note: "test 3" },
    );
    check("madde düşürmek yeni sürüm açıyor", third.version > second.version && third.items === 3, `items=${third.items}`);
    invalidatePointer();
    const dropped = await manifest(FREE, second.version);
    check("düşen madde deltada", dropped.x.length === 1 && dropped.x[0] === "c", JSON.stringify(dropped.x));
    check("düşen maddede yeni indirme yok", dropped.i.length === 0, JSON.stringify(dropped.i));

    /* 5. SIFIRDAN İSTEMCİ: tam liste. */
    const full = await manifest(FREE, 0);
    check("since=0 tam liste veriyor", full.i.length === 2, `${full.i.length}`);
    check("bilinmeyen sürüm tam listeye düşüyor", (await manifest(FREE, 999_999)).i.length === 2);

    /* 6. KAPI: kapılı paket herkese açık manifestte yok. */
    const gated = await manifest(GATED, 0);
    check("kapılı paket manifestte görünmüyor", gated.i.length === 0 && gated.f === null);

    const gatedHashes = await db
      .select({ hash: contentReleaseItems.hash, item: contentReleaseItems.item })
      .from(contentReleaseItems)
      .where(eq(contentReleaseItems.pack, GATED));
    const paper = gatedHashes.find((r) => r.item === "p1");
    const paperBody = paper ? await body(paper.hash) : null;
    check("kapılı gövde kapılı işaretli", paperBody?.gated === true, JSON.stringify({ found: !!paperBody }));
    const gatedArchive = gatedHashes.find((r) => r.item === FULL_PACK);
    check("kapılı paket arşivi de kapılı", gatedArchive ? (await body(gatedArchive.hash))?.gated === true : false);

    /* 7. GÖVDE: sıkıştırılmış hâl ham içeriğe geri açılıyor. */
    const read = await readItem<{ t: string }>(FREE, "b");
    check("gövde okunup çözülüyor", read?.t === "İKİ", JSON.stringify(read));

    /* 8. KAPATMA: göstergeye anında düşüyor, sürümden bağımsız. */
    await disableItem(FREE, "a", "broken", by);
    check("kapatılan madde göstergede", (await pointer()).d.includes(`${FREE}:a`));
    const afterRollback = await promote(first.version, by);
    check("geri alma çalışıyor", afterRollback && (await pointer()).r === first.version);
    check("geri alma kapatmayı açmıyor", (await pointer()).d.includes(`${FREE}:a`));
    await enableItem(FREE, "a");
    check("kapatma kaldırılabiliyor", !(await pointer()).d.includes(`${FREE}:a`));

    /* 9. KAPATMA WEBDE DE İŞLİYOR.
       Web içeriği koddan okuyor, yani kapatılan madde kendiliğinden
       gizlenmiyor; kimlikten paketi çözen yardımcılar bu boşluğu kapatıyor.
       Yarısı işleyen bir anahtar, hiç işlemeyenden kötü. */
    await disableItem("conversations/de-b1", "de-b1-bewerbung", "broken", by);
    check("kapatılan konuşma webde de kapalı", await conversationDisabled("de-b1-bewerbung"));
    check("kapatılmamış konuşma açık", !(await conversationDisabled("de-b1-lebenslauf")));
    /* Build 6 aynı maddeyi eski paket adıyla tutuyor (geçici, lib/legacy-names). */
    check("kapatma göstergede eski paket adıyla da var", (await pointer()).d.includes("lessons/de-b1:de-b1-bewerbung"));
    {
      const m = legacyNativeManifest("native/de", { r: 2, p: "native/de", f: { h: "arsiv", b: 9 }, i: [{ i: "conversation", h: "H", b: 1 }], x: ["lesson"] });
      check(
        "build 6 anadil manifesti: eski madde adı aynı hash'le, arşiv yok, düşen listesinde değil",
        m.f === null && m.i.some((e) => e.i === "lesson" && e.h === "H") && !m.x.includes("lesson"),
      );
    }
    await enableItem("conversations/de-b1", "de-b1-bewerbung");

    await disableItem("skills/de-a1", "a1-u1-r1", "reported", by);
    check("kapatılan egzersiz webde de kapalı", await exerciseDisabled("a1-u1-r1"));
    await enableItem("skills/de-a1", "a1-u1-r1");

    await disableItem("papers/de", "de-b1-01", "broken", by);
    check("kapatılan kâğıt webde de kapalı", await paperDisabled("de-b1-01"));
    await enableItem("papers/de", "de-b1-01");

    /* 10. YAYINLANMAMIŞ PAKETİN MADDESİ DE KAPATILABİLİYOR.
       Haftalık quiz içeriği yayın hattında yok ama bozuk sorusu bir sonraki
       yayını beklemeden düşmeli; kapatma listesi sürümden bağımsız olduğu
       için bu mümkün. */
    await disableItem("quiz/de", "de-a1-w01-g2", "broken", by);
    const quizOff = await disabledItemsOf("quiz/de");
    check("yayınlanmamış paketin maddesi kapatılabiliyor", quizOff.has("de-a1-w01-g2"), [...quizOff].join(","));
    check("başka paketin kapatması sızmıyor", !(await disabledItemsOf("quiz/en")).has("de-a1-w01-g2"));
    await enableItem("quiz/de", "de-a1-w01-g2");

    /* 11. SÜRÜM FARKI — geri alma kararının dayanağı.
       first: a,b,c · second: b değişti · third: c düştü */
    const d12 = await releaseDiff(first.version, second.version);
    const free12 = d12.find((x) => x.pack === FREE);
    check("fark değişen maddeyi buluyor", free12?.changed.join() === "b", JSON.stringify(free12));
    check("fark ekleme/düşme uydurmuyor", (free12?.added.length ?? 0) === 0 && (free12?.removed.length ?? 0) === 0);
    const d23 = await releaseDiff(second.version, third.version);
    const free23 = d23.find((x) => x.pack === FREE);
    check("fark düşen maddeyi buluyor", free23?.removed.join() === "c", JSON.stringify(free23));
    check("aynı sürümün farkı boş", (await releaseDiff(first.version, first.version)).length === 0);

    /* 12. ZAMANLI YAYIN — panelde görünen `goLiveAt` gerçekten işliyor mu. */
    const future = await publish(new Map([[FREE, pack({ a: { t: "bir" }, b: { t: "ÜÇ" } })]]), {
      by,
      note: "gelecek taslak",
      live: false,
      goLiveAt: new Date(Date.now() + 60 * 60 * 1000),
    });
    const liveBefore = (await pointer()).r;
    check("saati gelmeyen taslak canlıya alınmıyor", (await promoteDueDrafts(by)).promoted === null);
    invalidatePointer();
    check("gösterge değişmedi", (await pointer()).r === liveBefore, `${liveBefore} -> ${(await pointer()).r}`);

    await db
      .update(contentReleases)
      .set({ goLiveAt: new Date(Date.now() - 60 * 1000) })
      .where(eq(contentReleases.version, future.version));
    const due = await promoteDueDrafts(by);
    check("saati geçen taslak canlıya alınıyor", due.promoted === future.version, JSON.stringify(due));
    invalidatePointer();
    check("gösterge yeni sürümü işaret ediyor", (await pointer()).r === future.version);
    check("alınacak taslak kalmadı", (await promoteDueDrafts(by)).promoted === null);

    /* 13. DEPLOY PENCERESİ — canlı sürümde yalnız eski adlı Konuşma paketi varken
       yeni kod yeni adla okuyabiliyor mu (geçici, lib/legacy-names). */
    const oldOnly = await publish(
      new Map([["lessons/tests-a1", pack({ "tests-a1-x": { id: "tests-a1-x", roleplay: { scene: "s" } } })]]),
      { by, note: "eski adlı paket", live: false },
    );
    const viaNew = await packItemsAt<Record<string, unknown>>(oldOnly.version, "conversations/tests-a1");
    check(
      "yeni ad eski adlı paketi okuyor, sohbet alanı yeni adla",
      viaNew.length === 1 && !!viaNew[0].chat && !("roleplay" in viaNew[0]),
      JSON.stringify(viaNew),
    );
  } finally {
    await restore(previousLive);
  }

  console.log(fails === 0 ? "\nİçerik hattı: tüm kapılar geçti." : `\n${fails} kapı kırık.`);
  process.exit(fails === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  const cause = err instanceof Error ? err.cause : null;
  if (cause instanceof Error) console.error("sebep:", cause.message);
  process.exit(1);
});
