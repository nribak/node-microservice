import express, {Express} from 'express';
import https, {Server} from "https";
import fs from 'fs';
import path from 'path';

export default function makeServer(): [Express, Server] {
    const app = express();
    app.use(express.json());
    const server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, '..', '..', 'pem', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '..', '..', 'pem', 'cert.pem')),
    }, app);

    return [app, server];
}



