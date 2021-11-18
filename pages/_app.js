import React from 'react';
import { useRouter } from 'next/router';
import AuthWrapper from '../components/AuthWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const insecurePages = ['/login', '/logout', '/manoj'];

  if (insecurePages.includes(asPath)) {
    return <Component {...pageProps} />
  } else {
    return <AuthWrapper {...{ Component, pageProps }} />
  }

}
