package com.nomi.speech

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioRecord
import android.media.AudioTrack
import android.media.MediaPlayer
import android.media.MediaRecorder
import android.os.Build
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.view.WindowManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

/**
 * Kendi konuşma tanıma (STT) modülümüz — Android [SpeechRecognizer]'ı doğrudan sarar.
 * @react-native-voice (2022, bakımsız) yerine geçer.
 *
 * Neden kendi modülümüz:
 *  - Kelime başına TAZE recognizer: eski kütüphane recognizer'ı yeniden kullanıyor,
 *    bazı motorlarda (HyperOS) ikinci çağrıda mikrofon hiç açılmıyordu. Burada her
 *    [start] öncekini yok edip yenisini kurar.
 *  - NULL-güvenli: sonuç listesi null gelen motorlarda kütüphane ana thread'de
 *    çöküyordu; burada her yerde null korumalı.
 *  - Tüm recognizer çağrıları ANA THREAD'de (SpeechRecognizer bunu şart koşar).
 *
 * JS'e olaylarla konuşur (DeviceEventManagerModule): NomiSpeechReady/Begin/Partial/
 * Results/End/Error. Sonuç dizileri { value: [...] } biçiminde.
 */
class NomiSpeechModule(private val reactCtx: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactCtx), RecognitionListener {

  private var recognizer: SpeechRecognizer? = null

  override fun getName() = "NomiSpeech"

  private fun emit(event: String, params: WritableMap?) {
    try {
      reactCtx
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        .emit(event, params)
    } catch (_: Exception) { /* köprü kapanmış olabilir */ }
  }

  private fun emitValues(event: String, matches: ArrayList<String>?) {
    val arr = Arguments.createArray()
    if (matches != null) for (s in matches) arr.pushString(s)
    val m = Arguments.createMap()
    m.putArray("value", arr)
    emit(event, m)
  }

  /**
   * Tanıma kullanılabilir mi.
   *
   * `locale` iOS ile imza eşitliği için alınıyor: orada kontrol dile bağlı
   * (SFSpeechRecognizer bir Locale ile kuruluyor), Android'de ise
   * `isRecognitionAvailable` dilden bağımsız — motorun kurulu olup olmadığına
   * bakıyor. Dil desteği burada ayrıca sorulamadığı için parametre bilerek
   * kullanılmıyor; asıl dil seçimi `start(locale)` sırasında yapılıyor.
   */
  @ReactMethod
  fun isAvailable(locale: String, promise: Promise) {
    try {
      promise.resolve(SpeechRecognizer.isRecognitionAvailable(reactCtx))
    } catch (_: Exception) {
      promise.resolve(false)
    }
  }

  /** Ekran uykusunu engelle/bırak (Wake Lock karşılığı) — yürüyüş turu boyunca ekran sönmesin. */
  @ReactMethod
  fun setKeepAwake(on: Boolean) {
    val activity = reactCtx.currentActivity ?: return
    UiThreadUtil.runOnUiThread {
      try {
        if (on) activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        else activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
      } catch (_: Exception) { /* yut */ }
    }
  }

  // --- Ham ses kaydı (Azure/sunucu STT için): 16 kHz mono PCM → WAV. Ekran-kapalı/cepte yolu. ---
  private var recorder: AudioRecord? = null
  @Volatile private var recording = false
  private var recordThread: Thread? = null
  private var pcm: java.io.ByteArrayOutputStream? = null
  private val sampleRate = 16000

