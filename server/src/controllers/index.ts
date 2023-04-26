import {
    createPostUseCase,
    deletePostUseCase,
    getPostUseCase,
    listPostsUseCase,
    queryPostsUseCase,
    updatePostUseCase
} from "../use-cases";
import makeCreatePost from "./create-post";
import makeFindPost from "./find-post";
import makeListPosts from "./list-posts";
import makeDeletePostController from "./delete-post";
import makeUpdatePostController from "./update-post";
import makeQueryPostsController from "./query-posts";

export const createPost = makeCreatePost(createPostUseCase);
export const findPost = makeFindPost(getPostUseCase);
export const listPosts = makeListPosts(listPostsUseCase);
export const deletePost = makeDeletePostController(deletePostUseCase);
export const updatePost = makeUpdatePostController(updatePostUseCase);
export const queryPost = makeQueryPostsController(queryPostsUseCase);
