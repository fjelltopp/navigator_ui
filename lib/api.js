import axios from 'axios'

export const baseAxiosConfig = {
    axios: axios.create({
        baseURL: 'http://navigator.minikube/api',
    })
}

export const attemptLogin =
    { url: '/login', method: 'POST' }

export const logoutRequest =
    { url: '/logout', method: 'POST' }

export const getUserDetails = '/user';

export const getDatasets = '/datasets'

export const getWorkflows = '/workflows'

export const getDatasetState = datasetId =>
    `/workflows/${datasetId}/state`

export const getWorkflow = datasetId =>
    `/workflows/${datasetId}/state`

export const getWorkflowTask = (datasetId, taskId) =>
    `/workflows/${datasetId}/tasks/${taskId}`

// const actionWorkflowTask = (datasetId, taskId, action) => ({
//     url: `/workflows/${datasetId}/tasks/${taskId}/${action}`,
//     method: 'POST',
// })

// export const completeWorkflowTask = (datasetId, taskId) =>
//     actionWorkflowTask(datasetId, taskId, 'complete')

// export const skipWorkflowTask = (datasetId, taskId) =>
//     actionWorkflowTask(datasetId, taskId, 'skip')

export const taskCompleteRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/complete`,
    method: 'POST'
})

export const taskCompleteDeleteRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/complete`,
    method: 'DELETE'
})