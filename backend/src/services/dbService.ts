import mongoose from "mongoose";

const connectToDatabase = async (dbUri: string): Promise<void> => {    
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
};

export default connectToDatabase;
