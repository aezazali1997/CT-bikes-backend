import http from 'http';
import app from './app';
import { config } from "dotenv";
config();
const port = 3000;
import connectDB from "./config/db";
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`app is listenting on ${port}`);
});
