package com.lernomi.speech

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.pm.PackageManager
import android.content.Intent
import android.content.pm.ServiceInfo
import android.graphics.Bitmap
import android.graphics.Canvas
import android.os.Build
import android.os.IBinder
import android.support.v4.media.MediaMetadataCompat
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import androidx.media.app.NotificationCompat.MediaStyle
import com.lernomi.R

/**
 * Yürüyüş "ekran kapalı" modu için MİKROFONLU foreground service.
 *
 * Android 9+ arka planda (ekran güç tuşuyla kapalıyken) mikrofon erişimini yalnız
 * foreground service + mikrofon tipiyle açık tutar. Bu service çalışırken AudioRecord
 * arka planda da kayıt alabilir (Azure yolu). Kalıcı bildirim zorunlu.
 *
 * KİLİT EKRANI OYNATICISI (2026-10-02): bildirim eskiden düz bir IMPORTANCE_LOW bildirimiydi.
 * Android 12+ "sessiz bildirimleri kilit ekranında gizle" varsayılanıyla onu kilit ekranında
 * hiç göstermiyordu (Samet'in cihazı). Yerleşik yol: MediaSession + MediaStyle bildirim —
 * sistem medya denetimi olarak kilit ekranında ve bildirim panelinin üstünde çiziliyor;
 * başlık/alt metin turun ilerlemesini (JS `setWalkNowPlaying`), düğme turu durduruyor,
 * kulaklık düğmesi de aynı yere düşüyor. iOS'taki Now Playing kaydının karşılığı.
 */
class LernomiWalkService : Service() {
  companion object {
    const val ACTION_STOP = "com.lernomi.walk.STOP"
    private const val CHANNEL_ID = "nomi_walk_player"
    /** Bildirimdeki "Durdur" → JS'e haber (LernomiSpeechModule kurar). Servisin JS'e tek yolu. */
    @Volatile var onStop: (() -> Unit)? = null

    /**
     * startForeground BAŞARISIZ olduysa JS'e haber (LernomiSpeechModule kurar).
     *
     * Eskiden yalnız logcat'e yazılıyordu: servis ölüyor ama tur devam ediyordu ve
     * kullanıcı ekranı kapattığında mikrofon sessizce kesiliyordu. Play'in ön plan
     * servisi kuralının karşılığı da bu — servis yoksa arka planda kayıt zaten
     * yapılmamalı, dolayısıyla kullanıcı bunu ÖNCEDEN bilmeli.
     */
    @Volatile var onStartFailed: ((String) -> Unit)? = null

    private const val NOTIF_ID = 7
    private const val CUSTOM_STOP = "lernomi.walk.stop"

    /** JS'ten gelen metin (uygulama dilinde). Boşsa kaynak dosyasındaki varsayılan. */
    @Volatile private var npTitle: String? = null
    @Volatile private var npSubtitle: String? = null
    @Volatile private var instance: LernomiWalkService? = null

    /** Kilit ekranı/bildirim metnini günceller; servis henüz kalkmadıysa ilk çizimde kullanılır. */
    fun updateNowPlaying(title: String, subtitle: String) {
      npTitle = title.ifBlank { null }
      npSubtitle = subtitle.ifBlank { null }
      instance?.let { svc -> svc.mainExecutorCompat { svc.refresh() } }
    }

    /** Servisin yeni bir turda eski turun metnini göstermemesi için. */
    fun clearNowPlaying() {
      npTitle = null
      npSubtitle = null
    }
  }

  private var session: MediaSessionCompat? = null
  private var started = false

  private fun mainExecutorCompat(block: () -> Unit) {
    android.os.Handler(mainLooper).post(block)
  }

  private fun title() = npTitle ?: getString(R.string.walk_notification_title)
  private fun subtitle() = npSubtitle ?: getString(R.string.walk_notification_text)

  /** Uygulama ikonu (uyarlanabilir ikon da olabilir) → kilit ekranı görseli. */
  private val artwork: Bitmap? by lazy {
    try {
      val d = ContextCompat.getDrawable(this, R.mipmap.ic_launcher) ?: return@lazy null
      val bmp = Bitmap.createBitmap(256, 256, Bitmap.Config.ARGB_8888)
      val c = Canvas(bmp)
      d.setBounds(0, 0, 256, 256)
      d.draw(c)
      bmp
    } catch (_: Exception) { null }
  }

