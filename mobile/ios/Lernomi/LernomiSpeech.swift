import Foundation
import React
import Speech
import AVFoundation
import UIKit

/**
 * Kendi konuşma tanıma (STT) modülümüz — iOS `SFSpeechRecognizer` + `AVAudioEngine`.
 * Android'deki LernomiSpeechModule ile AYNI olay sözleşmesi: LernomiSpeechReady/Begin/
 * Partial/Results/End/Error, sonuç dizileri { value: [...] }.
 *
 * Kelime başına taze oturum: her `start` öncekini temizler. Yetki (Speech + mic)
 * istenir; reddedilirse "permissions" hatası. Info.plist'te NSSpeechRecognitionUsage
 * ve NSMicrophoneUsage metinleri gerekir.
 */
@objc(LernomiSpeech)
class LernomiSpeech: RCTEventEmitter, AVAudioPlayerDelegate {

  private let audioEngine = AVAudioEngine()
  private var recognizer: SFSpeechRecognizer?
  private var request: SFSpeechAudioBufferRecognitionRequest?
  private var task: SFSpeechRecognitionTask?
  private var hasListeners = false

  override static func requiresMainQueueSetup() -> Bool { return false }

  /// JS'in abone olabildiği TÜM olay adları. `LernomiWalkStop` iOS'ta hiç YAYILMIYOR —
  /// Android'de kalıcı bildirimdeki "Durdur" eylemi yayıyor, iOS'ta karşılığı yok (ürün
  /// kararı, docs/plan/ios-parity.md §6). Yine de listede: `stt.ts:174` bu olaya koşulsuz
  /// abone oluyor ve RCTEventEmitter listede olmayan bir ada abone olununca RCTLogError basıyor.
  override func supportedEvents() -> [String]! {
    return ["LernomiSpeechReady", "LernomiSpeechBegin", "LernomiSpeechPartial",
            "LernomiSpeechResults", "LernomiSpeechEnd", "LernomiSpeechError",
            "LernomiScreenOff", "LernomiScreenOn", "LernomiWalkStop"]
  }
  override func startObserving() { hasListeners = true }
  override func stopObserving() { hasListeners = false }
  private func send(_ name: String, _ body: Any?) {
    if hasListeners { sendEvent(withName: name, body: body) }
  }

  /// Tanıyıcı bu dilde kullanılabilir mi. Yerel kod JS'ten geliyor: sabit
  /// "de-DE" yazılıydı ve İngilizce kursta, cihazda Almanca tanıma yoksa
  /// "kullanılamaz" denip mikrofon hiç açılmıyordu.
  @objc(isAvailable:resolver:rejecter:)
  func isAvailable(_ locale: String,
                   resolver resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock) {
    let r = SFSpeechRecognizer(locale: Locale(identifier: locale))
    resolve(r?.isAvailable ?? false)
  }

  /**
   * Cihazda mikrofon DONANIMI var mı (izin değil) — Android'deki
   * `PackageManager.FEATURE_MICROPHONE` sorgusunun karşılığı.
   *
   * `availableInputs` oturum kategorisi girişi desteklemiyorken (varsayılan
   * .soloAmbient) nil döner; bu "mikrofon yok" değil "sorulamadı" demektir →
   * VAR sayılır. `stt.ts:71` sonucu önbellekliyor ve yanlışlıkla özellik
   * gizlemektense göstermeyi yeğliyor.
   */
  @objc(hasMicrophone:rejecter:)
  func hasMicrophone(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let inputs = AVAudioSession.sharedInstance().availableInputs else {
      resolve(true)
      return
    }
    resolve(!inputs.isEmpty)
  }

  // --- Ağ güvenliği: native HTTP (uploadStt/httpGet) yalnız uygulamanın kendi API
  //     sunucusuna, yalnız https ile çıkar. Oturum çerezi ve ses kaydı başka bir hosta
  //     gidemez; JS'ten gelen URL'e körü körüne güvenilmez. Host JS'ten bir kez ayarlanır
  //     (stt.ts:45, API_BASE). Android'deki `allowedUrl` kuralının birebir karşılığı. ---
  private let apiHostLock = NSLock()
  private var apiHostValue: String?

