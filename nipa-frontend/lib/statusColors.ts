import { TicketStatus } from "./types";

export const statusColors: Record<TicketStatus, string> = {
  pending: "bg-yellow-500/70",
  accepted: "bg-blue-500/70",
  resolved: "bg-green-500/70",
  rejected: "bg-red-500/70",
};
