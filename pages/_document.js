import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <meta charset="UTF-8" />
                    <meta name="description" content="Knowtools - AI Powered Tools" />
                    <meta name="robots" content="noindex, nofollow" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                <body style={{ backgroundColor: '#dbeafe' }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