  @objc(setApiBase:)
  func setApiBase(_ base: String) {
    let host = URL(string: base)?.host
    apiHostLock.lock(); apiHostValue = host; apiHostLock.unlock()
  }

  /// İzin verilen adres mi: https VE tam olarak API hostu. Değilse nil — çağıran null döner.
  private func allowedUrl(_ url: String) -> URL? {
    apiHostLock.lock(); let host = apiHostValue; apiHostLock.unlock()
    guard let host = host, let u = URL(string: url),
          u.scheme?.lowercased() == "https",
          u.host?.lowercased() == host.lowercased() else { return nil }
    return u
  }

  /// Native HTTP'nin ortak oturumu. Çerezi ELLE koymuyoruz: URLSession varsayılan
  /// yapılandırması HTTPCookieStorage.shared'ı kullanıyor, RN'in fetch'i de aynı kavanoza
  /// yazıyor → Better Auth oturum çerezi kendiliğinden gidiyor. Android'de bunun karşılığı
  /// çerezi CookieManager'dan okuyup başlığa koymaktı; iOS'ta elle koymak çift başlık riski.
  private lazy var http: URLSession = {
    let cfg = URLSessionConfiguration.default
    cfg.httpCookieStorage = HTTPCookieStorage.shared
    cfg.httpShouldSetCookies = true
    cfg.timeoutIntervalForRequest = 20
    return URLSession(configuration: cfg)
  }()

  /** Ekran uykusunu engelle/bırak (Wake Lock karşılığı) — yürüyüş turu boyunca ekran sönmesin. */
  @objc(setKeepAwake:)
  func setKeepAwake(_ on: Bool) {
    DispatchQueue.main.async { UIApplication.shared.isIdleTimerDisabled = on }
  }

  // --- Yürüyüş modu arka plan oturumu ---
  //
  // Android'de bunun karşılığı mikrofon tipli ÖN PLAN SERVİSİ; iOS'ta böyle bir
  // şey yok, uygulamayı ekran kapalıyken ayakta tutan tek şey ETKİN BİR SES
  // OTURUMU (Info.plist'te UIBackgroundModes = audio ile birlikte). Bu yüzden
  // oturum yürüyüş turu boyunca AÇIK TUTULUYOR: kelimeler arasında kapanırsa
  // iOS uygulamayı askıya alır ve tur ekran kapanınca ölür.
  //
  // Metot adları Android'le birebir aynı; JS tarafı (lib/stt.ts) zaten bunları
  // çağırıyor ve iOS'ta şimdiye kadar sessizce boşa düşüyordu — JS değişmedi.
  private var walkSessionHeld = false

  @objc(startWalkService)
  func startWalkService() {
    DispatchQueue.main.async {
      do {
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(.playAndRecord, mode: .measurement, options: [.duckOthers, .defaultToSpeaker])
        try session.setActive(true)
        self.walkSessionHeld = true
      } catch {
        self.send("LernomiSpeechError", ["code": "session"])
      }
    }
  }

  @objc(stopWalkService)
  func stopWalkService() {
    DispatchQueue.main.async {
      self.walkSessionHeld = false
      try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }
  }

  // --- Ekran on/off — EŞDEĞER, BİREBİR DEĞİL ---
  //
  // Android'de bunu ACTION_SCREEN_OFF / ACTION_SCREEN_ON yayınları veriyor. iOS'ta güç
  // tuşuna basıldığını haber veren genel bir API YOK; en yakın karşılık uygulamanın arka
  // plana geçmesi: didEnterBackground → ScreenOff, willEnterForeground → ScreenOn.
  // Parolalı kilitte protectedDataWillBecomeUnavailable da düşüyor; ikisi peş peşe
  // gelebildiği için `screenOff` bayrağı tekrarı bastırıyor (Android geçiş başına bir kez
  // yayıyor, sözleşme o).
  //
  // İki fark bilerek kabul edildi:
  //  - Ekran açıkken başka uygulamaya geçmek de ScreenOff sayılıyor. Doğrusu da bu:
  //    `WalkModeScreen.tsx:212` bu bayrakla Azure yoluna geçiyor ve uygulama arka
  //    plandayken native SFSpeechRecognizer zaten güvenilmez.
  //  - Kullanıcı telefonu açıp BAŞKA bir uygulamada kalırsa Android ScreenOn derdi,
  //    burada demiyor. Yine doğrusu bu: uygulama hâlâ arka planda, native tanıma hâlâ
  //    güvenilmez. Ekran durumu değil, KAYNAK SEÇİMİ sorusu soruluyor.
  private var screenObservers: [NSObjectProtocol] = []
  private var screenOff = false

