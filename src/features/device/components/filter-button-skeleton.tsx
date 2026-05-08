import { Skeleton } from "@/components/ui/skeleton";

export default function FilterButtonSkeleton() {
  return (
    <div className="flex h-8 items-center">
      <Skeleton className="h-4 w-16" />
    </div>
  );
}
