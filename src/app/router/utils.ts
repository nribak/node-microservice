import {Controller, RequestWrapper} from "../../controllers/types";
import {Request, Response} from "express";
export const makeExpressCallback = (controller: Controller): (req: Request, res: Response) => void => {
    return async (req, res) => {
        const {userId} = req.query;
        const requestWrapper: RequestWrapper = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            userId: (typeof userId === 'string') ? userId : ''
        }
        const {json, statusCode} = await controller(requestWrapper);
        res.statusCode = statusCode;
        res.json(json);
    }
}

