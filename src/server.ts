import http from 'http';
import app from './app';

import connectDB from "./config/db";
const server = http.createServer(app);
connectDB(server);
