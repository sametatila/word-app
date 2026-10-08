import Foundation

/**
 * Yürüyüş modu, ekran kapalı dinleme: cihazda konuşma algılama (VAD).
 *
 * REFERANSIN BİREBİR KOPYASI: `scripts/lib/walk-vad.ts` (web deposu). Android kopyası
 * `android/.../speech/WalkVad.kt`. Sabitler `npm run check:parity` ile, davranış
 * `scripts/walk-vad-native-parity.ts` ile (aynı sahnelerde üç kopya aynı kararı veriyor mu)
 * denetleniyor; birini değiştiren üçünü birden değiştirir. Algoritmanın gerekçesi ve ölçüm
 * `docs/plan/walk-stt.md` "Cihazda konuşma algılama".
 *
 * Yalnız Foundation (masaüstünde `swiftc` ile derlenip sınanabiliyor). 16 kHz mono 16 bit
 * örnekler, 20 ms'lik dilimler (`frame` örnek); `push` true dönünce kayıt durur, `result` dolu.
 */
final class WalkVad {
  static let RATE = 16000
  static let FRAME_MS = 20
  static let SKIP_MS = 300
  static let HPF_HZ = 300.0
  static let ONSET_DB = 10.0
  static let HOLD_DB = 6.0
  static let ONSET_FRAMES = 3
  static let ONSET_VOICED = 2
  static let VOICED_R = 0.5
  static let VOICED_BRIDGE_MS = 300
  static let MIN_F0 = 80
  static let MAX_F0 = 400
  static let MIN_DBFS = -55.0
  static let FLOOR_CAP_DBFS = -45.0
  static let FLOOR_RISE = 0.02
  static let END_SILENCE_MS = 650
  static let MAX_SPEECH_MS = 4000
  static let MAX_WAIT_MS = 5000
  static let PRE_ROLL_MS = 500
  static let TAIL_MS = 500
  static let FALLBACK_DB = 6.0
  static let FALLBACK_BEFORE_MS = 500
  static let FALLBACK_AFTER_MS = 1000

  /** kind: "speech" | "fallback" | "none". start/end: gönderilecek parça [start, end), stop: kaydın durduğu örnek. */
  struct Result { let kind: String; let start: Int; let end: Int; let stop: Int }

  let frame: Int = Int((Double(WalkVad.RATE * WalkVad.FRAME_MS) / 1000.0).rounded())
  private var x1 = 0.0, x2 = 0.0, y1 = 0.0, y2 = 0.0
  private let b0: Double, b1: Double, b2: Double, a1: Double, a2: Double
  /** Önceki + bu dilimin ön vurgulu, filtreli örnekleri (seslilik penceresi). */
  private var win: [Double]
  private var sq: [Double]
  private var pe = 0.0
  private var i = 0
  private var floor = Double.nan
  private var state = 0 // 0 wait, 1 speech, 2 done
  private var run = 0
  private var runStart = 0
  private var runVoiced = 0
  private var onset = -1
  private var lastVoiced = -1
  private var lastPeriodic = -1
  private var softStart = -1
  private var peakOver = -Double.infinity
  private var peakAt = -1
  private(set) var result: Result?

  init() {
    win = [Double](repeating: 0, count: frame * 2)
    sq = [Double](repeating: 0, count: frame * 2 + 1)
    // RBJ yüksek geçiren, Q = 1/√2 (a0'a bölünmüş)
    let w0 = 2 * Double.pi * WalkVad.HPF_HZ / Double(WalkVad.RATE)
    let alpha = sin(w0) / (2 * (0.5).squareRoot())
    let c = cos(w0)
    let a0 = 1 + alpha
    b0 = (1 + c) / 2 / a0
    b1 = -(1 + c) / a0
    b2 = (1 + c) / 2 / a0
    a1 = (-2 * c) / a0
    a2 = (1 - alpha) / a0
  }

  private func ms(_ frames: Int) -> Int { return frames * WalkVad.FRAME_MS }
  private func sample(_ frameIdx: Int) -> Int { return frameIdx * frame }

