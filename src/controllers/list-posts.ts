import {Controller} from "./types";
import {ListPostsUseCase} from "../use-cases/list-posts";

export default function makeListPosts(listPostsUseCase: ListPostsUseCase): Controller {
    return async ({userId}) => {
        const posts = await listPostsUseCase(userId);
        return {
            statusCode: 200,
            json: posts
        }
    }
}