  /** Kullanıcı durdurdu (bildirim, kilit ekranı, kulaklık): JS oturumu kapatır, servis kendini bitirir. */
  private fun userStop() {
    try { onStop?.invoke() } catch (_: Exception) { /* yut */ }
    stopForeground(STOP_FOREGROUND_REMOVE)
    stopSelf()
  }

  private fun ensureSession(): MediaSessionCompat {
    session?.let { return it }
    val s = MediaSessionCompat(this, "LernomiWalk").apply {
      setCallback(object : MediaSessionCompat.Callback() {
        override fun onPause() = userStop()
        override fun onStop() = userStop()
        override fun onPlay() = userStop() // aç/kapa düğmesi: "devam ettir" diye bir durum yok
        override fun onCustomAction(action: String?, extras: android.os.Bundle?) {
          if (action == CUSTOM_STOP) userStop()
        }
      })
      // Canlı tur: süre ve konum yok; yalnız durdurma.
      setPlaybackState(
        PlaybackStateCompat.Builder()
          .setActions(PlaybackStateCompat.ACTION_STOP or PlaybackStateCompat.ACTION_PAUSE or PlaybackStateCompat.ACTION_PLAY_PAUSE)
          .addCustomAction(
            PlaybackStateCompat.CustomAction.Builder(CUSTOM_STOP, getString(R.string.walk_stop), R.drawable.ic_walk_stop).build(),
          )
          .setState(PlaybackStateCompat.STATE_PLAYING, PlaybackStateCompat.PLAYBACK_POSITION_UNKNOWN, 1f)
          .build(),
      )
      isActive = true
    }
    session = s
    return s
  }

