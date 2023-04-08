import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";
import makePost from "../entities";

export type ListPostsUseCase = UseCase<void, Post[]>;

export default function makeListPosts(db: PostsDBTransactions): ListPostsUseCase {
    return async () => {
        const items = await db.findAll();
        return items.map(({_id, ...rest}) => {
            return makePost(rest, _id?.toHexString());
        });
    }
}
