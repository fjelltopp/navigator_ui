export const actions = {
  markTaskAsComplete: 'markTaskAsComplete',
  markTaskAsIncomplete: 'markTaskAsIncomplete',
  getPreviousTask: 'getPreviousTask',
  getNextTask: 'getNextTask',
  skipTask: 'skipTask',
  fetchLatestWorkflowState: 'fetchLatestWorkflowState',
  toggleCompleteStateLocally: 'toggleCompleteStateLocally'
}

function getWorkflowStats({ currentTask, taskBreadcrumbs }) {
  const { id: currentTaskId, manual } = currentTask;
  const complete = currentTask.details.complete;
  const isOldestTask = taskBreadcrumbs.indexOf(currentTask.id) === 0;
  const isLatestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  return { currentTaskId, complete, manual, isOldestTask, isLatestTask }
}

function errorCheckButton(workflowState, enabled, onClickActions) {
  if (enabled && !onClickActions) {
    console.error(
      'An enabled button must return one or more onClickActions.',
      `workflowState: ${JSON.stringify(workflowState)}`
    );
    throw new Error([
      'Enabled button returned no onClickActions. See console for logs.'
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
  const onClickActions = (() => {
    if (isLatestTask) {
      if (manual) {
        if (complete) {
          return [actions.markTaskAsIncomplete]
        } else {
          return [actions.markTaskAsComplete]
        }
      } else {
        if (manual) {
          if (complete) {
            return [actions.markTaskAsIncomplete];
          } else {
            return [actions.markTaskAsComplete]
          }
        } else {
          return [actions.toggleCompleteStateLocally];
        }
      }
    } else {
      if (manual) {
        if (complete) {
          return [actions.markTaskAsIncomplete];
        } else {
          return [actions.markTaskAsComplete];
        }
      } else {
        return null;
      }
    }
  })();
  errorCheckButton(workflowState, enabled, onClickActions);
  return {
    enabled,
    checked: complete,
    onClickActions
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
  const onClickActions = (() => {
    if (enabled) {
      return [actions.getPreviousTask];
    } else {
      return null;
    };
  })();
  errorCheckButton(workflowState, enabled, onClickActions);
  return { enabled, onClickActions };
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
  const onClickActions = (() => {
    if (isLatestTask) {
      return null;
    } else {
      return [actions.getNextTask];
    };
  })();
  errorCheckButton(workflowState, enabled, onClickActions);
  return { enabled, onClickActions };
};

export function whatsNextButton(workflowState) {
  const { complete } = getWorkflowStats(workflowState);
  const enabled = true;
  const onClickActions = (() => {
    if (complete) {
      return [actions.fetchLatestWorkflowState]
    } else {
      // TODO: we now automatically run fetchLatestWorkflowState
      // after skipTask, so there's no need to call it specifically
      return [
        actions.skipTask,
        actions.fetchLatestWorkflowState
      ];
    };
  })();
  errorCheckButton(workflowState, enabled, onClickActions);
  return { enabled, onClickActions };
};
