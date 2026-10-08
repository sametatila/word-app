package com.lernomi.speech

/**
 * Yürüyüş modu, ekran kapalı dinleme: cihazda konuşma algılama (VAD).
 *
 * REFERANSIN BİREBİR KOPYASI: `scripts/lib/walk-vad.ts` (web deposu). iOS kopyası
 * `ios/Lernomi/WalkVad.swift`. Sabitler `npm run check:parity` ile, davranış
 * `scripts/walk-vad-native-parity.ts` ile (aynı sahnelerde üç kopya aynı kararı veriyor mu)
 * denetleniyor; birini değiştiren üçünü birden değiştirir. Algoritmanın gerekçesi ve ölçüm
 * `docs/plan/walk-stt.md` "Cihazda konuşma algılama".
 *
 * Android bağımlılığı yok (JVM'de derlenip sınanabiliyor). 16 kHz mono 16 bit örnekler,
 * 20 ms'lik dilimler (`frame` örnek); `push` true dönünce kayıt durur, `result` dolu.
 */
class WalkVad {
  companion object {
    const val RATE = 16000
    const val FRAME_MS = 20
    const val SKIP_MS = 300
    const val HPF_HZ = 300.0
    const val ONSET_DB = 10.0
    const val HOLD_DB = 6.0
    const val ONSET_FRAMES = 3
    const val ONSET_VOICED = 2
    const val VOICED_R = 0.5
    const val VOICED_BRIDGE_MS = 300
    const val MIN_F0 = 80
    const val MAX_F0 = 400
    const val MIN_DBFS = -55.0
    const val FLOOR_CAP_DBFS = -45.0
    const val FLOOR_RISE = 0.02
    const val END_SILENCE_MS = 650
    const val MAX_SPEECH_MS = 4000
    const val MAX_WAIT_MS = 5000
    const val PRE_ROLL_MS = 500
    const val TAIL_MS = 500
    const val FALLBACK_DB = 6.0
    const val FALLBACK_BEFORE_MS = 500
    const val FALLBACK_AFTER_MS = 1000
  }

  /** kind: "speech" | "fallback" | "none". start/end: gönderilecek parça [start, end), stop: kaydın durduğu örnek. */
  data class Result(val kind: String, val start: Int, val end: Int, val stop: Int)

  val frame: Int = Math.round(RATE * FRAME_MS / 1000.0).toInt()
  private var x1 = 0.0
  private var x2 = 0.0
  private var y1 = 0.0
  private var y2 = 0.0
  private val b0: Double
  private val b1: Double
  private val b2: Double
  private val a1: Double
  private val a2: Double
  /** Önceki + bu dilimin ön vurgulu, filtreli örnekleri (seslilik penceresi). */
  private val win = DoubleArray(frame * 2)
  private val sq = DoubleArray(frame * 2 + 1)
  private var pe = 0.0
  private var i = 0
  private var floor = Double.NaN
  private var state = 0 // 0 wait, 1 speech, 2 done
  private var run = 0
  private var runStart = 0
  private var runVoiced = 0
  private var onset = -1
  private var lastVoiced = -1
  private var lastPeriodic = -1
  private var softStart = -1
  private var peakOver = Double.NEGATIVE_INFINITY
  private var peakAt = -1
  var result: Result? = null
    private set

  init {
    // RBJ yüksek geçiren, Q = 1/√2 (a0'a bölünmüş)
    val w0 = 2 * Math.PI * HPF_HZ / RATE
    val alpha = Math.sin(w0) / (2 * Math.sqrt(0.5))
    val cos = Math.cos(w0)
    val a0 = 1 + alpha
    b0 = (1 + cos) / 2 / a0
    b1 = -(1 + cos) / a0
    b2 = (1 + cos) / 2 / a0
    a1 = (-2 * cos) / a0
    a2 = (1 - alpha) / a0
  }

  private fun ms(frames: Int): Int = frames * FRAME_MS
  private fun sample(frameIdx: Int): Int = frameIdx * frame

