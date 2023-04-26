import Post from "../entities/post";
import {UseCase} from "./types";
import {PostsDBTransactions} from "../data-access/posts-data-access";
import makePost from "../entities";
import {makeMongoPost} from "../data-access/repositories/mongodb/entities";

export type CreatePostUseCase = UseCase<any, Post|null>;

export default function makeCreatePost(db: PostsDBTransactions): CreatePostUseCase {
    return async (postInfo) => {
        const mongoPost = makeMongoPost(postInfo);
        const id = await db.insert.cache().exec(mongoPost);
        if(id)
            return makePost(mongoPost, id);
        else return null;
    }
}
