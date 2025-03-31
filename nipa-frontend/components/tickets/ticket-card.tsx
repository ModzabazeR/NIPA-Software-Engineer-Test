import { statusColors } from "@/lib/statusColors";
import { Ticket } from "@/lib/types";
import { format } from "date-fns";
import { Edit } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left bg-white/60">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{ticket.title}</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[ticket.status].background
          } ${statusColors[ticket.status].foreground}`}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-1 text-ellipsis">
        {ticket.description}
      </p>

      <div className="flex flex-col gap-2 text-xs text-gray-500">
        {ticket.updatedAt && (
          <div className="flex items-center gap-2">
            <Edit className="w-4 h-4" />
            <span>{format(new Date(ticket.updatedAt), "MMM d, h:mm a")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
