import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";
import makePost from "../entities";
import {MongoPostResult} from "../data-access/repositories/mongodb/entities/mongo-post";

export type ListPostsUseCase = UseCase<void, Post[]>;

export default function makeListPosts(db: PostsDBTransactions): ListPostsUseCase {
    return async () => {
        const items = await db.findAll();
        return items.map((item) => {
            const mongoPost = item as MongoPostResult;
            return makePost(mongoPost, mongoPost._id.toHexString());
        });
    }
}
