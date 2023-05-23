import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zamam | Well Passport</title>
        <meta name="title" content="Zamam Well Passport" />
        <meta
          name="description"
          content="The Well passport is a digital, comprehensive repository of information related to Oil and 
          gas assets. It is designed to provide a centralized location for storing, managing, and  accessing critical technical, operational, and safety data related to the client’s asset- Field, 
          Well and Projects"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wellpassport.com/" />
        <meta property="og:title" content="well passport" />
        <meta
          property="og:description"
          content="The Well passport is a digital, comprehensive repository of information related to Oil and 
          gas assets. It is designed to provide a centralized location for storing, managing, and  accessing critical technical, operational, and safety data related to the client’s asset- Field, 
          Well and Projects"
        />
        <meta
          property="og:image"
          content="https://wellpassport.com/public/favicon.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://wellpassport.com/" />
        <meta property="twitter:title" content="wellpassport" />
        <meta
          property="twitter:description"
          content="The Well passport is a digital, comprehensive repository of information related to Oil and 
          gas assets. It is designed to provide a centralized location for storing, managing, and  accessing critical technical, operational, and safety data related to the client’s asset- Field, 
          Well and Projects"
        />
        <meta
          property="twitter:image"
          content="https://wellpassport.com/public/favicon.png"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lekton:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
