import {AppBar, Avatar, Box, Button, CircularProgress, Container, Stack, Toolbar, Typography} from "@mui/material";
import {signOut, signIn} from "next-auth/react";
import GoogleLogin from "@/components/common/GoogleLogin";
import {useAppSession} from "@/data/app.session";

export default function TopBar() {
    const [session,  status] = useAppSession();
    const logout = () => signOut();
    const login = () => signIn('google');
    return (
        <AppBar position="static">
            <Toolbar>
                <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar alt={session?.user?.name ?? 'avatar'} src={session?.user?.image ?? ''}/>
                        <Typography textTransform="capitalize" variant="h6">{session?.user?.name}</Typography>
                    </Stack>
                    <Box>
                        {status === 'unauthenticated' && <GoogleLogin login={login}/>}
                        {status === 'loading' && <CircularProgress />}
                        {status === 'authenticated' && <Button size="small" variant="text" onClick={logout}>Logout</Button> }
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
