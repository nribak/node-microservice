import DBAccess from "../data-access/db-access";
import Post from "../entities/post";

export default function makeLocalPostRepository(): () => DBAccess<Post> {
    const repo: {[id: string]: Post} = {};

    return () => ({
        find: async (id): Promise<Post|null> => {
            const post = repo[id];
            return post ?? undefined;
        },
        queryBy: async (query): Promise<Post[]> => {
            const {title, details} = query;
            return Object.values(repo).filter(post => (!title || post.title === title) && (!details || post.details === details));
        },
        insert: async (info) => {
            const {id} = info;
            repo[id] = info;
            return true;
        }
    })
}
