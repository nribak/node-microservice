import {CommonUseCaseParams, UseCase} from "./types";
import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-data-access";
import makePost from "../entities";
import {MongoPostResult} from "../data-access/repositories/mongodb/entities/mongo-post";

export type DeletePostUseCase = UseCase<CommonUseCaseParams, Post|null>;

export default function makeDeletePostUseCase(db: PostsDBTransactions): DeletePostUseCase {
    return async ({id, userId}) => {
        const data = await db.deleteItem.cache().exec({id, userId});
        if(data) {
            const id = (data as MongoPostResult)._id;
            return makePost(data, id);
        } else return null;
    }
}
