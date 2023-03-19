import makePost from "../entities";
import {PostsDBTransactions} from "../data-access/posts-db";
import Post from "../entities/post";

export default function makeCreatePost(db: PostsDBTransactions): (postInfo: any) => Promise<Post|null> {
    return async (postInfo) => {
        const post = makePost(postInfo);
        await db.insert(post);
        return post;
    }
}
