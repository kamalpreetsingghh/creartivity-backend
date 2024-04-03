import clerkClient from "@clerk/clerk-sdk-node";
import { CreateUser } from "../common.types";

export const signupClerk = async ({
  firstName,
  lastName,
  userName,
  email,
  password,
}: CreateUser) => {
  try {
    const result = await clerkClient.users.createUser({
      firstName,
      lastName,
      username: userName,
      emailAddress: [email],
      password,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};
