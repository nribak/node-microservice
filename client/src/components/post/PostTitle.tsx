import {API, Post} from "../../data/api";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {printableDate} from "../../data/utils";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {SyntheticEvent} from "react";

export default function PostTitle({post, onPostEdit}: {post: Post, onPostEdit: (post: Post) => void}) {
    const {updatedAt, title} = post;
    const handleDelete = (ev: SyntheticEvent) => {
        ev.stopPropagation();
        API.deletePost(post.id).then((post) => {
            if(post)
                window.location.reload();
        })
    }

    const handleEdit = (ev: SyntheticEvent) => {
        ev.stopPropagation();
        onPostEdit(post);
    }
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="column" spacing={1}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle1">Last Updated {printableDate(updatedAt)}</Typography>
            </Stack>
            <Box display="flex" justifyContent="end" alignItems="center">
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
