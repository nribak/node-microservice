import {NextFunction, Request, Response} from "express";

export const verifyUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.query;
    if(userId && typeof userId === 'string')
        next();
    else throw Error('')
}
