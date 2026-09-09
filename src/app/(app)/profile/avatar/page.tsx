import { AvatarEditor } from "@/components/avatar-editor";
import { titleMeta } from "@/lib/page-meta";

export const generateMetadata = titleMeta("avatar.your_avatar");
/** Avatar düzenleme — mobil `AvatarScreen`in karşılığı; web'de hiç yoktu. */
export default function AvatarPage() {
  return <AvatarEditor />;
}
