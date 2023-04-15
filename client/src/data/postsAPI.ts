import axios from "axios";

export interface Post {
    id: string,
    title: string,
    details: string,
    createAt: number,
    updatedAt: number
}

export interface API {
    listPosts: () => Promise<Post[]>
    queryPosts: (query: string) => Promise<Post[]>
    getPost: (id: string) => Promise<Post|null>
    deletePost: (id: string) => Promise<Post|null>
    createPost: (title: string, details: string) => Promise<Post|null>
    updatePost: (id: string, title: string, details: string) => Promise<Post|null>
}

const postsInstance = axios.create({baseURL: 'http://localhost:4000/posts'});
const localInstance = axios.create({baseURL: '/api/posts'});

//TODO: should be split into client and server api
export default function getAPI(type: 'local'|'posts', userId?: string): API {
    const instance = type === 'posts' ? postsInstance : localInstance;
    return {
        listPosts: () => {
            return instance.get('/', {params: {userId}}).then(r => r.data);
        },
        queryPosts: (query: string) => {
            return instance.get('/query', {params: {userId, query}}).then(r => r.data);
        },
        getPost: (id: string) => {
            return instance.get(`/${id}`, {params: {userId}}).then(r => r.data);
        },
        deletePost: (id: string) => {
            return instance.delete(`/${id}`, {params: {userId}}).then(r => r.data);
        },
        createPost: (title: string, details: string) => {
            return instance.post('/', {title, details}, {params: {userId}}).then(r => r.data);
        },
        updatePost: (id: string, title: string, details: string) => {
            return instance.put(`/${id}`, {title, details}, {params: {userId}}).then(r => r.data);
        }
    }
}
