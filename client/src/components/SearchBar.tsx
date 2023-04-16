import {CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {ChangeEvent, Children, ReactNode, useEffect, useState} from "react";

function useInputDelay(delayMillis: number, onSubmit: (query: string) => void): [string, (ev: ChangeEvent<HTMLInputElement>) => void] {
    const [state, setState] = useState('');
    const [_, setTimer] = useState<NodeJS.Timeout|null>(null);
    const [dirty, setDirty] = useState(false);

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const {value} = ev.currentTarget;
        setDirty(true);
        setState(value);

    }
    useEffect(() => {
        if(dirty) {
            setTimer(prevState => {
                if (prevState)
                    clearTimeout(prevState);
                return setTimeout(() => onSubmit(state), delayMillis)
            })
        }
    }, [state, onSubmit, dirty]);

    return [state, handleChange];
}

const Conditional = ({children, tester}: {tester: boolean, children: ReactNode}) => {
    const [first, second] = Children.toArray(children);
    return (
        <>
            {tester ? first : second}
        </>
    )
}

export default function SearchBar({onQuerySubmitted, isLoading}: {isLoading: boolean, onQuerySubmitted: (query: string) => void}) {
    const [query, setQuery] = useInputDelay(1000, onQuerySubmitted);

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel>search...</InputLabel>
            <OutlinedInput
                type="search"
                value={query}
                onChange={setQuery}
                endAdornment={
                    <Conditional tester={isLoading}>
                        <InputAdornment position="end" >
                            <CircularProgress size={20} />
                        </InputAdornment>
                    </Conditional>
                }
            />
        </FormControl>
    )
}
