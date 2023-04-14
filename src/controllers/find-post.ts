import {Controller} from "./types";
import {GetPostUseCase} from "../use-cases/get-post";

export default function makeFindPost(getPostUseCase: GetPostUseCase): Controller {
    return async ({params, userId}) => {
        const id = params?.id;
        const post = id ? await getPostUseCase({id, userId}) : null;
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
