import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head >
                {/*<meta name="theme-color" content="#F7DA21"/>*/}
                <link rel="manifest" href="/manifest.json"/>
                {/*<link rel="icon" href="/bee.png"/>*/}
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
