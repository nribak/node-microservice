import {Router} from "express";
import {createPostController, deletePostController, findPostController, listPostsController, queryPostController, updatePostController} from "../../controllers";
import {makeExpressCallback} from "./utils";


export default function makeRouter(): Router {
    const router = Router();
    router.post('/',  makeExpressCallback(createPostController));
    router.get('/', makeExpressCallback(listPostsController));
    router.get('/query', makeExpressCallback(queryPostController));
    router.get('/:id', makeExpressCallback(findPostController));
    router.delete('/:id', makeExpressCallback(deletePostController));
    router.put('/:id', makeExpressCallback(updatePostController));
    return router;

}
