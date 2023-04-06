import {Collection, Db, Document, MongoClient} from 'mongodb';

const connectionUri = "mongodb+srv://admin:MRUGJDQl81G3wJqb@cluster0.9pxnjvk.mongodb.net/?retryWrites=true&w=majority"

export default class MongoDBInstance {
    private client: MongoClient;
    private db: Db;
    constructor() {
        this.client = new MongoClient(connectionUri);
        this.db = this.client.db('blog');
        console.log('MongoDB was connected');
    }

    collection<E extends Document>(name: string): Collection<E> {
        return this.db.collection<E>(name);
    }

    close() {
        this.client.close(false).then(() => console.log('MongoDB was disconnected'));
    }
}
