export default interface DBAccess<T> {
    find: (id: string) => Promise<T|null>
    queryBy: (query: any) => Promise<T[]>
    insert: (info: any) => Promise<boolean>
}
