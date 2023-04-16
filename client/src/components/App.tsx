import {Container} from "@mui/material";
import useSWR from 'swr';
import {useState} from "react";
import {createModifyActions, ModifyContext} from "@/data/modify.context";
import getAPI, {Post} from "@/data/postsAPI";
import SearchBar from "@/components/SearchBar";
import PostList from "@/components/post/PostList";
import AddButton from "@/components/AddButton";
import PostEdit from "@/components/post/PostEdit";

const localAPI = getAPI('local');
const listPosts = ([_, query]: [string, string]) => {
    if(query.length > 0)
        return localAPI.queryPosts(query);
    else
        return localAPI.listPosts();
}

export default function App() {
    const [query, setQuery] = useState('');
    const {data, isLoading, mutate} = useSWR(['list', query], listPosts);
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
                <SearchBar onQuerySubmitted={setQuery} isLoading={isLoading}/>
                <PostList postList={data ?? []} onPostModify={handleEditPostClicked}/>
                <AddButton onClick={handleCreateNew} />
                <PostEdit isOpen={editablePost !== undefined} onClose={closeDialog} post={editablePost}/>
            </Container>
        </ModifyContext.Provider>
    )
}
