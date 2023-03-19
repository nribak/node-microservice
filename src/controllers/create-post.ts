import {Controller} from "./types";
import Post from "../entities/post";

export default function makeCreatePost(createPostUseCase: (postInfo: any) => Promise<Post|null>): Controller {
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
