import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no' />
          <meta name='theme-color' content='#fff' />
          <meta name='description' content='Amazing next Boilerplate' />
          <meta name='keywords' content='HTML,CSS,Javascript,Nextjs' />
          <link rel='manifest' href='/static/manifest.json' />
        </Head>
        <body>
          <div id='app'>
            <noscript>
              <div>
                <p>Your browser does not support JavaScript!</p>
              </div>
            </noscript>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
