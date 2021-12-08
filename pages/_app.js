import React from 'react';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const insecurePages = ['/login', '/logout', '/no_datasets'];

  return (
    <>
      <Head>
          <title>HIV Estimates Navigator</title>
      </Head>
      {insecurePages.includes(asPath)
        ? <Component {...pageProps} />
        : <AuthWrapper {...{ Component, pageProps }} />
      }
    </>
  );

}