  @ReactMethod
  fun startRecording(promise: Promise) {
    try {
      if (recording) { promise.resolve(false); return }
      val minBuf = AudioRecord.getMinBufferSize(sampleRate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT)
      @Suppress("MissingPermission")
      val ar = AudioRecord(MediaRecorder.AudioSource.VOICE_RECOGNITION, sampleRate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, Math.max(minBuf, 8192))
      if (ar.state != AudioRecord.STATE_INITIALIZED) { ar.release(); promise.reject("init", "AudioRecord başlatılamadı"); return }
      val out = java.io.ByteArrayOutputStream()
      pcm = out; recorder = ar; recording = true
      ar.startRecording()
      recordThread = Thread {
        val buf = ByteArray(8192)
        while (recording) {
          val n = ar.read(buf, 0, buf.size)
          if (n > 0) synchronized(out) { out.write(buf, 0, n) }
        }
      }.also { it.start() }
      promise.resolve(true)
    } catch (e: Exception) { recording = false; promise.reject("record", e.message, e) }
  }

  /** Kaydı durdur, WAV'ı cache'e yaz, dosya yolunu döndür (JS FormData ile /api/stt'e gönderir). */
  /** WAV klibini /api/stt'e NATIVE multipart POST'la (RN fetch arka planda takılıyor; kendi
   *  thread + HttpURLConnection arka planda çalışır). Çerez CookieManager'dan. {text} döner. */
  @ReactMethod
  fun uploadStt(url: String, wavPath: String, language: String, expected: String, promise: Promise) {
    Thread {
      try {
        val file = java.io.File(wavPath)
        if (!file.exists() || file.length() == 0L) { promise.resolve(null); return@Thread }
        val boundary = "----NomiBoundary${System.currentTimeMillis()}"
        val cookie = try { android.webkit.CookieManager.getInstance().getCookie(url) } catch (_: Exception) { null }
        val conn = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        conn.requestMethod = "POST"
        conn.doOutput = true
        conn.connectTimeout = 15000; conn.readTimeout = 20000
        conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=$boundary")
        if (!cookie.isNullOrEmpty()) conn.setRequestProperty("Cookie", cookie)
        val out = java.io.DataOutputStream(conn.outputStream)
        fun field(name: String, value: String) {
          out.writeBytes("--$boundary\r\n")
          out.writeBytes("Content-Disposition: form-data; name=\"$name\"\r\n\r\n")
          out.write(value.toByteArray(Charsets.UTF_8)); out.writeBytes("\r\n")
        }
        field("language", language)
        field("mode", "walk")
        if (expected.isNotEmpty()) field("expected", expected)
        out.writeBytes("--$boundary\r\n")
        out.writeBytes("Content-Disposition: form-data; name=\"audio\"; filename=\"clip.wav\"\r\n")
        out.writeBytes("Content-Type: audio/wav\r\n\r\n")
        file.inputStream().use { it.copyTo(out) }
        out.writeBytes("\r\n--$boundary--\r\n")
        out.flush(); out.close()
        val code = conn.responseCode
        val body = (if (code == 200) conn.inputStream else conn.errorStream)?.bufferedReader()?.use { it.readText() } ?: ""
        conn.disconnect()
        if (code != 200) { promise.resolve(null); return@Thread }
        val text = try { org.json.JSONObject(body).optString("text", "") } catch (_: Exception) { "" }
        promise.resolve(if (text.isNotEmpty()) text else null)
      } catch (e: Exception) { android.util.Log.e("NomiWalk", "uploadStt ex ${e.message}"); promise.resolve(null) }
    }.start()
  }

  /** Basit GET (JSON) — ekran-kapalı devam turunda /api/session için (RN fetch arka planda takılıyor).
   *  Çerez CookieManager'dan. 200 ise gövde, değilse null. */
  @ReactMethod
  fun httpGet(url: String, promise: Promise) {
    Thread {
      try {
        val cookie = try { android.webkit.CookieManager.getInstance().getCookie(url) } catch (_: Exception) { null }
        val conn = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        conn.connectTimeout = 15000; conn.readTimeout = 20000
        if (!cookie.isNullOrEmpty()) conn.setRequestProperty("Cookie", cookie)
        conn.setRequestProperty("accept", "application/json")
        val code = conn.responseCode
        val body = (if (code == 200) conn.inputStream else conn.errorStream)?.bufferedReader()?.use { it.readText() } ?: ""
        conn.disconnect()
        promise.resolve(if (code == 200) body else null)
      } catch (e: Exception) { promise.resolve(null) }
    }.start()
  }

