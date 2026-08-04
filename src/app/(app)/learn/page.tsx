import { SessionPlayer } from "@/components/session-player";

export const dynamic = "force-dynamic";

export default function LearnPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SessionPlayer />
    </div>
  );
}
