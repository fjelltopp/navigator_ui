export const actions = {
  markTaskAsComplete: 'markTaskAsComplete',
  markTaskAsIncomplete: 'markTaskAsIncomplete',
  getPreviousTask: 'getPreviousTask',
  getNextTask: 'getNextTask',
  skipTaskAndFetchLatestWorkflowState: 'skipTaskAndFetchLatestWorkflowState',
  fetchLatestWorkflowState: 'fetchLatestWorkflowState',
  toggleCompleteStateLocally: 'toggleCompleteStateLocally'
}

function getWorkflowStats({ currentTask, taskBreadcrumbs }) {
  const { id: currentTaskId, manual, completed } = currentTask;
  const { terminus } = currentTask.details;
  const isOldestTask = taskBreadcrumbs.indexOf(currentTask.id) === 0;
  const isLatestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  return { currentTaskId, completed, manual, isOldestTask, isLatestTask, terminus }
}

function errorCheckButton(workflowState, enabled, onClickAction) {
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
  const enabled = (() => {
    if (terminus) {
      return false;
    } else if (isLatestTask) {
      return true;
    } else {
      if (manual) {
        return true;
      } else {
        return false;
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
  errorCheckButton(workflowState, enabled, onClickAction);
  return {
    enabled,
    checked: completed,
    onClickAction
  };
};

export function priorTaskButton(workflowState) {
  const { manual, isOldestTask } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (manual) {
      if (!isOldestTask) {
        return true;
      } else {
        return false;
      }
    } else {
      if (workflowState.taskBreadcrumbs.length > 1) {
        return true;
      } else {
        return false;
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
  errorCheckButton(workflowState, enabled, onClickAction);
  return { enabled, onClickAction };
};

export function nextTaskButton(workflowState) {
  const { isLatestTask, terminus } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (terminus) {
      return false;
    } else if (isLatestTask) {
      return false;
    } else {
      return true;
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
  errorCheckButton(workflowState, enabled, onClickAction);
  return { enabled, onClickAction };
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
  errorCheckButton(workflowState, enabled, onClickAction);
  return { enabled, onClickAction };
};
