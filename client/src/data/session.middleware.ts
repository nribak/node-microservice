import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {AppSession} from "@/data/app.session";

export default async function getSessionUserId(req: NextApiRequest, res: NextApiResponse): Promise<string | undefined> {
    const session = await getServerSession(req, res, authOptions) as AppSession;
    if(session?.id)
        return session?.id;
    else {
        res.status(401).json({message: 'you should be logged in'});
        return undefined;
    }
}
