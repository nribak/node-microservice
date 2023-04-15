import Post from "../../../../entities/post";

export type MongoPost = Omit<Post, 'id'>;   //TODO: change name to DBPost
export type MongoPostResult = MongoPost & {_id: string};

export function buildMakeMongoPost(): (attr: any) => MongoPost {
    return ({title, details, createAt, userId}) => ({
        userId, title, details, createAt: createAt ?? Date.now(), updatedAt: Date.now()
    });
}
