import cors, {CorsOptions} from 'cors';
import makeServer from "./server";
import makeRouter from "./router";

const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000'
}
const port = parseInt(process.env.PORT!);
const server = makeServer();

server.use('/posts', cors(corsOptions), makeRouter());
server.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

//test redis here...

// const client = createClient({
//     password: 'LKuz9VpOjYIRpMRj6T47VJiMWeGl7KVm',
//     socket: {
//         host: 'redis-16239.c93.us-east-1-3.ec2.cloud.redislabs.com',
//         port: 16239
//     }
// });
//
// client.connect().then(() => {
//     console.log('redis is connected!!')
//     // client.set('my-key', 'my-value').then(r => {
//     //     console.log('data returned from redis')
//     //     console.log(r);
//     // })
//     client.get('my-key').then((res) => {
//
//         console.log(res);
//     })
// })
//

server.listen(port, () => console.log('listening on port', port));
