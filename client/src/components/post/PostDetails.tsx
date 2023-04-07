import {useEffect, useState} from "react";
import {CircularProgress, Typography} from "@mui/material";
import {API} from "../../data/api";

export default function PostDetails({id, isExpended}: {id: string, isExpended: boolean}) {
    const [details, setDetails] = useState<string|undefined>(undefined);

    useEffect(() => {
        if(isExpended) {
            API.getPost(id).then(post => {
                if(post)
                    setDetails(post.details);
            });
        }
        else {
            setDetails(undefined);
        }
    }, [isExpended, id])

    if(details)
        return (
            <Typography>
                {details}
            </Typography>
        )
    else return <CircularProgress />
}
