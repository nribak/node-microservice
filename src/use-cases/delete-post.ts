import {UseCase} from "./types";
import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";
import makePost from "../entities";
import {MongoPostResult} from "../data-access/repositories/mongodb/entities/mongo-post";

export type DeletePostUseCase = UseCase<string, Post|null>;

export default function makeDeletePostUseCase(db: PostsDBTransactions): DeletePostUseCase {
    return async (id) => {
        const data = await db.deleteItem(id);
        if(data) {
            const id = (data as MongoPostResult)._id;
            return makePost(data, id.toHexString());
        } else return null;
    }
}
