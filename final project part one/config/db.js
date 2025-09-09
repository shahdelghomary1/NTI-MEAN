import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      // options can be left default in mongoose v6+
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
