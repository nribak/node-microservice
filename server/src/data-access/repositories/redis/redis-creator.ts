import { Redis } from "ioredis"

export default async function createRedisInstance(): Promise<Redis> {
    const client = new Redis({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!),
        password: process.env.REDIS_PASSWORD,
        lazyConnect: true,
    });
    await client.connect()
    return client;
}
