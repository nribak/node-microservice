import DBAccess from "../../db-access";

export default function makeLocalRepository<E>(repo: {[id: string]: E}): () => DBAccess<E> {

    return () => ({
        find: async (id): Promise<E|null> => {
            const element: E|undefined = repo[id];
            return element ?? null;
        },
        queryBy: async (): Promise<E[]> => {
            return Object.values(repo);
        },
        insert: async (info): Promise<string|null> => {
            const id = Date.now().toString();
            repo[id] = info;
            return id;
        }
    })
}
