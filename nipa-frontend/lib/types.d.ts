export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  contactInformation: string;
  status: TicketStatus;
  createdById: string;
  updatedById: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TicketStatus = "pending" | "accepted" | "resolved" | "rejected";

export interface Response {
  success: boolean;
  data?: any;
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
