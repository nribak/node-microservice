import makePostsDB from "./posts-db";
import MongoDBInstance from "./repositories/mongodb/mongo-creator";
import {makeMongoPostRepository} from "./repositories/mongodb/mongo-post-repository";

const mongoInstance = new MongoDBInstance();

// const localPostRepository: () => DBAccess<MongoPost> = makeLocalRepository<MongoPost>({});
const mongoPostDBRepository = makeMongoPostRepository(mongoInstance);

export const postDB = makePostsDB(mongoPostDBRepository);


