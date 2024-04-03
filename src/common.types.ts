export type UserInfo = {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
};

export type CreateClerkUserResponse = {
  user: UserInfo | null;
  result: { status: number; message: string };
};

export type ClerkSignInResponse = {
  user: UserInfo | null;
  verified: boolean;
};

export type ClerkError = {
  code: string;
  message: string;
  longMessage: string;
  meta: object;
};
