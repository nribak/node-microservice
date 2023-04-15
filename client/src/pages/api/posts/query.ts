import {NextApiRequest, NextApiResponse} from "next";
import {getFakeUserId} from "@/data/utils";
import getAPI from "@/data/postsAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = getFakeUserId(req, res);
    const {query} = req.query;
    if(typeof query === 'string') {
        const data = await getAPI('posts', userId).queryPosts(query?.toString())
        res.status(200).json(data);
    } else
        res.status(404).json({});
}
