export type Response = {
  success: boolean;
  data?: any;
  error?: {
    name: string;
    message: string;
  };
};

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

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
