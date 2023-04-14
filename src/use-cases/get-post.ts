import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import {CommonUseCaseParams, UseCase} from "./types";
import makePost from "../entities";

export type GetPostUseCase = UseCase<CommonUseCaseParams, Post|null>;

export default function makeGetPost(db: PostsDBTransactions): GetPostUseCase {
    return async ({id, userId}) => {
        const postAttr = await db.findOne(id, userId);
        return postAttr ? makePost(postAttr, id) : null;
    }
}
