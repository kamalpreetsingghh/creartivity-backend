import { Request, Response, response } from "express";

import { getImages } from "../lib/cloudinary";
import { IImage } from "../models/imageModel";
import { ImageId } from "../common.types";

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

export const getImagesIds = async (request: Request, response: Response) => {
  try {
    let searchQuery = request.query.searchQuery
      ? (request.query.searchQuery as string)
      : "";

    const res = await getImages(searchQuery);
    if (res.images) {
      const imagesIds: any[] = res.images.map(
        (image: IImage): ImageId => ({
          id: image._id,
          title: image.title,
          secureURL: image.secureURL,
        })
      );

      return response.status(200).json(imagesIds);
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
