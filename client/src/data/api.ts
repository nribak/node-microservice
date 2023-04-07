import axios from "axios";

export interface Post {
    id: string,
    title: string,
    details: string,
    createAt: number,
    updatedAt: number
}
const instance = axios.create({baseURL: 'http://localhost:4000/posts'})
export const API = {
    listPosts: (): Promise<Post[]> => {
        return instance.get('/').then(r => r.data);
    },
    getPost: (id: string): Promise<Post|null> => {
        return instance.get(`/${id}`).then(r => r.data);
    },
    deletePost: (id: string): Promise<Post|null> => {
        return instance.delete(`/${id}`).then(r => r.data);
    },
    createPost: (title: string, details: string): Promise<Post|null> => {
        return instance.post('/', {title, details}).then(r => r.data);
    }
}
