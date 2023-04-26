import makeServer from "./server";
import makeRouter from "./router/router";
import {verifyUserMiddleware} from "./router/middlewares";

const port = parseInt(process.env.PORT!);
const server = makeServer();
server.use((req, res, next) => {
    console.log(req.method, req.url, req.params, req.path, req.query);
    next();
});



server.use('/posts', verifyUserMiddleware, makeRouter());

server.get('/ping', (req, res) => {
    res.send('pong');
})

server.listen(port, () => console.log('listening on port', port));
