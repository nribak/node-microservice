import Post from "../entities/post";
import {Controller} from "./types";
import {UseCase} from "../use-cases/types";

export default function makeListPosts(listPostsUseCase: UseCase<void, Post[]>): Controller {
    return async () => {
        const posts = await listPostsUseCase();
        return {
            statusCode: 200,
            json: posts
        }
    }
}
