import React, { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { useRouter } from "next/router";
import { UserProvider } from "@auth0/nextjs-auth0";
import { t } from "@lingui/macro";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { activateLocale } from "@/lib/i18n";
import AuthWrapper from "@/components/AuthWrapper";
import GoogleAnalyticsComponent from "@/components/GoogleAnalyticsComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function App({ Component, pageProps }) {
  const { pathname, locale } = useRouter();
  const insecurePages = ["/login", "/no_datasets", "/instructions", "/user_not_found_in_adr"];

  useEffect(async () => {
    activateLocale(locale);
  }, [locale]);

  return (
    <UserProvider>
      <CookiesProvider>
        <I18nProvider
          i18n={i18n}
          // forceRenderOnLocaleChange={false}
        >
          <title>{t`HIV Estimates Navigator`}</title>
          <GoogleAnalyticsComponent />
          {insecurePages.includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <AuthWrapper {...{ Component, pageProps }} />
          )}
        </I18nProvider>
      </CookiesProvider>
    </UserProvider>
  );
}
