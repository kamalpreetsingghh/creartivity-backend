import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
      dbName: "creartivity",
      bufferCommands: false,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
