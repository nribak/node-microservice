import DataAccess from "./interfaces/data-access";
import {MongoPost} from "./repositories/mongodb/entities/mongo-post";
import DBAccess from "./interfaces/db-access";
import CachingAccess from "./interfaces/caching-access";
import {WithId} from "mongodb";

const entityName = 'POSTS';
const createQuery = (userId: string, query?: object): [string, string] => {
    const entity = `${entityName}::${userId}`;
    const field = Object.entries(query ?? {}).map(([key, value]) => `${key}::${value}`).join(',');
    return [entity, field.length > 0 ? field : '*'];
}

export class InsertPostTransaction extends DataAccess<MongoPost, string|null, MongoPost> {
    protected async execute(post: MongoPost, db: DBAccess<MongoPost>): Promise<string | null> {
        return await db.insert(post);
    }

    protected async postWork(post: MongoPost, id: string | null, cache: CachingAccess) {
        const [queryEntry] = createQuery(post.userId);
        if (id)
            await cache.deleteQuery(queryEntry);
    }
}

export class FindOnePostTransaction extends DataAccess<{id: string, userId: string}, MongoPost|null, MongoPost> {
    protected async preWork({id, userId}: { id: string; userId: string }, cache: CachingAccess): Promise<void | MongoPost | null> {
        const [queryEntry, queryField] = createQuery(userId, {_id: id})
        const item = await cache.getQuery<MongoPost>(queryEntry, queryField);
        if(item)
            return item;
    }

    protected async execute({id}: { id: string; userId: string }, db: DBAccess<MongoPost>): Promise<MongoPost | null> {
        return await db.find(id);
    }

    protected async postWork({id, userId}: { id: string; userId: string }, result: MongoPost | null, cache: CachingAccess) {
        const [queryEntry, queryField] = createQuery(userId, {_id: id})
        if (result)
            await cache.setQuery(queryEntry, queryField, result);
    }
}

export class FindAllPostTransaction extends DataAccess<string, WithId<Partial<MongoPost>>[], MongoPost> {
    protected async preWork(userId: string, cache: CachingAccess): Promise<void | WithId<Partial<MongoPost>>[]> {
        const [queryEntry, queryField] = createQuery(userId, {});
        const result = await cache.getQuery<WithId<Partial<MongoPost>>[]>(queryEntry, queryField)
        if(result)
            return result;
    }

    protected async execute(userId: string, db: DBAccess<MongoPost>): Promise<WithId<Partial<MongoPost>>[]> {
        return await db.queryBy({userId});
    }

    protected async postWork(userId: string, result: WithId<Partial<MongoPost>>[], cache: CachingAccess) {
        const [queryEntry, queryField] = createQuery(userId, {});
        if (result.length > 0) {
            await cache.setQuery(queryEntry, queryField, result);
        }
    }
}

export class DeletePostTransaction extends DataAccess<{ id: string, userId: string }, MongoPost | null, MongoPost> {
    protected execute({id}: { id: string; userId: string }, db: DBAccess<MongoPost>): Promise<MongoPost | null> {
        return db.deleteById(id);
    }

    protected async postWork({userId}: { id: string; userId: string }, result: MongoPost | null, cache: CachingAccess) {
        const [queryEntry] = createQuery(userId);
        await cache.deleteQuery(queryEntry);
    }
}

export class UpdatePostTransaction extends DataAccess<{ id: string, userId: string } & Partial<MongoPost>, MongoPost | null, MongoPost> {
    protected async execute({id, title, details}: { id: string, userId: string } & Partial<MongoPost>, db: DBAccess<MongoPost>): Promise<MongoPost | null> {
        return await db.findAndUpdate(id, {title, details});
    }

    protected async postWork({userId}: { id: string; userId: string } & Partial<MongoPost>, result: MongoPost | null, cache: CachingAccess) {
        const [queryEntry] = createQuery(userId);
        if (result)
            await cache.deleteQuery(queryEntry);
    }
}

export class QueryPostTransaction extends DataAccess<{userId: string, query: string}, WithId<Partial<MongoPost>>[], MongoPost> {
    protected async preWork({userId, query}: { userId: string; query: string }, cache: CachingAccess): Promise<void | WithId<Partial<MongoPost>>[]> {
        const [queryEntry, queryField] = createQuery(userId, {query});
        const result = await cache.getQuery<WithId<Partial<MongoPost>>[]>(queryEntry, queryField)
        if(result)
            return result;
    }

    protected async execute({query, userId}: { userId: string; query: string }, db: DBAccess<MongoPost>): Promise<WithId<Partial<MongoPost>>[]> {
        const regex = new RegExp(`.*${query}.*`);
        const q = {userId, title: regex};
        return await db.queryBy(q);
    }

    protected async postWork({userId, query}: { userId: string; query: string }, result: WithId<Partial<MongoPost>>[], cache: CachingAccess) {
        const [queryEntry, queryField] = createQuery(userId, {query});
        if (result.length > 0) {
            await cache.setQuery(queryEntry, queryField, result);
        }
    }
}
