import http from 'http';
import app from './app';
import { config } from 'dotenv'
config();
const PORT = process.env.PORT
const server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`App is running on PORT ${PORT}`);
    })
}

startServer();