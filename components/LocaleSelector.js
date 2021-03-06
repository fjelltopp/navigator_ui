import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import { supportedLocales } from '../locales/config';

export default function LocaleSelector({ drop }) {
    const router = useRouter();
    const { pathname, asPath, query, locale } = router;
    const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);

    const currentLocale = supportedLocales.filter(
        x => x.id === locale
    )[0]

    const updateLocale = locale => {
        setCookie('NEXT_LOCALE', locale, { path: '/' });
        router.push({ pathname, query }, asPath, { locale })
    }

    return (
        <Dropdown {...{ drop }}>
            <Dropdown.Toggle variant="outline-danger">
                <LanguageLabel language={currentLocale} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {supportedLocales.map(x =>
                    <Dropdown.Item key={x.id} onClick={() => updateLocale(x.id)}>
                        <LanguageLabel language={x} />
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )

}

function LanguageLabel({ language }) {
    return (
        <>
            <span className="me-2">{language.emoji}</span>
            <span>{language.name}</span>
        </>
    )
}