  private fun buildNotification(chId: String): Notification {
    val s = ensureSession()
    s.setMetadata(
      MediaMetadataCompat.Builder()
        .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title())
        .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, subtitle())
        .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, "Lernomi")
        .apply { artwork?.let { putBitmap(MediaMetadataCompat.METADATA_KEY_ART, it) } }
        .build(),
    )
    // Bildirime dokununca uygulamaya (yürüyüş ekranına) dön.
    val launch = packageManager.getLaunchIntentForPackage(packageName)?.apply {
      addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP)
    }
    val content = launch?.let {
      PendingIntent.getActivity(this, 0, it, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    }
    s.setSessionActivity(content)
    val stop = PendingIntent.getService(
      this, 1, Intent(this, LernomiWalkService::class.java).setAction(ACTION_STOP),
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
    )
    return NotificationCompat.Builder(this, chId)
      .setContentTitle(title())
      // Metin: ilerleme + açıklama. Android 13 öncesi bildirim gövdesinde, sonrası
      // medya denetiminin alt satırında (session metadata) görünüyor.
      .setContentText(subtitle())
      .setSubText(getString(R.string.walk_notification_title))
      .setLargeIcon(artwork)
      .setSmallIcon(R.drawable.ic_notification)
      .setColor(ContextCompat.getColor(this, R.color.notification_accent))
      .setContentIntent(content)
      .setDeleteIntent(stop)
      .addAction(R.drawable.ic_walk_stop, getString(R.string.walk_stop), stop)
      .setStyle(
        MediaStyle()
          .setMediaSession(s.sessionToken)
          .setShowActionsInCompactView(0)
          // Android 5–6: kaydırarak kapatılabilen eski medya bildiriminde "x" de durdurur.
          .setShowCancelButton(true)
          .setCancelButtonIntent(stop),
      )
      .setOngoing(true)
      .setOnlyAlertOnce(true)
      .setSilent(true)
      .setCategory(NotificationCompat.CATEGORY_TRANSPORT)
      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
      // Bildirim HEMEN çizilsin. Varsayılan davranış onu 10 saniye geciktiriyor;
      // kısa bir turda kullanıcı mikrofonun açık olduğunu ancak iş bittikten sonra
      // görüyordu. Kaydın sürdüğünün görünür olması hem Play kuralı hem de
      // inceleyicinin ilk sorusu.
      .setForegroundServiceBehavior(NotificationCompat.FOREGROUND_SERVICE_IMMEDIATE)
      .build()
  }

  /** Metin değişti: bildirimi ve kilit ekranı kaydını yerinde güncelle. main thread. */
  private fun refresh() {
    if (!started) return
    val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    try { nm.notify(NOTIF_ID, buildNotification(CHANNEL_ID)) } catch (_: Exception) { /* bildirim izni yoksa yut */ }
  }

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action == ACTION_STOP) {
      userStop()
      return START_NOT_STICKY
    }
    instance = this
    val chId = CHANNEL_ID
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      // Eski kanal (nomi_walk, IMPORTANCE_LOW) kilit ekranında gizleniyordu; kanal önemi
      // oluşturulduktan sonra koddan değişmiyor, bu yüzden yeni kimlik + eskisini sil.
      nm.deleteNotificationChannel("nomi_walk")
      if (nm.getNotificationChannel(chId) == null) {
        nm.createNotificationChannel(
          NotificationChannel(chId, getString(R.string.walk_channel_name), NotificationManager.IMPORTANCE_DEFAULT).apply {
            // Ayarlar'daki kanal listesinde ne olduğu yazsın: kullanıcı bildirimi
            // kapatmadan önce neyi kapattığını görmeli (Play FGS beklentisi).
            description = getString(R.string.walk_channel_description)
            setShowBadge(false)
            // DEFAULT önem kilit ekranında görünmek için; ses ve titreşim yok (efektler
            // uygulamanın kendi sesleri, bildirim sesi tura karışmasın).
            setSound(null, null)
            enableVibration(false)
            // Kilit ekranında GÖRÜNSÜN: yürüyüş modunun tek kullanım biçimi ekran
            // kapalı; gizlenirse kullanıcı mikrofonun açık olduğunu göremez.
            lockscreenVisibility = Notification.VISIBILITY_PUBLIC
          },
        )
      }
    }
    val notif: Notification = buildNotification(chId)
    // Mikrofon izni OLMADAN startForeground(type=microphone) Android 14+'ta
    // SecurityException fırlatıyor. İzin normalde tur başlamadan alınıyor (JS
    // ensureMicPermission); kullanıcı Ayarlar'dan geri aldıysa burada yakalanır.
    val micGranted = checkSelfPermission(android.Manifest.permission.RECORD_AUDIO) ==
      PackageManager.PERMISSION_GRANTED
    if (!micGranted) {
      fail("permission")
      return START_NOT_STICKY
    }
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        startForeground(NOTIF_ID, notif, ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE)
      } else {
        startForeground(NOTIF_ID, notif)
      }
      started = true
    } catch (e: SecurityException) {
      // Tip için gereken izin yok ya da geri alınmış (Android 14+).
      android.util.Log.e("LernomiWalk", "startForeground izin HATASI: ${e.message}", e)
      fail("permission")
      return START_NOT_STICKY
    } catch (e: Exception) {
      // Android 12+: uygulama arka plandayken ön plan servisi başlatılamaz
      // (ForegroundServiceStartNotAllowedException). Sınıf adına göre ayrıştırmak
      // API 31 altında derlemeyi bozmadan aynı şeyi söylüyor.
      val reason = if (e.javaClass.simpleName.contains("ForegroundServiceStartNotAllowed")) "background" else "unknown"
      android.util.Log.e("LernomiWalk", "startForeground HATA: ${e.message}", e)
      fail(reason)
      return START_NOT_STICKY
    }
    // NOT_STICKY: süreç ölürse mikrofon servisi kullanıcı olmadan yeniden başlamaz (Play FGS
    // kuralı: kullanıcının başlattığı, fark edip durdurabildiği kayıt).
    return START_NOT_STICKY
  }

  /** Servis kalkamadı: JS'e sebebi bildir ve kendini topla — yarım bir servis bırakma. */
  private fun fail(reason: String) {
    try { onStartFailed?.invoke(reason) } catch (_: Exception) { /* yut */ }
    stopForeground(STOP_FOREGROUND_REMOVE)
    stopSelf()
  }

  override fun onDestroy() {
    onStop = null
    onStartFailed = null
    instance = null
    started = false
    session?.run { isActive = false; release() }
    session = null
    clearNowPlaying()
    super.onDestroy()
  }
}
