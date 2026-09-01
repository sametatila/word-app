import Foundation
import Speech
import AVFoundation

/**
 * Kendi konuşma tanıma (STT) modülümüz — iOS `SFSpeechRecognizer` + `AVAudioEngine`.
 * Android'deki NomiSpeechModule ile AYNI olay sözleşmesi: NomiSpeechReady/Begin/
 * Partial/Results/End/Error, sonuç dizileri { value: [...] }.
 *
 * Kelime başına taze oturum: her `start` öncekini temizler. Yetki (Speech + mic)
 * istenir; reddedilirse "permissions" hatası. Info.plist'te NSSpeechRecognitionUsage
 * ve NSMicrophoneUsage metinleri gerekir.
 */
@objc(NomiSpeech)
class NomiSpeech: RCTEventEmitter {

  private let audioEngine = AVAudioEngine()
  private var recognizer: SFSpeechRecognizer?
  private var request: SFSpeechAudioBufferRecognitionRequest?
  private var task: SFSpeechRecognitionTask?
  private var hasListeners = false

  override static func requiresMainQueueSetup() -> Bool { return false }

  override func supportedEvents() -> [String]! {
    return ["NomiSpeechReady", "NomiSpeechBegin", "NomiSpeechPartial",
            "NomiSpeechResults", "NomiSpeechEnd", "NomiSpeechError"]
  }
  override func startObserving() { hasListeners = true }
  override func stopObserving() { hasListeners = false }
  private func send(_ name: String, _ body: Any?) {
    if hasListeners { sendEvent(withName: name, body: body) }
  }

  @objc(isAvailable:rejecter:)
  func isAvailable(_ resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock) {
    let r = SFSpeechRecognizer(locale: Locale(identifier: "de-DE"))
    resolve(r?.isAvailable ?? false)
  }

  @objc(start:resolver:rejecter:)
  func start(_ locale: String,
             resolver resolve: @escaping RCTPromiseResolveBlock,
             rejecter reject: @escaping RCTPromiseRejectBlock) {
    SFSpeechRecognizer.requestAuthorization { status in
      DispatchQueue.main.async {
        guard status == .authorized else {
          self.send("NomiSpeechError", ["code": "permissions"])
          reject("permissions", "Konuşma tanıma izni yok", nil)
          return
        }
        do {
          try self.beginSession(locale)
          resolve(true)
        } catch {
          self.send("NomiSpeechError", ["code": "start_failed"])
          reject("start_failed", error.localizedDescription, error)
        }
      }
    }
  }

  private func beginSession(_ locale: String) throws {
    cleanup() // kelime başına taze oturum

    guard let rec = SFSpeechRecognizer(locale: Locale(identifier: locale)), rec.isAvailable else {
      send("NomiSpeechError", ["code": "unavailable"])
      throw NSError(domain: "NomiSpeech", code: 1, userInfo: nil)
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
    send("NomiSpeechReady", nil)

    task = rec.recognitionTask(with: req) { [weak self] result, error in
      guard let self = self else { return }
      if let result = result {
        let text = result.bestTranscription.formattedString
        if result.isFinal {
          self.send("NomiSpeechResults", ["value": [text]])
        } else {
          self.send("NomiSpeechPartial", ["value": [text]])
        }
      }
      if error != nil || (result?.isFinal ?? false) {
        self.send("NomiSpeechEnd", nil)
        if error != nil { self.send("NomiSpeechError", ["code": "recognition"]) }
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
    try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
  }

  override func invalidate() {
    DispatchQueue.main.async { self.cleanup() }
    super.invalidate()
  }
}
