import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { t } from '@lingui/macro';
import { useCookies } from 'react-cookie';
import { makeUseAxios } from 'axios-hooks'
import {
    baseAxiosConfig, getUserDetails, getDatasets,
} from '../lib/api';
import ErrorPagePopup from './ErrorPagePopup';

const cookieExpiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export default function AuthWrapper({ Component, pageProps }) {
    const router = useRouter();
    const { locale } = router;
    const [cookies, setCookie] = useCookies(['currentDatasetId']);
    const useAxios = makeUseAxios(baseAxiosConfig(locale));
    const [currentDatasetId, _setCurrentDatasetId] = useState(cookies.currentDatasetId);
    const [isLoading, setLoading] = useState(true);
    const setCurrentDatasetId = datasetId => {
        setCookie(
            'currentDatasetId', datasetId,
            { path: '/', expires: cookieExpiry }
        );
        _setCurrentDatasetId(datasetId);
    }

    const [{
        data: userDetails,
        loading: userDetailsLoading,
        error: userDetailsError
    }] = useAxios(getUserDetails);
    const [{
        data: datasets,
        loading: datasetsLoading,
        error: datasetsError
    }] = useAxios(getDatasets);

    useEffect(async () => {
        setLoading(userDetailsLoading || datasetsLoading);
    }, [userDetailsLoading, datasetsLoading]);

    if (isLoading) {
        return t`Loading...`;
    } else if (userDetailsError || datasetsError) {
        const invalidAuthError =
            userDetailsError && userDetailsError.message.includes('401')
            || datasetsError && datasetsError.message.includes('401')
        if (invalidAuthError) {
            const url = {
                pathname: '/login',
                query: { redirectPath: router.asPath }
            };
            router.push(url, undefined, { locale });
            return null;
        } else {
            return <ErrorPagePopup apiError={userDetailsError || datasetsError} />
        }
    } else {
        if (datasets.datasets.length > 0) {
            const currentDatasetIdIsValid = datasets.datasets
                .map(dataset => dataset.id).includes(currentDatasetId);
            if (!currentDatasetId || !currentDatasetIdIsValid) {
                setCurrentDatasetId(datasets.datasets[0].id);
            }
            return <Component {...{
                ...pageProps,
                user: {
                    ...userDetails,
                    datasets: datasets.datasets
                },
                currentDatasetId,
                setCurrentDatasetId,
            }} />
        } else {
            router.push('/no_datasets', undefined, { locale });
            return null;
        }
    }

}
