import {UseCase} from "./types";
import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-data-access";
import makePost from "../entities";

export type QueryPostUseCase = UseCase<{userId: string, query: string}, Post[]>;

export default function makeQueryPostUseCase(db: PostsDBTransactions): QueryPostUseCase {
    return async (params) => {
        const items = await db.queryItems.cache().exec(params);
        return items.map(({_id, ...rest}) => {
            return makePost(rest, _id?.toString());
        });
    }
}
