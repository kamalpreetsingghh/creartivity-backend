export type User = {
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
  user: User | null;
  result: { status: number; message: string };
};

export type ClerkError = {
  code: string;
  message: string;
  longMessage: string;
  meta: object;
};

export type ImagesResponse = {
  images: any;
  result: { status: number; message: string };
};

export type ImageId = {
  id: String;
};
