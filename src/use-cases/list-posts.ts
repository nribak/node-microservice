import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";
import makePost from "../entities";

export type ListPostsUseCase = UseCase<string, Post[]>;

export default function makeListPosts(db: PostsDBTransactions): ListPostsUseCase {
    return async (userId) => {
        const items = await db.findAll(userId);
        return items.map(({_id, ...rest}) => {
            return makePost(rest, _id?.toString());
        });
    }
}
