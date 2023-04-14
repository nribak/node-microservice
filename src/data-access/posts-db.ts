import DBAccess from "./db-access";
import {MongoPost, MongoPostResult} from "./repositories/mongodb/entities/mongo-post";
import {WithId} from "mongodb";
import CachingAccess from "./caching-access";

export interface PostsDBTransactions {
    insert: (post: MongoPost) => Promise<string|null>
    findOne: (id: string, userId: string) => Promise<MongoPost|null>
    findAll: (userId: string) => Promise<WithId<Partial<MongoPost>>[]>,
    deleteItem: (id: string, userId: string) => Promise<MongoPost|null>,
    updateItem: (id: string ,userId: string, title: string, details: string) => Promise<MongoPost|null>
}
const entityName = 'POSTS';
const createQuery = (userId: string, query?: Partial<MongoPostResult>): [string, string] => {
    const entity = `${entityName}::${userId}`;
    const field = Object.entries(query ?? {}).map(([key, value]) => `${key}::${value}`).join(',');
    return [entity, field.length > 0 ? field : '*'];
}

export default function makePostsDB(makeDB: () => DBAccess<MongoPost>, makeCache: () => CachingAccess): PostsDBTransactions {
    return {
        insert: async (post: MongoPost): Promise<string|null> => {
            const {insert} = makeDB();
            const {deleteQuery} = makeCache();
            const [queryEntry] = createQuery(post.userId);
            const id = await insert(post);
            if(id)
                deleteQuery(queryEntry).then();
            return id;
        },
        findOne: async (id: string, userId): Promise<MongoPost|null> => {
            const {find} = makeDB();
            const {getQuery, setQuery} = makeCache();
            const [queryEntry, queryField] = createQuery(userId, {_id: id})
            let item = await getQuery<MongoPost>(queryEntry, queryField);
            if(item === null) {
                item = await find(id);
                if(item)
                    setQuery(queryEntry, queryField, item).then();
            }
            return item;
        },
        findAll: async (userId): Promise<WithId<Partial<MongoPost>>[]> => {
            const {queryBy} = makeDB();
            const {getQuery, setQuery} = makeCache();
            const [queryEntry, queryField] = createQuery(userId, {});
            let items = await getQuery<WithId<Partial<MongoPost>>[]>(queryEntry, queryField)
            if(items === null) {
                items = await queryBy({userId});
                if(items && items.length > 0) {
                    setQuery(queryEntry, queryField, items).then();
                }
            }
            return items;
        },
        deleteItem: (id: string, userId: string) => {
            const {deleteById} = makeDB();
            const {deleteQuery} = makeCache();
            const [queryEntry] = createQuery(userId);
            deleteQuery(queryEntry).then();
            return deleteById(id);
        },
        updateItem: async (id: string, userId: string, title?: string, details?: string): Promise<MongoPost|null> => {
            const {findAndUpdate} = makeDB();
            const {deleteQuery} = makeCache();
            const data = await findAndUpdate(id, {title, details});
            if(data) {
                const [queryEntry] = createQuery(userId);
                deleteQuery(queryEntry).then();
            }
            return data;
        }
    }
}
