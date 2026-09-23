package com.lernomi.integrity

import android.util.Base64
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.play.core.integrity.IntegrityManagerFactory
import com.google.android.play.core.integrity.StandardIntegrityException
import com.google.android.play.core.integrity.StandardIntegrityManager.PrepareIntegrityTokenRequest
import com.google.android.play.core.integrity.StandardIntegrityManager.StandardIntegrityTokenProvider
import com.google.android.play.core.integrity.StandardIntegrityManager.StandardIntegrityTokenRequest
import com.google.android.play.core.integrity.model.StandardIntegrityErrorCode
import java.security.MessageDigest
import java.security.SecureRandom

/**
 * Play Integrity — STANDART İSTEK, misafir açılışı için (sunucu lib/auth/play-integrity).
 *
 * İki adım: [prepare] belge sağlayıcısını önceden hazırlar (ilk sefer birkaç saniye
 * sürebilir; giriş ekranı açılınca çağrılıyor), [requestGuestToken] hazır sağlayıcıdan
 * tek bir isteğe bağlı belge alır. Sağlayıcı süreç boyunca saklanıyor; Google onu
 * geçersiz sayarsa (INTEGRITY_TOKEN_PROVIDER_INVALID) bir kez yeniden hazırlanıyor.
 *
 * `requestHash`: her çağrıda rastgele 32 baytlık nonce, özet
 * base64url(sha256("lernomi/guest-sign-in/v1:" + nonce)). JS'e belge VE nonce dönüyor;
 * sunucu özeti kendisi hesaplayıp belgedekiyle karşılaştırıyor. Önek sunucudaki
 * GUEST_REQUEST_HASH_PREFIX ile AYNI olmak zorunda.
 *
 * Hata kodu JS'e sayı olarak (ör. "-1" API_NOT_AVAILABLE, "-2" PLAY_STORE_NOT_FOUND)
 * iniyor ve sunucuya ölçüm için gidiyor. Misafir açılışı hiçbir hatada durmuyor.
 */
class LernomiIntegrityModule(reactCtx: ReactApplicationContext) : ReactContextBaseJavaModule(reactCtx) {

  override fun getName() = "LernomiIntegrity"

  private val manager by lazy { IntegrityManagerFactory.createStandard(reactApplicationContext) }

  private val lock = Any()
  private var provider: StandardIntegrityTokenProvider? = null
  private var providerProject = 0L
  /** Hazırlık sürerken gelen istekler aynı hazırlığı bekliyor. */
  private val waiting = mutableListOf<(StandardIntegrityTokenProvider?, Exception?) -> Unit>()
  private var preparing = false

  private fun withProvider(project: Long, fresh: Boolean, done: (StandardIntegrityTokenProvider?, Exception?) -> Unit) {
    synchronized(lock) {
      if (fresh) provider = null
      val ready = provider
      if (ready != null && providerProject == project) {
        done(ready, null)
        return
      }
      waiting.add(done)
      if (preparing) return
      preparing = true
    }
    val finish = { p: StandardIntegrityTokenProvider?, e: Exception? ->
      val callbacks: List<(StandardIntegrityTokenProvider?, Exception?) -> Unit>
      synchronized(lock) {
        if (p != null) {
          provider = p
          providerProject = project
        }
        preparing = false
        callbacks = waiting.toList()
        waiting.clear()
      }
      callbacks.forEach { it(p, e) }
    }
    try {
      manager
        .prepareIntegrityToken(PrepareIntegrityTokenRequest.builder().setCloudProjectNumber(project).build())
        .addOnSuccessListener { finish(it, null) }
        .addOnFailureListener { finish(null, it) }
    } catch (e: Exception) {
      finish(null, e)
    }
  }

  private fun codeOf(e: Exception?): String =
    (e as? StandardIntegrityException)?.errorCode?.toString() ?: "native"

  private fun projectOf(raw: String, promise: Promise): Long? {
    val n = raw.toLongOrNull()
    if (n == null || n <= 0) promise.reject("bad_project", "cloud project number")
    return n
  }

  @ReactMethod
  fun prepare(projectNumber: String, promise: Promise) {
    val project = projectOf(projectNumber, promise) ?: return
    withProvider(project, false) { p, e ->
      if (p != null) promise.resolve(true) else promise.reject(codeOf(e), e?.message ?: "prepare failed")
    }
  }

  @ReactMethod
  fun requestGuestToken(projectNumber: String, promise: Promise) {
    val project = projectOf(projectNumber, promise) ?: return
    val bytes = ByteArray(32).also { SecureRandom().nextBytes(it) }
    val flags = Base64.URL_SAFE or Base64.NO_PADDING or Base64.NO_WRAP
    val nonce = Base64.encodeToString(bytes, flags)
    val digest = MessageDigest.getInstance("SHA-256").digest((HASH_PREFIX + nonce).toByteArray(Charsets.UTF_8))
    val requestHash = Base64.encodeToString(digest, flags)
    request(project, requestHash, nonce, promise, retried = false)
  }

  private fun request(project: Long, requestHash: String, nonce: String, promise: Promise, retried: Boolean) {
    withProvider(project, retried) { p, e ->
      if (p == null) {
        promise.reject(codeOf(e), e?.message ?: "prepare failed")
        return@withProvider
      }
      try {
        p.request(StandardIntegrityTokenRequest.builder().setRequestHash(requestHash).build())
          .addOnSuccessListener { t ->
            val out = Arguments.createMap()
            out.putString("token", t.token())
            out.putString("nonce", nonce)
            promise.resolve(out)
          }
          .addOnFailureListener { err ->
            val invalid = (err as? StandardIntegrityException)?.errorCode == StandardIntegrityErrorCode.INTEGRITY_TOKEN_PROVIDER_INVALID
            if (invalid && !retried) request(project, requestHash, nonce, promise, retried = true)
            else promise.reject(codeOf(err), err.message ?: "request failed")
          }
      } catch (err: Exception) {
        promise.reject(codeOf(err), err.message ?: "request failed")
      }
    }
  }

  companion object {
    /** Sunucu lib/auth/play-integrity GUEST_REQUEST_HASH_PREFIX ile aynı. */
    const val HASH_PREFIX = "lernomi/guest-sign-in/v1:"
  }
}
