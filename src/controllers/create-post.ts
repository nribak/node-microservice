import {Controller} from "./types";
import {CreatePostUseCase} from "../use-cases/create-post";

export default function makeCreatePost(createPostUseCase: CreatePostUseCase): Controller {
    return async ({body}) => {
        const post = await createPostUseCase(body);
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
