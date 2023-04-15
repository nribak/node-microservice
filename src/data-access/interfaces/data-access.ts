import DBAccess from "./db-access";
import CachingAccess from "./caching-access";

export default abstract class DataAccess<P, R, T> {
    constructor(private makeDB: () => DBAccess<T>, private makeCache: () => CachingAccess) {}

    protected async preWork(params: P, cache: CachingAccess): Promise<R|void> {}
    protected abstract execute(params: P, db: DBAccess<T>): Promise<R>
    protected postWork(params: P, result: R, cache: CachingAccess): void {}


    public async start(params: P): Promise<R> {
        const cache = this.makeCache();
        const db = this.makeDB();
        let value = await this.preWork(params, cache);
        if(value) return value;
        value = await this.execute(params, db);
        this.postWork(params, value, cache);
        return value;
    }
}

