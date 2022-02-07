import { Trans } from '@lingui/react';
import { useCookies } from 'react-cookie';
import { makeUseAxios } from 'axios-hooks';
import { baseAxiosConfig, logoutApiRequest } from '../lib/api';
import ErrorPagePopup from '../components/ErrorPagePopup';

export default function LogoutPage() {
    const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
    const useAxios = makeUseAxios(baseAxiosConfig(cookies.NEXT_LOCALE));
    const [{ loading, error }] = useAxios(logoutApiRequest);

    if (loading) {
        return <Trans id="Logging out..." />
    } else if (error) {
        return <ErrorPagePopup apiError={error} />
    } else {
        window.location.href = '/';
        return null;
    }

}
