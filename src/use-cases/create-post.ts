import makePost from "../entities";
import {PostsDBTransactions} from "../data-access/posts-db";
import Post from "../entities/post";
import {UseCase} from "./types";

export default function makeCreatePost(db: PostsDBTransactions): UseCase<any, Post|null> {
    return async (postInfo) => {
        const post = makePost(postInfo);
        await db.insert(post);
        return post;
    }
}
