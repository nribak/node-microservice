import makePost from "../entities";
import {PostsDBTransactions} from "../data-access/posts-db";

export default function makeCreatePost(db: PostsDBTransactions): (postInfo: any) => Promise<boolean> {
    return async (postInfo) => {
        const post = makePost(postInfo);
        await db.insert(post);
        return true;
    }
}
