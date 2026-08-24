// Maskot izleme hattı: data/mascot/erdi-source.png -> public/erdi.svg
//
// Kullanım:
//   magick data/mascot/erdi-source.png -crop 1002x1475+0+39 +repage -resize 640 /tmp/erdi-cut.png
//   node scripts/trace-mascot.mjs /tmp/erdi-cut.png public/erdi.svg [renkSayisi]
//
// Kaynak görsel değişirse `magick identify -format %@` ile yeni kırpma kutusunu al.
// PNG'yi zlib ile açıp ImageData veriyoruz (imagetracerjs'in tarayıcı dışı yolu).
import { readFileSync, writeFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import ImageTracer from "imagetracerjs";

function decodePNG(buf) {
  // Minimal PNG çözücü: 8-bit RGBA/RGB, tek IDAT akışı, filtreli.
  let pos = 8;
  let width, height, bitDepth, colorType;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2))
    throw new Error(`desteklenmeyen PNG: depth=${bitDepth} color=${colorType}`);
  const bpp = colorType === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(width * height * 4);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = Buffer.from(line);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      if (filter === 1) cur[i] = (cur[i] + a) & 255;
      else if (filter === 2) cur[i] = (cur[i] + b) & 255;
      else if (filter === 3) cur[i] = (cur[i] + ((a + b) >> 1)) & 255;
      else if (filter === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        cur[i] = (cur[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
      }
    }
    for (let x = 0; x < width; x++) {
      const s = x * bpp, d = (y * width + x) * 4;
      out[d] = cur[s]; out[d + 1] = cur[s + 1]; out[d + 2] = cur[s + 2];
      out[d + 3] = bpp === 4 ? cur[s + 3] : 255;
    }
    prev = cur;
  }
  return { width, height, data: out };
}

const [, , inPath = "/tmp/erdi-cut.png", outPath = "public/erdi.svg", colorArg] = process.argv;
const img = decodePNG(readFileSync(inPath));

// Yalnızca gerçekten saydam pikselleri boşalt; yarı saydam fırça dokusunu
// opaklaştır (delik açma). Aksi hâlde kürk dokusu benek benek deliniyor.
for (let i = 0; i < img.data.length; i += 4) {
  if (img.data[i + 3] < 8) {
    img.data[i] = 0; img.data[i + 1] = 255; img.data[i + 2] = 0; img.data[i + 3] = 0;
  } else img.data[i + 3] = 255;
}

const opts = {
  numberofcolors: Number(colorArg ?? 20),
  colorsampling: 2,        // deterministik ızgara örnekleme
  mincolorratio: 0,
  colorquantcycles: 5,
  ltres: 1, qtres: 1,      // eğri hassasiyeti
  pathomit: 12,            // ufak benekleri at
  rightangleenhance: false,
  strokewidth: 1,
  linefilter: true,
  scale: 1,
  roundcoords: 1,
  blurradius: 0,
};

let svg = ImageTracer.imagedataToSVG(img, opts);
// Saydam (alpha 0) yolları ve anahtar yeşile kaçan kümeleri at.
svg = svg.replace(/<path[^>]*fill-opacity="0(\.0+)?"[^>]*\/>/g, "");
svg = svg.replace(/<path[^>]*fill="rgb\((\d+),(\d+),(\d+)\)"[^>]*\/>/g, (m2, r, g, b) =>
  Number(g) > 140 && Number(g) > Number(r) * 1.5 && Number(g) > Number(b) * 1.5 ? "" : m2);
// Boyut bilgisini viewBox'a çevir.
svg = svg.replace(/<svg /, `<svg viewBox="0 0 ${img.width} ${img.height}" `);
writeFileSync(outPath, svg);
console.log("colors:", opts.numberofcolors, "bytes:", svg.length);
