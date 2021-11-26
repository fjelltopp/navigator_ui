import React, { useState } from 'react';
import { makeUseAxios } from 'axios-hooks'
import {
    baseAxiosConfig, getUserDetails, getDatasets,
} from '../lib/api';
import ErrorPagePopup from './ErrorPagePopup';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function AuthWrapper({ Component, pageProps }) {
    const [currentDatasetId, setCurrentDatasetId] = useState();

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
        if (!currentDatasetId) {
            if (datasets.datasets) {
                setCurrentDatasetId(datasets.datasets[0].id);
            } else {
                window.location.href = '/no_datasets';
                return null;
            }
        }
        return <Component {...{
            ...pageProps,
            user: {
                ...userDetails,
                datasets: datasets.datasets
            },
            currentDatasetId, setCurrentDatasetId,
        }} />
    }

}
