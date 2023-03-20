import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";

export default function makeGetPost(db: PostsDBTransactions): UseCase<string, Post|null> {
    return async (id) => await db.findOne(id);
}
