/** Şikâyet sonucunun alt satırı (2026-10-07): neyin bildirildiği + bildirenin notu. */
import { reportContext, type NotificationView } from "../src/api/social";

const n = (detail: Record<string, unknown>, type = "report_closed"): NotificationView =>
  ({ id: 1, type, read: false, createdAt: new Date().toISOString(), actor: null, ref: { type: "content_report", id: 1 }, detail });

test("kelime ve not birlikte", () => {
  const s = reportContext(n({ subject: "völlig", yourNote: "G ile bitiriyor" }));
  expect(s).toContain("«völlig»");
  expect(s).toContain("G ile bitiriyor");
});

test("yalnız not (kullanıcı şikâyeti: kim bildirildi yazılmıyor)", () => {
  expect(reportContext(n({ yourNote: "reklam" }))).toContain("reklam");
});

test("bilgi yoksa satır yok; başka türde hiç yok", () => {
  expect(reportContext(n({}))).toBeNull();
  expect(reportContext(n({ subject: "x" }, "nudge"))).toBeNull();
});
