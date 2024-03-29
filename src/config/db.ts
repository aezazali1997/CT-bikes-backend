import { config } from "dotenv";
config();
import { DB_HOST, DB_PORT, DB_DATABASE, DB_URI } from "./index";
import mongoose from "mongoose";
let uri = DB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const connectDB = () => {
  mongoose
    .connect(`mongodb+srv://aezaz:aezaz@shahid.jbh6lv2.mongodb.net/ct-bikes`)
    .then((res) => {
      console.log(`MongoDB Connected: ${res.connection.host}`);
    })

    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
};

export default connectDB;
