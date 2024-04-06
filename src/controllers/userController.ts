import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { CreateUser } from "../common.types";
import { signinClerk, signupClerk } from "../lib/clerk";

export const signUp = async (request: Request, response: Response) => {
  try {
    const createUser: CreateUser = request.body;

    const clerkResponse = await signupClerk(createUser);

    if (clerkResponse.user) {
      const { clerkId, firstName, lastName, username, email, photo } =
        clerkResponse.user;

      const user: IUser = new User({
        clerkId: clerkId,
        email: email,
        username: username!,
        firstName: firstName,
        lastName: lastName,
        photo: photo,
      });

      const savedUser = await user.save();

      return response.status(200).json(savedUser);
    } else {
      return response.status(clerkResponse.result.status).json({
        message: clerkResponse.result.message,
      });
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ message: error.msg });
  }
};

export const signIn = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email }).exec();

    if (user) {
      const isVerified = await signinClerk(user.clerkId, password);

      if (isVerified) {
        return response.status(200).json(user);
      } else {
        return response
          .status(401)
          .json({ message: "Incorrect username or password" });
      }
    }

    return response.status(404).json({ message: "User does not exist" });
  } catch (error) {
    console.log(error);
  }
};
