import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


const theme = createTheme({
    palette: {mode: 'dark'}
});

const Wrapper = ({children}: {children: ReactNode}) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Wrapper><App /></Wrapper>);
