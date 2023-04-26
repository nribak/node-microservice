import {NextFunction, Request, Response} from "express";

export const verifyUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.query;
    if(userId && typeof userId === 'string')
        next();
    else throw Error('')
}

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.url, req.params, req.path, req.query);
    next();
}
