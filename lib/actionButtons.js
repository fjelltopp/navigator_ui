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
  const isOldestTask = taskBreadcrumbs.indexOf(currentTask.id) === 0;
  const isLatestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  const complete = !(isLatestTask || currentTask.skipped);
  return { currentTaskId, complete, manual, isOldestTask, isLatestTask }
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
  const { complete, manual, isLatestTask } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (isLatestTask) {
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
    if (isLatestTask) {
      if (manual) {
        if (complete) {
          return actions.markTaskAsIncomplete
        } else {
          return actions.markTaskAsComplete
        }
      } else {
        if (manual) {
          if (complete) {
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
        if (complete) {
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
    checked: complete,
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
  const { isLatestTask } = getWorkflowStats(workflowState);
  const enabled = (() => {
    if (isLatestTask) {
      return false;
    } else {
      return true;
    }
  })();
  const onClickAction = (() => {
    if (isLatestTask) {
      return null;
    } else {
      return actions.getNextTask;
    };
  })();
  errorCheckButton(workflowState, enabled, onClickAction);
  return { enabled, onClickAction };
};

export function whatsNextButton(workflowState) {
  const { complete } = getWorkflowStats(workflowState);
  const enabled = true;
  const onClickAction = (() => {
    if (complete) {
      return actions.fetchLatestWorkflowState
    } else {
      return actions.skipTaskAndFetchLatestWorkflowState
    };
  })();
  errorCheckButton(workflowState, enabled, onClickAction);
  return { enabled, onClickAction };
};
