#!/usr/bin/env python3
"""Erdi aksiyon klipleri — ai-story'deki Wan 2.2 I2V hattının uyarlaması.

Kullanım: python3 wan-gen.py <aksiyon> [...] | all | loops | states
Çıktılar: ./anim/raw/<aksiyon>.mp4

Döngü klipleri `last_image` = base görsel ile üretiliyor: ilk ve son kare aynı
olduğundan animasyon kusursuz döngüye giriyor, karakter uçlara sabitlendiği
için sürüklenme de azalıyor. Durum klipleri (sad/sleep) iki aşamalı: önce
nötrden duyguya geçiş klibi, sonra o klibin son halinden seçilen kareyle
duygunun kendi içinde dönen döngüsü (base'i *-enter çıktısından geliyor).
"""

import base64
import sys
import time
from pathlib import Path

import requests

REPO = Path(__file__).resolve().parents[2]
BASE = REPO / "data" / "mascot"          # taban görseller
RAW = REPO / "data" / "mascot" / "raw"   # ham çıktılar — depoya girer, /tmp'de kaybolmaz
ENV = Path("/mnt/windows/Users/LinkinqArk/Desktop/Workspace/ai-story/animated-story/credentials/.env")
MODEL_VERSION = "4eaf2b01d3bf70d8a2e00b219efeb7cb415855ad18b7dacdc4cae664a73a6eea"  # wan-video/wan-2.2-i2v-fast

SILENT = "silent 2D cartoon animation, mouth closed and completely still, no talking, no lip movement, "
SUFFIX = ", consistent character design, plain solid white background, no camera movement, full body always visible, character centered"

NEUTRAL = "erdi-white.png"
WIDE = "erdi-wide.png"  # yürüyüş/itme klipleri: geniş tuval, kuyruk kadrajda kalsın
SQUARE = "erdi-square.png"  # kare tuval idle'ları: her yönde pay, kadraj sorunu yok

