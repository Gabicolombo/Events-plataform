import mongoose from 'mongoose';

const connectMongoDb = async() => {
  const uri = process.env.MONGODB_URI as string;
  try{
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  }catch(err){
    console.error("MongoDB connection error:", err);
  }
}

export default connectMongoDb;