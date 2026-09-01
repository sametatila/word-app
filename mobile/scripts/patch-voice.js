/**
 * @react-native-voice/voice eski (jcenter, AGP 3.3.2, com.android.support,
 * namespace yok) ve AGP 8 ile derlenmiyor. Java'sı androidx-temiz olduğu için
 * yalnız android/build.gradle + manifest'i AGP 8 uyumlu hâle getirmek yetiyor.
 *
 * AYRICA: native modül adı "RCTVoice" idi; eski mimaride RN "RCT" önekini soyup
 * NativeModules.Voice olarak eşliyordu ama YENİ MİMARİDE soymuyor → Voice null
 * (STT hiç çalışmıyordu). getName()'i "Voice" yaparak düzeltiyoruz.
 */
const fs = require("fs");
const path = require("path");
const base = path.join(__dirname, "..", "node_modules", "@react-native-voice", "voice", "android");
if (!fs.existsSync(base)) process.exit(0);

const buildGradle = `def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

apply plugin: 'com.android.library'

android {
    namespace "com.wenkesj.voice"
    compileSdkVersion safeExtGet('compileSdkVersion', 35)

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 24)
        targetSdkVersion safeExtGet('targetSdkVersion', 35)
    }
    lintOptions { abortOnError false }
}

repositories {
    google()
    mavenCentral()
}

dependencies {
    implementation 'com.facebook.react:react-android'
    implementation 'androidx.appcompat:appcompat:1.7.0'
}
`;
const manifest = `<manifest xmlns:android="http://schemas.android.com/apk/res/android">\n</manifest>\n`;

try {
  fs.writeFileSync(path.join(base, "build.gradle"), buildGradle);
  fs.writeFileSync(path.join(base, "src", "main", "AndroidManifest.xml"), manifest);
  const modFile = path.join(base, "src", "main", "java", "com", "wenkesj", "voice", "VoiceModule.java");
  if (fs.existsSync(modFile)) {
    let src = fs.readFileSync(modFile, "utf8");
    // 1) Yeni mimari: getName "RCTVoice" -> "Voice" (yoksa NativeModules.Voice null).
    src = src.replace('return "RCTVoice";', 'return "Voice";');
    // 2) onResults/onPartialResults NPE: bazı motorlar (HyperOS vb.) RESULTS_RECOGNITION'ı
    //    null döndürüyor; kütüphane kontrolsüz iterate edip ana thread'de çöküyordu. Null-korumalı yap.
    const bad = "ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);\n    for (String result : matches) {\n      arr.pushString(result);\n    }";
    const good = "ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);\n    if (matches != null) {\n      for (String result : matches) {\n        arr.pushString(result);\n      }\n    }";
    src = src.split(bad).join(good);
    fs.writeFileSync(modFile, src);
  }
  console.log("[patch-voice] AGP8 + getName(Voice) + onResults null-koruma uygulandi");
} catch (e) { console.warn("[patch-voice]", e.message); }
