import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Script from 'next/script'
import Head from 'next/head'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const insecurePages = ['/login', '/logout', '/no_datasets'];

  return (
    <CookiesProvider>
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
    </CookiesProvider>
  );

}

export default appWithTranslation(MyApp);