import makePostsDB from "./posts-data-access";
import MongoDBInstance from "./repositories/mongodb/mongo-creator";
import {makeMongoPostRepository} from "./repositories/mongodb/mongo-post-repository";
import createRedisInstance from "./repositories/redis/redis-creator";
import makeRedisCacheRepository from "./repositories/redis/redis-cache-repository";

const redisInstance = createRedisInstance();
const mongoInstance = new MongoDBInstance();

const mongoPostDBRepository = makeMongoPostRepository(mongoInstance);
const redisCacheRepository = makeRedisCacheRepository(redisInstance);

export const postDB = makePostsDB(mongoPostDBRepository, redisCacheRepository);


