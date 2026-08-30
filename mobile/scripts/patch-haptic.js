/**
 * react-native-haptic-feedback'i RN 0.87 / AGP-8 ile uyumlu yapar: react-native:+
 * yerine react-android; namespace zaten var, çakışan manifest `package` attribute'unu
 * kaldırır. postinstall'da çalışır.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "node_modules", "react-native-haptic-feedback", "android");
const gradle = path.join(root, "build.gradle");
const manifest = path.join(root, "src", "main", "AndroidManifest.xml");

if (fs.existsSync(gradle)) {
  let g = fs.readFileSync(gradle, "utf8");
  g = g.replace(/com\.facebook\.react:react-native:\+/g, "com.facebook.react:react-android");
  fs.writeFileSync(gradle, g);
  console.log("patch-haptic: react-android'e bağlandı");
}
if (fs.existsSync(manifest)) {
  let m = fs.readFileSync(manifest, "utf8");
  m = m.replace(/\s*package="[^"]*"/, "");
  fs.writeFileSync(manifest, m);
  console.log("patch-haptic: manifest package kaldırıldı");
}
