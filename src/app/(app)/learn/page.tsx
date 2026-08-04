import { SessionPlayer } from "@/components/session-player";

export const dynamic = "force-dynamic";

export default function LearnPage() {
  // min-h-0 şart: olmazsa flex çocuk kendi içeriği kadar büyür ve oyun alanı
  // kalan yüksekliği bilemeyip taşar.
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SessionPlayer />
    </div>
  );
}
