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
class LernomiSpeech: RCTEventEmitter {

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
    DispatchQueue.main.async { self.cleanup() }
    super.invalidate()
  }
}
