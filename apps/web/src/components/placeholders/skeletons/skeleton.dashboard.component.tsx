import { Skeleton } from "@/components/ui/skeleton";

function SkeletonDashboard() {
  return (
    <div className="grid grid-cols-4 gap-6 p-4">
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
      <div className="border space-y-3 p-2 rounded-lg">
        <div className="flex items-start space-x-2">
          <Skeleton className="h-4 w-4 " />
          <Skeleton className="h-4 min-w-[50px] w-0 flex-grow" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-36 min-w-[50px] w-full" />
      </div>
    </div>
  );
}

export default SkeletonDashboard;
