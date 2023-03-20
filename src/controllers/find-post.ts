import Post from "../entities/post";
import {Controller} from "./types";
import {UseCase} from "../use-cases/types";

export default function makeFindPost(getPostUseCase: UseCase<string, Post|null>): Controller {
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
