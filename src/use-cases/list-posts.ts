import Post from "../entities/post";
import {PostsDBTransactions} from "../data-access/posts-db";

export default function makeListPosts(db: PostsDBTransactions): () => Promise<Post[]> {
    return async () => await db.findAll();
}
