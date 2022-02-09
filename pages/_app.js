import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Trans } from '@lingui/react';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import GoogleAnalyticsComponent from '../components/GoogleAnalyticsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { activateLocale } from '../lib/i18n';

export default function MyApp({ Component, pageProps }) {
  const { asPath, locale } = useRouter();
  const insecurePages = ['/login', '/logout', '/no_datasets'];

  useEffect(async () => {
    activateLocale(locale);
  }, [locale])

  function Head() {
    return (
      <>
        <title><Trans id="HIV Estimates Navigator" /></title>
        <GoogleAnalyticsComponent />
      </>
    )
  }

  return (
    <CookiesProvider>
      <I18nProvider
        i18n={i18n}
        // forceRenderOnLocaleChange={false}
      >
        <Head />
        {insecurePages.includes(asPath)
          ? <Component {...pageProps} />
          : <AuthWrapper {...{ Component, pageProps }} />
        }
      </I18nProvider>
    </CookiesProvider>
  );

}
