export default interface DBAccess<T> {
    find: (id: string) => Promise<T|null>
    queryBy: (query: any) => Promise<T[]>
    insert: (attr: T) => Promise<string|null>
    deleteById: (id: string) => Promise<T|null>
}
