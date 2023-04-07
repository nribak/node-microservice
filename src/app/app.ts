import cors, {CorsOptions} from 'cors';
import makeServer from "./server";
import makeRouter from "./router";

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000'
}

const port = 4000;
const server = makeServer();

server.use('/posts', cors(corsOptions), makeRouter());
server.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

server.listen(port, () => console.log('listening on port', port));