  /** Bir dilim: `x[off ..< off + frame]`. true: kayıt bitti, `result` dolu. */
  func push(_ x: UnsafeBufferPointer<Int16>, _ off: Int = 0) -> Bool {
    if state == 2 { return true }
    var sum = 0.0
    let n = frame
    for k in 0..<n { win[k] = win[n + k] }
    for k in 0..<n {
      let xk = Double(x[off + k])
      let y = b0 * xk + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
      x2 = x1; x1 = xk; y2 = y1; y1 = y
      sum += y * y
      win[n + k] = y - 0.9 * pe
      pe = y
    }
    let e = 10 * log10(sum / Double(n) / (32768.0 * 32768.0) + 1e-12)
    let i = self.i
    self.i += 1
    if ms(i + 1) <= WalkVad.SKIP_MS { return false }
    if floor.isNaN { floor = Swift.min(e, WalkVad.FLOOR_CAP_DBFS) }
    let above = e > floor + WalkVad.HOLD_DB
    if !above { softStart = -1 } else if softStart < 0 { softStart = i }
    let voiced = above && periodicity() >= WalkVad.VOICED_R
    if voiced { lastPeriodic = i }

    if state == 0 {
      if e > Swift.max(floor + WalkVad.ONSET_DB, WalkVad.MIN_DBFS) {
        if run == 0 { runStart = i; runVoiced = 0 }
        run += 1
        if voiced { runVoiced += 1 }
        if run >= WalkVad.ONSET_FRAMES && runVoiced >= WalkVad.ONSET_VOICED {
          state = 1
          // Başlangıç, eşiğe yetişmeyen yumuşak girişe kadar geri alınır ("sich", "f…").
          onset = softStart >= 0 ? Swift.min(runStart, softStart) : runStart
          lastVoiced = i
        }
      } else {
        run = 0
        floor = e < floor ? e : floor + (e - floor) * WalkVad.FLOOR_RISE
      }
      if state == 0 {
        let over = e - floor
        if voiced && over > peakOver { peakOver = over; peakAt = i }
        if ms(i + 1) >= WalkVad.MAX_WAIT_MS { return finishWait(i) }
        return false
      }
    }
    // speech
    if e > floor + WalkVad.HOLD_DB && (voiced || ms(i - lastPeriodic) <= WalkVad.VOICED_BRIDGE_MS) { lastVoiced = i }
    let silentMs = ms(i - lastVoiced)
    if silentMs >= WalkVad.END_SILENCE_MS || ms(i + 1 - onset) >= WalkVad.MAX_SPEECH_MS {
      let stop = sample(i + 1)
      let start = Swift.max(0, sample(onset) - WalkVad.RATE * WalkVad.PRE_ROLL_MS / 1000)
      let end = Swift.min(stop, sample(lastVoiced + 1) + WalkVad.RATE * WalkVad.TAIL_MS / 1000)
      result = Result(kind: "speech", start: start, end: end, stop: stop)
      state = 2
      return true
    }
    return false
  }

  /** Pencerede (80–400 Hz gecikme) en yüksek normalize öz-ilinti, 0–1. */
  private func periodicity() -> Double {
    let len = win.count
    for k in 0..<len { sq[k + 1] = sq[k] + win[k] * win[k] }
    let minLag = Int((Double(WalkVad.RATE) / Double(WalkVad.MAX_F0)).rounded(.down))
    let maxLag = Int((Double(WalkVad.RATE) / Double(WalkVad.MIN_F0)).rounded(.up))
    var best = 0.0
    var lag = minLag
    win.withUnsafeBufferPointer { w in
      while lag <= maxLag && lag < len - 32 {
        var num = 0.0
        var k = 0
        while k + lag < len { num += w[k] * w[k + lag]; k += 1 }
        let e0 = sq[len - lag]
        let e1 = sq[len] - sq[lag]
        if e0 > 0 && e1 > 0 {
          let r = num / (e0 * e1).squareRoot()
          if r > best { best = r }
        }
        lag += 1
      }
    }
    return best
  }

  private func finishWait(_ i: Int) -> Bool {
    let stop = sample(i + 1)
    if peakOver >= WalkVad.FALLBACK_DB && peakAt >= 0 {
      let at = sample(peakAt)
      result = Result(kind: "fallback",
                      start: Swift.max(0, at - WalkVad.RATE * WalkVad.FALLBACK_BEFORE_MS / 1000),
                      end: Swift.min(stop, at + WalkVad.RATE * WalkVad.FALLBACK_AFTER_MS / 1000),
                      stop: stop)
    } else {
      result = Result(kind: "none", start: 0, end: 0, stop: stop)
    }
    state = 2
    return true
  }
}
