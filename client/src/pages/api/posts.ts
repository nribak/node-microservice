import {NextApiRequest, NextApiResponse} from "next";
import {getCookie, setCookie} from "cookies-next";
import getAPI, {Post} from "../../data/postsAPI";
import crypto from "crypto";

const getUserId = (req: NextApiRequest, res: NextApiResponse): string => {
    let userId = getCookie('userid', {req, res});
    if(!userId || typeof userId !== 'string') {
       userId = crypto.randomUUID();
       setCookie('userid', userId, {req, res})
    }
    return userId;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    const userId = getUserId(req, res); //TODO: this is a temp solution to create a userId
    let result: Post[]|Post|null = null;
    if(userId) {
        const api = getAPI('posts', userId.toString());
        switch (method) {
            case 'GET':
                result = await api.listPosts()
                break;
            case 'POST':
                const {title, details} = req.body;
                result = await api.createPost(title, details);
                break;
        }
    }
    if(result)
        res.status(200).json(result);
    else
        res.status(404).json({});
}
