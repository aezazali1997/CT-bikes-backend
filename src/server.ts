import http from 'http';
import app from './app';
import {
    PORT
} from './config/index';



const server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`App is running on PORT ${PORT}`);
    })
}

startServer();