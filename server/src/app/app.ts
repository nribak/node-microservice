import makeServer from "./server";
import makeRouter from "./router/router";
import {loggerMiddleware, verifyUserMiddleware} from "./router/middlewares";

const port = parseInt(process.env.PORT!);
const [app, server] = makeServer();

app.use(loggerMiddleware);

app.use('/posts', verifyUserMiddleware, makeRouter());

app.get('/ping', (req, res) => {
    res.send('pong');
})

server.listen(port, () => console.log('listening on port', port));
