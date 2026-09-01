package com.nomi.speech

import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
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

  @ReactMethod
  fun isAvailable(promise: Promise) {
    try {
      promise.resolve(SpeechRecognizer.isRecognitionAvailable(reactCtx))
    } catch (_: Exception) {
      promise.resolve(false)
    }
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
          putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
          putExtra(RecognizerIntent.EXTRA_LANGUAGE, locale)
          putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, locale)
          putExtra(RecognizerIntent.EXTRA_ONLY_RETURN_LANGUAGE_PREFERENCE, false)
          putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
          putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5)
          putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, reactCtx.packageName)
          // Erken kapanmayı geciktiren ipuçları (motor destekliyorsa): en az kayıt
          // süresi + konuşma sonrası beklenecek sessizlik. Google bazılarını yok
          // sayabilir; yine de destekleyen motorlarda mikrofon yeterince açık kalır.
          putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 4000L)
          putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 1800L)
          putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 1800L)
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