  @objc(startScreenWatch)
  func startScreenWatch() {
    DispatchQueue.main.async {
      guard self.screenObservers.isEmpty else { return } // iki kez kaydolma
      let center = NotificationCenter.default
      let offNames: [Notification.Name] = [
        UIApplication.didEnterBackgroundNotification,
        UIApplication.protectedDataWillBecomeUnavailableNotification,
      ]
      let onNames: [Notification.Name] = [UIApplication.willEnterForegroundNotification]

      self.screenObservers =
        offNames.map { name in
          center.addObserver(forName: name, object: nil, queue: .main) { [weak self] _ in
            guard let self = self, !self.screenOff else { return }
            self.screenOff = true
            self.send("LernomiScreenOff", nil)
          }
        }
        + onNames.map { name in
          center.addObserver(forName: name, object: nil, queue: .main) { [weak self] _ in
            guard let self = self, self.screenOff else { return }
            self.screenOff = false
            self.send("LernomiScreenOn", nil)
          }
        }
    }
  }

  @objc(stopScreenWatch)
  func stopScreenWatch() {
    DispatchQueue.main.async {
      self.screenObservers.forEach { NotificationCenter.default.removeObserver($0) }
      self.screenObservers = []
      self.screenOff = false
    }
  }

  // --- Ham ses kaydı (Azure/sunucu STT için): 16 kHz mono WAV. Ekran-kapalı/cepte yolu. ---
  private var audioRecorder: AVAudioRecorder?
  private var recordURL: URL?

