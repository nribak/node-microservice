import express, {Express} from 'express';

export default function makeServer(): Express {
    const app = express();
    app.use(express.json());
    return app;
}



