import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { makeUseAxios } from 'axios-hooks'
import {
    baseAxiosConfig, getUserDetails, getDatasets,
} from '../lib/api';
import ErrorPagePopup from './ErrorPagePopup';

const cookieExpiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export default function AuthWrapper({ Component, pageProps }) {
    const [cookies, setCookie] = useCookies(['NEXT_LOCALE', 'currentDatasetId']);
    const useAxios = makeUseAxios(baseAxiosConfig(cookies.NEXT_LOCALE));
    const [currentDatasetId, _setCurrentDatasetId] = useState(cookies.currentDatasetId);
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

    if (userDetailsLoading || datasetsLoading) {
        return <p>Loading...</p>
    } else if (userDetailsError || datasetsError) {
        const invalidAuthError =
            userDetailsError && userDetailsError.message.includes('401')
            || datasetsError && datasetsError.message.includes('401')
        if (invalidAuthError) {
            window.location.href = '/login';
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
            window.location.href = '/no_datasets';
            return null;
        }
    }

}
