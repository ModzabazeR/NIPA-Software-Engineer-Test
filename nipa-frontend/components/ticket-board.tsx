"use client";

import { getTickets, patchUpdateTicketStatus } from "@/lib/api/ticketApi";
import { Ticket, TicketStatus } from "@/lib/types";
import { useEffect, useState } from "react";
import StatusHeader from "@/components/status-header";
import TicketCard from "@/components/ticket-card";
import { toast } from "sonner";
import NewTicket from "@/components/new-ticket";
import ReadonlySheet from "@/components/readonly-sheet";
import { TicketControls } from "@/components/ticket-controls";
import { statusColors } from "@/lib/statusColors";

type SortBy = "updatedAt" | "createdAt";

export default function TicketBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("updatedAt");
  const [filter, setFilter] = useState<TicketStatus | "all">("all");

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data.tickets);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching tickets");
    }
  };

  const handleStatusChange = async (
    ticketId: string,
    newStatus: TicketStatus
  ) => {
    try {
      await patchUpdateTicketStatus(ticketId, newStatus);
      await fetchTickets(); // Refresh the tickets list
      toast.success("Updated ticket status successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update ticket status");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const statuses: TicketStatus[] = [
    "pending",
    "accepted",
    "resolved",
    "rejected",
  ];

  // Sort and filter tickets
  const sortedAndFilteredTickets = tickets
    .filter((ticket) => filter === "all" || ticket.status === filter)
    .sort((a, b) => {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return dateB - dateA; // Sort in descending order (newest first)
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-y-4 items-start justify-between">
        <NewTicket
          triggerClassName="justify-self-end w-full md:w-fit"
          onSuccess={fetchTickets}
        />
        <TicketControls
          onSortChange={setSortBy}
          onFilterChange={setFilter}
          currentSort={sortBy}
          currentFilter={filter}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => {
          const statusTickets = sortedAndFilteredTickets.filter(
            (ticket) => ticket.status === status
          );
          return (
            <div key={status} className="flex flex-col gap-4">
              <StatusHeader
                status={status}
                ticketCount={statusTickets.length}
              />
              <div
                className={`flex flex-col gap-2 ${statusColors[status].background} p-4 rounded-lg min-h-[calc(100vh-200px)]`}
              >
                {statusTickets.map((ticket) => (
                  <ReadonlySheet
                    key={ticket.id}
                    ticket={ticket}
                    onStatusChange={handleStatusChange}
                  >
                    <TicketCard ticket={ticket} />
                  </ReadonlySheet>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
