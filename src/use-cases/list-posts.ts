import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";

export default function makeListPosts(db: PostsDBTransactions): UseCase<void, Post[]> {
    return async () => await db.findAll();
}
