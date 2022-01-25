export const actions = {
  markTaskAsComplete: 'markTaskAsComplete',
  markTaskAsIncomplete: 'markTaskAsIncomplete',
  getPreviousTask: 'getPreviousTask',
  getNextTask: 'getNextTask',
  skipTaskAndFetchLatestWorkflowState: 'skipTaskAndFetchLatestWorkflowState',
  skipTaskAndGetNextTask: 'skipTaskAndGetNextTask',
  skipTaskAndGetPreviousTask: 'skipTaskAndGetPreviousTask',
  fetchLatestWorkflowState: 'fetchLatestWorkflowState',
  toggleCompleteStateLocally: 'toggleCompleteStateLocally'
}

const taskNotReachedTooltip = [
  'You are currently previewing a future task.',
  'Click "What\'s Next?" to see your latest actionable task.',
];

export function getWorkflowStats({ currentTask, taskBreadcrumbs }) {
  const { id: currentTaskId, manual, reached } = currentTask;
  const { terminus } = currentTask.details;
  const completed = terminus ? true : currentTask.completed;
  const isOldestTask = taskBreadcrumbs.indexOf(currentTask.id) === 0;
  const isLatestTask = [...taskBreadcrumbs].pop() === currentTask.id;
  const returnObject = {
    currentTaskId, completed, manual, isOldestTask,
    isLatestTask, reached, terminus
  };
  for (const [key, value] of Object.entries(returnObject)) {
    if (value === undefined) {
      const errorMessage = `getWorkflowStats.${key} is undefined`;
      console.error(errorMessage);
      throw new Error([errorMessage]);
    }
  }
  return returnObject;
}

function validateButton(workflowState, enabled, tooltip, onClickAction) {
  if (enabled && !onClickAction) {
    console.error(
      'An enabled button must return one or more onClickAction.',
      `workflowState: ${JSON.stringify(workflowState)}`
    );
    throw new Error([
      'Enabled button returned no onClickAction. See console for logs.'
    ]);
  };
  if (!enabled && !tooltip) {
    console.error(
      'A disabled button must have a tooltip value.',
      `workflowState: ${JSON.stringify(workflowState)}`
    );
    throw new Error([
      'Disabled button returned no tooltip. See console for logs.'
    ]);
  };
};

export function taskCompleteCheckbox(workflowState) {
  const { completed, manual, isLatestTask, reached, terminus } = getWorkflowStats(workflowState);
  const { enabled, tooltip } = (() => {
    if (!reached) {
      return {
        enabled: false,
        tooltip: taskNotReachedTooltip
      };
    } else if (terminus) {
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
            'Click "What\'s Next?" once task is complete.',
          ]
        };
      }
    }
  })();;
  const onClickAction = (() => {
    if (!reached || terminus) {
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
  validateButton(workflowState, enabled, tooltip, onClickAction);
  return {
    enabled, tooltip, onClickAction,
    checked: completed
  };
};

export function priorTaskButton(workflowState) {
  const { reached, completed, isOldestTask, isLatestTask } = getWorkflowStats(workflowState);
  const { enabled, tooltip } = (() => {
    if (!reached) {
      return {
        enabled: false,
        tooltip: taskNotReachedTooltip
      };
    } else if (isOldestTask) {
      return {
        enabled: false,
        tooltip: ['This is your first task.']
      }
    } else {
      return { enabled: true }
    }
  })();
  const onClickAction = (() => {
    if (!reached || isOldestTask) {
      return null
    } else {
      if (isLatestTask) {
        return actions.getPreviousTask
      } else {
        if (completed) {
          return actions.getPreviousTask
        } else {
          return actions.skipTaskAndGetPreviousTask
        }
      }
    }
  })();
  validateButton(workflowState, enabled, tooltip, onClickAction);
  return { enabled, tooltip, onClickAction };
};

export function nextTaskButton(workflowState) {
  const { reached, isLatestTask, terminus, completed } = getWorkflowStats(workflowState);
  const { enabled, tooltip } = (() => {
    if (!reached) {
      return {
        enabled: false,
        tooltip: taskNotReachedTooltip
      };
    } else if (terminus) {
      return {
        enabled: false,
        tooltip: ['This workflow is now complete.']
      };
    } else if (isLatestTask) {
      return {
        enabled: false,
        tooltip: [
          'This is your current task.',
          'Click "What\'s Next?" to proceed.'
        ]
      };
    } else {
      return { enabled: true };
    }
  })();
  const onClickAction = (() => {
    if (enabled) {
      if (completed) {
        return actions.getNextTask;
      } else {
        return actions.skipTaskAndGetNextTask;
      }
    } else {
      return null;
    }
  })();
  validateButton(workflowState, enabled, tooltip, onClickAction);
  return { enabled, tooltip, onClickAction };
};

export function whatsNextButton(workflowState) {
  const { completed } = getWorkflowStats(workflowState);
  const enabled = true;
  const tooltip = null;
  const onClickAction = (() => {
    if (completed) {
      return actions.fetchLatestWorkflowState
    } else {
      return actions.skipTaskAndFetchLatestWorkflowState
    };
  })();
  validateButton(workflowState, enabled, tooltip, onClickAction);
  return { enabled, onClickAction };
};