  @ReactMethod
  fun stopRecording(promise: Promise) {
    try {
      recording = false
      try { recordThread?.join(600) } catch (_: Exception) {}
      recordThread = null
      val ar = recorder; recorder = null
      try { ar?.stop() } catch (_: Exception) {}
      try { ar?.release() } catch (_: Exception) {}
      val out = pcm; pcm = null
      if (out == null) { promise.resolve(null); return }
      val data = synchronized(out) { out.toByteArray() }
      if (data.isEmpty()) { promise.resolve(null); return }
      val file = java.io.File(reactCtx.cacheDir, "walk_clip.wav")
      file.writeBytes(wavFromPcm(data, sampleRate))
      promise.resolve(file.absolutePath)
    } catch (e: Exception) { promise.reject("stop", e.message, e) }
  }

  private fun wavFromPcm(pcmData: ByteArray, rate: Int): ByteArray {
    val ch = 1; val bits = 16
    val byteRate = rate * ch * bits / 8
    val out = java.io.ByteArrayOutputStream()
    val dataLen = pcmData.size
    fun ascii(s: String) = out.write(s.toByteArray(Charsets.US_ASCII))
    fun i32(v: Int) { out.write(v and 0xff); out.write((v shr 8) and 0xff); out.write((v shr 16) and 0xff); out.write((v shr 24) and 0xff) }
    fun i16(v: Int) { out.write(v and 0xff); out.write((v shr 8) and 0xff) }
    ascii("RIFF"); i32(36 + dataLen); ascii("WAVE"); ascii("fmt "); i32(16); i16(1); i16(ch); i32(rate); i32(byteRate); i16(ch * bits / 8); i16(bits); ascii("data"); i32(dataLen); out.write(pcmData)
    return out.toByteArray()
  }

  // --- Native TTS oynatma (ekran-kapalı): /api/tts MP3'ünü MediaPlayer ile çalar. WebView ekran
  //     kapanınca askıya alınıp sussa da bu arka planda çalışır. Çerez CookieManager'dan alınır
  //     (WebView/RN ile paylaşımlı) → /api/tts kimlik doğrular. ---
  private var player: MediaPlayer? = null