# ad -> (prompt, base görsel, loop mu)
ACTIONS = {
    "lookaround": ("the cute meerkat stands tall like a sentinel and calmly turns its head left, then right, scanning the horizon, ears twitching, tail flicking gently", NEUTRAL, True),
    "wave": ("the cute meerkat raises one paw and waves hello in a friendly way, its mouth stays firmly closed and completely still the entire time, calm friendly eyes", NEUTRAL, True),
    "thumbsup": ("the cute meerkat lifts one paw and gives a big thumbs up, nodding once approvingly, proud closed-mouth smile", NEUTRAL, True),
    "dance": ("the cute meerkat dances with real choreography: steps side to side on the beat, swings its hips left and right, raises alternating arms up in the air, does a playful little spin, taps its feet with rhythm, energetic expressive groovy dance moves, joyful closed-mouth smile, the whole body stays fully inside the frame with clear empty margins on all sides", WIDE, True),
    "happy": ("the cute meerkat hops up and down joyfully and claps its front paws, big closed-mouth smile", NEUTRAL, True),
    "celebrate": ("the cute meerkat throws both arms up in victory and jumps in celebration, excited closed-mouth smile", NEUTRAL, True),
    "think": ("the cute meerkat taps its chin with one paw and glances upward thoughtfully, curious expression", NEUTRAL, True),
    "peek": ("the cute meerkat keeps both front paws pressed together low in front of its chest and, without moving its arms at all, bends its whole upper body far to one side in a smooth arc, head tilting sideways, peeking curiously at the viewer with big wide playful eyes, then bends smoothly back upright, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, False),
    "walk-right": ("the cute meerkat turns to face right and walks in place on its hind legs, side profile view facing right, natural cartoon walking cycle, arms swinging gently, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, False),
    "walk-left": ("the cute meerkat turns to face left and walks in place on its hind legs, side profile view facing left, natural cartoon walking cycle, arms swinging gently, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, False),
    "push-right": ("the cute meerkat stands in side profile facing right and walks in place on its hind legs, body leaning far forward, both front arms fully outstretched forward at chest height with palms flat and facing forward, slow effortful steps, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, False),
    "idle-dog": ("the cute meerkat drops down to stand on all four paws like a playful little dog, curls its fluffy tail in around its side, tilts its head and looks at the viewer with big cute eyes for a moment, then pushes itself back up to stand upright on its hind legs", NEUTRAL, True),
    "idle-stretch": ("the cute meerkat puffs up and quickly shakes its whole body like shaking off water, fur fluffing out in every direction, arms staying tucked against its body, then its fur smooths back down and it stands calm again", NEUTRAL, True),
    "idle-scratch": ("the cute meerkat scratches the side of its head behind its ear with one front paw a few times, wobbling slightly on its feet, then returns to its calm upright posture", NEUTRAL, True),
    "idle-tail": ("the cute meerkat lifts the fluffy white tip of its own tail up in front of its chest with both front paws, holds it close to its body and inspects it curiously, staying compact and fully inside the frame, then lets the tail drop back down", NEUTRAL, True),
    "idle-spin": ("the cute meerkat does a quick playful full turn in place, spinning around once and ending facing the viewer again", SQUARE, True),
    "idle-peekaboo": ("the cute meerkat covers both eyes with its front paws, pauses, then pulls the paws away with a playful surprised wide-eyed look at the viewer, closed-mouth smile, then lowers the paws and stands calm again", SQUARE, True),
    "idle-hop": ("the cute meerkat does two small excited hops in place, tail wagging happily, then settles back to calm standing", SQUARE, True),
    "idle-dig": ("the cute meerkat crouches slightly and digs at the ground with both front paws a few times like a burrowing meerkat, then looks up at the viewer and stands tall again", SQUARE, True),
    "idle-sniff": ("the cute meerkat sniffs the air curiously, nose twitching, lifting its head and turning it slightly side to side, whiskers quivering, then relaxes", SQUARE, True),
    "idle-sit": ("the cute meerkat sits down on its bottom, shoulders relaxing, looks around calmly, then pushes itself back up to stand upright", SQUARE, True),
    "idle-wink": ("the cute meerkat leans slightly toward the viewer and gives a friendly wink with one eye, gentle closed-mouth smile, then straightens back up", SQUARE, True),
    # Çekme: çekme duruşuna geçiş klibi; paketlemede 2. sn sonrası ileri+geri (ping-pong)
    # sarılır — döngü dikişsiz olur, geri sarım "geri geri çekme" hissini verir.
    "pull-right": ("the cute meerkat turns to face left in side profile and settles into a pulling stance: both front arms outstretched forward at chest height, paws curled downward and gripping, body leaning backward, feet planted, taking slow heavy steps backward in place while it turns its head over its shoulder to glance at the camera with a closed-mouth smile, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, False),
    # Gezinti: patiler ensede, rahat yürüyüş — walk-* kliplerine çeşitlilik.
    "stroll-right": ("the cute meerkat walks slowly toward the right in side profile, body leaning forward into each step, both front paws gripped together behind its head over its left shoulder, arms stretched back behind its body, straining hard with every step as it drags forward, face turned slightly toward the camera with a determined closed-mouth smile, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, False),
    # Asılma idle'ı: kollar yana gergin asılıp bırakma, sonunda nötr duruşa dönüş (last_image).
    "idle-heave": ("the cute meerkat faces the camera, both front arms fully extended out to its left side at chest height with paws clenched together, its whole body leaning hard to the right away from its paws, knees bent, feet dug into the ground, and it heaves rhythmically, jerking its body to the right again and again with great effort, looking at the camera with a determined closed-mouth smile, then it lets go, relaxes and returns to standing calmly upright facing the camera, the whole body including the tail stays fully inside the frame with clear empty margins on all sides", WIDE, True),
    "sad-enter": ("the cute meerkat slowly becomes sad: ears droop, shoulders slump, head lowers, gazing at the ground, small closed-mouth frown", NEUTRAL, False),
    "sleep-enter": ("the cute meerkat gets sleepy: eyelids slowly close, head nods down, it dozes off while standing, breathing slowly", NEUTRAL, False),
    # base'ler *-enter kliplerinden seçilen karelerle oluşturulur (frames2webp sonrası):
    "sad": ("the sad meerkat stays sad, swaying very slightly, ears drooped, head low, blinking slowly, small closed-mouth frown", "sad-base.png", True),
    "sleep": ("the meerkat sleeps peacefully while standing, eyes closed, breathing slowly and deeply, chest gently rising and falling", "sleep-base.png", True),
}

LOOPS = [k for k, v in ACTIONS.items() if v[2] and v[1] == NEUTRAL]
STATES = ["sad-enter", "sleep-enter"]


def load_token():
    import os
    if os.environ.get("REPLICATE_API_TOKEN"):
        return os.environ["REPLICATE_API_TOKEN"]
    if ENV.exists():
        for line in ENV.read_text().splitlines():
            if line.startswith("REPLICATE_API_TOKEN="):
                return line.split("=", 1)[1].strip().strip('"')
    sys.exit("REPLICATE_API_TOKEN yok: ortam değişkeni ver ya da Windows diskini bağla")


def data_uri(path: Path) -> str:
    return "data:image/png;base64," + base64.b64encode(path.read_bytes()).decode()


def generate(token: str, name: str, seed: int) -> bool:
    prompt, base_img, loop = ACTIONS[name]
    out = RAW / f"{name}.mp4"
    if out.exists():
        print(f"[skip] {name} zaten var")
        return True
    image = BASE / base_img
    if not image.exists():
        print(f"[HATA] {name}: base görsel yok: {image.name}")
        return False
    inp = {
        "image": data_uri(image),
        "prompt": SILENT + prompt + SUFFIX,
        "num_frames": 81,
        "resolution": "480p",
        "frames_per_second": 16,
        "go_fast": True,
        "seed": seed,
    }
    if loop:
        inp["last_image"] = inp["image"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    r = requests.post("https://api.replicate.com/v1/predictions", headers=headers,
                      json={"version": MODEL_VERSION, "input": inp}, timeout=180)
    if r.status_code not in (200, 201, 202):
        print(f"[HATA] {name}: {r.status_code} {r.text[:300]}")
        return False
    pid = r.json()["id"]
    print(f"[{name}] prediction: {pid}")
    t0 = time.time()
    while time.time() - t0 < 900:
        s = requests.get(f"https://api.replicate.com/v1/predictions/{pid}", headers=headers, timeout=60).json()
        st = s.get("status")
        if st == "succeeded":
            url = s["output"] if isinstance(s["output"], str) else s["output"][0]
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_bytes(requests.get(url, timeout=300).content)
            print(f"[OK] {name} -> {out.name} ({out.stat().st_size} B, {time.time()-t0:.0f}s)")
            return True
        if st in ("failed", "canceled"):
            print(f"[HATA] {name}: {st}: {s.get('error')}")
            return False
        time.sleep(5)
    print(f"[HATA] {name}: zaman aşımı")
    return False


def main():
    token = load_token()
    names = sys.argv[1:] or ["lookaround"]
    if names == ["all"]:
        names = LOOPS + STATES
    elif names == ["loops"]:
        names = LOOPS
    elif names == ["states"]:
        names = STATES
    ok = 0
    for i, n in enumerate(names):
        if n not in ACTIONS:
            print(f"[?] bilinmeyen aksiyon: {n}")
            continue
        if i > 0:
            time.sleep(10)  # ai-story'deki oran sınırı: istekler arası min 10 sn
        ok += generate(token, n, seed=5000 + 97 * i)
    print(f"bitti: {ok}/{len(names)}")


if __name__ == "__main__":
    main()
