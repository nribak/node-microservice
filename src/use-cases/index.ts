import makeListPosts from "./list-posts";
import makeGetPost from "./get-post";
import makeCreatePost from "./create-post";
import {postDB} from "../data-access";
import makeDeletePostUseCase from "./delete-post";

export const createPostUseCase = makeCreatePost(postDB);
export const listPostsUseCase = makeListPosts(postDB);
export const getPostUseCase = makeGetPost(postDB);
export const deletePostUseCase = makeDeletePostUseCase(postDB);
