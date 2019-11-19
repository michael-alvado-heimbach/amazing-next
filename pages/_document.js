import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from '../utils/theme';
import imageIcon from '../public/static/images/favicon.ico';

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
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='manifest' href='static/manifest.json' />
          {/* <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap' /> */}
          <link rel='icon' href={imageIcon} />
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

MyDocument.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <React.Fragment>
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
