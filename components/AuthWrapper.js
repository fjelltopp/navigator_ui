import React, { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

const useAxios = makeUseAxios({
    axios: axios.create({
        // TODO: get working within minikube
        baseURL: 'http://127.0.0.1:5000',
        // withCredentials: true
        proxy: {
            protocol: 'http',
            host: '127.0.0.1',
            port: 5000
        },
    })
})

export default function AuthWrapper({ Component, pageProps }) {
    const router = useRouter()
    const [currentDatasetId, setCurrentDatasetId] = useState();

    const [{
        data: userDetails,
        loading: userDetailsLoading,
        error: userDetailsError
    }] = useAxios('/user_details');
    const [{
        data: datasets,
        loading: datasetsLoading,
        error: datasetsError
    }] = useAxios('/datasets');
    const [
        {
            data: datasetState,
            loading: datasetStateLoading,
            error: datasetStateError
        },
        fetchDatasetState
    ] = useAxios('/dataset_state', { manual: true });

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
            setCurrentDatasetId(datasets[0].id);
        }
        return <Component {...{
            ...pageProps,
            user: {
                ...userDetails,
                datasets
            },
            currentDatasetId, setCurrentDatasetId,
            datasetState,
            datasetStateLoading,
            datasetStateError,
            fetchDatasetState,
        }} />
    }

}