  @objc(startRecording:rejecter:)
  func startRecording(_ resolve: @escaping RCTPromiseResolveBlock,
                      rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      do {
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(.playAndRecord, mode: .measurement, options: [.duckOthers, .defaultToSpeaker])
        try session.setActive(true)
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("walk_clip.wav")
        let settings: [String: Any] = [
          AVFormatIDKey: Int(kAudioFormatLinearPCM),
          AVSampleRateKey: 16000,
          AVNumberOfChannelsKey: 1,
          AVLinearPCMBitDepthKey: 16,
          AVLinearPCMIsFloatKey: false,
          AVLinearPCMIsBigEndianKey: false,
        ]
        let rec = try AVAudioRecorder(url: url, settings: settings)
        rec.record()
        self.audioRecorder = rec
        self.recordURL = url
        resolve(true)
      } catch {
        reject("record", error.localizedDescription, error)
      }
    }
  }

  @objc(stopRecording:rejecter:)
  func stopRecording(_ resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      self.audioRecorder?.stop()
      self.audioRecorder = nil
      let path = self.recordURL?.path
      self.recordURL = nil
      resolve(path)
    }
  }

  /**
   * WAV klibini /api/stt'e NATIVE multipart POST'lar. RN fetch ekran-kapalı (arka plan)
   * takılıyor; URLSession takılmaz. Alan adları Android'le BİREBİR aynı: `language`,
   * `mode=walk`, `expected`, `audio`. 200 ve gövdede {text} varsa metin, aksi halde null —
   * `stt.ts:203` zaten null'ı "duyamadım" sayıyor, hata fırlatılmıyor.
   */
  @objc(uploadStt:wavPath:language:expected:resolver:rejecter:)
  func uploadStt(_ url: String, wavPath: String, language: String, expected: String,
                 resolver resolve: @escaping RCTPromiseResolveBlock,
                 rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let u = allowedUrl(url) else {
      NSLog("LernomiWalk uploadStt: izin verilmeyen adres")
      resolve(nil)
      return
    }
    guard let audio = FileManager.default.contents(atPath: wavPath), !audio.isEmpty else {
      resolve(nil)
      return
    }

    let boundary = "----LernomiBoundary\(Int(Date().timeIntervalSince1970 * 1000))"
    var body = Data()
    func raw(_ text: String) { body.append(Data(text.utf8)) }
    func field(_ name: String, _ value: String) {
      raw("--\(boundary)\r\n")
      raw("Content-Disposition: form-data; name=\"\(name)\"\r\n\r\n")
      raw(value)
      raw("\r\n")
    }
    field("language", language)
    field("mode", "walk")
    if !expected.isEmpty { field("expected", expected) }
    raw("--\(boundary)\r\n")
    raw("Content-Disposition: form-data; name=\"audio\"; filename=\"clip.wav\"\r\n")
    raw("Content-Type: audio/wav\r\n\r\n")
    body.append(audio)
    raw("\r\n--\(boundary)--\r\n")

    var req = URLRequest(url: u)
    req.httpMethod = "POST"
    req.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
    http.uploadTask(with: req, from: body) { data, response, error in
      let code = (response as? HTTPURLResponse)?.statusCode ?? 0
      guard code == 200, let data = data else {
        NSLog("%@", "LernomiWalk uploadStt HTTP \(code) \(error?.localizedDescription ?? "")")
        resolve(nil)
        return
      }
      let obj = try? JSONSerialization.jsonObject(with: data)
      guard let json = obj as? [String: Any],
            let text = json["text"] as? String, !text.isEmpty else {
        resolve(nil)
        return
      }
      resolve(text)
    }.resume()
  }

  /** Sade GET (JSON) — ekran-kapalı devam turunda /api/session için (`stt.ts:212`).
   *  200 ise gövde, değilse null. Çerez oturumun kendi kavanozundan gider. */
  @objc(httpGet:resolver:rejecter:)
  func httpGet(_ url: String,
               resolver resolve: @escaping RCTPromiseResolveBlock,
               rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let u = allowedUrl(url) else {
      NSLog("LernomiWalk httpGet: izin verilmeyen adres")
      resolve(nil)
      return
    }
    var req = URLRequest(url: u)
    req.setValue("application/json", forHTTPHeaderField: "accept")
    http.dataTask(with: req) { data, response, _ in
      let code = (response as? HTTPURLResponse)?.statusCode ?? 0
      guard code == 200, let data = data else {
        resolve(nil)
        return
      }
      resolve(String(data: data, encoding: .utf8))
    }.resume()
  }

  // --- Ekran-kapalı TTS: /api/tts MP3'ünü indirip AVAudioPlayer ile çalar. WebView köprüsü
  //     ekran kapanınca askıya alınıp sustuğu için arka planda çalışan tek yol bu; neural
  //     ses (Katja/Emel) korunur. Android'de karşılığı MediaPlayer. ---
  private var ttsPlayer: AVAudioPlayer?
  private var ttsResolve: RCTPromiseResolveBlock?

  @objc(playTtsUrl:resolver:rejecter:)
  func playTtsUrl(_ url: String,
                  resolver resolve: @escaping RCTPromiseResolveBlock,
                  rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let u = allowedUrl(url) else {
      NSLog("LernomiWalk playTts: izin verilmeyen adres")
      resolve(false)
      return
    }
    var req = URLRequest(url: u)
    req.setValue("audio/mpeg", forHTTPHeaderField: "accept")
    http.dataTask(with: req) { [weak self] data, response, error in
      let code = (response as? HTTPURLResponse)?.statusCode ?? 0
      guard let self = self, code == 200, let data = data, !data.isEmpty else {
        NSLog("%@", "LernomiWalk playTts HTTP \(code) \(error?.localizedDescription ?? "")")
        resolve(false)
        return
      }
      DispatchQueue.main.async { self.startTts(data, resolve) }
    }.resume()
  }

  /// İndirilen MP3'ü çalmaya başlar (ana kuyruk). Söz bitişte `finishTts` ile kapanır.
  private func startTts(_ mp3: Data, _ resolve: @escaping RCTPromiseResolveBlock) {
    finishTts(false) // önceki oynatma varsa kapat; sözü askıda bırakma
    do {
      // Yürüyüş oturumu açıksa DOKUNMA: kategori .playAndRecord ve kayıt sürüyor olabilir.
      // Değilse sessiz anahtarı yoksayan bir oynatma oturumu aç (.playback bunu yapar) —
      // yoksa zil sessizdeyken TTS hiç duyulmaz.
      if !walkSessionHeld {
        let session = AVAudioSession.sharedInstance()
        try session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
        try session.setActive(true)
      }
      let player = try AVAudioPlayer(data: mp3, fileTypeHint: AVFileType.mp3.rawValue)
      player.delegate = self
      ttsPlayer = player
      ttsResolve = resolve
      player.prepareToPlay()
      if !player.play() { finishTts(false) }
    } catch {
      NSLog("%@", "LernomiWalk playTts oynatma: \(error.localizedDescription)")
      resolve(false)
    }
  }

  /// Oynatmayı kapatır ve bekleyen sözü TEK KEZ karşılar. Android'de yeni bir TTS eskisini
  /// release ediyor ve eski söz askıda kalıyor; burada false ile karşılanıyor.
  private func finishTts(_ ok: Bool) {
    ttsPlayer?.stop()
    ttsPlayer = nil
    let pending = ttsResolve
    ttsResolve = nil
    pending?(ok)
  }

  @objc(stopTts)
  func stopTts() {
    DispatchQueue.main.async { self.finishTts(false) }
  }

  func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
    DispatchQueue.main.async {
      guard player === self.ttsPlayer else { return } // SFX oynatıcılarının delegesi yok
      self.finishTts(flag)
    }
  }

  func audioPlayerDecodeErrorDidOccur(_ player: AVAudioPlayer, error: Error?) {
    DispatchQueue.main.async {
      guard player === self.ttsPlayer else { return }
      self.finishTts(false)
    }
  }

  // --- Ekran-kapalı SFX: TON SENTEZİ (ham PCM → WAV → AVAudioPlayer). Hazır mp3/
  //     react-native-sound arka planda codec yüzünden çalmıyor; ham PCM codec istemez.
  //     Android'de karşılığı AudioTrack + MODE_STREAM. Ses oturumuna DOKUNULMUYOR:
  //     `sfx.ts:59` buraya yalnız ekran-kapalı modda düşüyor, orada yürüyüş oturumu
  //     zaten açık. ---
  private let sfxQueue = DispatchQueue(label: "app.lernomi.sfx")
  private var sfxPlayers: [AVAudioPlayer] = [] // yalnız sfxQueue üzerinde okunur/yazılır

  @objc(playSfx:)
  func playSfx(_ kind: String) {
    let notes = LernomiSpeech.sfxNotes(kind)
    sfxQueue.async {
      let wav = LernomiSpeech.renderWav(notes)
      guard !wav.isEmpty else { return }
      do {
        let player = try AVAudioPlayer(data: wav, fileTypeHint: AVFileType.wav.rawValue)
        // Biteni at, oynayanı TUT: serbest bırakılan AVAudioPlayer ortada susar.
        self.sfxPlayers.removeAll { !$0.isPlaying }
        self.sfxPlayers.append(player)
        player.play()
      } catch {
        NSLog("%@", "LernomiWalk playSfx: \(error.localizedDescription)")
      }
    }
  }

  /**
   * Nota tablosu `src/lib/sfxNotes.ts` ile BİREBİR (tek kaynak orası; Android tablosu
   * `python3 scripts/render-sfx.py --kotlin` çıktısı, bu tablo aynı çıktının Swift'i).
   * Nota: [freq, start, dur, peak, wave(0 sine,1 tri,2 square), glide(hedef Hz, 0 yok),
   * lp(alçak geçiren Hz, 0 yok), attack(sn), hold(0 pluck / 1 tut), release(sn)].
   */
  private static func sfxNotes(_ kind: String) -> [[Double]] {
    switch kind {
    case "correct":
      return [
        [523.25, 0.0, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [523.25, 0.0, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [659.25, 0.08, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [659.25, 0.08, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [783.99, 0.16, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [783.99, 0.16, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [1046.5, 0.24, 0.204, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [1046.5, 0.24, 0.24, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
      ]
    case "wrong":
      return [
        [392.0, 0.0, 0.26, 0.22, 1.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [392.0, 0.0, 0.221, 0.12, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [311.13, 0.09, 0.26, 0.22, 1.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [311.13, 0.09, 0.221, 0.12, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [261.63, 0.18, 0.26, 0.22, 1.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [261.63, 0.18, 0.221, 0.12, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
      ]
    case "micon":
      return [
        [523.25, 0.0, 0.17, 0.05, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [523.25, 0.0, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [783.99, 0.06, 0.17, 0.05, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [783.99, 0.06, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
      ]
    case "micoff":
      return [
        [783.99, 0.0, 0.17, 0.05, 2.0, 0.0, 1800.0, 0.004, 0.0, 0.0],
        [783.99, 0.0, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [523.25, 0.06, 0.17, 0.05, 2.0, 0.0, 1800.0, 0.004, 0.0, 0.0],
        [523.25, 0.06, 0.2, 0.16, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
      ]
    case "finish":
      return [
        [523.25, 0.0, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [523.25, 0.0, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [659.25, 0.075, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [659.25, 0.075, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [783.99, 0.15, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [783.99, 0.15, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [1046.5, 0.225, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [1046.5, 0.225, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [698.46, 0.42, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [698.46, 0.42, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [880.0, 0.495, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [880.0, 0.495, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [1046.5, 0.57, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [1046.5, 0.57, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [1396.91, 0.645, 0.187, 0.07, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [1396.91, 0.645, 0.22, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [1046.5, 0.92, 0.68, 0.05, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [1046.5, 0.92, 0.8, 0.2, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [1318.51, 0.92, 0.68, 0.03, 2.0, 0.0, 2400.0, 0.004, 0.0, 0.0],
        [1318.51, 0.92, 0.8, 0.1, 0.0, 0.0, 0.0, 0.004, 0.0, 0.0],
        [261.63, 0.92, 0.8, 0.07, 1.0, 0.0, 1400.0, 0.03, 1.0, 0.4],
        [392.0, 0.92, 0.8, 0.07, 1.0, 0.0, 1400.0, 0.03, 1.0, 0.4],
      ]
    case "tap":
      return [
        [1174.66, 0.0, 0.05, 0.06, 0.0, 0.0, 0.0, 0.008, 0.0, 0.0],
      ]
    default:
      return [[1174.66, 0.0, 0.05, 0.06, 0.0, 0.0, 0.0, 0.008, 0.0, 0.0]]
    }
  }

  /**
   * Köprünün (sfxNotes.ts) sentezini birebir: üstel zarf (0.0001→peak @attack; pluck: dur
   * sonunda 0.0001'e üstel iniş; hold: peak'te tut, son `release` saniyede in), sine/
   * triangle/square, üstel glide, RBJ alçak geçiren (Q 0.707 ≈ WebAudio lowpass Q 0.7),
   * 0.8 ana kazanç (SFX_MASTER). Çıkış: 44.1 kHz mono 16-bit WAV.
   */
  private static func renderWav(_ notes: [[Double]]) -> Data {
    let rate = 44100.0
    let master = 0.8
    let floor = 0.0001
    guard let last = notes.map({ $0[1] + $0[2] }).max() else { return Data() }
    let total = last + 0.06
    let n = max(Int(total * rate), 1)
    var mix = [Double](repeating: 0, count: n)

    for note in notes {
      let freq = note[0], start = note[1], dur = note[2], peak = note[3]
      let wave = Int(note[4]), glide = note[5], lp = note[6]
      let attack = note[7] > 0 ? note[7] : 0.004
      let hold = note[8] >= 0.5
      let release = note[9]
      let s0 = Int(start * rate)
      let len = Int(dur * rate)
      if len <= 0 { continue }

      var raw = [Double](repeating: 0, count: len)
      var phase = 0.0
      for i in 0..<len {
        let t = Double(i) / rate
        let f = glide > 0 ? freq * pow(glide / freq, t / dur) : freq
        phase += 2 * Double.pi * f / rate
        switch wave {
        case 1:
          let p = (phase / (2 * Double.pi)).truncatingRemainder(dividingBy: 1.0)
          raw[i] = 2 * abs(2 * p - 1) - 1
        case 2:
          raw[i] = sin(phase) >= 0 ? 1.0 : -1.0
        default:
          raw[i] = sin(phase)
        }
      }
      if lp > 0 { lowpass(&raw, lp, rate) }

      for i in 0..<len {
        let t = Double(i) / rate
        let env: Double
        if t < attack {
          env = floor * pow(peak / floor, t / attack)
        } else if hold {
          let sustain = dur - release
          env = t < sustain ? peak : peak * pow(floor / peak, (t - sustain) / release)
        } else {
          env = peak * pow(floor / peak, (t - attack) / (dur - attack))
        }
        let idx = s0 + i
        if idx >= 0 && idx < n { mix[idx] += raw[i] * env * master }
      }
    }

    var pcm = Data(capacity: n * 2)
    for value in mix {
      let sample = Int16(clamping: Int(min(max(value, -1.0), 1.0) * 32767))
      pcm.append(UInt8(truncatingIfNeeded: sample))
      pcm.append(UInt8(truncatingIfNeeded: sample >> 8))
    }
    return wavContainer(pcm, rate: Int(rate))
  }

  /// 16-bit mono PCM'i WAV kabına koyar — AVAudioPlayer başlıksız ham PCM'i çalmaz.
  private static func wavContainer(_ pcm: Data, rate: Int) -> Data {
    let channels = 1, bits = 16
    var out = Data()
    func ascii(_ text: String) { out.append(contentsOf: Array(text.utf8)) }
    func i32(_ v: Int) {
      let u = UInt32(truncatingIfNeeded: v)
      out.append(contentsOf: [UInt8(truncatingIfNeeded: u), UInt8(truncatingIfNeeded: u >> 8),
                              UInt8(truncatingIfNeeded: u >> 16), UInt8(truncatingIfNeeded: u >> 24)])
    }
    func i16(_ v: Int) {
      let u = UInt16(truncatingIfNeeded: v)
      out.append(contentsOf: [UInt8(truncatingIfNeeded: u), UInt8(truncatingIfNeeded: u >> 8)])
    }
    ascii("RIFF"); i32(36 + pcm.count); ascii("WAVE")
    ascii("fmt "); i32(16); i16(1); i16(channels); i32(rate)
    i32(rate * channels * bits / 8); i16(channels * bits / 8); i16(bits)
    ascii("data"); i32(pcm.count)
    out.append(pcm)
    return out
  }

  /// RBJ 2. derece alçak geçiren (yerinde), Q 0.707 — köprüdeki BiquadFilter lowpass'ın karşılığı.
  private static func lowpass(_ x: inout [Double], _ fc: Double, _ rate: Double) {
    let q = 0.7071
    let w0 = 2 * Double.pi * fc / rate
    let alpha = sin(w0) / (2 * q)
    let cw = cos(w0)
    let a0 = 1 + alpha
    let b0 = (1 - cw) / 2 / a0, b1 = (1 - cw) / a0, b2 = (1 - cw) / 2 / a0
    let a1 = -2 * cw / a0, a2 = (1 - alpha) / a0
    var x1 = 0.0, x2 = 0.0, y1 = 0.0, y2 = 0.0
    for i in x.indices {
      let v = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
      x2 = x1; x1 = x[i]
      y2 = y1; y1 = v
      x[i] = v
    }
  }

  /** Arka planda da çalışan gecikme. Android'de native Handler; iOS'ta ana kuyruk
   *  zamanlayıcısı — ses oturumu açıkken süreç canlı olduğundan işler. `stt.ts:162` RN'in
   *  setTimeout'u arka planda durabildiği için bunu yeğliyor; iOS'ta setTimeout'un yetip
   *  yetmediği CİHAZDA ölçülecek, parite için yine de eklendi. */
  @objc(delay:resolver:rejecter:)
  func delay(_ ms: Double,
             resolver resolve: @escaping RCTPromiseResolveBlock,
             rejecter reject: @escaping RCTPromiseRejectBlock) {
    let seconds = max(0, ms) / 1000
    DispatchQueue.main.asyncAfter(deadline: .now() + seconds) { resolve(true) }
  }

  @objc(start:resolver:rejecter:)
  func start(_ locale: String,
             resolver resolve: @escaping RCTPromiseResolveBlock,
             rejecter reject: @escaping RCTPromiseRejectBlock) {
    SFSpeechRecognizer.requestAuthorization { status in
      DispatchQueue.main.async {
        guard status == .authorized else {
          self.send("LernomiSpeechError", ["code": "permissions"])
          reject("permissions", "Konuşma tanıma izni yok", nil)
          return
        }
        do {
          try self.beginSession(locale)
          resolve(true)
        } catch {
          self.send("LernomiSpeechError", ["code": "start_failed"])
          reject("start_failed", error.localizedDescription, error)
        }
      }
    }
  }

  private func beginSession(_ locale: String) throws {
    cleanup() // kelime başına taze oturum

    guard let rec = SFSpeechRecognizer(locale: Locale(identifier: locale)), rec.isAvailable else {
      send("LernomiSpeechError", ["code": "unavailable"])
      throw NSError(domain: "LernomiSpeech", code: 1, userInfo: nil)
    }
    recognizer = rec

    let session = AVAudioSession.sharedInstance()
    try session.setCategory(.playAndRecord, mode: .measurement, options: [.duckOthers, .defaultToSpeaker])
    try session.setActive(true, options: .notifyOthersOnDeactivation)

    let req = SFSpeechAudioBufferRecognitionRequest()
    req.shouldReportPartialResults = true
    request = req

    let input = audioEngine.inputNode
    let format = input.outputFormat(forBus: 0)
    input.removeTap(onBus: 0)
    input.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
      self?.request?.append(buffer)
    }
    audioEngine.prepare()
    try audioEngine.start()
    send("LernomiSpeechReady", nil)

    task = rec.recognitionTask(with: req) { [weak self] result, error in
      guard let self = self else { return }
      if let result = result {
        let text = result.bestTranscription.formattedString
        if result.isFinal {
          self.send("LernomiSpeechResults", ["value": [text]])
        } else {
          self.send("LernomiSpeechPartial", ["value": [text]])
        }
      }
      if error != nil || (result?.isFinal ?? false) {
        self.send("LernomiSpeechEnd", nil)
        if error != nil { self.send("LernomiSpeechError", ["code": "recognition"]) }
        self.stopAudio()
      }
    }
  }

  @objc(stop)
  func stop() {
    DispatchQueue.main.async {
      self.stopAudio()
      self.request?.endAudio()
    }
  }

  @objc(cancel)
  func cancel() { DispatchQueue.main.async { self.cleanup() } }

  @objc(destroy)
  func destroy() { DispatchQueue.main.async { self.cleanup() } }

  private func stopAudio() {
    if audioEngine.isRunning {
      audioEngine.stop()
      audioEngine.inputNode.removeTap(onBus: 0)
    }
  }

  private func cleanup() {
    stopAudio()
    request?.endAudio()
    task?.cancel()
    task = nil
    request = nil
    recognizer = nil
    // Yürüyüş turu oturumu tutuyorsa dokunma: kelime başına yapılan bu temizlik
    // oturumu kapatsaydı, ekran kapalıyken tur bir sonraki kelimeye geçemezdi.
    if !walkSessionHeld {
      try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }
  }

  override func invalidate() {
    stopScreenWatch()
    stopTts()
    DispatchQueue.main.async { self.cleanup() }
    super.invalidate()
  }
}
