import Script from 'next/script';

export default function GoogleAnalyticsComponent() {
    const token = process.env.NEXT_PUBLIC_GA_ID;
    if (token) {
        return (
            <>
                <Script
                    strategy='lazyOnload'
                    src={`https://www.googletagmanager.com/gtag/js?id=${token}`}
                />
                <Script id='ga-analytics'>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());            
                        gtag('config', '${token}');
                    `}
                </Script>
            </>
        )
    } else {
        if (process.env.NODE_ENV === 'production') {
            console.error(
                'Google Analytics env NEXT_PUBLIC_GA_ID not set.'
            );
        }
        return <></>
    }

}
