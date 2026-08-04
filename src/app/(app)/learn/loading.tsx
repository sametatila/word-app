import { PageSkeleton } from "@/components/skeleton";

/** Sayfa sunucudan gelene kadar anında görünen iskelet. */
export default function Loading() {
  return <PageSkeleton rows={5} />;
}
