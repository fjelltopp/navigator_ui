import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeUseAxios } from 'axios-hooks'
import {
    baseAxiosConfig,
    getUserDetails, getDatasets,
    getWorkflow
} from '../lib/api';

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
    // const [
    //     {
    //         data: workflow,
    //         loading: workflowLoading,
    //         error: workflowError
    //     },
    //     fetchWorkflow
    // ] = useAxios(getWorkflow, {manual: true});
    

    if (userDetailsLoading || datasetsLoading) {
        return <p>Loading...</p>
    } else if (userDetailsError || datasetsError) {
        const statusCode = JSON.parse(JSON.stringify(userDetailsError)).status;
        if (statusCode === 401) {
            router.push('/login');
            return null;
        } else {
            return <p>Unknown Server Error</p>
        }
    } else {
        if (!currentDatasetId) {
            setCurrentDatasetId(datasets.datasets[0].id);
        }
        return <Component {...{
            ...pageProps,
            user: {
                ...userDetails,
                datasets
            },
            currentDatasetId, setCurrentDatasetId,
            workflow,
            workflowLoading,
            workflowError,
            fetchWorkflow,
        }} />
    }

}
