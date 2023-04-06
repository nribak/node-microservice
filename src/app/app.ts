import makeServer from "./server";
import makeRouter from "./router";

const port = 4000;
const server = makeServer();

server.use('/posts', makeRouter());
server.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

server.listen(port, () => console.log('listening on port', port));
