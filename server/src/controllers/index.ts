import {
    createPostUseCase,
    deletePostUseCase,
    getPostUseCase,
    listPostsUseCase,
    queryPostsUseCase,
    updatePostUseCase
} from "../use-cases";
import makeCreatePostController from "./create-post";
import makeFindPostController from "./find-post";
import makeListPostsController from "./list-posts";
import makeDeletePostController from "./delete-post";
import makeUpdatePostController from "./update-post";
import makeQueryPostsController from "./query-posts";

export const createPostController = makeCreatePostController(createPostUseCase);
export const findPostController = makeFindPostController(getPostUseCase);
export const listPostsController = makeListPostsController(listPostsUseCase);
export const deletePostController = makeDeletePostController(deletePostUseCase);
export const updatePostController = makeUpdatePostController(updatePostUseCase);
export const queryPostController = makeQueryPostsController(queryPostsUseCase);
