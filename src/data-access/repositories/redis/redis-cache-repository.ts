import CachingAccess from "../../caching-access";
import Redis from "ioredis";

export default function makeRedisCacheRepository<E extends object>(redis: Promise<Redis>): () => CachingAccess {
    const defaultExpireSeconds = parseInt(process.env.REDIS_EXPIRE!);
    return () => ({
        setQuery: async (entity, query, item) => {
            const client = await redis;
            await client.hset(entity, query, JSON.stringify(item));
            await client.expire(entity, defaultExpireSeconds);
        },
        getQuery: async <T> (entity: string, query: string): Promise<T> => {
            const client = await redis;
            const data = await client.hget(entity, query);
            return data ? JSON.parse(data) : null;
        },
        deleteQuery: async (entity, query) => {
            const client = await redis;
            if(query)
                await client.hdel(entity, query);
            else
                await client.del(entity);
        }
    })
}
