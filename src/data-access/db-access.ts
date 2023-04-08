import {WithId} from "mongodb";

export default interface DBAccess<T> {
    find: (id: string) => Promise<T|null>
    queryBy: (query: any) => Promise<WithId<Partial<T>>[]>
    insert: (attr: T) => Promise<string|null>
    deleteById: (id: string) => Promise<T|null>,
    findAndUpdate: (id: string, attr: Partial<T>) => Promise<T|null>
}
