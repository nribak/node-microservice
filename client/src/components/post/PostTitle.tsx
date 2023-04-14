import {Box, IconButton, Stack, Typography} from "@mui/material";
import {printableDate} from "../../data/utils";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {SyntheticEvent, useContext} from "react";
import {ModifyContext} from "../../data/modify.context";
import getAPI, {Post} from "../../data/postsAPI";

export default function PostTitle({post, onPostModify}: {post: Post, onPostModify: (post: Post) => void}) {
    const {deleteItem} = useContext(ModifyContext);
    const {updatedAt, title} = post;

    const handleDelete = (ev: SyntheticEvent) => {
        ev.stopPropagation();
        getAPI('local').deletePost(post.id).then((post) => {
            if(post)
                deleteItem(post.id);
        });
    }

    const handleEdit = (ev: SyntheticEvent) => {
        ev.stopPropagation();
        onPostModify(post);
    }
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="column" spacing={1} width="75%">
                <Typography variant="h5" noWrap textOverflow="ellipsis">{title}</Typography>
                <Typography variant="subtitle1">Last Updated {printableDate(updatedAt)}</Typography>
            </Stack>
            <Box display="flex" justifyContent="end" alignItems="center" width="25%">
                <IconButton onClick={handleEdit}>
                    <EditIcon color="primary" fontSize="medium"/>
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <DeleteForeverIcon color="warning" fontSize="medium"/>
                </IconButton>
            </Box>
        </Box>
    )
}
