import {postDB} from "../data-access";
import makeListPosts from "./list-posts";
import makeGetPost from "./get-post";
import makeCreatePost from "./create-post";
import makeDeletePostUseCase from "./delete-post";
import makeUpdatePostUseCase from "./update-post";
import makeQueryPostUseCase from "./query-post";

export const createPostUseCase = makeCreatePost(postDB);
export const listPostsUseCase = makeListPosts(postDB);
export const getPostUseCase = makeGetPost(postDB);
export const deletePostUseCase = makeDeletePostUseCase(postDB);
export const updatePostUseCase = makeUpdatePostUseCase(postDB);
export const queryPostsUseCase = makeQueryPostUseCase(postDB);
