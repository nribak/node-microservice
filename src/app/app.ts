import makeServer from "./server";
import makeRouter from "./router";

const port = 4000;
const server = makeServer();


server.use('/posts', makeRouter());

server.listen(port, () => console.log('listening on port', port));

