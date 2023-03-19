import Post from "../entities/post";
import {Controller} from "./types";

export default function makeFindPost(getPostUseCase: (id: string) => Promise<Post|null>): Controller {
    return async ({query}) => {
        const id = query?.id;
        const post = id ? await getPostUseCase(id) : null;
        if(post)
            return {
                statusCode: 200,
                json: post
            }
        else return {
            statusCode: 404,
            json: {}
        }
    }
}
