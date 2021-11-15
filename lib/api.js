import axios from 'axios'

export const baseAxiosConfig = {
    axios: axios.create({
        baseURL: 'http://navigator.minikube/api',
    })
}

export const loginApiRequest =
    { url: '/login', method: 'POST' }

export const logoutApiRequest =
    { url: '/logout', method: 'POST' }

export const getUserDetails = '/user';

export const getDatasets = '/datasets'

export const getWorkflows = '/workflows'

export const getWorkflow = datasetId =>
    `/workflows/${datasetId}/state`

export const getWorkflowTask = (datasetId, taskId) =>
    `/workflows/${datasetId}/tasks/${taskId}`

export const taskCompleteRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/complete`,
    method: 'POST'
})

export const taskCompleteDeleteRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/complete`,
    method: 'DELETE'
})