import axios from 'axios'

export function baseAxiosConfig(locale) {
    return {
        axios: axios.create({
            baseURL: 'http://localhost:3000/api/',  // IGNORED?
            headers: {
                'Accept-Language': locale,
            }
        })
    }
}

export const getUserDetails = '/user'

export const getDatasets = '/datasets'

export const getWorkflow = datasetId =>
    `/workflows/${datasetId}/state`

export const getWorkflowTasks = datasetId =>
    `/workflows/${datasetId}/tasks`

export const getWorkflowTask = (datasetId, taskId) =>
    `/workflows/${datasetId}/tasks/${taskId}`

export const getMilestone = (datasetId, milestoneId) =>
    `/workflows/${datasetId}/milestones/${milestoneId}`

export const taskCompleteRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/complete`,
    method: 'POST'
})

export const taskCompleteDeleteRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/complete`,
    method: 'DELETE'
})

export const taskSkipRequest = (datasetId, taskId) => ({
    url: `/workflows/${datasetId}/tasks/${taskId}/skip`,
    method: 'POST'
})
