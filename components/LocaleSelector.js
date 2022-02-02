import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import { supportedLocales } from '../next.config';

export default function LocaleSelector() {
    const router = useRouter();
    const { pathname, asPath, query, locale } = router;
    const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);

    const currentLocale = supportedLocales.filter(
        x => x.id === locale
    )[0]

    const updateLocale = locale => {
        setCookie('NEXT_LOCALE', locale);
        router.push({ pathname, query }, asPath, { locale })
    }

    return (
        <Dropdown drop="up">
            <Dropdown.Toggle variant="outline-danger">
                <LanguageLabel language={currentLocale} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {supportedLocales.map(x =>
                    <Dropdown.Item onClick={() => updateLocale(x.id)}>
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
