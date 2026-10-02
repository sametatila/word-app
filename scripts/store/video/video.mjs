#!/usr/bin/env node
/*
  Vitrin videoları: Play tanıtım videosu (promo, 1920×1080) ve App Store App
  Preview (preview, 886×1920). Tanım docs/store/plan/video.json, kurallar
  docs/store/README.md "Vitrin videosu".

  npm run store:video -- [--format promo|preview] [--set tr-de] [--out dir] [--still <sn>]

  Nasıl: ham kayıt parçaları (docs/store/raw/video/<set>/) ffmpeg ile 30 fps
  kare dizisine açılır (.cache/store-video/), sahne bir HTML sayfası; her kare
  için sayfadaki `renderAt(t)` zamanı BELİRLİ biçimde kurar (CSS animasyonu
  yok, her kare aynı girdiden aynı çıkar), Chrome ekran görüntüsü alır, kareler
  ffmpeg'e borudan gider. Müzik music.mjs'ten aynı düzenle sentezlenir.

  Tasarım sistemi mağaza kareleriyle aynı (scripts/store/template.mjs): tek
  yazı tipi Bricolage, zemin turuncu / koyu / açık dönüşümlü, gerçek arayüz ana
  unsur, büyüteç gerçek bir arayüz bileşeni. Süs yok (konfeti, yıldız, maskot
  eklenmez); hareket yalnız geçiş, yazı ve büyüteçte. App Preview yalnız ekran
  kaydı + kısa başlık (Apple: cihaz, el, uydurma arayüz yok).
*/

import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { PALETTE } from "../template.mjs";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const { chromium } = require(path.join(ROOT, "node_modules/playwright-core"));
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ICON = path.join(ROOT, "mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/AppIcon-1024.png");
const FONT_DIR = path.join(ROOT, "scripts/store/fonts");
const PLAN = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/store/plan/video.json"), "utf8"));
const FPS = PLAN.fps;
const SRC_W = 886; // kare dizisinin genişliği: App Preview'un tam genişliği, promo için de yeter

// ---------- argümanlar ----------
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const formats = opt("format") ? [opt("format")] : Object.keys(PLAN.formats);
const sets = opt("set") ? [opt("set")] : Object.keys(PLAN.sets);
const OUT = path.resolve(ROOT, opt("out", "docs/store/out/video"));
const STILL = opt("still");
const CACHE = path.join(ROOT, ".cache/store-video");
for (const f of formats) if (!PLAN.formats[f]) throw new Error(`bilinmeyen biçim: ${f}`);

const run = (cmd, a) => {
  const r = spawnSync(cmd, a, { stdio: ["ignore", "ignore", "pipe"] });
  if (r.status !== 0) throw new Error(`${cmd} ${a.join(" ")}\n${r.stderr}`);
};

/** Bir parçayı (kaynak, giriş, çıkış, hız) 30 fps JPEG dizisine açar; önbellekte varsa dokunmaz. */
function frames(set, c) {
  const src = path.join(ROOT, "docs/store/raw/video", set, `${c.src}.mp4`);
  if (!fs.existsSync(src)) throw new Error(`ham kayıt yok: ${path.relative(ROOT, src)}`);
  const speed = c.speed ?? 1;
  const key = `${c.src}@${c.in}-${c.out}x${speed}-${Math.round(fs.statSync(src).mtimeMs)}`;
  const dir = path.join(CACHE, set, key);
  if (!fs.existsSync(path.join(dir, ".ok"))) {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    run("ffmpeg", ["-v", "error", "-ss", String(c.in), "-to", String(c.out), "-i", src,
      "-vf", `setpts=PTS/${speed},fps=${FPS},scale=${SRC_W}:-2:flags=lanczos`, "-q:v", "2", path.join(dir, "%05d.jpg")]);
    fs.writeFileSync(path.join(dir, ".ok"), "");
  }
  return fs.readdirSync(dir).filter((f) => f.endsWith(".jpg")).sort().map((f) => pathToFileURL(path.join(dir, f)).href);
}

