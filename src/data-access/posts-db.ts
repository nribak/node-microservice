import Post from "../entities/post";
import DBAccess from "./db-access";

export interface PostsDBTransactions {
    insert: (post: Post) => Promise<boolean>
    findOne: (id: string) => Promise<Post|null>
    findAll: () => Promise<Post[]>
    queryByTitle: (title: string) => Promise<Post[]>
}
export default function makePostsDB(makeDB: () => DBAccess<Post>): PostsDBTransactions {
    return Object.freeze({
        insert: async (post: Post): Promise<boolean> => {
            const {insert} = makeDB();
            return await insert(post);
        },
        findOne: async (id: string): Promise<Post|null> => {
            const {find} = makeDB();
            return await find(id)
        },
        findAll: async (): Promise<Post[]> => {
            const {queryBy} = makeDB();
            return await queryBy({});
        },
        queryByTitle: async (title: string): Promise<Post[]> => {
            const {queryBy} = makeDB();
            return await queryBy({title})
        }
    })
}
