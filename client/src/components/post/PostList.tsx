import {Post} from "../../data/api";
import {List, ListItem} from "@mui/material";
import PostTitle from "./PostTitle";

export default function PostList({postList, onPostEdit}: {postList: Post[], onPostEdit: (post: Post) => void}) {

    return (
        <List>
            {postList.map(post => {
                return (
                    <ListItem key={post.id}>
                            <PostTitle post={post} onPostEdit={onPostEdit}/>
                    </ListItem>
                )
            })}
        </List>
    )
}
