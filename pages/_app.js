import React, { useEffect } from 'react';
import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { activateLocale } from '../lib/i18n';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import GoogleAnalyticsComponent from '../components/GoogleAnalyticsComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MyApp({ Component, pageProps }) {
  const { asPath, locale } = useRouter();
  const insecurePages = ['/login', '/logout', '/no_datasets'];

  useEffect(async () => {
    activateLocale(locale);
  }, [locale])

  return (
    <CookiesProvider>
      <I18nProvider
        i18n={i18n}
        // forceRenderOnLocaleChange={false}
      >
        <title>{t`HIV Estimates Navigator`}</title>
        <GoogleAnalyticsComponent />
        {insecurePages.includes(asPath)
          ? <Component {...pageProps} />
          : <AuthWrapper {...{ Component, pageProps }} />
        }
      </I18nProvider>
    </CookiesProvider>
  );

}
