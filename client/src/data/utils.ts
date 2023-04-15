import dateHelper from 'date-and-time';
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie, setCookie} from "cookies-next";
import crypto from "crypto";

export const printableDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return dateHelper.format(date, 'YYYY/MM/DD HH:mm:ss')
}

//TODO: temp solution for creating fake user-id
export function getFakeUserId(req: NextApiRequest, res: NextApiResponse): string {
    let userId = getCookie('userid', {req, res});
    if(!userId || typeof userId !== 'string') {
        userId = crypto.randomUUID();
        setCookie('userid', userId, {req, res})
    }
    return userId;
}
