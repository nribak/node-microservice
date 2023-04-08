import {UseCase} from "./types";
import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import makePost from "../entities";

export type UpdatePostUseCase = UseCase<[string, any], Post|null>;

export default function makeUpdatePostUseCase(db: PostsDBTransactions): UpdatePostUseCase {
    return async ([id, attr]) => {
        if(!id) return null;
        const mongoPost = await db.updateItem(id, attr.title, attr.details);
        return mongoPost ? makePost(mongoPost, id) : null;
    }
}
