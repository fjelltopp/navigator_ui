import React from 'react';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const insecurePages = ['/login', '/logout', '/no_datasets'];

  return (
    <>
      <Head>
        <title>HIV Estimates Navigator</title>
      </Head>
      {GA_ID.length > 0 &&
        <Script
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
      }
      {GA_ID.length > 0 &&
        <Script id='ga-analytics'>
          {
            `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_ID}');
            `
          }
        </Script>
      }
      {insecurePages.includes(asPath)
        ? <Component {...pageProps} />
        : <AuthWrapper {...{ Component, pageProps }} />
      }
    </>
  );

}
