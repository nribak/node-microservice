import {CircularProgress, Container, Typography} from "@mui/material";
import useSWR from 'swr';
import {API, Post} from "../data/api";
import PostList from "./post/PostList";
import AddButton from "./AddButton";
import PostEdit from "./post/PostEdit";
import {useState} from "react";

export default function App() {
    const {data, isLoading} = useSWR('list', API.listPosts);
    const [editablePost, setEditablePost] = useState<Post|null|undefined>(undefined);
    const closeDialog = () => setEditablePost(undefined);

    const handleCreateNew = () => {
        setEditablePost(null);
    }

    const handleEditPost = ({id}: Post) => {
        API.getPost(id).then(post => {
            if(post)
                setEditablePost(post);
        });
    }

    return (
        <Container sx={{pt: 2}}>
            {isLoading && <CircularProgress />}
            {(!data || data.length === 0) && <Typography textAlign="center" variant="h4">No Posts Yet</Typography>}
            <PostList postList={data ?? []} onPostEdit={handleEditPost}/>
            <AddButton onClick={handleCreateNew} />
            <PostEdit isOpen={editablePost !== undefined} onClose={closeDialog} post={editablePost}/>
        </Container>
    )
}
