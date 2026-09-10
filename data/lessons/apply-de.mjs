/**
 * Yazılan ALMANCAYI çalışma anına bağlar: `node data/lessons/apply-de.mjs`
 *
 * Kardeşi `apply.mjs` Almanca kursun Türkçesini İNGİLİZCEYE bağlıyor
 * (anadili İngilizce olan kullanıcı için). Bu betik öteki yönü kuruyor:
 * İngilizce kursun Türkçesi → ALMANCA, yani anadili Almanca olan kullanıcı
 * için.
 *
 * NEDEN AYRI BİR BETİK, `--de` BAYRAĞI DEĞİL. İki yönün kaynağı da
 * sözlüğün ŞEKLİ de başka. Kardeşi on iki `out/` dizini okuyor ve
 * anlatımı Almanca kelimeye göre bölünmüş anahtarlarla, çerçeve/sıra/not
 * sözlükleriyle, iki takas tablosuyla kuruyor — hepsi Almanca kursun TS
 * derslerinden çıkan yapıların gereği. İngilizce kursun dersleri ise
 * kendi kendine yeten JSON (`en-a1.json`, `en-a2.json`): Türkçe alanlar
 * dersin İÇİNDE duruyor, bölünecek bir belirsizlik yok ve takas tablosu
 * hiç yok. Aynı hatta bayrak takmak, okunmayan yarısı için ölü kod
 * taşımak olurdu.
 *
 * ÜÇ SÖZLÜK, ÜÇ KAYNAK:
 *
 *   lesson  `data/lessons/prose-de/out/`      anahtar `tür + AYRAÇ + tr`
 *   prose   `data/skills/prose-de/out/`       anahtar DÜZ `tr`
 *   task    `data/skills/task-de/out/`        anahtar `tür + AYRAÇ + tr`
 *   mock    `data/mock-exams/prose/out-de/`   anahtar `tür + AYRAÇ + tr`
 *
 * `task` HENÜZ YAZILMADI ve dizin yok; sözlükte boş duruyor. Boş bırakmak
 * bilinçli: `resolveExercise` alanı OKUYOR ve yoksa çöküyor, varsa da
 * hiçbir egzersiz çözülmüyor — yani beceri ekseni Almanca tarafta hâlâ
 * kapalı ve kapı bunu kırmızı gösteriyor. Ölçüldü: İngilizce kursun 189
 * egzersizinin görev alanlarında 1.202 tekil Türkçe dize var.
 *
 * `prose` DÜZ ANAHTAR ve bu ölçüldü: 739 satırın 739'u benzersiz `tr`,
 * yani çakışma yok. Düz tutmanın kazancı büyük — çözücü tarafında
 * `resolveExercise` OLDUĞU GİBİ çalışıyor (`dict.prose[s]`), Almanca için
 * ikinci bir çözücü yazmak gerekmiyor. Aynısı `mock` için de geçerli:
 * anahtar `mockKey` ile birebir aynı, yani `resolveMockPaper` da
 * değişmeden çalışıyor.
 *
 * `lesson` ise BÖLÜNMÜŞ anahtar tutmak zorunda: aynı Türkçe cümle bir
 * derste `summary`, ötekinde `say.tr` olabiliyor ve ikisi farklı
 * çevrilebilir. Çıkarıcı (`prose-de/make.mjs`) da tam bu anahtarı
 * kullanıyor; ikisi ayrışırsa sözlük dolu olduğu hâlde hiçbir şey
 * bulunmaz.
 *
 * ALINTILAR SÖZLÜKTE YOK ve olmamalı: beceri hattında 187 satırın
 * karşılığı kendileri ve çözücü onları `isProseQuote` ile tanıyıp olduğu
 * gibi geçiriyor. Paketleyici de AYNI işlevi çağırıyor, yani iki taraf
 * ayrışamıyor.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const OUT = new URL("../../src/lib/lessons/generated/", import.meta.url).pathname;

/** Bileşik anahtarların ayracı — `src/lib/lessons/native.ts` ile aynı olmak
 *  zorunda. Yazdırılamayan bir karakter: Türkçe metin boşluk da noktalama da
 *  taşıyabildiği için ayracın metinde ASLA geçmeyeceğinden emin olmak
 *  gerekiyor. Kaynakta kaçış dizisi yerine `fromCharCode` duruyor, çünkü
 *  dosyanın kendisinde görünmez bir karakter taşımak düzenlemeyi zorlaştırır. */
const SEP = String.fromCharCode(0);

const read = (dir) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((x) => x.endsWith(".json"))
    .sort()
    .flatMap((f) => JSON.parse(readFileSync(dir + f, "utf8")));
};

/* Almanca karşılık `de` alanında duruyor; deneme kâğıdı hattı ise iki yönü
   tek `check.ts` ile denetlediği için alanı `en` diye adlandırmış. Alan adı
   değil DİZİN yönü belirliyor — `out-de/` Almanca yazılan taraf. */
const value = (r) => r.de ?? r.en;

const lesson = {};
for (const r of read(`${DIR}prose-de/out/`)) lesson[r.kind + SEP + r.tr] = value(r);

const prose = {};
for (const r of read(`${DIR}../skills/prose-de/out/`)) prose[r.tr] = value(r);

const task = {};
for (const r of read(`${DIR}../skills/task-de/out/`)) task[r.kind + SEP + r.tr] = value(r);

const mock = {};
for (const r of read(`${DIR}../mock-exams/prose/out-de/`)) mock[r.kind + SEP + r.tr] = value(r);

const data = { lesson, prose, task, mock };

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}native-de.json`, `${JSON.stringify(data)}\n`);

const n = (o) => Object.keys(o).length;
console.log(
  "native-de.json yazıldı\n" +
    `  ders düzyazısı ${n(lesson)} · beceri düz metni ${n(prose)} · görev metni ${n(task)} · deneme kâğıdı ${n(mock)}`,
);
