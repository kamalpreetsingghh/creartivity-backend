import { Request, Response } from "express";
import { getImages } from "../lib/cloudinary";

export const getAllImages = async (request: Request, response: Response) => {
  try {
    const res = await getImages();
    if (res.images) {
      return response.status(200).json(res.images);
    } else {
      return response
        .status(res.result.status)
        .json({ message: res.result.message });
    }
  } catch (error: any) {
    console.log(error);
    return response.status(500).json({ message: error.msg });
  }
};
