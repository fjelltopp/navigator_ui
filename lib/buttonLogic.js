export const actions = {
  markTaskAsCompleted: 'markTaskAsCompleted',
  markTaskAsIncomplete: 'markTaskAsIncomplete',
  getPreviousTask: 'getPreviousTask',
  getNextTask: 'getNextTask',
  skipTask: 'skipTask',
  fetchLatestWorkflowState: 'fetchLatestWorkflowState'
}

function getWorkflowStats({ currentTask, taskBreadcrumbs }) {
  const { id: currentTaskId, completed, manual } = currentTask;
  const isOldestTask = taskBreadcrumbs.indexOf(currentTask.id) === 0;
  const isLatestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  return { currentTaskId, completed, manual, isOldestTask, isLatestTask }
}

export function taskCompleteCheckbox(workflowState) {
  const { completed, manual } = getWorkflowStats(workflowState);
  const onClickAction = (() => {
    if (manual) {
      if (completed) {
        return actions.markTaskAsIncomplete;
      } else {
        return actions.markTaskAsCompleted;
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

export function priorTaskButton(workflowState) {
  const { isOldestTask, isLatestTask } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (isLatestTask) {
      return workflowState.taskBreadcrumbs.length > 1;
    } else {
      if (isOldestTask) {
        return false;
      } else {
        return true;
      }
    }
  })()
  const onClickAction = (() => {
    if (enabled) {
      return actions.getPreviousTask;
    } else {
      return null;
    }
  })()
  return { enabled, onClickAction }
}

export function nextTaskButton(workflowState) {
  const { isLatestTask } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (isLatestTask) {
      return false;
    } else {
      return true;
    }
  })()
  const onClickAction = (() => {
    if (isLatestTask) {
      return null;
    } else {
      return actions.getNextTask;
    }
  })()
  return { enabled, onClickAction }
}

export function whatsNextButton(workflowState) {
  const { completed } = getWorkflowStats(workflowState);
  const enabled = true;
  const onClickActions = (() => {
    if (completed) {
      return [actions.fetchLatestWorkflowState]
    } else {
      return [
        actions.skipTask,
        actions.fetchLatestWorkflowState
      ]
    }
  })()
  return { enabled, onClickActions }
}
