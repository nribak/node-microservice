import type { AppProps } from 'next/app'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import React, {ReactNode} from "react";
import Head from "next/head";

const theme = createTheme({
    palette: {mode: 'dark'}
});

const Wrapper = ({children}: {children: ReactNode}) => (
    <>
        <Head><title>Posts</title></Head>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </>
)


export default function MyApp({ Component, pageProps }: AppProps) {
    return <Wrapper><Component {...pageProps} /></Wrapper>
}
