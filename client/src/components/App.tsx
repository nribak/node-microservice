import {CircularProgress, Container, Typography} from "@mui/material";
import useSWR from 'swr';
import PostList from "./post/PostList";
import AddButton from "./AddButton";
import PostEdit from "./post/PostEdit";
import {useState} from "react";
import {createModifyActions, ModifyContext} from "../data/modify.context";
import getAPI, {Post} from "../data/postsAPI";


const localAPI = getAPI('local');
export default function App() {
    const {data, isLoading, mutate} = useSWR('list', localAPI.listPosts);
    const [editablePost, setEditablePost] = useState<Post|null|undefined>(undefined);
    const closeDialog = () => setEditablePost(undefined);
    const handleEditPostClicked = ({id}: Post) => {
        localAPI.getPost(id).then(post => {
            if(post)
                setEditablePost(post);
        });
    }

    const handleCreateNew = () => {
        setEditablePost(null);
    }

    return (
        <ModifyContext.Provider value={createModifyActions(mutate)}>
            <Container sx={{pt: 2}}>
                {isLoading && <CircularProgress />}
                {(!data || data.length === 0) && <Typography textAlign="center" variant="h4">No Posts Yet</Typography>}
                <PostList postList={data ?? []} onPostModify={handleEditPostClicked}/>
                <AddButton onClick={handleCreateNew} />
                <PostEdit isOpen={editablePost !== undefined} onClose={closeDialog} post={editablePost}/>
            </Container>
        </ModifyContext.Provider>
    )
}
