import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeUseAxios } from 'axios-hooks'
import {
    baseAxiosConfig, getUserDetails, getDatasets,
} from '../lib/api';
import ErrorPagePopup from './ErrorPagePopup';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function AuthWrapper({ Component, pageProps }) {
    const router = useRouter()
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
            router.push('/login');
            return null;
        } else {
            return <ErrorPagePopup apiError={userDetailsError || datasetsError} />
        }
    } else {
        if (!currentDatasetId) {
            setCurrentDatasetId(datasets.datasets[0].id);
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
