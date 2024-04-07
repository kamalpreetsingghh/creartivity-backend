import { v2 as cloudinary } from "cloudinary";
import Image from "../models/imageModel";
import User from "../models/userModel";
import { ImagesResponse } from "../common.types";

export const getImages = async (
  searchQuery: string = ""
): Promise<ImagesResponse> => {
  console.log(searchQuery);
  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = "folder=creartivity";

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    let query = {};

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourceIds,
        },
      };
    }

    const images = await populateUser(Image.find(query));

    if (images) {
      return {
        images: images,
        result: { status: 200, message: "" },
      };
    }

    return {
      images: null,
      result: { status: 404, message: "No images found" },
    };
  } catch (error: any) {
    console.log(error);

    const response: ImagesResponse = {
      images: null,
      result: { status: 500, message: error.msg },
    };

    return response;
  }
};

const populateUser = (query: any) =>
  query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName clerkId",
  });
