import clerkClient from "@clerk/clerk-sdk-node";
import {
  ClerkError,
  CreateClerkUserResponse,
  CreateUser,
} from "../common.types";

export const signupClerk = async ({
  firstName,
  lastName,
  userName,
  email,
  password,
}: CreateUser): Promise<CreateClerkUserResponse> => {
  try {
    const user = await clerkClient.users.createUser({
      firstName,
      lastName,
      username: userName,
      emailAddress: [email],
      password,
    });

    const response: CreateClerkUserResponse = {
      user: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        photo: user.imageUrl,
      },
      result: { status: 200, message: "User created successfully" },
    };

    return response;
  } catch (error: any) {
    console.log(error);
    let status = 500;
    let message = "Something went wrong";

    const emailExistsError: [ClerkError] = error.errors.filter(
      (err: ClerkError) =>
        err.message === "That email address is taken. Please try another."
    );

    if (emailExistsError.length > 0) {
      status = 409;
      message = "Email Already Exists";
    } else {
      const usernameExistsError: [ClerkError] = error.errors.filter(
        (err: ClerkError) =>
          err.message === "That username is taken. Please try another."
      );

      if (usernameExistsError.length > 0) {
        status = 409;
        message = "Username Already Exists";
      } else {
        const passwordStrengthError: [ClerkError] = error.errors.filter(
          (err: ClerkError) =>
            err.message ===
            "Password has been found in an online data breach. For account safety, please use a different password."
        );

        if (passwordStrengthError.length > 0) {
          status = 401;
          message =
            "Password strength is too weak. Please use a strong password.";
        }
      }
    }

    const response: CreateClerkUserResponse = {
      user: null,
      result: { status, message },
    };

    return response;
  }
};

export const signinClerk = async (
  userId: string,
  password: string
): Promise<Boolean> => {
  try {
    const result = await clerkClient.users.verifyPassword({
      userId,
      password,
    });

    return result.verified;
  } catch (error) {
    return false;
  }
};
