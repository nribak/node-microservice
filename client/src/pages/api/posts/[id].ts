import {NextApiRequest, NextApiResponse} from "next";
import getAPI, {Post} from "../../../data/postsAPI";
import getSessionUserId from "@/data/session.middleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    const {method} = req;
    const userId = await getSessionUserId(req, res);
    let post: Post|null = null;
    if (id && userId) {
        const api = getAPI('posts', userId.toString());
        switch (method) {
            case 'GET':
                post = await api.getPost(id.toString());
                break;
            case 'DELETE':
                post = await api.deletePost(id.toString());
                break;
            case 'PUT':
                const {title, details} = req.body;
                post = await api.updatePost(id.toString(), title, details);
                break;
        }

    }
    if(post)
        res.status(200).json(post);
    else
        res.status(404).json({message: 'post not found'});
}
