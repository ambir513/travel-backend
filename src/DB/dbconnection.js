import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URL = process.env.DB_URL;

const connectDB = async () => {
  const connectIntansce = await mongoose.connect(URL);
  console.log(
    `MongoDB is connected DB name: ${connectIntansce.connection.name}`
  );
};

export default connectDB;
