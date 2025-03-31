export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  contactInformation: string;
  status: TicketStatus;
  createdById: string;
  updatedById: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  updatedBy: User | null;
};

export type TicketStatus = "pending" | "accepted" | "resolved" | "rejected";
export const ticketStatuses: TicketStatus[] = [
  "pending",
  "accepted",
  "resolved",
  "rejected",
];

export interface Response {
  success: boolean;
  data?: unknown;
  error?: {
    name: string;
    message: string;
  };
}

export interface LoginResponse extends Response {
  data: {
    token: string;
  };
}

export interface RegisterResponse extends Response {
  data: {
    user: User;
  };
}

export interface GetTicketsResponse extends Response {
  data: {
    tickets: Ticket[];
  };
}

export interface CreateTicketResponse extends Response {
  data: {
    ticket: Ticket;
  };
}

export interface UpdateTicketStatusResponse extends Response {
  data: {
    ticket: Ticket;
  };
}
