import {Controller} from "./types";
import {CreatePostUseCase} from "../use-cases/create-post";

export default function makeCreatePostController(createPostUseCase: CreatePostUseCase): Controller {
    return async ({body, userId}) => {
        const post = await createPostUseCase({...body, userId});
        if(post)
            return {
                statusCode: 201,
                json: post
            }
        else return {
            statusCode: 500,
            json: {}
        }
    }
}
