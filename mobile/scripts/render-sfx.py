#!/usr/bin/env python3
"""
SFX yedek dosyalarını (android/app/src/main/res/raw/*.mp3) src/lib/sfxNotes.ts'teki
nota tablosundan üretir. Tablo tek kaynaktır: WebView köprüsü (ttsBridge) ve ekran-kapalı
native sentez (NomiSpeechModule.playSfx) aynı tabloyu aynı formatla çalar; bu betik de
aynı zarf/filtre modelini numpy ile uygular ve react-native-sound yedeği için mp3 yazar.

  python3 scripts/render-sfx.py            # tüm sesler
  python3 scripts/render-sfx.py --kotlin   # Kotlin tablosunu stdout'a bas (NomiSpeechModule'e yapıştır)

Nota formatı (10 sayı): [freq, start, dur, peak, wave, glide, lp, attack, hold, release]
  wave: 0 sine, 1 triangle, 2 square · glide: hedef frekans (0 = yok, dur boyunca üstel)
  lp: alçak geçiren kesim Hz (0 = yok, Q 0.707) · attack: saniye
  hold: 0 = pluck (peak'ten dur sonunda 0.0001'e üstel), 1 = peak'te tut, son `release` saniyede in
Gerekli: numpy, lame.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
import wave

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TS = os.path.join(ROOT, "src", "lib", "sfxNotes.ts")
RAW = os.path.join(ROOT, "android", "app", "src", "main", "res", "raw")
RATE = 44100
MASTER = 0.8


def load_table():
    src = open(TS, encoding="utf-8").read()
    m = re.search(r"// sfx-notes-begin\n(.*?)// sfx-notes-end", src, re.S)
    if not m:
        sys.exit("sfxNotes.ts: sfx-notes-begin/end işaretleri bulunamadı")
    body = m.group(1)
    body = body[body.index("{"):]                  # "export const ... =" başlığını at
    body = re.sub(r"//[^\n]*", "", body)          # satır yorumları
    body = re.sub(r",\s*([}\]])", r"\1", body)     # sondaki virgüller
    body = re.sub(r"(\w+):", r'"\1":', body)       # anahtarları tırnakla
    body = body.strip().rstrip(";")
    return json.loads(body)


def biquad_lowpass(x, fc, q=0.7071):
    w0 = 2 * np.pi * fc / RATE
    alpha = np.sin(w0) / (2 * q)
    cw = np.cos(w0)
    b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = (1 - cw) / 2
    a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha
    b0, b1, b2, a1, a2 = b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0
    y = np.zeros_like(x)
    x1 = x2 = y1 = y2 = 0.0
    for i in range(len(x)):
        v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1 = x1, x[i]
        y2, y1 = y1, v
        y[i] = v
    return y


def render(notes):
    total = max(n[1] + n[2] for n in notes) + 0.06
    out = np.zeros(int(total * RATE) + 1)
    for f, start, dur, peak, wave_, glide, lp, attack, hold, release in notes:
        n = int(dur * RATE)
        t = np.arange(n) / RATE
        freq = f * np.power(glide / f, t / dur) if glide > 0 else np.full(n, f)
        phase = np.cumsum(2 * np.pi * freq / RATE)
        if wave_ == 1:
            p = (phase / (2 * np.pi)) % 1.0
            s = 2 * np.abs(2 * p - 1) - 1
        elif wave_ == 2:
            s = np.where(np.sin(phase) >= 0, 1.0, -1.0)
        else:
            s = np.sin(phase)
        if lp > 0:
            s = biquad_lowpass(s, lp)
        floor = 0.0001
        env = np.empty(n)
        a = attack if attack > 0 else 0.004
        for i in range(n):
            ti = t[i]
            if ti < a:
                env[i] = floor * (peak / floor) ** (ti / a)
            elif hold >= 0.5:
                rs = dur - release
                env[i] = peak if ti < rs else peak * (floor / peak) ** ((ti - rs) / release)
            else:
                env[i] = peak * (floor / peak) ** ((ti - a) / (dur - a))
        s0 = int(start * RATE)
        out[s0:s0 + n] += s * env * MASTER
    return np.clip(out, -1, 1)


def write_mp3(name, samples):
    os.makedirs(RAW, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        with wave.open(tmp.name, "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE)
            w.writeframes((samples * 32767).astype("<i2").tobytes())
        dst = os.path.join(RAW, f"{name}.mp3")
        subprocess.run(["lame", "--quiet", "-m", "m", "-b", "96", tmp.name, dst], check=True)
    os.unlink(tmp.name)
    return dst


def kotlin(table):
    lines = ['    val notes: List<DoubleArray> = when (kind) {']
    for kind, notes in table.items():
        lines.append(f'      "{kind}" -> listOf(')
        for n in notes:
            lines.append("        doubleArrayOf(" + ", ".join(repr(float(v)) for v in n) + "),")
        lines.append("      )")
    lines.append('      else -> listOf(doubleArrayOf(1174.66, 0.0, 0.05, 0.06, 0.0, 0.0, 0.0, 0.008, 0.0, 0.0))')
    lines.append("    }")
    return "\n".join(lines)


if __name__ == "__main__":
    table = load_table()
    if "--kotlin" in sys.argv:
        print(kotlin(table))
        sys.exit(0)
    for kind, notes in table.items():
        path = write_mp3(kind, render(notes))
        print(f"{kind:8s} {max(n[1] + n[2] for n in notes):.2f}s  {os.path.getsize(path)} B  {os.path.relpath(path, ROOT)}")
