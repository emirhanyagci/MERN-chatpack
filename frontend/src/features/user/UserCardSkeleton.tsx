import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function UserCardSkeleton() {
  return (
    <div className="mb-5 flex w-full items-center space-x-2 px-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
      </div>
    </div>
  );
}
