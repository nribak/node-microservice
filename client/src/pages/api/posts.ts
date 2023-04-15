import {NextApiRequest, NextApiResponse} from "next";
import {getFakeUserId} from "@/data/utils";
import getAPI, {Post} from "@/data/postsAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;
    const userId = getFakeUserId(req, res);
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
