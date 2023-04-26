import DBAccess from "./interfaces/db-access";
import {MongoPost} from "./repositories/mongodb/entities/mongo-post";
import {WithId} from "mongodb";
import CachingAccess from "./interfaces/caching-access";
import DataAccess from "./interfaces/data-access";
import {
    DeletePostTransaction,
    FindAllPostTransaction,
    FindOnePostTransaction,
    InsertPostTransaction, QueryPostTransaction,
    UpdatePostTransaction
} from "./posts-transactions";

export interface PostsDBTransactions {
    insert: DataAccess<MongoPost, string|null, MongoPost>
    findOne: DataAccess<{id: string, userId: string}, MongoPost|null, MongoPost>
    findAll: DataAccess<string, WithId<Partial<MongoPost>>[], MongoPost>
    deleteItem: DataAccess<{id: string, userId: string}, MongoPost|null, MongoPost>
    updateItem: DataAccess<{id: string, userId: string} & Partial<MongoPost>, MongoPost|null, MongoPost>,
    queryItems: DataAccess<{userId: string, query: string}, WithId<Partial<MongoPost>>[], MongoPost>
}

export default function makePostsDB(makeDB: () => DBAccess<MongoPost>, makeCache: () => CachingAccess): PostsDBTransactions {
    return {
        insert: new InsertPostTransaction(makeDB, makeCache),
        findOne: new FindOnePostTransaction(makeDB, makeCache),
        findAll: new FindAllPostTransaction(makeDB, makeCache),
        deleteItem: new DeletePostTransaction(makeDB, makeCache),
        updateItem: new UpdatePostTransaction(makeDB, makeCache),
        queryItems: new QueryPostTransaction(makeDB, makeCache)
    }
}
