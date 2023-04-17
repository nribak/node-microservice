import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-data-access";
import {CommonUseCaseParams, UseCase} from "./types";
import makePost from "../entities";

export type GetPostUseCase = UseCase<CommonUseCaseParams, Post|null>;

export default function makeGetPost(db: PostsDBTransactions): GetPostUseCase {
    return async ({id, userId}) => {
        const postAttr = await db.findOne.cache().exec({id, userId});
        return postAttr ? makePost(postAttr, id) : null;
    }
}
