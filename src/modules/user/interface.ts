export interface UserLoginPayload {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface InsertUser {
  username: string;
  password: string;
  email: string;
  is_verified: boolean;
}
