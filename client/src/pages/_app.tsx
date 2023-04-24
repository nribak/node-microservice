import type { AppProps } from 'next/app'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import React, {ReactNode} from "react";
import Head from "next/head";
import {SessionProvider} from "next-auth/react";

const theme = createTheme({
    palette: {mode: 'dark'}
});

const Wrapper = ({children}: {children: ReactNode}) => (
    <>
        <Head><title>Private Posts</title></Head>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </>
)


export default function MyApp({ Component, pageProps }: AppProps) {
    const {session} = pageProps;
    return <Wrapper><SessionProvider session={session}><Component {...pageProps} /></SessionProvider></Wrapper>
}
