import makeCreatePost from "./create-post";
import makeListPosts from "./list-posts";
import makeGetPost from "./get-post";
import postDB from "../data-access";

const db = postDB;

const createPostUseCase = makeCreatePost(db);
const listPostsUseCase = makeListPosts(db);
const getPostUseCase = makeGetPost(db);

export default Object.freeze({
    createPostUseCase, listPostsUseCase, getPostUseCase
});
