import AsyncStorage from "@react-native-async-storage/async-storage";
import { notePendingVerify, takePendingVerify, verifyLinkEmail } from "../src/lib/pendingVerify";

/* Doğrulama bağlantısı yalnız bu cihazın beklediği adres için oturum açar (D11). */
const b64url = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/[=]+$/, "");
const link = (email: string) => `https://www.lernomi.app/api/auth/verify-email?token=${b64url({ alg: "HS256" })}.${b64url({ email, exp: 1 })}.sig&callbackURL=%2Flearn`;

beforeEach(() => AsyncStorage.clear());

test("jetondaki e-posta okunuyor (UTF-8 dahil)", () => {
  expect(verifyLinkEmail(link("ali@example.com"))).toBe("ali@example.com");
  expect(verifyLinkEmail(link("çağrı@örnek.de"))).toBe("çağrı@örnek.de");
  expect(verifyLinkEmail("https://www.lernomi.app/api/auth/verify-email?token=bozuk")).toBeNull();
});

test("not edilmemiş adres beklenmiyor; not tek kullanımlık ve büyük/küçük harfe duyarsız", async () => {
  expect(await takePendingVerify("ali@example.com")).toBe(false);
  await notePendingVerify(" Ali@Example.com ");
  expect(await takePendingVerify("ali@example.com")).toBe(true);
  expect(await takePendingVerify("ali@example.com")).toBe(false);
});
