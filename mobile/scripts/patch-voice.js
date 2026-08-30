/**
 * @react-native-voice/voice eski (jcenter, AGP 3.3.2, com.android.support,
 * namespace yok) ve AGP 8 ile derlenmiyor. Java'sı androidx-temiz olduğu için
 * yalnız android/build.gradle + manifest'i AGP 8 uyumlu hâle getirmek yetiyor.
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
  console.log("[patch-voice] AGP8 duzeltmesi uygulandi");
} catch (e) { console.warn("[patch-voice]", e.message); }
