/**
 * Parola ölçütü birim testi — `npm run test:password`.
 *
 * Veritabanı ve ağ gerektirmez. Kuralın kendisini değil, KAÇIRDIKLARINI
 * sınıyor: kabul edilmesi gereken parolaların reddedilmemesi, reddedilmesi
 * gerekenlerin kabul edilmemesi. İkinci taraf daha kritik — bir kural sessizce
 * gevşediğinde hiçbir yerde hata görünmüyor, yalnız zayıf parolalar geçiyor.
 */
import { checkPassword, MIN_PASSWORD_LENGTH } from "../src/lib/auth/password-policy";

let failures = 0;
let total = 0;
function check(name: string, cond: boolean, detail = "") {
  total++;
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

console.log("Parola ölçütü\n");
console.log(`asgari uzunluk: ${MIN_PASSWORD_LENGTH}\n`);

/* ── kabul edilmesi gerekenler ───────────────────────────────────────────── */
for (const pw of [
  "yesilkaplumbaga41",       // Türkçe sözcük öbeği, listede yok
  "kahve-defter-2031",       // tireli, uzun
  "MorKedi Ucuyor",          // boşluk içeriyor: kabul edilmeli
  "x7Kq2Lm9Rt4",             // rastgele
  "correcthorsebattery",     // uzun ama sıradan sözcükler — kural bunu ELEMEZ
]) {
  check(`kabul: ${pw}`, checkPassword(pw) === null, `→ ${checkPassword(pw)}`);
}

/* ── uzunluk ─────────────────────────────────────────────────────────────── */
check("dokuz karakter reddediliyor", checkPassword("Abc12345!") === "too_short");
check("on karakter geçiyor", checkPassword("Zq7mKp2xLd") === null);

/* ── yaygın parolalar ────────────────────────────────────────────────────── */
for (const pw of ["password123", "galatasaray", "qwertyuiop", "lernomi123", "fenerbahce", "parolam1234"]) {
  check(`yaygın reddediliyor: ${pw}`, checkPassword(pw) === "too_common");
}
/*
  UZUNLUK ÖNCE BAKILIYOR ve bu bilinçli: `parola123` (9) ile `sifre123` (8)
  listede duruyor ama yaygınlık kuralına HİÇ ulaşmıyorlar, uzunluktan
  eleniyorlar. Testin ilk hâli bunları "too_common" bekliyordu ve düştü —
  kural değil beklenti yanlıştı. Reddedildikleri doğrulanıyor, sebebi değil.
*/
for (const pw of ["parola123", "sifre123"]) {
  check(`kısa ve yaygın, yine de reddediliyor: ${pw}`, checkPassword(pw) === "too_short");
}
// Sondaki rakam ayıklanıyor: kök listede olan her yıl/eki yakalanmalı.
check("kök eşleşmesi: parola2026", checkPassword("parola2026") === "too_common");
check("kök eşleşmesi: istanbul1453", checkPassword("istanbul1453") === "too_common");

/* ── desenler ────────────────────────────────────────────────────────────── */
check("tek karakter tekrarı", checkPassword("aaaaaaaaaa") === "too_common");
check("artan dizi", checkPassword("abcdefghij") === "too_common");
check("azalan dizi", checkPassword("9876543210") === "too_common");
check("klavye sırası", checkPassword("asdfghjkl1") !== null);
check("salt rakam", checkPassword("4028193756") === "too_common");

/* ── Türkçe küçük harf tuzağı ────────────────────────────────────────────── */
// "İSTANBUL".toLowerCase() JavaScript'te birleşen nokta üretiyor ve eşleşme kaçıyordu.
check("İSTANBUL yakalanıyor", checkPassword("İSTANBUL1453") === "too_common");
check("GALATASARAY yakalanıyor", checkPassword("GALATASARAY") === "too_common");

/* ── kimlik içerme ───────────────────────────────────────────────────────── */
check(
  "e-posta adı parolada",
  checkPassword("samet-2031-abc", { email: "samet@lernomi.app" }) === "contains_identity",
);
check(
  "kullanıcı adı parolada",
  checkPassword("MusaAtila2031", { name: "Musa Atila" }) === "contains_identity",
);
check(
  "üç harfli ad tesadüfen eşleşmiyor",
  checkPassword("aliminyum-kapi-77", { name: "Ali" }) === null,
);
check(
  "kimlik verilmezse kural çalışmıyor (sıfırlama yolu)",
  checkPassword("samet-2031-abc") === null,
);

console.log(failures === 0 ? `\ntamam: ${total}/${total}` : `\nKALDI: ${failures}/${total} test`);
process.exit(failures === 0 ? 0 : 1);
