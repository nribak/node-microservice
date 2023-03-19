import makePostsDB from "./posts-db";
import makeLocalPostRepository from "../repositories/post-local-repository";

const localPostRepository = makeLocalPostRepository();
const postDB = makePostsDB(localPostRepository);


export default postDB;
