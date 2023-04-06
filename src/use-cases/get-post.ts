import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";
import makePost from "../entities";

export default function makeGetPost(db: PostsDBTransactions): UseCase<string, Post|null> {
    return async (id) => {
        const postAttr = await db.findOne(id);
        return postAttr ? makePost(postAttr, id) : null;
    }
}
