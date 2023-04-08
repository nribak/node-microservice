import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {UseCase} from "./types";
import makePost from "../entities";

export type GetPostUseCase = UseCase<string, Post|null>;

export default function makeGetPost(db: PostsDBTransactions): GetPostUseCase {
    return async (id) => {
        const postAttr = await db.findOne(id);
        return postAttr ? makePost(postAttr, id) : null;
    }
}
