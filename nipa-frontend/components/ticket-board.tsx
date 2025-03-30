"use client";

import { getTickets } from "@/lib/api/ticketApi";
import { Ticket, TicketStatus } from "@/lib/types";
import { useEffect, useState } from "react";
import { StatusHeader } from "./status-header";
import { TicketCard } from "./ticket-card";
import { toast } from "sonner";
import NewTicket from "./new-ticket";

export default function TicketBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data.tickets);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching tickets");
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

  return (
    <>
      <NewTicket onSuccess={fetchTickets} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => {
          const statusTickets = tickets.filter(
            (ticket) => ticket.status === status
          );
          return (
            <div key={status} className="flex flex-col gap-4">
              <StatusHeader
                status={status}
                ticketCount={statusTickets.length}
              />
              <div className="flex flex-col gap-2">
                {statusTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
