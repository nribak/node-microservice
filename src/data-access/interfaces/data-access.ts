import DBAccess from "./db-access";
import CachingAccess from "./caching-access";

export default abstract class DataAccess<P, R, T> {
    private withCache = false;
    constructor(private makeDB: () => DBAccess<T>, private makeCache: () => CachingAccess) {}

    protected async preWork(params: P, cache: CachingAccess): Promise<R|void> {}
    protected abstract execute(params: P, db: DBAccess<T>): Promise<R>
    protected postWork(params: P, result: R, cache: CachingAccess): void {}

    public cache(): DataAccess<P, R, T> {
        this.withCache = true;
        return this;
    }

    public noCache(): DataAccess<P, R, T> {
        this.withCache = false;
        return this;
    }

    public async exec(params: P): Promise<R> {
        const cache = this.makeCache();
        const db = this.makeDB();
        let value: R|void;
        if(this.withCache) {
            value = await this.preWork(params, cache);
            if(value) return value;
        }
        value = await this.execute(params, db);
        if(this.withCache) {
            this.postWork(params, value, cache);
        }
        return value;
    }
}

