import { Trans } from '@lingui/react';
import { useRouter } from "next/router";
import { makeUseAxios } from 'axios-hooks';
import { baseAxiosConfig, logoutApiRequest } from '../lib/api';
import ErrorPagePopup from '../components/ErrorPagePopup';

export default function LogoutPage() {
    const router = useRouter();
    const { locale } = router;
    const useAxios = makeUseAxios(baseAxiosConfig(locale));
    const [{ loading, error }] = useAxios(logoutApiRequest);

    if (loading) {
        return <Trans id="Logging out..." />
    } else if (error) {
        return <ErrorPagePopup apiError={error} />
    } else {
        router.push('/login', undefined, { locale });
        return null;
    }

}
