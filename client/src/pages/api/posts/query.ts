import {NextApiRequest, NextApiResponse} from "next";
import getAPI from "@/data/postsAPI";
import getSessionUserId from "@/data/session.middleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = await getSessionUserId(req, res);
    const {query} = req.query;
    if(userId && typeof query === 'string') {
        const data = await getAPI('posts', userId).queryPosts(query)
        res.status(200).json(data);
    }
}
