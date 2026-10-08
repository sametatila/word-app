/**
 * Yürüyüş VAD'i: üç kopya (TS referansı, Android Kotlin, iOS Swift) AYNI kararı veriyor mu.
 *
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/walk-vad-native-parity.ts [sahne dizini]
 *
 * Yalnız Mac'te (swiftc + Gradle önbelleğindeki Kotlin derleyicisi; CI'da yok — CI'daki kapı
 * sabitlerin eşitliği, `check:parity`). Girdiler: deterministik zorlama akışları (gürültü
 * düzeyleri, harmonik "ünlü" patlamaları, tıklar, sessizlik, kırpılma) ve varsa
 * `walk-vad-eval.ts --dump <dizin>` sahneleri. Her akış dilim dilim üç kopyadan geçer;
 * tür, başlangıç, bitiş ve durma örneği birebir aynı olmalı. VAD'e dokunan her değişiklikten
 * sonra koşulur (bkz. docs/plan/walk-stt.md).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { runVad } from "./lib/walk-vad";

const ROOT = resolve(__dirname, "..");
const KT = join(ROOT, "mobile/android/app/src/main/java/com/lernomi/speech/WalkVad.kt");
const SWIFT = join(ROOT, "mobile/ios/Lernomi/WalkVad.swift");
const RATE = 16_000;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Zorlama akışı: eşiklerin çevresinde dolaşan rastgele ama tekrarlanabilir sahne. */
function stress(seed: number): Int16Array {
  const r = rng(seed);
  const n = Math.round((3 + r() * 8) * RATE);
  const x = new Float64Array(n);
  const noiseDb = -80 + r() * 50;
  const g = Math.pow(10, noiseDb / 20);
  let lp = 0;
  const smooth = r();
  for (let i = 0; i < n; i++) { lp = smooth * lp + (1 - smooth) * (r() * 2 - 1); x[i] = lp * g * 2; }
  const bursts = Math.floor(r() * 6);
  for (let b = 0; b < bursts; b++) {
    const s0 = Math.floor(r() * n), len = Math.floor((0.03 + r() * 1.4) * RATE);
    const f0 = 70 + r() * 330, level = Math.pow(10, (-60 + r() * 55) / 20), harmonic = r() < 0.75;
    for (let i = 0; i < len && s0 + i < n; i++) {
      const t = i / RATE, env = Math.sin((Math.PI * i) / len);
      let v = 0;
      if (harmonic) for (let h = 1; h <= 5; h++) v += Math.sin(2 * Math.PI * f0 * h * t) / h;
      else v = r() * 2 - 1;
      x[s0 + i] += v * level * env;
    }
  }
  const clicks = Math.floor(r() * 8);
  for (let c = 0; c < clicks; c++) { const at = Math.floor(r() * n); x[at] += (r() * 2 - 1) * 1.5; }
  const out = new Int16Array(n);
  for (let i = 0; i < n; i++) out[i] = Math.max(-32768, Math.min(32767, Math.round(x[i] * 32767)));
  return out;
}

