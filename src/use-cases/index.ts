import makeCreatePost from "./create-post";
import makeListPosts from "./list-posts";
import makeGetPost from "./get-post";
import postDB from "../data-access";

const db = postDB;

export const createPostUseCase = makeCreatePost(db);
export const listPostsUseCase = makeListPosts(db);
export const getPostUseCase = makeGetPost(db);
