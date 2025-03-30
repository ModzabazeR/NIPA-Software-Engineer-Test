import { Ticket } from "@/lib/types";
import { format } from "date-fns";
import { Mail, Clock, Calendar, Edit } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{ticket.title}</h2>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            ticket.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : ticket.status === "accepted"
              ? "bg-blue-100 text-blue-800"
              : ticket.status === "resolved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>

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
