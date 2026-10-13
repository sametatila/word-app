/*
  YouTube açıklaması (uzun video): bölümün kendi metni (data.yt.desc) + motorun zaman çizelgesinden bölüm listesi +
  kampanya etiketli bağlantı + etiketler. Bölüm listesinin kuralı motordaki Y.chapterList ile aynı (stüdyo
  önizlemesi tarayıcıda onu, üretim bunu kullanır): ilk 0:00, her bölüm en az 10 sn, kısa olan bir öncekine katılır.
*/
export const SITE = "https://www.lernomi.app";
export const linkFor = (id) => `${SITE}/?utm_source=youtube&utm_medium=video&utm_campaign=${encodeURIComponent(id)}`;

export function chapterList(plan) {
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const hh = Math.floor(m / 60);
    const ss = String(Math.floor(s % 60)).padStart(2, "0");
    return hh ? `${hh}:${String(m % 60).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
  };
  const out = [];
  plan.chapters.forEach((c, i) => {
    const end = i + 1 < plan.chapters.length ? plan.chapters[i + 1].t : plan.duration;
    if (!out.length) out.push({ t: 0, title: c.title, end });
    else if (end - c.t < 10) out[out.length - 1].end = end;
    else out.push({ t: Math.floor(c.t), title: c.title, end });
  });
  return out.map((c) => `${fmt(c.t)} ${c.title}`);
}

export function describe({ id, data, plan }) {
  const yt = data.yt || {};
  return [String(yt.desc || "").trim(), "", "Bölümler", ...chapterList(plan), "", `Lernomi: ${linkFor(id)}`, "", String(yt.tags || "").trim()].join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
