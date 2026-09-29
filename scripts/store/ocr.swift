import Foundation
import Vision
import AppKit
// Kullanım: ocr <png>...  → JSON {dosya: [{t, x, y, w, h}]}; oranlar 0–1, köken sol üst.
// scripts/store/frames.mjs büyüteç kırpımını bu satırlara çapalıyor (frames.json "callout.anchor").
var out: [String: [[String: Any]]] = [:]
for path in CommandLine.arguments.dropFirst() {
  guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
  let req = VNRecognizeTextRequest()
  req.recognitionLevel = .accurate
  req.recognitionLanguages = ["de-DE", "en-US", "tr-TR"]
  req.usesLanguageCorrection = false
  try? VNImageRequestHandler(cgImage: cg).perform([req])
  var rows: [[String: Any]] = []
  for o in req.results ?? [] {
    guard let c = o.topCandidates(1).first else { continue }
    let b = o.boundingBox
    rows.append(["t": c.string, "x": b.minX, "y": 1 - b.maxY, "w": b.width, "h": b.height])
  }
  out[path] = rows
}
let d = try! JSONSerialization.data(withJSONObject: out)
FileHandle.standardOutput.write(d)
