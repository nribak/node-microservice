import MongoDBInstance from "./mongo-creator";
import DBAccess from "../../db-access";
import {ObjectId} from "mongodb";
import {MongoPost} from "./entities/mongo-post";

type MongoPostSummary = Omit<MongoPost, 'details'>;

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
        queryBy: async (query): Promise<MongoPost[]> => {
            const res = collection.find<MongoPostSummary>(query);
            const arr = await res.toArray()
            return arr.map(item => ({...item, details: ''}));

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
        }
    })
}
