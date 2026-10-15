/**
 * Edge v2 jetonu (`src/lib/tts/edge-gec.ts`): aktarım kaynağıyla aynı değeri veriyor mu.
 *
 *   npm run test:edge-gec
 *
 * Beklenen değerler `edge-tts` 7.3.1'in `generate_sec_ms_gec_v2(t)` çıktısı (2026-10-16,
 * Python'da üretildi). Bir değer tutmazsa jeton yanlış ve uç 403 verir; Azure yedeği
 * sessizce devralır, yani bu kırılma canlıda ancak `ai_usage` Edge hatalarından görünür.
 */
import { secMsGecV2 } from "../src/lib/tts/edge-gec";

const TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const GOLDEN: [number, string][] = [
  [1700000000, "2CD23A2CA0B2595A-F3C846C370E05F9CC83ACC5F995C5F5D87A4D0F14CE8936A0F902E64099E38A2"],
  [1760000000, "6D50DDDB91812C33-DD68EFB01898B0750C9797D51A5FF93471DFDAE6888A1039D532CBDCCE54545D"],
  [1760600123.7, "39552EE5521F890A-ECF9B2820D8CB95995430525C73A595F72D89FCAB9336EF5044E5774C3573C8E"],
  [1792104840, "4B5F0372ED16FDB9-E5173AA66D2DB8C1CEFE6F114D90DE9054DC92F379F2B5E05DB5A95D7FA4A613"],
  [1792105199.99, "3CA3EF34779C7E7E-3F4A2CA790363C8F587B30628E55DD09B14E7D2ADF81E0E65EACCACC59530D76"],
  [1800000000, "99E54519B490BE5C-E162DB0977FBDCB9B86DD8148BF1BCDC3C0303176CE39852A42B415935C20654"],
  [2000000000, "2D62557F1142BC5D-FD9C30C68FF194A5EE6B45FEFC5E2BA1D1239F88A90569AB55CFFFAA7799F40E"],
];

let bad = 0;
for (const [t, want] of GOLDEN) {
  const got = secMsGecV2(TOKEN, t);
  if (got !== want) {
    bad++;
    console.log(`✗ ${t}\n  beklenen ${want}\n  çıkan    ${got}`);
  }
}
console.log(bad ? `${bad}/${GOLDEN.length} TUTMADI` : `${GOLDEN.length}/${GOLDEN.length} edge-tts ile birebir`);
process.exit(bad ? 1 : 0);
