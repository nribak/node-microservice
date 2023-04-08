import {UpdatePostUseCase} from "../use-cases/update-post";
import {Controller} from "./types";

export default function makeUpdatePostController(updatePostUseCase: UpdatePostUseCase): Controller {
    return async ({query, body}) => {
        const id = query?.id;
        if(!id) return {
            statusCode: 404,
            json: {}
        }
        const post = await updatePostUseCase([id, body]);
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
