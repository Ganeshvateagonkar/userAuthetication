import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`database connected ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
