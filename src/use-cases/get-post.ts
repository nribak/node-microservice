import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";

export default function makeGetPost(db: PostsDBTransactions): (id: string) => Promise<Post|null> {
    return async (id) => await db.findOne(id);
}
