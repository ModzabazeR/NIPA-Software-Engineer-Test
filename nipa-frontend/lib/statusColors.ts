import { TicketStatus } from "./types";

export const statusColors: Record<
  TicketStatus,
  { foreground: string; background: string }
> = {
  pending: {
    foreground: "text-yellow-800",
    background: "bg-yellow-100",
  },
  accepted: {
    foreground: "text-blue-800",
    background: "bg-blue-100",
  },
  resolved: {
    foreground: "text-green-800",
    background: "bg-green-100",
  },
  rejected: {
    foreground: "text-red-800",
    background: "bg-red-100",
  },
};
