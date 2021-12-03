import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const insecurePages = ['/login', '/logout', '/no_datasets'];

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <title>HIV Estimates Navigator</title>
      </Head>
      {insecurePages.includes(asPath)
        ? <Component {...pageProps} />
        : <AuthWrapper {...{ Component, pageProps }} />
      }
    </>
  );

}
