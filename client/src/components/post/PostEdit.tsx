import {Button, Dialog, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import {API, Post} from "../../data/api";
import {ModifyContext} from "../../data/modify.context";


function useForm<E>(initValue: E): [E, (ev: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void, (state: E) => void] {
    const [state, setState] = useState(initValue);
    const handleChange = (ev: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {value, name} = ev.currentTarget;
        setState(prevState => ({...prevState, [name]: value}));
    }

    const set = (newState: E) => setState(newState);
    return [state, handleChange, set];
}

export default function PostEdit({isOpen, onClose, post}: {isOpen: boolean, onClose: () => void, post: Post|null|undefined}) {
    const {createItem, updateItem} = useContext(ModifyContext);
    const [state, setState, newState] = useForm<{title: string, details: string}>({title: post?.title ?? '', details: post?.details ?? ''});

    useEffect(() => {
        newState({title: post?.title ?? '', details: post?.details ?? ''});
    }, [post]);


    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if(!post) {
            API.createPost(state.title, state.details).then(newPost => {
                if(newPost)
                    createItem(newPost);
            });
        } else {
            API.updatePost(post.id, state.title, state.details).then(editedPost => {
                if(editedPost)
                    updateItem(editedPost);
            })
        }
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle textTransform="capitalize">edit post {post?.id.slice(0, 4)}</DialogTitle>
            <DialogContent>
                <Stack spacing={3} component="form" onSubmit={handleSubmit}>
                    <TextField value={state.title} name="title" onChange={setState} fullWidth variant="standard" label="Title"/>
                    <TextField value={state.details} name="details" onChange={setState} fullWidth variant="standard" label="Details"/>
                    <Stack direction="row-reverse" spacing={2}>
                        <Button type="submit">ok</Button>
                        <Button type="reset" onClick={onClose}>cancel</Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
