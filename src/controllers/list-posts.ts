import Post from "../entities/post";
import {Controller} from "./types";

export default function makeListPosts(listPostsUseCase: () => Promise<Post[]>): Controller {
    return async () => {
        const posts = await listPostsUseCase();
        return {
            statusCode: 200,
            json: posts
        }
    }
}
