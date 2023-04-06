import makeListPosts from "./list-posts";
import makeGetPost from "./get-post";
import makeCreatePost from "./create-post";
import {postDB} from "../data-access";

export const createPostUseCase = makeCreatePost(postDB);
export const listPostsUseCase = makeListPosts(postDB);
export const getPostUseCase = makeGetPost(postDB);