  @ReactMethod
  fun playTtsUrl(url: String, promise: Promise) {
    Thread {
      var settled = false
      fun finishP(ok: Boolean) { synchronized(this) { if (!settled) { settled = true; promise.resolve(ok) } } }
      try {
        // Çerezi CookieManager'dan al (WebView/RN paylaşımlı) → /api/tts kimlik doğrular.
        val cookie = try { android.webkit.CookieManager.getInstance().getCookie(url) } catch (_: Exception) { null }
        val conn = java.net.URL(url).openConnection() as java.net.HttpURLConnection
        conn.connectTimeout = 8000; conn.readTimeout = 8000
        if (!cookie.isNullOrEmpty()) conn.setRequestProperty("Cookie", cookie)
        conn.setRequestProperty("accept", "audio/mpeg")
        val code = conn.responseCode
        if (code != 200) { android.util.Log.e("NomiWalk", "playTts HTTP $code (cookie=${!cookie.isNullOrEmpty()})"); conn.disconnect(); finishP(false); return@Thread }
        val file = java.io.File(reactCtx.cacheDir, "walk_tts.mp3")
        conn.inputStream.use { input -> file.outputStream().use { out -> input.copyTo(out) } }
        conn.disconnect()
        // Yerel dosyayı MediaPlayer ile çal (streaming'in OMX/codec sorunlarını atlar).
        UiThreadUtil.runOnUiThread {
          try {
            try { player?.release() } catch (_: Exception) {}
            val mp = MediaPlayer()
            player = mp
            mp.setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_MEDIA).setContentType(AudioAttributes.CONTENT_TYPE_SPEECH).build())
            mp.setDataSource(file.absolutePath)
            mp.setOnCompletionListener { try { it.release() } catch (_: Exception) {}; if (player === mp) player = null; finishP(true) }
            mp.setOnErrorListener { _, w, e -> android.util.Log.e("NomiWalk", "playTts MP err $w/$e"); try { mp.release() } catch (_: Exception) {}; if (player === mp) player = null; finishP(false); true }
            mp.prepare()
            mp.start()
          } catch (e: Exception) { android.util.Log.e("NomiWalk", "playTts MP ex ${e.message}"); finishP(false) }
        }
      } catch (e: Exception) { android.util.Log.e("NomiWalk", "playTts ex ${e.message}"); finishP(false) }
    }.start()
  }

  @ReactMethod
  fun stopTts() {
    try { player?.release() } catch (_: Exception) { /* yut */ }
    player = null
  }

  // --- Ekran-kapalı SFX: TON SENTEZİ (AudioTrack, ham PCM). MP3/SoundPool/react-native-sound
  //     arka planda codec/OMX yüzünden çalmıyor; ham PCM codec gerektirmez, kesin çalar. ---
  @ReactMethod
  fun playSfx(kind: String) {
    // Nota tablosu src/lib/sfxNotes.ts ile BİREBİR (tek kaynak orası; `python3 scripts/render-sfx.py --kotlin`
    // çıktısı). Nota: [freq, start, dur, peak, wave(0 sine,1 tri,2 square), glide(hedef Hz, 0 yok),
    // lp(alçak geçiren Hz, 0 yok), attack(sn), hold(0 pluck / 1 tut), release(sn)].
    val notes: List<DoubleArray> = when (kind) {
      "correct" -> listOf(
        doubleArrayOf(523.25, 0.0, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(523.25, 0.0, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(659.25, 0.08, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(659.25, 0.08, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.16, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.16, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.24, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.24, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
      )
      "wrong" -> listOf(
        doubleArrayOf(392.0, 0.0, 0.26, 0.22, 1.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(392.0, 0.0, 0.221, 0.12, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(311.13, 0.09, 0.26, 0.22, 1.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(311.13, 0.09, 0.221, 0.12, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(261.63, 0.18, 0.26, 0.22, 1.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(261.63, 0.18, 0.221, 0.12, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
      )
      "micon" -> listOf(
        doubleArrayOf(523.25, 0.0, 0.17, 0.05, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(523.25, 0.0, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.06, 0.17, 0.05, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.06, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
      )
      "micoff" -> listOf(
        doubleArrayOf(783.99, 0.0, 0.17, 0.05, 2.0, 0.0, 1800.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.0, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(523.25, 0.06, 0.17, 0.05, 2.0, 0.0, 1800.0, 0.004, 0.0, 0.0),
        doubleArrayOf(523.25, 0.06, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
      )
      "finish" -> listOf(
        doubleArrayOf(523.25, 0.0, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(523.25, 0.0, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(659.25, 0.075, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(659.25, 0.075, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.15, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(783.99, 0.15, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.225, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.225, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(698.46, 0.42, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(698.46, 0.42, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(880.0, 0.495, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(880.0, 0.495, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.57, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.57, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1396.91, 0.645, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1396.91, 0.645, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.92, 0.68, 0.05, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1046.5, 0.92, 0.8, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1318.51, 0.92, 0.68, 0.03, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0),
        doubleArrayOf(1318.51, 0.92, 0.8, 0.1, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0),
        doubleArrayOf(261.63, 0.92, 0.8, 0.07, 1.0, 0.0, 1400.0, 0.03, 1.0, 0.4),
        doubleArrayOf(392.0, 0.92, 0.8, 0.07, 1.0, 0.0, 1400.0, 0.03, 1.0, 0.4),
      )
      "tap" -> listOf(
        doubleArrayOf(1174.66, 0.0, 0.05, 0.06, 0.0, 0.0, 0.0, 0.008, 0.0, 0.0),
      )
      else -> listOf(doubleArrayOf(1174.66, 0.0, 0.05, 0.06, 0.0, 0.0, 0.0, 0.008, 0.0, 0.0))
    }
    playNotes(notes)
  }

  /** Köprünün (sfxNotes.ts) sentezini birebir: üstel zarf (0.0001→peak @attack; pluck: dur sonunda
   *  0.0001'e üstel iniş; hold: peak'te tut, son `release` saniyede in), sine/triangle/square, üstel
   *  glide, RBJ alçak geçiren (Q 0.707 ≈ WebAudio lowpass Q 0.7), 0.8 master (SFX_MASTER).
   *  AudioTrack MODE_STREAM + USAGE_MEDIA (arka planda çalar). */
  private fun playNotes(notes: List<DoubleArray>) {
    Thread {
      try {
        val rate = 44100
        val master = 0.8
        val floor = 0.0001
        val total = notes.maxOf { it[1] + it[2] } + 0.06
        val n = (total * rate).toInt().coerceAtLeast(1)
        val mix = DoubleArray(n)
        for (nt in notes) {
          val freq = nt[0]; val start = nt[1]; val dur = nt[2]; val peak = nt[3]; val wave = nt[4].toInt()
          val to = nt[5]; val lp = nt[6]; val attack = if (nt[7] > 0) nt[7] else 0.004; val hold = nt[8] >= 0.5; val release = nt[9]
          val s0 = (start * rate).toInt()
          val len = (dur * rate).toInt()
          val raw = DoubleArray(len)
          var phase = 0.0
          for (i in 0 until len) {
            val t = i.toDouble() / rate
            val f = if (to > 0) freq * Math.pow(to / freq, t / dur) else freq
            phase += 2 * Math.PI * f / rate
            raw[i] = when (wave) {
              1 -> { val p = (phase / (2 * Math.PI)) % 1.0; 2 * Math.abs(2 * p - 1) - 1 }
              2 -> if (Math.sin(phase) >= 0) 1.0 else -1.0
              else -> Math.sin(phase)
            }
          }
          if (lp > 0) lowpass(raw, lp, rate)
          for (i in 0 until len) {
            val t = i.toDouble() / rate
            val env = if (t < attack) floor * Math.pow(peak / floor, t / attack)
              else if (hold) { val rs = dur - release; if (t < rs) peak else peak * Math.pow(floor / peak, (t - rs) / release) }
              else peak * Math.pow(floor / peak, (t - attack) / (dur - attack))
            val idx = s0 + i
            if (idx in 0 until n) mix[idx] += raw[i] * env * master
          }
        }
        val buf = ShortArray(n)
        for (i in 0 until n) buf[i] = (mix[i].coerceIn(-1.0, 1.0) * 32767).toInt().toShort()
        val minBuf = AudioTrack.getMinBufferSize(rate, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT)
        val at = AudioTrack.Builder()
          .setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_MEDIA).setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build())
          .setAudioFormat(AudioFormat.Builder().setSampleRate(rate).setChannelMask(AudioFormat.CHANNEL_OUT_MONO).setEncoding(AudioFormat.ENCODING_PCM_16BIT).build())
          .setBufferSizeInBytes(Math.max(minBuf, n * 2))
          .setTransferMode(AudioTrack.MODE_STREAM)
          .build()
        at.play()
        at.write(buf, 0, n)
        Thread.sleep((total * 1000).toLong() + 140)
        try { at.stop() } catch (_: Exception) {}
        at.release()
      } catch (e: Exception) { android.util.Log.e("NomiWalk", "playNotes ex ${e.message}") }
    }.start()
  }

  /** RBJ 2. derece alçak geçiren (yerinde), Q 0.707 — köprüdeki BiquadFilter lowpass'ın karşılığı. */
  private fun lowpass(x: DoubleArray, fc: Double, rate: Int) {
    val q = 0.7071
    val w0 = 2 * Math.PI * fc / rate
    val alpha = Math.sin(w0) / (2 * q)
    val cw = Math.cos(w0)
    val a0 = 1 + alpha
    val b0 = (1 - cw) / 2 / a0; val b1 = (1 - cw) / a0; val b2 = (1 - cw) / 2 / a0
    val a1 = -2 * cw / a0; val a2 = (1 - alpha) / a0
    var x1 = 0.0; var x2 = 0.0; var y1 = 0.0; var y2 = 0.0
    for (i in x.indices) {
      val v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
      x2 = x1; x1 = x[i]
      y2 = y1; y1 = v
      x[i] = v
    }
  }

  /** Arka planda da çalışan gecikme. RN'in setTimeout'u app arka plana geçince DURUYOR; native
   *  Handler (süreç foreground-service ile canlı olduğundan) durmaz — ekran-kapalı döngü için şart. */
  @ReactMethod
  fun delay(ms: Double, promise: Promise) {
    try {
      android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({ promise.resolve(true) }, ms.toLong())
    } catch (e: Exception) { promise.resolve(true) }
  }

  // --- Ekran-kapalı yürüyüş: foreground service (arka planda mic açık) + ekran on/off algılama ---
  private var screenReceiver: BroadcastReceiver? = null

  /** Mikrofonlu foreground service'i başlat — güç tuşuyla ekran kapansa da mic açık kalsın. */
  @ReactMethod
  fun startWalkService() {
    try {
      val i = Intent(reactCtx, NomiWalkService::class.java)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) reactCtx.startForegroundService(i) else reactCtx.startService(i)
    } catch (e: Exception) { android.util.Log.e("NomiWalk", "startWalkService HATA: ${e.message}", e) }
  }

  @ReactMethod
  fun stopWalkService() {
    try { reactCtx.stopService(Intent(reactCtx, NomiWalkService::class.java)) } catch (_: Exception) { /* yut */ }
  }

  /** Ekran güç tuşuyla kapandı/açıldı olaylarını JS'e yay (NomiScreenOff / NomiScreenOn). */
  @ReactMethod
  fun startScreenWatch() {
    if (screenReceiver != null) return
    val r = object : BroadcastReceiver() {
      override fun onReceive(context: Context?, intent: Intent?) {
        when (intent?.action) {
          Intent.ACTION_SCREEN_OFF -> emit("NomiScreenOff", null)
          Intent.ACTION_SCREEN_ON -> emit("NomiScreenOn", null)
        }
      }
    }
    val filter = IntentFilter().apply {
      addAction(Intent.ACTION_SCREEN_OFF)
      addAction(Intent.ACTION_SCREEN_ON)
    }
    try { reactCtx.registerReceiver(r, filter); screenReceiver = r } catch (_: Exception) { /* yut */ }
  }

  @ReactMethod
  fun stopScreenWatch() {
    screenReceiver?.let { try { reactCtx.unregisterReceiver(it) } catch (_: Exception) { /* yut */ } }
    screenReceiver = null
  }

  @ReactMethod
  fun start(locale: String, promise: Promise) {
    UiThreadUtil.runOnUiThread {
      try {
        // Her kelimede TAZE recognizer (yeniden kullanım ikinci kelimede mic'i
        // hiç açmıyordu). Önce eskiyi tamamen yok et.
        destroyRecognizer()
        if (!SpeechRecognizer.isRecognitionAvailable(reactCtx)) {
          promise.reject("unavailable", "Cihazda konuşma tanıma servisi yok")
          return@runOnUiThread
        }
        val sr = SpeechRecognizer.createSpeechRecognizer(reactCtx)
        sr.setRecognitionListener(this)
        recognizer = sr
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
          // WEB_SEARCH kısa sorgular için ayarlı — tek/kısa kelimeyi (er/es/zu) FREE_FORM'dan
          // (dikte) daha iyi çözüyor; yürüyüşün cevapları zaten tek kelime.
          putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_WEB_SEARCH)
          putExtra(RecognizerIntent.EXTRA_LANGUAGE, locale)
          putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, locale)
          putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, false)
          putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
          putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5)
          putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, reactCtx.packageName)
          // Konuşma sonrası ~1200ms sessizlik bekle: kısa kelimeyi (içindeki mikro-duraklama
          // dahil, ör. "dann") tam yakalayıp erken kesip no_match dememesi için. 500ms motoru
          // 8sn takmıştı; 1200 güvenli aralık (1800 çalışıyordu). JS'te 1200ms quiet-timer + 8sn
          // pencere yine de takılmaya karşı emniyet.
          putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 1200L)
          putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 1200L)
        }
        sr.startListening(intent)
        promise.resolve(true)
      } catch (e: Exception) {
        promise.reject("start_failed", e.message, e)
      }
    }
  }

  @ReactMethod
  fun stop() {
    UiThreadUtil.runOnUiThread {
      try { recognizer?.stopListening() } catch (_: Exception) { /* yut */ }
    }
  }

  @ReactMethod
  fun cancel() {
    UiThreadUtil.runOnUiThread {
      try { recognizer?.cancel() } catch (_: Exception) { /* yut */ }
    }
  }

  @ReactMethod
  fun destroy() {
    UiThreadUtil.runOnUiThread { destroyRecognizer() }
  }

  private fun destroyRecognizer() {
    try {
      recognizer?.setRecognitionListener(null)
      recognizer?.cancel()
      recognizer?.destroy()
    } catch (_: Exception) { /* yut */ }
    recognizer = null
  }

  // NativeEventEmitter (JS) bu ikisini bekler; olmayınca uyarı basar. No-op yeterli.
  @ReactMethod fun addListener(eventName: String) {}
  @ReactMethod fun removeListeners(count: Int) {}

  // ---- RecognitionListener ----
  override fun onReadyForSpeech(params: Bundle?) { emit("NomiSpeechReady", null) }
  override fun onBeginningOfSpeech() { emit("NomiSpeechBegin", null) }
  override fun onRmsChanged(rmsdB: Float) { /* gürültü akışı: köprü trafiği için yollanmıyor */ }
  override fun onBufferReceived(buffer: ByteArray?) {}
  override fun onEndOfSpeech() { emit("NomiSpeechEnd", null) }

  override fun onError(error: Int) {
    val m = Arguments.createMap()
    m.putString("code", errorCode(error))
    emit("NomiSpeechError", m)
  }

  override fun onResults(results: Bundle?) {
    emitValues("NomiSpeechResults", results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION))
  }

  override fun onPartialResults(partialResults: Bundle?) {
    emitValues("NomiSpeechPartial", partialResults?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION))
  }

  override fun onEvent(eventType: Int, params: Bundle?) {}

  private fun errorCode(error: Int): String = when (error) {
    SpeechRecognizer.ERROR_AUDIO -> "audio"
    SpeechRecognizer.ERROR_CLIENT -> "client"
    SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "permissions"
    SpeechRecognizer.ERROR_NETWORK -> "network"
    SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "network_timeout"
    SpeechRecognizer.ERROR_NO_MATCH -> "no_match"
    SpeechRecognizer.ERROR_RECOGNIZER_BUSY -> "busy"
    SpeechRecognizer.ERROR_SERVER -> "server"
    SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "speech_timeout"
    else -> "unknown"
  }

  override fun invalidate() {
    UiThreadUtil.runOnUiThread { destroyRecognizer() }
    super.invalidate()
  }
}
