import {Post} from "./api";
import {createContext} from "react";
import {KeyedMutator} from "swr/_internal";

export interface ModifyActions {
    deleteItem: (id: string) => void,
    updateItem: (updatedPost: Post) => void,
    createItem: (newPost: Post) => void
}

export function createModifyActions(mutator: KeyedMutator<Post[]>): ModifyActions {
    return {
        deleteItem: (id) => {
            mutator((posts) => {
                if(posts) {
                    const newPosts = [...posts];
                    const index = newPosts.findIndex(p => p.id === id);
                    if(index !== -1)
                        newPosts.splice(index, 1);
                    return newPosts;
                } else return undefined;

            });
        },
        updateItem: (updatedPost) => {
            mutator((posts) => {
                return posts?.map(post => {
                    return post.id === updatedPost.id ? updatedPost : post;
                })
            })
        },
        createItem: (newPost: Post) => {
            mutator(posts => [...posts ?? [], newPost]);
        }
    }
}

const noCallback = () => {};
export const ModifyContext = createContext<ModifyActions>({
    deleteItem: noCallback,
    updateItem: noCallback,
    createItem: noCallback
});
