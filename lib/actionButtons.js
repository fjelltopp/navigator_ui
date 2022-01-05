export const actions = {
  markTaskAsComplete: 'markTaskAsComplete',
  markTaskAsIncomplete: 'markTaskAsIncomplete',
  getPreviousTask: 'getPreviousTask',
  getNextTask: 'getNextTask',
  skipTaskAndFetchLatestWorkflowState: 'skipTaskAndFetchLatestWorkflowState',
  fetchLatestWorkflowState: 'fetchLatestWorkflowState',
  toggleCompleteStateLocally: 'toggleCompleteStateLocally'
}

export function getWorkflowStats({ currentTask, taskBreadcrumbs }) {
  const { id: currentTaskId, manual } = currentTask;
  const { terminus } = currentTask.details;
  const completed = terminus ? true : currentTask.completed;
  const isOldestTask = taskBreadcrumbs.indexOf(currentTask.id) === 0;
  const isLatestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  return { currentTaskId, completed, manual, isOldestTask, isLatestTask, terminus }
}

function validateButton(workflowState, enabled, onClickAction) {
  if (enabled && !onClickAction) {
    console.error(
      'An enabled button must return one or more onClickAction.',
      `workflowState: ${JSON.stringify(workflowState)}`
    );
    throw new Error([
      'Enabled button returned no onClickAction. See console for logs.'
    ]);
  };
};

export function taskCompleteCheckbox(workflowState) {
  const { completed, manual, isLatestTask, terminus } = getWorkflowStats(workflowState);
  const { enabled, tooltip } = (() => {
    if (terminus) {
      return {
        enabled: false,
        tooltip: [
          'This workflow is now complete.',
          'No further action is required.'
        ]
      };
    } else if (isLatestTask) {
      return { enabled: true };
    } else {
      if (manual) {
        return { enabled: true };
      } else {
        return {
          enabled: false,
          tooltip: [
            'Task status is automatically checked by system.',
            'Click "What\'s Next" once task is complete.',
          ]
        };
      }
    }
  })();;
  const onClickAction = (() => {
    if (terminus) {
      return null;
    } else if (isLatestTask) {
      if (manual) {
        if (completed) {
          return actions.markTaskAsIncomplete
        } else {
          return actions.markTaskAsComplete
        }
      } else {
        if (manual) {
          if (completed) {
            return actions.markTaskAsIncomplete;
          } else {
            return actions.markTaskAsComplete
          }
        } else {
          return actions.toggleCompleteStateLocally;
        }
      }
    } else {
      if (manual) {
        if (completed) {
          return actions.markTaskAsIncomplete;
        } else {
          return actions.markTaskAsComplete;
        }
      } else {
        return null;
      }
    }
  })();
  validateButton(workflowState, enabled, onClickAction);
  return {
    enabled, tooltip, onClickAction,
    checked: completed
  };
};

export function priorTaskButton(workflowState) {
  const { manual, isOldestTask } = getWorkflowStats(workflowState);
  const { enabled, tooltip } = (() => {
    const firstTaskTooltip = ['This is your first task'];
    if (manual) {
      if (!isOldestTask) {
        return { enabled: true };
      } else {
        return { enabled: false, tooltip: firstTaskTooltip };
      }
    } else {
      if (workflowState.taskBreadcrumbs.length > 1) {
        return { enabled: true };
      } else {
        return { enabled: false, tooltip: firstTaskTooltip };
      }
    }
  })();
  const onClickAction = (() => {
    if (enabled) {
      return actions.getPreviousTask;
    } else {
      return null;
    };
  })();
  validateButton(workflowState, enabled, onClickAction);
  return { enabled, tooltip, onClickAction };
};

export function nextTaskButton(workflowState) {
  const { isLatestTask, terminus } = getWorkflowStats(workflowState);
  const { enabled, tooltip } = (() => {
    if (terminus) {
      return {
        enabled: false,
        tooltip: ['This workflow is now complete']
      };
    } else if (isLatestTask) {
      return {
        enabled: false,
        tooltip: [
          'This is your current task.',
          'Click "What\'s Next ? " to proceed.'
        ]
      };
    } else {
      return { enabled: true };
    }
  })();
  const onClickAction = (() => {
    if (terminus) {
      return null;
    } else if (isLatestTask) {
      return null;
    } else {
      return actions.getNextTask;
    };
  })();
  validateButton(workflowState, enabled, onClickAction);
  return { enabled, tooltip, onClickAction };
};

export function whatsNextButton(workflowState) {
  const { completed } = getWorkflowStats(workflowState);
  const enabled = true;
  const onClickAction = (() => {
    if (completed) {
      return actions.fetchLatestWorkflowState
    } else {
      return actions.skipTaskAndFetchLatestWorkflowState
    };
  })();
  validateButton(workflowState, enabled, onClickAction);
  return { enabled, onClickAction };
};
