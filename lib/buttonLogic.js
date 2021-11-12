import {
  taskCompleteRequest,
  taskCompleteDeleteRequest
} from './api';

function getWorkflowStats({ currentTask, taskBreadcrumbs }) {
  const { id: currentTaskId, completed, manual } = currentTask;
  const latestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  return { currentTaskId, completed, manual, latestTask }
}

const actions = {
  updateWorkflowState: 'updateWorkflowState'
}

export function priorTaskButton(datasetId, workflowState) {
  const { currentTaskId, completed, manual, latestTask } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (latestTask) {
      return workflowState.taskBreadcrumbs.len > 1;
    } else {
      return !(workflowState.taskBreadcrumbs[0] === currentTaskId)
    }
  })()
  const onClickAction = (() => {
    return enabled ? null : actions.updateWorkflowState;
  })()
  return { enabled, onClickAction }
}


export function taskCompleteCheckbox(datasetId, workflowState) {
  const { currentTaskId, completed, manual } = getWorkflowStats(workflowState);
  const onClickAction = (() => {
    if (manual) {
      if (completed) {
        return taskCompleteDeleteRequest(datasetId, currentTaskId);
      } else {
        return taskCompleteRequest(datasetId, currentTaskId);
      }
    } else {
      return null;
    }
  })()
  return {
    enabled: true,
    checked: completed,
    onClickAction
  }
}

