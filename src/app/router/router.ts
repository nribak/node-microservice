import {Router} from "express";
import {createPost, deletePost, findPost, listPosts, updatePost} from "../../controllers";
import {makeExpressCallback} from "./utils";


export default function makeRouter(): Router {
    const router = Router();
    router.post('/',  makeExpressCallback(createPost));
    router.get('/', makeExpressCallback(listPosts));
    router.get('/:id', makeExpressCallback(findPost));
    router.delete('/:id', makeExpressCallback(deletePost));
    router.put('/:id', makeExpressCallback(updatePost));
    return router;

}
