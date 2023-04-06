import Post from "../../../../entities/post";
import {WithId} from "mongodb";

export type MongoPost = Omit<Post, 'id'>;
export type MongoPostResult = WithId<MongoPost>;

export function buildMakeMongoPost(): (attr: any) => MongoPost {
    return ({title, details, createAt}) => ({
        title, details, createAt: createAt ?? Date.now(), updatedAt: Date.now()
    });
}
