export const actions = {
  markTaskAsComplete: 'markTaskAsComplete',
  markTaskAsIncomplete: 'markTaskAsIncomplete',
  getPreviousTask: 'getPreviousTask',
  getNextTask: 'getNextTask',
  skipTask: 'skipTask',
  fetchLatestWorkflowState: 'fetchLatestWorkflowState'
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
    // TODO: uncomment once api stops returning mockup data
    // throw new Error([
    //   'Enabled button returned no onClickActions. See console for logs.'
    // ]);
  };
};

export function taskCompleteCheckbox(workflowState) {
  const { complete, manual } = getWorkflowStats(workflowState);
  const enabled = true;
  const onClickActions = (() => {
    if (manual) {
      if (complete) {
        return [actions.markTaskAsIncomplete];
      } else {
        return [actions.markTaskAsComplete];
      };
    } else {
      return null;
    };
  })();
  errorCheckButton(workflowState, enabled, onClickActions);
  return {
    enabled,
    checked: complete,
    onClickActions
  };
};

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
      };
    };
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
      return [
        actions.skipTask,
        actions.fetchLatestWorkflowState
      ];
    };
  })();
  errorCheckButton(workflowState, enabled, onClickActions);
  return { enabled, onClickActions };
};
