import makeServer from "./app/server";
import makeRouter from "./app/router";

const port = 4000;
const server = makeServer();


server.use('/posts', makeRouter());

server.listen(port, () => console.log('listening on port', port));

