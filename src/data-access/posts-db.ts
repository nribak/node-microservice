import DBAccess from "./db-access";
import {MongoPost} from "./repositories/mongodb/entities/mongo-post";

export interface PostsDBTransactions {
    insert: (post: MongoPost) => Promise<string|null>
    findOne: (id: string) => Promise<MongoPost|null>
    findAll: () => Promise<MongoPost[]>,
    deleteItem: (id: string) => Promise<MongoPost|null>
}
export default function makePostsDB(makeDB: () => DBAccess<MongoPost>): PostsDBTransactions {
    return Object.freeze({
        insert: async (post: MongoPost): Promise<string|null> => {
            const {insert} = makeDB();
            return await insert(post);
        },
        findOne: async (id: string): Promise<MongoPost|null> => {
            const {find} = makeDB();
            return await find(id)
        },
        findAll: async (): Promise<MongoPost[]> => {
            const {queryBy} = makeDB();
            return await queryBy({});
        },
        queryByTitle: async (title: string): Promise<MongoPost[]> => {
            const {queryBy} = makeDB();
            return await queryBy({title})
        },
        deleteItem: (id: string) => {
            const {deleteById} = makeDB();
            return deleteById(id);
        }
    })
}
