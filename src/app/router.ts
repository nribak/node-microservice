import {Request, Response, Router} from "express";
import {Controller, RequestWrapper} from "../controllers/types";
import {createPost, findPost, listPosts} from "../controllers";

const makeExpressCallback = (controller: Controller): (req: Request, res: Response) => void => {
    return async (req, res) => {
        const requestWrapper: RequestWrapper = {
            body: req.body,
            query: req.params,
            headers: req.headers
        }
        const {json, statusCode} = await controller(requestWrapper);
        res.statusCode = statusCode;
        res.json(json);
    }
}


export default function makeRouter(): Router {
    const router = Router();

    router.use((req, res, next) => {
        console.log('request', req.method, req.path);
        next();
    });

    router.post('/',  makeExpressCallback(createPost));
    router.get('/', makeExpressCallback(listPosts));
    router.get('/:id', makeExpressCallback(findPost));
    return router;

}
