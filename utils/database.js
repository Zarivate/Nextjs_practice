// File to be used to connect to mongodb database for any necessarry conections
import mongoose from "mongoose";

// Variable to help track connection status
let isConnected = false;

// Function to make a connection to the database
export const connectToDB = async () => {
  // Set the options to avoid console warnings
  mongoose.set("strictQuery", true);

  // Check if there is already a connection
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  // If not already connected, attempt to connect
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "make_post",
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
