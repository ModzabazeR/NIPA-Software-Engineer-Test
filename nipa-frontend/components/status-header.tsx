import { TicketStatus } from "@/lib/types";
import { statusColors } from "@/lib/statusColors";
interface StatusHeaderProps {
  status: TicketStatus;
  ticketCount: number;
}

export default function StatusHeader({
  status,
  ticketCount,
}: StatusHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1
          className={`${statusColors[status].background} ${statusColors[status].foreground} text-sm font-medium py-1 px-2 rounded-sm cursor-pointer capitalize`}
        >
          {status}
        </h1>
        <p className="text-sm text-gray-500">{ticketCount}</p>
      </div>
    </>
  );
}
