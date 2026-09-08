import { AvatarEditor } from "@/components/avatar-editor";

export const metadata = { title: "Avatarın" };

/** Avatar düzenleme — mobil `AvatarScreen`in karşılığı; web'de hiç yoktu. */
export default function AvatarPage() {
  return <AvatarEditor />;
}
