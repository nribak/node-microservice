import Image from "next/image";
import {Button, Stack, Typography} from "@mui/material";

export default function GoogleLogin({login}: {login: () => void}) {
    return (
        <Stack direction="row" spacing={1} component={Button} onClick={login}>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google login" height={20} width={20} />
            <Typography>Sign in</Typography>
        </Stack>
    )
}
