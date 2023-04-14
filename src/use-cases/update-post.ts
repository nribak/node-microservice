import {CommonUseCaseParams, UseCase} from "./types";
import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import makePost from "../entities";

export type UpdatePostUseCase = UseCase<[CommonUseCaseParams, any], Post|null>;

export default function makeUpdatePostUseCase(db: PostsDBTransactions): UpdatePostUseCase {
    return async ([{id, userId}, attr]) => {
        if(!id) return null;
        const mongoPost = await db.updateItem(id, userId,attr.title, attr.details);
        return mongoPost ? makePost(mongoPost, id) : null;
    }
}
