import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { CreateUser } from "../common.types";
import { signupClerk } from "../lib/clerk";

export const signUp = async (request: Request, response: Response) => {
  try {
    const createUser: CreateUser = request.body;

    const clerkUser = await signupClerk(createUser);

    if (clerkUser) {
      const { id, firstName, lastName, username, emailAddresses, imageUrl } =
        clerkUser;

      const user: IUser = new User({
        clerkId: id,
        email: emailAddresses[0].emailAddress,
        username: username!,
        firstName: firstName,
        lastName: lastName,
        photo: imageUrl,
      });

      const savedUser = await user.save();

      return response.status(200).json({
        message: "User created successfully",
        savedUser,
      });
    } else {
      return response.status(500).json({
        message: "Something went wrong",
      });
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ error: error.msg });
  }
};

export const getUser = async (request: Request, response: Response) => {
  console.log("Inside Get User");
  response.status(200).json({ message: "User Data" });
};
