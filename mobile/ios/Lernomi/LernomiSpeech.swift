import Foundation
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

  override func supportedEvents() -> [String]! {
    return ["LernomiSpeechReady", "LernomiSpeechBegin", "LernomiSpeechPartial",
            "LernomiSpeechResults", "LernomiSpeechEnd", "LernomiSpeechError"]
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
    DispatchQueue.main.async { self.cleanup() }
    super.invalidate()
  }
}
