import DBAccess from "./db-access";
import {MongoPost, MongoPostResult} from "./repositories/mongodb/entities/mongo-post";
import {WithId} from "mongodb";
import CachingAccess from "./caching-access";

export interface PostsDBTransactions {
    insert: (post: MongoPost) => Promise<string|null>
    findOne: (id: string) => Promise<MongoPost|null>
    findAll: () => Promise<WithId<Partial<MongoPost>>[]>,
    deleteItem: (id: string) => Promise<MongoPost|null>,
    updateItem: (id: string, title: string, details: string) => Promise<MongoPost|null>
}

const createQuery = (attrName: keyof MongoPostResult, attrValue: any): string => `${attrName}::${attrValue}`
const listQueryName = 'posts';
const entityName = 'POSTS';


export default function makePostsDB(makeDB: () => DBAccess<MongoPost>, makeCache: () => CachingAccess): PostsDBTransactions {
    return {
        insert: async (post: MongoPost): Promise<string|null> => {
            const {insert} = makeDB();
            const {deleteQuery} = makeCache();
            const id = await insert(post);
            if(id)
                deleteQuery(entityName, listQueryName).then();
            return id;
        },
        findOne: async (id: string): Promise<MongoPost|null> => {
            const {find} = makeDB();
            const {getQuery, setQuery} = makeCache();
            const query = createQuery('_id', id);
            let item = await getQuery<MongoPost>(entityName, query);
            if(item === null) {
                item = await find(id);
                if(item)
                    setQuery(entityName, query, item).then();
            }
            return item;
        },
        findAll: async (): Promise<WithId<Partial<MongoPost>>[]> => {
            const {queryBy} = makeDB();
            const {getQuery, setQuery} = makeCache();
            let items = await getQuery<WithId<Partial<MongoPost>>[]>(entityName, listQueryName)
            if(items === null) {
                items = await queryBy({});
                if(items && items.length > 0) {
                    setQuery(entityName, listQueryName, items).then();
                }
            }
            return items;
        },
        deleteItem: (id: string) => {
            const {deleteById} = makeDB();
            const {deleteQuery} = makeCache();
            deleteQuery(entityName, createQuery('_id', id)).then();
            deleteQuery(entityName, listQueryName).then();
            return deleteById(id);
        },
        updateItem: async (id: string, title?: string, details?: string): Promise<MongoPost|null> => {
            const {findAndUpdate} = makeDB();
            const {setQuery, deleteQuery} = makeCache();
            const data = await findAndUpdate(id, {title, details});
            if(data) {
                setQuery(entityName, createQuery('_id', id), data).then();
                deleteQuery(entityName, listQueryName).then();
            }
            return data;
        }
    }
}
