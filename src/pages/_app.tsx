import { AppProps } from 'next/app';
import { Layout } from '@/components/layout/AppLayout';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '@/styles/globals.css';
import ToasterProvider from '@/providers/ToasterProvider';
import { SessionProvider } from 'next-auth/react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Zamam Well Passport</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Layout>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Layout>
      </MantineProvider>
      <ToasterProvider />
    </>
  );
}