function sh(cmd: string, args: string[]) {
  return execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function kotlinClasspath(): { compiler: string; stdlib: string } {
  const c = join(homedir(), ".gradle/caches/modules-2/files-2.1");
  const jar = (group: string, name: string, version?: string) => {
    const base = join(c, group, name);
    const v = version ?? readdirSync(base).sort().at(-1)!;
    for (const h of readdirSync(join(base, v))) {
      const f = join(base, v, h, `${name}-${v}.jar`);
      if (existsSync(f)) return f;
    }
    throw new Error(`${group}:${name}:${v} jar yok`);
  };
  const kv = "2.2.0";
  const stdlib = jar("org.jetbrains.kotlin", "kotlin-stdlib", kv);
  const compiler = [
    jar("org.jetbrains.kotlin", "kotlin-compiler-embeddable", kv), stdlib,
    jar("org.jetbrains.kotlin", "kotlin-script-runtime", kv), jar("org.jetbrains.kotlin", "kotlin-daemon-embeddable", kv),
    jar("org.jetbrains.intellij.deps", "trove4j"), jar("org.jetbrains.kotlinx", "kotlinx-coroutines-core-jvm"),
    jar("org.jetbrains", "annotations", "13.0"),
  ].join(":");
  return { compiler, stdlib };
}

const JAVA = existsSync("/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/java")
  ? "/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/java"
  : "java";

function main() {
  const work = join(tmpdir(), "walk-vad-parity");
  rmSync(work, { recursive: true, force: true });
  const inputs = join(work, "in");
  mkdirSync(inputs, { recursive: true });
  for (let s = 1; s <= 400; s++) writeFileSync(join(inputs, `zorlama-${String(s).padStart(3, "0")}.raw`), Buffer.from(stress(s).buffer));
  const scenes = process.argv[2];
  if (scenes) for (const f of readdirSync(scenes).filter((x) => x.endsWith(".raw"))) writeFileSync(join(inputs, `sahne-${f}`), readFileSync(join(scenes, f)));

  // Swift
  writeFileSync(join(work, "main.swift"), `import Foundation
let dir = CommandLine.arguments[1]
let names = try! FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".raw") }.sorted()
for name in names {
  let data = try! Data(contentsOf: URL(fileURLWithPath: dir + "/" + name))
  let count = data.count / 2
  let line: String = data.withUnsafeBytes { raw -> String in
    let s = UnsafeBufferPointer(start: raw.baseAddress!.assumingMemoryBound(to: Int16.self), count: count)
    let v = WalkVad()
    var at = 0
    while at + v.frame <= count {
      if v.push(s, at), let r = v.result { return "\\(r.kind)\\t\\(r.start)\\t\\(r.end)\\t\\(r.stop)" }
      at += v.frame
    }
    return "none\\t0\\t0\\t\\(count)"
  }
  print("\\(name)\\t\\(line)")
}
`);
  sh("swiftc", ["-O", "-o", join(work, "vad-swift"), SWIFT, join(work, "main.swift")]);

  // Kotlin
  writeFileSync(join(work, "Main.kt"), `import com.lernomi.speech.WalkVad
import java.io.File
fun main(args: Array<String>) {
  val files = File(args[0]).listFiles()!!.filter { it.name.endsWith(".raw") }.sortedBy { it.name }
  for (f in files) {
    val b = f.readBytes()
    val s = ShortArray(b.size / 2) { ((b[2 * it].toInt() and 0xff) or (b[2 * it + 1].toInt() shl 8)).toShort() }
    val v = WalkVad()
    var r: WalkVad.Result? = null
    var at = 0
    while (at + v.frame <= s.size) { if (v.push(s, at)) { r = v.result; break }; at += v.frame }
    val o = r ?: WalkVad.Result("none", 0, 0, s.size)
    println(f.name + "\\t" + o.kind + "\\t" + o.start + "\\t" + o.end + "\\t" + o.stop)
  }
}
`);
  const { compiler, stdlib } = kotlinClasspath();
  sh(JAVA, ["-cp", compiler, "org.jetbrains.kotlin.cli.jvm.K2JVMCompiler", "-no-stdlib", "-no-reflect", "-classpath", stdlib, "-d", join(work, "kt.jar"), KT, join(work, "Main.kt")]);

  const parse = (out: string) => new Map(out.trim().split("\n").map((l) => { const [name, ...rest] = l.split("\t"); return [name, rest.join(" ")] as const; }));
  const sw = parse(sh(join(work, "vad-swift"), [inputs]));
  const kt = parse(sh(JAVA, ["-cp", `${join(work, "kt.jar")}:${stdlib}`, "MainKt", inputs]));

  let bad = 0;
  const kinds: Record<string, number> = {};
  const names = readdirSync(inputs).filter((x) => x.endsWith(".raw")).sort();
  for (const name of names) {
    const b = readFileSync(join(inputs, name));
    const s = new Int16Array(b.buffer, b.byteOffset, b.length / 2);
    const r = runVad(s);
    const ts = `${r.kind} ${r.start} ${r.end} ${r.stop}`;
    kinds[r.kind] = (kinds[r.kind] ?? 0) + 1;
    if (sw.get(name) !== ts || kt.get(name) !== ts) {
      bad++;
      console.log(`  ✗ ${name}: ts "${ts}" | swift "${sw.get(name)}" | kotlin "${kt.get(name)}"`);
    }
  }
  console.log(`\n${names.length} akış (${Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(", ")}): ${bad ? `${bad} AYRIŞMA` : "üç kopya birebir aynı"}`);
  process.exit(bad ? 1 : 0);
}

main();
