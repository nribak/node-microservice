import CachingAccess from "../../caching-access";
import Redis from "ioredis";

export default function makeRedisCacheRepository<E extends object>(redis: Promise<Redis>): () => CachingAccess {
    return () => ({
        setQuery: async (entity, query, item) => {
            const client = await redis;
            await client.hset(entity, query, JSON.stringify(item));
        },
        getQuery: async <T> (entity: string, query: string): Promise<T> => {
            const client = await redis;
            const data = await client.hget(entity, query);
            return data ? JSON.parse(data) : null;
        },
        deleteQuery: async (entity, query) => {
            const client = await redis;
            await client.hdel(entity, query);
        }
    })
}
