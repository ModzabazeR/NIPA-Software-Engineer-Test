import { statusColors } from "@/lib/statusColors";
import { ticketStatuses } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function TicketBoardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-y-4 items-start justify-between">
        <Skeleton className="h-10 w-full md:w-32" />
        <div className="flex gap-4 w-full md:w-auto">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ticketStatuses.map((status) => (
          <div key={status} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Skeleton
                className={`h-6 w-24 ${statusColors[status].background}`}
              />
              <Skeleton className="h-6 w-8" />
            </div>
            <div
              className={`flex flex-col gap-2 ${statusColors[status].background} p-4 rounded-lg min-h-[calc(100vh-200px)]`}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-4 rounded-lg shadow-sm bg-white/60"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton
                      className={`h-6 w-3/4 ${statusColors[status].background}`}
                    />
                    <Skeleton
                      className={`h-6 w-16 ${statusColors[status].background}`}
                    />
                  </div>
                  <Skeleton
                    className={`h-4 w-full ${statusColors[status].background}`}
                  />
                  <div className="flex items-center gap-2">
                    <Skeleton
                      className={`h-4 w-4 ${statusColors[status].background}`}
                    />
                    <Skeleton
                      className={`h-4 w-24 ${statusColors[status].background}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
