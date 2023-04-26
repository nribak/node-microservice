import {Collection, Db, Document, MongoClient} from 'mongodb';

export default class MongoDBInstance {
    private client: MongoClient;
    private db: Db;
    constructor() {
        const uri = process.env.MONGO_CONNECTION_URI!
        this.client = new MongoClient(uri);
        this.db = this.client.db('blog');
        console.log('MongoDB was connected', uri);
    }

    collection<E extends Document>(name: string): Collection<E> {
        return this.db.collection<E>(name);
    }

    close() {
        this.client.close(false).then(() => console.log('MongoDB was disconnected'));
    }
}
