"""Karara bağlanmış anlam düzeltmelerini veriye işler (README: "önce ses, sonra veri").

    python3 data/meanings/qa/apply.py de-a1 --sessiz     # yalnız sesi olmayan alanlar (beispielTr/En): hemen
    python3 data/meanings/qa/apply.py de-a1 --sesli      # sesli alanlar: YALNIZ kayıtları canlı tts-map'e girdikten sonra
    python3 data/meanings/qa/apply.py de-a1 --sesli --dry

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
if not name.startswith("de-"):
    sys.exit("şimdilik yalnız Almanca kurs (de-*); İngilizce kurs data/en-de hattında")

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
