import {WithId} from "mongodb";
//TODO: remove dependency of mongoDB from here
export default interface DBAccess<T> {
    find: (id: string) => Promise<T|null>
    queryBy: (query: any) => Promise<WithId<Partial<T>>[]>
    insert: (attr: T) => Promise<string|null>
    deleteById: (id: string) => Promise<T|null>,
    findAndUpdate: (id: string, attr: Partial<T>) => Promise<T|null>
}