/** Biçimin zaman çizelgesi: her sahne için başlangıç, süre ve ekrana gelecek kare listesi. */
function timeline(set, fmt) {
  let t = 0;
  return PLAN.formats[fmt].timeline.map(([id, dur]) => {
    const s = PLAN.scenes[id];
    if (!s) throw new Error(`plan: sahne yok: ${id}`);
    const lang = PLAN.sets[set].lang;
    const cap = s.caption?.[lang];
    if (!cap) throw new Error(`plan: ${id} için ${lang} metni yok`);
    let list = [];
    for (const c of s[`clips${fmt[0].toUpperCase()}${fmt.slice(1)}`] ?? s.clips ?? []) list = list.concat(frames(set, c));
    const need = Math.round(dur * FPS);
    if (list.length > need) list = list.slice(0, need);
    const scene = { id, start: t, dur, bg: s.bg ?? "light", side: s.side ?? "right", cap, frames: list,
      lens: s.lens ?? null, rings: s.rings ?? null, screenOff: s.screenOff ?? null, ladder: !!s.ladder };
    t += dur;
    return scene;
  });
}

// ---------- sayfa ----------
const fontUrl = (f) => pathToFileURL(path.join(FONT_DIR, f)).href;
function pageHTML(fmt, scenes, W, H) {
  const data = { fmt, W, H, FPS, scenes, palette: PALETTE, levels: PLAN.levels, current: PLAN.currentLevel, icon: pathToFileURL(ICON).href };
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Bricolage";src:url("${fontUrl("bricolage-latin.woff2")}") format("woff2");font-weight:200 800;font-stretch:75% 100%;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Bricolage";src:url("${fontUrl("bricolage-latin-ext.woff2")}") format("woff2");font-weight:200 800;font-stretch:75% 100%;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#000}
body{font-family:"Bricolage",sans-serif;font-optical-sizing:auto;-webkit-font-smoothing:antialiased;position:relative}
.abs{position:absolute}
.bg{position:absolute;inset:0}
.cap{position:absolute;display:flex;flex-direction:column}
.cap h1{font-weight:800;font-stretch:84%;letter-spacing:-0.015em;line-height:.98}
.cap .s{font-weight:600;font-stretch:88%;line-height:1.18}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em}
.w>span{display:inline-block;will-change:transform}
.pills{display:flex;gap:.45em;align-items:center}
.pill{display:inline-block;font-weight:800;font-stretch:90%;letter-spacing:.01em;padding:.2em .7em .24em;border-radius:999px;line-height:1.1}
.pill.o{background:transparent;box-shadow:inset 0 0 0 .1em currentColor}
.phone{position:absolute;background:#0d0d0f;box-shadow:inset 0 0 0 3px #3a3a3e, inset 0 0 0 7px #16161a}
.screen{position:absolute;overflow:hidden;background:#fff}
.screen img{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.dim{position:absolute;inset:0;background:#000;pointer-events:none}
.ring{position:absolute;border-radius:50%;border:3px solid #fb8f2a}
.lensring{position:absolute;border:4px solid #f87612;box-shadow:0 0 0 6px rgba(248,118,18,.2)}
.lens{position:absolute;overflow:hidden;background:#fff;border:5px solid;transform-origin:50% 50%}
.lens img{position:absolute;display:block;max-width:none}
.lad{position:absolute}
.lad>div{position:absolute}
.node{border-radius:50%}
.lab{font-weight:800;font-stretch:85%;line-height:1;letter-spacing:.01em;transform:translateX(-50%)}
.brand{position:absolute;display:flex;align-items:center;font-weight:800;font-stretch:90%;letter-spacing:-.01em;color:#fff}
.brand img{display:block}
.chip{position:absolute;left:50%;font-weight:800;font-stretch:86%;letter-spacing:-.005em;line-height:1.15;color:#fff;background:#f87612;border-radius:999px;white-space:nowrap;box-shadow:0 10px 30px -8px rgba(80,30,0,.45)}
</style></head><body><div id="root"></div>
<script>
const D = ${JSON.stringify(data)};
${pageScript}
</script></body></html>`;
}

/* Sayfa tarafı. Hepsi saf fonksiyon: renderAt(t) DOM'u t anına kurar. */
const pageScript = String.raw`
const {W,H,FPS,scenes,palette:P}=D;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,x)=>a+(b-a)*x;
const io=(x)=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;          // easeInOutCubic
const out=(x)=>1-Math.pow(1-x,3);                           // easeOutCubic
const outQ=(x)=>1-Math.pow(1-x,5);                          // easeOutQuint
const back=(x)=>{const c=1.6;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const prog=(t,a,d)=>clamp((t-a)/d);
const el=(tag,cls,parent=root)=>{const e=document.createElement(tag);if(cls)e.className=cls;parent.appendChild(e);return e};
const root=document.getElementById("root");
const PROMO=D.fmt==="promo";
const u=W/100;

// ----- kalıcı öğeler -----
const bgs=scenes.map(s=>{const b=el("div","bg");b.style.background=P[s.bg].bg;return b});
let phone,screenA,screenB,imgA,imgB,dim,lensring,lens,lensImg,rings=[];
const ph={h:0,w:0,b:0,r:0};
if(PROMO){
  ph.h=H*0.86; ph.b=H*0.013; ph.w=(ph.h-2*ph.b)*(1320/2868)+2*ph.b; ph.r=H*0.06;
  phone=el("div","phone"); phone.style.width=ph.w+"px"; phone.style.height=ph.h+"px"; phone.style.borderRadius=ph.r+"px";
}
const scr=PROMO?el("div","screen",phone):el("div","screen");
if(PROMO){Object.assign(scr.style,{left:ph.b+"px",top:ph.b+"px",width:(ph.w-2*ph.b)+"px",height:(ph.h-2*ph.b)+"px",borderRadius:(ph.r-ph.b)+"px"})}
else{Object.assign(scr.style,{zIndex:3,left:"0px",top:((H-W*2868/1320)/2)+"px",width:W+"px",height:(W*2868/1320)+"px"})}
imgA=el("img","",scr); imgB=el("img","",scr); dim=el("div","dim",scr);
lensring=el("div","lensring",scr);
for(let i=0;i<3;i++){const r=el("div","ring",scr);rings.push(r)}
lens=el("div","lens"); lensImg=el("img","",lens);

// ----- yazılar -----
function words(text,cls,parent){const h=el(cls==="h1"?"h1":"div",cls==="h1"?"":"s",parent);const ws=[];text.split(" ").forEach((w,i,a)=>{const o=el("span","w",h);const s=el("span","",o);s.textContent=w;ws.push(s);if(i<a.length-1)h.appendChild(document.createTextNode(" "))});return {box:h,ws}}
const caps=scenes.map((s,i)=>{
  const c=el("div","cap"); const pal=P[s.bg]; c.style.color=pal.ink;
  const o={el:c,pills:null,h:null,s:null};
  if(s.cap.pill){o.pills=el("div","pills",c);const p=el("span","pill",o.pills);p.textContent=s.cap.pill;p.style.background=pal.pill;p.style.color=pal.pillInk;
    if(s.cap.premium){const q=el("span","pill o",o.pills);q.textContent=s.cap.premium;q.style.color=pal.accent}}
  const head=s.cap.h??s.cap.words.join(" ");
  o.h=words(head,"h1",c); o.s=s.cap.s?words(s.cap.s,"s",c):null; if(o.s)o.s.box.style.color=pal.sub;
  return o;
});
// promo yerleşimi
const PAD=PROMO?W*0.07:0;
caps.forEach((o,i)=>{const s=scenes[i];const c=o.el;
  if(PROMO){
    if(s.id==="intro"){c.style.left=PAD+"px";c.style.top=H*0.26+"px";c.style.width=W*0.8+"px";o.h.box.style.fontSize=H*0.165+"px";o.h.box.style.lineHeight=".92";if(o.s){o.s.box.style.fontSize=H*0.042+"px";o.s.box.style.marginTop=H*0.045+"px"}}
    else if(s.id==="end"){c.style.left="0px";c.style.width=W+"px";c.style.top=H*0.6+"px";c.style.alignItems="center";c.style.textAlign="center";o.h.box.style.fontSize=H*0.075+"px";if(o.s){o.s.box.style.fontSize=H*0.034+"px";o.s.box.style.marginTop=H*0.03+"px"}}
    else{const left=s.side==="right";c.style.width=W*0.4+"px";c.style.left=(left?PAD:W*0.53)+"px";c.style.top=H*0.3+"px";
      o.h.box.style.fontSize=H*0.088+"px";if(o.pills){o.pills.style.fontSize=H*0.024+"px";o.pills.style.marginBottom=H*0.035+"px"}
      if(o.s){o.s.box.style.fontSize=H*0.034+"px";o.s.box.style.marginTop=H*0.03+"px"}}
  }else{
    // App Preview: üstte tek satırlık başlık çipi (dinamik adanın üstü), yalnız başlık
    c.style.display="none";
  }
});
const chips=PROMO?[]:scenes.map(s=>{const c=el("div","chip");c.textContent=s.cap.h;c.style.fontSize=W*0.044+"px";c.style.padding=(W*0.022)+"px "+(W*0.05)+"px";return c});

// basamaklar (patika)
let lad=null;
if(PROMO&&scenes.some(s=>s.ladder)){lad=el("div","lad");lad.nodes=[];lad.labs=[];lad.segs=[];
  const n=D.levels.length;for(let i=0;i<n;i++){if(i<n-1){const sg=el("div","",lad);lad.segs.push(sg)}}
  for(let i=0;i<n;i++){const nd=el("div","node",lad);const lb=el("div","lab",lad);lb.textContent=D.levels[i];lad.nodes.push(nd);lad.labs.push(lb)}}

// marka (açılış + kapanış)
const brand=el("div","brand");const bimg=el("img","",brand);bimg.src=D.icon;const bt=el("span","",brand);bt.textContent="Lernomi";
const big=el("div","brand");const gimg=el("img","",big);gimg.src=D.icon;const gt=el("span","",big);gt.textContent="Lernomi";

// ----- yardımcılar -----
function sceneAt(t){for(let i=scenes.length-1;i>=0;i--)if(t>=scenes[i].start)return i;return 0}
function frameOf(s,lt){if(!s.frames.length)return null;return s.frames[clamp(Math.floor(lt*FPS+1e-6),0,s.frames.length-1)]}
function phonePos(s){ // telefonun sahnedeki yeri (merkez x, üst y, açı)
  if(s.id==="intro")return {x:W*0.74,y:H*1.06,rot:-6};
  if(s.id==="end")return {x:W*0.5,y:H*1.08,rot:0};
  return {x:s.side==="right"?W*0.735:W*0.265,y:(H-ph.h)/2,rot:s.side==="right"?-2:2};
}
function phoneAt(t,i){ // sahne sınırında 0.8 sn süzülme, ortada hafif yatma
  const s=scenes[i],lt=t-s.start,next=scenes[i+1],prev=scenes[i-1],a=phonePos(s);
  if(next&&t>s.start+s.dur-0.45){const b=phonePos(next);const p=io(prog(t,s.start+s.dur-0.45,0.8));return {x:lerp(a.x,b.x,p),y:lerp(a.y,b.y,p),rot:lerp(a.rot,b.rot,p)+Math.sin(p*Math.PI)*(b.x>a.x?4:-4)}}
  if(prev&&lt<0.35){const b=phonePos(prev);const p=io(prog(t,s.start-0.45,0.8));return {x:lerp(b.x,a.x,p),y:lerp(b.y,a.y,p),rot:lerp(b.rot,a.rot,p)+Math.sin(p*Math.PI)*(a.x>b.x?4:-4)}}
  return a;
}
const loads=[];
function setSrc(img,src){if(!src){img.style.visibility="hidden";return}img.style.visibility="visible";if(img.dataset.src!==src){img.dataset.src=src;img.src=src;loads.push(img.decode().catch(()=>{}))}}
function caption(o,s,lt,dur){
  // giriş: sözcükler maskeden yukarı, 60 ms arayla; çıkış: blok yukarı kayıp söner
  const ws=[...o.h.ws,...(o.s?o.s.ws:[])];
  const t0=s.id==="intro"?0.15:0.25;
  let k=0;
  if(o.pills){const p=out(prog(lt,t0,0.35));o.pills.style.opacity=p;o.pills.style.transform="translateY("+(1-p)*H*0.03+"px)"}
  if(s.id==="intro"){ // açılış: üç sözcük vuruşta (0.5 sn)
    o.h.ws.forEach((w,i)=>{const p=outQ(prog(lt,0.2+i*0.5,0.45));w.style.transform="translateY("+(1-p)*110+"%)"});
    if(o.s)o.s.ws.forEach((w,i)=>{const p=outQ(prog(lt,1.8+i*0.04,0.5));w.style.transform="translateY("+(1-p)*110+"%)"});
  }else{
    o.h.ws.forEach((w,i)=>{const p=outQ(prog(lt,t0+0.12+i*0.06,0.55));w.style.transform="translateY("+(1-p)*110+"%)"});
    if(o.s)o.s.ws.forEach((w,i)=>{const p=outQ(prog(lt,t0+0.45+i*0.035,0.5));w.style.transform="translateY("+(1-p)*110+"%)"});
  }
  const e=s.id==="end"?0:io(prog(lt,dur-0.38,0.33));
  o.el.style.opacity=1-e; o.el.style.transform="translateY("+(-e*H*0.05)+"px)";
}

window.renderAt=function(t){
  loads.length=0;
  const i=sceneAt(t), s=scenes[i], lt=t-s.start;
  const next=scenes[i+1], prev=scenes[i-1];
  // zemin: yeni sahne, telefonun O ANKİ merkezinden açılan daireyle gelir (0.6 sn, sınırda ortalı)
  const TR=0.3, pos=PROMO?phoneAt(t,i):null;
  const cx=PROMO?pos.x:W/2, cy=PROMO?pos.y+ph.h/2:H/2, R=Math.hypot(Math.max(cx,W-cx),Math.max(cy,H-cy));
  bgs.forEach((b,k)=>{b.style.display=k===i?"block":"none";b.style.clipPath="none";b.style.zIndex=1});
  if(next&&t>s.start+s.dur-TR){const p=io(prog(t,s.start+s.dur-TR,2*TR));
    bgs[i+1].style.display="block";bgs[i+1].style.zIndex=2;bgs[i+1].style.clipPath="circle("+(p*R)+"px at "+cx+"px "+cy+"px)"}
  else if(prev&&lt<TR){const p=io(prog(t,s.start-TR,2*TR));
    bgs[i-1].style.display="block";bgs[i-1].style.zIndex=1;bgs[i].style.zIndex=2;bgs[i].style.clipPath="circle("+(p*R)+"px at "+cx+"px "+cy+"px)"}

  // yazılar
  caps.forEach((o,k)=>{o.el.style.display=k===i&&PROMO?"flex":"none";o.el.style.zIndex=5});
  if(PROMO)caption(caps[i],s,lt,s.dur);

  // ekran: sahne sınırında 0.2 sn çapraz geçiş
  const fA=frameOf(s,lt);
  let fB=null,mix=0;
  if(next&&t>s.start+s.dur-0.1&&next.frames.length){fB=frameOf(next,0);mix=prog(t,s.start+s.dur-0.1,0.2)}
  if(prev&&lt<0.1&&prev.frames.length&&s.frames.length){fB=frameOf(prev,prev.dur);mix=1-prog(t,s.start-0.1,0.2)}
  // kare listesi boş sahnede (açılış/kapanış) komşu sahnenin karesi
  const own=fA??(next?frameOf(next,0):prev?frameOf(prev,prev.dur):null);
  setSrc(imgA,own); setSrc(imgB,fB); imgB.style.opacity=fB?mix:0;

  if(PROMO){
    // telefon: sahneler arasında süzülerek yer değiştirir (phoneAt); açılışta alttan yükselir, kapanışta iner
    phone.style.left=(pos.x-ph.w/2)+"px"; phone.style.top=pos.y+"px";
    const sc=1+0.012*Math.sin(Math.max(0,lt)*0.9); // nefes alır gibi çok hafif
    phone.style.transform="rotate("+pos.rot+"deg) scale("+sc+")";
    phone.style.zIndex=4; phone.style.boxShadow="inset 0 0 0 3px #3a3a3e, inset 0 0 0 7px #16161a, 0 "+H*0.04+"px "+H*0.08+"px "+(-H*0.01)+"px "+P[s.bg].shadow;
  }else{
    const p=prev&&lt<0.3?out(prog(lt,0,0.3)):1; scr.style.transform="scale("+(1.03-0.03*p)+")";
  }

  // yürüyüş: mikrofondan halkalar, sonra ekran kararır (ekran kapalı, dinliyor)
  rings.forEach((r,k)=>{if(!s.rings||!PROMO){r.style.display="none";return}
    const sw=parseFloat(scr.style.width),sh=parseFloat(scr.style.height);
    const ph_=((lt-0.6-k*0.55)%1.65+1.65)%1.65/1.65; const on=lt>0.6+k*0.55;
    const rad=sw*(0.09+0.32*out(ph_)); r.style.display=on?"block":"none";
    r.style.width=r.style.height=2*rad+"px"; r.style.left=(s.rings[0]*sw-rad)+"px"; r.style.top=(s.rings[1]*sh-rad)+"px";
    r.style.opacity=(1-ph_)*0.9; r.style.borderWidth=Math.max(1.5,4*(1-ph_))+"px"});
  dim.style.opacity=s.screenOff!=null&&PROMO?0.9*io(prog(lt,s.screenOff,0.6)):0;

  // büyüteç: kaynak bileşen ekranda halkayla işaretlenir, kopyası büyüyerek dışarı çıkar
  if(s.lens&&PROMO&&lt>=s.lens.at-0.05&&lt<s.dur-0.25){
    const sw=parseFloat(scr.style.width),sh=parseFloat(scr.style.height);const [rx,ry,rw,rh]=s.lens.rect;
    const pr=phone.getBoundingClientRect(); // dönüş küçük; sınırlar yaklaşık yeter
    const p=back(prog(lt,s.lens.at,0.55)), q=io(prog(lt,s.dur-0.55,0.3));
    lensring.style.display="block";Object.assign(lensring.style,{left:rx*sw-6+"px",top:ry*sh-6+"px",width:rw*sw+12+"px",height:rh*sh+12+"px",borderRadius:sw*0.05+"px",opacity:String(clamp(p)*(1-q))});
    const z=s.lens.zoom, lw=rw*sw*z, lh=rh*sh*z;
    const srcX=pr.left+ph.b+rx*sw, srcY=pr.top+ph.b+ry*sh;
    const toX=s.side==="right"?pr.left-lw*0.42:pr.right-lw*0.58; const toY=srcY+rh*sh/2-lh/2;
    const x=lerp(srcX,toX,p), y=lerp(srcY,toY,p), sc=lerp(1/z,1,p);
    lens.style.display="block";Object.assign(lens.style,{left:x+"px",top:y+"px",width:lw+"px",height:lh+"px",borderRadius:sw*0.05*z+"px",borderColor:P[s.bg].accent==="#ffffff"?"#f87612":P[s.bg].accent,
      transform:"scale("+sc+")",transformOrigin:"0 0",opacity:String(clamp(p*3)*(1-q)),zIndex:6,boxShadow:"0 "+H*0.03+"px "+H*0.06+"px "+(-H*0.01)+"px "+P[s.bg].shadow});
    setSrc(lensImg,fA); Object.assign(lensImg.style,{width:sw*z+"px",height:sh*z+"px",left:(-rx*sw*z-5)+"px",top:(-ry*sh*z-5)+"px"});
  }else{lensring.style.display="none";lens.style.display="none"}

  // patika basamakları
  if(lad){const on=s.ladder&&PROMO;lad.style.display=on?"block":"none";
    if(on){const c=caps[i].el;const n=D.levels.length,cur=D.levels.indexOf(D.current);const lw=W*0.34,gap=lw/(n-1),y=H*0.75,R=H*0.017;
      lad.style.left=c.style.left;lad.style.top=y+"px";lad.style.zIndex=5;const e=io(prog(lt,s.dur-0.38,0.33));lad.style.opacity=1-e;
      lad.segs.forEach((g,k)=>{const p=io(prog(lt,0.9+k*0.18,0.3));const done=k<cur;Object.assign(g.style,{left:k*gap+"px",top:(-2)+"px",height:"4px",width:gap*p+"px",
        background:done?P[s.bg].line:"repeating-linear-gradient(90deg,"+P[s.bg].line+" 0 8px,transparent 8px 16px)",opacity:done?1:0.6})});
      lad.nodes.forEach((nd,k)=>{const p=back(prog(lt,0.8+k*0.18,0.4));const done=k<=cur;const r=k===cur?R*1.35:R;
        Object.assign(nd.style,{left:k*gap-r+"px",top:-r+"px",width:2*r+"px",height:2*r+"px",transform:"scale("+p+")",
          background:done?P[s.bg].line:P[s.bg].bg,border:(k===cur?5:3)+"px solid "+P[s.bg].line,boxShadow:k===cur?"0 0 0 "+R*0.6+"px rgba(251,143,42,.25)":"none"})});
      lad.labs.forEach((lb,k)=>{const p=out(prog(lt,0.95+k*0.18,0.4));Object.assign(lb.style,{left:k*gap+"px",top:R*2.2+"px",fontSize:H*0.03+"px",color:k===cur?P[s.bg].accent:P[s.bg].ink,opacity:p*(k<=cur?1:0.55)})})}}

  // marka: açılışta sol üstte küçük, kapanışta ortada büyük
  if(PROMO){
    const bi=scenes[i].id==="intro";
    brand.style.display=bi?"flex":"none";
    if(bi){const p=out(prog(lt,0,0.5)),e=io(prog(lt,s.dur-0.38,0.33));const sz=H*0.05;Object.assign(brand.style,{left:PAD+"px",top:H*0.09+"px",fontSize:sz*0.78+"px",gap:sz*0.3+"px",opacity:p*(1-e),zIndex:5});
      Object.assign(bimg.style,{width:sz+"px",height:sz+"px",borderRadius:sz*0.23+"px"})}
    const be=scenes[i].id==="end";
    big.style.display=be?"flex":"none";
    if(be){const p=back(prog(lt,0.15,0.7));const sz=H*0.17;Object.assign(big.style,{left:"50%",top:H*0.24+"px",fontSize:sz*0.62+"px",gap:sz*0.22+"px",zIndex:5,
      transform:"translateX(-50%) scale("+((0.6+0.4*p)*(1+0.035*io(prog(lt,0.9,5))))+")",opacity:String(clamp(p*1.5))});
      Object.assign(gimg.style,{width:sz+"px",height:sz+"px",borderRadius:sz*0.23+"px",boxShadow:"0 "+H*0.02+"px "+H*0.05+"px -"+H*0.01+"px rgba(116,49,15,.55)"})}
  }else{
    chips.forEach((c,k)=>{c.style.display=k===i?"block":"none";if(k!==i)return;const p=back(prog(lt,0.15,0.5)),e=io(prog(lt,s.dur-0.3,0.28));
      Object.assign(c.style,{top:H*0.022+"px",transform:"translateX(-50%) translateY("+((1-p)*-H*0.06-e*H*0.06)+"px)",opacity:String(clamp(p*2)*(1-e)),zIndex:7})});
  }
  return Promise.all(loads);
};
window.ready=document.fonts.ready.then(()=>Promise.all([...document.images].filter(x=>x.src).map(x=>x.decode().catch(()=>{}))));
`;

// ---------- üretim ----------
async function renderFormat(browser, set, fmt) {
  const F = PLAN.formats[fmt];
  const scenes = timeline(set, fmt);
  const total = scenes.reduce((a, s) => a + s.dur, 0);
  const n = Math.round(total * FPS) - (fmt === "preview" ? 1 : 0); // App Preview: 30 sn'yi aşmasın
  fs.mkdirSync(OUT, { recursive: true });
  const html = path.join(CACHE, `${set}-${fmt}.html`);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(html, pageHTML(fmt, scenes, F.w, F.h));
  const page = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(html).href);
  await page.evaluate(() => window.ready);
  const base = path.join(OUT, `${set}-${fmt}`);

  if (STILL != null) {
    for (const t of STILL.split(",").map(Number)) {
      await page.evaluate((x) => window.renderAt(x), t);
      await page.screenshot({ path: `${base}-${t.toFixed(2)}.png` });
    }
    console.log(`${base}-*.png`);
    await page.close();
    return;
  }

  const wav = path.join(CACHE, `music-${F.music}.wav`);
  run("node", [path.join(ROOT, "scripts/store/video/music.mjs"), F.music, wav]);
  const mp4 = `${base}.mp4`;
  const enc = spawn("ffmpeg", ["-v", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-", "-i", wav,
    "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", String(FPS),
    "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-af", `loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=out:st=${(n / FPS - 0.6).toFixed(2)}:d=0.6`,
    "-t", (n / FPS).toFixed(3), "-movflags", "+faststart", mp4], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => enc.on("close", (c) => (c === 0 ? res() : rej(new Error(`ffmpeg ${c}`)))));
  const t0 = Date.now();
  for (let k = 0; k < n; k++) {
    await page.evaluate((x) => window.renderAt(x), k / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 95 });
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
    if (k % 150 === 0) process.stdout.write(`\r${set} ${fmt}: ${k}/${n}`);
  }
  enc.stdin.end();
  await done;
  await page.close();
  console.log(`\r${path.relative(ROOT, mp4)}: ${F.w}×${F.h}, ${(n / FPS).toFixed(2)} sn, ${((Date.now() - t0) / 1000).toFixed(0)} sn'de`);
}

const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const set of sets) for (const fmt of formats) await renderFormat(browser, set, fmt);
} finally {
  await browser.close();
}
