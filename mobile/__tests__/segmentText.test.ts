import { segmentGap } from "../src/lib/segmentText";

const tr = (text: string) => ({ lang: "tr", text });
const de = (text: string) => ({ lang: "de", text });
const join = (segs: { lang: string; text: string }[]) => segs.map((s, i) => s.text + segmentGap(segs, i)).join("");

describe("segmentGap (QA F-0009)", () => {
  it("hedef dilden sonra yeni cümle başlıyorsa nokta koyar", () => {
    expect(join([tr("Birkaçının adı şaşırtıcı:"), de("Ypsilon, Zett, Vau, Jott"), tr("Bir de yalnızca Almancada olan bir harf var:"), de("Eszett")]))
      .toBe("Birkaçının adı şaşırtıcı: Ypsilon, Zett, Vau, Jott. Bir de yalnızca Almancada olan bir harf var: Eszett");
    expect(join([tr("Hepsi bitişik:"), de("dreiundvierzig"), tr("Tekrar dene.")])).toBe("Hepsi bitişik: dreiundvierzig. Tekrar dene.");
  });
  it("dil adıyla süren şablonda ve küçük harfte nokta koymaz", () => {
    expect(join([de("das Jahr"), tr("Türkçede 'yıl' demek.")])).toBe("das Jahr Türkçede 'yıl' demek.");
    expect(join([de("Hallo"), tr("demek merhaba.")])).toBe("Hallo demek merhaba.");
  });
  it("noktalı ya da tırnakla kapanan parçaya ikinci nokta eklemez", () => {
    expect(join([de("Wie geht's?"), tr("Nasılsın demek.")])).toBe("Wie geht's? Nasılsın demek.");
    expect(join([de("„Danke.“"), tr("Teşekkürler.")])).toBe("„Danke.“ Teşekkürler.");
  });
  it("noktalamayla başlayan parçanın önüne boşluk koymaz", () => {
    expect(join([tr("Önce"), de("then"), tr(". Sonra demek.")])).toBe("Önce then. Sonra demek.");
  });
});
