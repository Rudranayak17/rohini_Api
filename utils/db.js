import mongoose from "mongoose";
export const connectDB = async (uri) => {
  try {
    const dbConnect = await mongoose.connect(uri, {
      dbName: "rohini-venture",

    });
    console.log(`MongoDB Connected: ${dbConnect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};