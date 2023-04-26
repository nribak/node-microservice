export default interface CachingAccess {
    setQuery: (entity: string, query: string, item: any) => Promise<void>
    getQuery: <T> (entity: string, query: string) => Promise<T|null>
    deleteQuery: (entity: string, query?: string) => Promise<void>
}
