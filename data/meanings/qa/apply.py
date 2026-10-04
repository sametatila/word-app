"""Karara bağlanmış anlam düzeltmelerini veriye işler (README: "önce ses, sonra veri").

    python3 data/meanings/qa/apply.py de-a1 --sessiz     # yalnız sesi olmayan alanlar (beispielTr/En): hemen
    python3 data/meanings/qa/apply.py de-a1 --sesli      # sesli alanlar: YALNIZ kayıtları canlı tts-map'e girdikten sonra
    python3 data/meanings/qa/apply.py de-a1 --sesli --dry
    python3 data/meanings/qa/apply.py en-a1 --sessiz     # İngilizce kurs: words-en.json + data/en-de/out

Almanca kurs: `data/app/words.json` (ham kaynak, `formen` burada) ve `data/meanings/out/*.json` (seed'de üstüne
biner) birlikte yazılır; ikisi ayrışırsa seed `out`u kazandırır. Uygulanan düzeltmeye `applied` tarihi yazılır,
ikinci çalıştırma onu atlar. Biçim bayt bayt korunur (words.json satır başına bir madde, out dosyanın kendi girintisi).
Bitince: `npm run meanings:check -- <paket>` ve commit; deploy seed'i canlıya taşır.
"""
import datetime, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
QA = ROOT / "data/meanings/qa"
args = sys.argv[1:]
name = args[0] if args and not args[0].startswith("--") else sys.exit(__doc__)
mode = "sessiz" if "--sessiz" in args else "sesli" if "--sesli" in args else sys.exit("--sessiz ya da --sesli")
dry = "--dry" in args
if name.startswith("en-"):
    # İngilizce kurs: words-en.json (satır başına bir madde; `deGloss` yazılırsa türetilen Almanca anlamın yerine geçer)
    # ve data/en-de/out (beispielDe). Alanlar: tr, deGloss, beispiel, beispielTr, beispielDe.
    qa_p = QA / f"{name}.json"
    qa = json.loads(qa_p.read_text())
    en_p = ROOT / "data/app/words-en.json"
    rows = [json.loads(l) for l in en_p.read_text().strip().split("\n")]
    by_id = {r["id"]: r for r in rows}
    de_outs = {p: json.loads(p.read_text()) for p in sorted((ROOT / "data/en-de/out").glob("*.json"))}
    de_by_id = {x["id"]: (p, x) for p, arr in de_outs.items() for x in arr}
    today = datetime.date.today().isoformat()
    done, touched = [], set()
    for f in qa["fixes"]:
        if f.get("applied") or (mode == "sessiz") != (not f["voiced"]):
            continue
        r = by_id[f["id"]]
        for k, before in f["before"].items():
            cur = de_by_id[f["id"]][1].get(k) if k == "beispielDe" else r.get(k)
            if k == "deGloss" and "deGloss" not in r:
                continue          # türetilmiş: önce değeri canlıdan okunmuştu
            if cur != before:
                sys.exit(f"{f['id']} {r['de']}: {k} kayıttaki 'önce' değeriyle uyuşmuyor ({cur!r} ≠ {before!r})")
        for k, v in f["after"].items():
            if k == "beispielDe":
                p, x = de_by_id[f["id"]]
                x[k] = v
                touched.add(p)
            else:
                r[k] = v
        f["applied"] = today
        done.append(f"{f['id']} {r['de']}: {', '.join(f['after'])}")
    print(f"{mode}: {len(done)} düzeltme" + (" (dry)" if dry else ""))
    for d in done:
        print("  " + d)
    if dry or not done:
        sys.exit(0)
    en_p.write_text("\n".join(json.dumps(x, ensure_ascii=False, separators=(",", ":")) for x in rows) + "\n")
    for p in touched:
        p.write_text("[\n" + ",\n".join(" { " + ", ".join(f"{json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}" for k, v in x.items()) + " }" for x in de_outs[p]) + "\n]\n")
    qa_p.write_text(json.dumps(qa, ensure_ascii=False, indent=1) + "\n")
    sys.exit(0)
if not name.startswith("de-"):
    sys.exit("parça adı de-* ya da en-*")

qa_p = QA / f"{name}.json"
qa = json.loads(qa_p.read_text())
words_p = ROOT / "data/app/words.json"
words = json.loads(words_p.read_text())
by_id = {w["id"]: w for w in words}
outs = {p: json.loads(p.read_text()) for p in sorted((ROOT / "data/meanings/out").glob("*.json"))}
# girinti dosyadan dosyaya değişiyor (1 ya da 2 boşluk): her dosya kendi girintisiyle yazılır
indent = {p: len(p.read_text().split("\n")[1]) - len(p.read_text().split("\n")[1].lstrip(" ")) or 2 for p in outs}
out_by_id = {x["id"]: (p, x) for p, arr in outs.items() for x in arr}

today = datetime.date.today().isoformat()
done, touched = [], set()
for f in qa["fixes"]:
    if f.get("applied"):
        continue
    if (mode == "sessiz") != (not f["voiced"]):
        continue
    w = by_id.get(f["id"])
    if not w:
        sys.exit(f"{f['id']} words.json'da yok")
    for k, before in f["before"].items():
        if w.get(k) != before:
            sys.exit(f"{f['id']} {w['de']}: {k} kayıttaki 'önce' değeriyle uyuşmuyor ({w.get(k)!r} ≠ {before!r}); dosya değişmiş, yeniden karar ver")
    for k, v in f["after"].items():
        w[k] = v
        if k != "formen" and f["id"] in out_by_id:
            p, x = out_by_id[f["id"]]
            x[k] = v
            touched.add(p)
    f["applied"] = today
    done.append(f"{f['id']} {w['de']}: {', '.join(f['after'])}")

print(f"{mode}: {len(done)} düzeltme" + (" (dry)" if dry else ""))
for d in done:
    print("  " + d)
if dry or not done:
    sys.exit(0)
words_p.write_text("[\n" + ",\n".join(json.dumps(x, ensure_ascii=False) for x in words) + "\n]\n")
for p in touched:
    p.write_text(json.dumps(outs[p], ensure_ascii=False, indent=indent[p]) + "\n")
qa_p.write_text(json.dumps(qa, ensure_ascii=False, indent=1) + "\n")
print("paketler:", " ".join(sorted(p.stem for p in touched)))
