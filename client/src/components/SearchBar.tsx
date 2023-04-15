import {Stack, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {LoadingButton} from "@mui/lab";

export default function SearchBar({onQuerySubmitted, isLoading}: {isLoading: boolean, onQuerySubmitted: (query: string) => void}) {
    const [query, setQuery] = useState('');
    const handleQueryChange = (ev: ChangeEvent<HTMLInputElement>) => setQuery(ev.currentTarget.value);

    const handleQuerySubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onQuerySubmitted(query);
    }

    return (
        <Stack direction="row" spacing={1} component="form" onSubmit={handleQuerySubmit}>
            <TextField label="query..." variant="outlined" fullWidth value={query} onChange={handleQueryChange}/>
            <LoadingButton loading={isLoading} type="submit" variant="contained">Search</LoadingButton>
        </Stack>
    )
}
