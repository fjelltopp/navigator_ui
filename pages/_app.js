import React, { useState } from 'react';
import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

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

export default function MyApp({ Component, pageProps }) {

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
    return <p>Please log into your ADR account</p>
  } else {
    if (!currentDatasetId) {
      setCurrentDatasetId(datasets[0].id);
    }
    const user = {
      ...userDetails,
      datasets
    }
    return <Component {...{
      ...pageProps,
      user,
      currentDatasetId, setCurrentDatasetId,

      datasetState,
      datasetStateLoading,
      datasetStateError,
      fetchDatasetState,
    }} />
  }

}
