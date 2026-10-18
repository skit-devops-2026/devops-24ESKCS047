import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI ||
    process.env.MONGO_URL ||
    "mongodb://localhost:27017/sayso";

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB at", mongoUri);
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    process.exit(1);
  }
};