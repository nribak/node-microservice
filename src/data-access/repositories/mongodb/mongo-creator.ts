import {Collection, Db, Document, MongoClient} from 'mongodb';

export default class MongoDBInstance {
    private client: MongoClient;
    private db: Db;
    constructor() {
        const connectionUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9pxnjvk.mongodb.net/?retryWrites=true&w=majority`
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
