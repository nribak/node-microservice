import {Post} from "../../data/api";
import {List, ListItem} from "@mui/material";
import PostTitle from "./PostTitle";

export default function PostList({postList, onPostModify}: {postList: Post[], onPostModify: (post: Post) => void}) {

    return (
        <List>
            {postList.map(post => {
                return (
                    <ListItem key={post.id}>
                            <PostTitle post={post} onPostModify={onPostModify}/>
                    </ListItem>
                )
            })}
        </List>
    )
}