  /** Bir dilim: `x[off until off + frame]`. true: kayıt bitti, `result` dolu. */
  fun push(x: ShortArray, off: Int = 0): Boolean {
    if (state == 2) return true
    var sum = 0.0
    val n = frame
    System.arraycopy(win, n, win, 0, n)
    for (k in 0 until n) {
      val xk = x[off + k].toDouble()
      val y = b0 * xk + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
      x2 = x1; x1 = xk; y2 = y1; y1 = y
      sum += y * y
      win[n + k] = y - 0.9 * pe
      pe = y
    }
    val e = 10 * Math.log10(sum / n / (32768.0 * 32768.0) + 1e-12)
    val i = this.i++
    if (ms(i + 1) <= SKIP_MS) return false
    if (floor.isNaN()) floor = Math.min(e, FLOOR_CAP_DBFS)
    val above = e > floor + HOLD_DB
    if (!above) softStart = -1
    else if (softStart < 0) softStart = i
    val voiced = above && periodicity() >= VOICED_R
    if (voiced) lastPeriodic = i

    if (state == 0) {
      if (e > Math.max(floor + ONSET_DB, MIN_DBFS)) {
        if (run == 0) { runStart = i; runVoiced = 0 }
        run++
        if (voiced) runVoiced++
        if (run >= ONSET_FRAMES && runVoiced >= ONSET_VOICED) {
          state = 1
          // Başlangıç, eşiğe yetişmeyen yumuşak girişe kadar geri alınır ("sich", "f…").
          onset = if (softStart >= 0) Math.min(runStart, softStart) else runStart
          lastVoiced = i
        }
      } else {
        run = 0
        floor = if (e < floor) e else floor + (e - floor) * FLOOR_RISE
      }
      if (state == 0) {
        val over = e - floor
        if (voiced && over > peakOver) { peakOver = over; peakAt = i }
        if (ms(i + 1) >= MAX_WAIT_MS) return finishWait(i)
        return false
      }
    }
    // speech
    if (e > floor + HOLD_DB && (voiced || ms(i - lastPeriodic) <= VOICED_BRIDGE_MS)) lastVoiced = i
    val silentMs = ms(i - lastVoiced)
    if (silentMs >= END_SILENCE_MS || ms(i + 1 - onset) >= MAX_SPEECH_MS) {
      val stop = sample(i + 1)
      val start = Math.max(0, sample(onset) - RATE * PRE_ROLL_MS / 1000)
      val end = Math.min(stop, sample(lastVoiced + 1) + RATE * TAIL_MS / 1000)
      result = Result("speech", start, end, stop)
      state = 2
      return true
    }
    return false
  }

  /** Pencerede (80–400 Hz gecikme) en yüksek normalize öz-ilinti, 0–1. */
  private fun periodicity(): Double {
    val w = win
    val len = w.size
    for (k in 0 until len) sq[k + 1] = sq[k] + w[k] * w[k]
    val minLag = Math.floor(RATE.toDouble() / MAX_F0).toInt()
    val maxLag = Math.ceil(RATE.toDouble() / MIN_F0).toInt()
    var best = 0.0
    var lag = minLag
    while (lag <= maxLag && lag < len - 32) {
      var num = 0.0
      var k = 0
      while (k + lag < len) { num += w[k] * w[k + lag]; k++ }
      val e0 = sq[len - lag]
      val e1 = sq[len] - sq[lag]
      if (e0 > 0 && e1 > 0) {
        val r = num / Math.sqrt(e0 * e1)
        if (r > best) best = r
      }
      lag++
    }
    return best
  }

  private fun finishWait(i: Int): Boolean {
    val stop = sample(i + 1)
    result = if (peakOver >= FALLBACK_DB && peakAt >= 0) {
      val at = sample(peakAt)
      Result("fallback", Math.max(0, at - RATE * FALLBACK_BEFORE_MS / 1000), Math.min(stop, at + RATE * FALLBACK_AFTER_MS / 1000), stop)
    } else {
      Result("none", 0, 0, stop)
    }
    state = 2
    return true
  }
}
