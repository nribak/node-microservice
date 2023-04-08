import MongoDBInstance from "./mongo-creator";
import DBAccess from "../../db-access";
import {ObjectId, WithId} from "mongodb";
import {MongoPost} from "./entities/mongo-post";

type MongoPostSummary = WithId<Omit<MongoPost, 'details'>>;

export function makeMongoPostRepository(instance: MongoDBInstance): () => DBAccess<MongoPost> {
    const collection = instance.collection<MongoPost>('post');
    return () => ({
        find: async (id): Promise<MongoPost|null> => {
            try {
                return await collection.findOne({_id: new ObjectId(id)});
            } catch (e: any) {
                console.log(e.message);
                return null;
            }

        },
        queryBy: async (query): Promise<WithId<Partial<MongoPost>>[]> => {
            const res = collection.find<MongoPostSummary>(query, {projection: {_id: 1, title: 1, createAt: 1, updatedAt: 1}});
            return await res.toArray();
        },
        insert: async (attr): Promise<string|null> => {
            const res = await collection.insertOne(attr)
            return res.insertedId.toHexString();
        },
        deleteById: async (id): Promise<MongoPost|null> => {
            try {
                const item = await collection.findOneAndDelete({_id: new ObjectId(id)})
                return item.value
            } catch (e: any) {
                console.log(e.message);
                return null;
            }
        },
        findAndUpdate: async (id: string, {title, details}: Partial<MongoPost>): Promise<MongoPost|null> => {
            const set: {title?: string, details?: string} = {};
            if(title)
                set.title = title;
            if(details)
                set.details = details;

            try {
                const {value} = await collection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: set}, {returnDocument: "after"})
                return value;
            } catch (e: any) {
                console.log(e.message);
                return null;
            }
        }
    })
}
