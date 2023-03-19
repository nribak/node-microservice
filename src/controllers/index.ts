import {createPostUseCase, getPostUseCase, listPostsUseCase} from "../use-cases";
import makeCreatePost from "./create-post";
import makeFindPost from "./find-post";
import makeListPosts from "./list-posts";

export const createPost = makeCreatePost(createPostUseCase);
export const findPost = makeFindPost(getPostUseCase);
export const listPosts = makeListPosts(listPostsUseCase);
