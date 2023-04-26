import {QueryPostUseCase} from "../use-cases/query-post";
import {Controller} from "./types";

export default function makeQueryPostsController(queryPostUseCase: QueryPostUseCase): Controller {
    return async ({userId, query})=> {
        const posts = await queryPostUseCase({userId, query: query.query});
        return {
            statusCode: 200,
            json: posts
        }
    }
}
