import DBAccess from "./db-access";
import {MongoPost} from "./repositories/mongodb/entities/mongo-post";
import {WithId} from "mongodb";

export interface PostsDBTransactions {
    insert: (post: MongoPost) => Promise<string|null>
    findOne: (id: string) => Promise<MongoPost|null>
    findAll: () => Promise<WithId<Partial<MongoPost>>[]>,
    deleteItem: (id: string) => Promise<MongoPost|null>,
    updateItem: (id: string, title: string, details: string) => Promise<MongoPost|null>
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
        findAll: async (): Promise<WithId<Partial<MongoPost>>[]> => {
            const {queryBy} = makeDB();
            return await queryBy({});
        },
        deleteItem: (id: string) => {
            const {deleteById} = makeDB();
            return deleteById(id);
        },
        updateItem: async (id: string, title?: string, details?: string): Promise<MongoPost|null> => {
            const {findAndUpdate} = makeDB();
            return findAndUpdate(id, {title, details})
        }
    })
}
