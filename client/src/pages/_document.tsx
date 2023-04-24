import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head >
                <link rel="manifest" href="/manifest.json"/>
                <link rel="icon" href="/post.png"/>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
