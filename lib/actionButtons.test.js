import {
    actions,
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
} from './actionButtons';

const id = 'task1';

describe('The "Task Complete" button should', () => {
    describe('if the workflow is terminus', () => {
        const details = { terminus: true };
        test('always return a disabled button with no onClick Action', () => {
            const completed = true;
            const taskBreadcrumbs = ['task1'];
            const workflowState = { currentTask: { id, completed, details }, taskBreadcrumbs };
            expect(taskCompleteCheckbox(workflowState))
                .toMatchObject({
                    enabled: false,
                    checked: true,
                    onClickAction: null
                });
        });
    });
    describe('if the workflow is not terminus', () => {
        const details = { terminus: false };
        describe('If the task isLatestTask in the breadcrumbs', () => {
            const completed = false;
            const enabled = true;
            const taskBreadcrumbs = ['task0', 'task1'];
            describe('and is set to manual', () => {
                const manual = true;
                test('and is incomplete, should return an enabled unchecked button with the markTaskAsComplete onclick action', () => {
                    const checked = false;
                    const workflowState = { currentTask: { id, manual, completed, details }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({
                            enabled, checked,
                            onClickAction: actions.markTaskAsComplete
                        });
                });
            });
            describe('and is set to not manual', () => {
                const manual = false;
                test('and is incomplete, should return an enabled unchecked button with the toggleCompleteStateLocally onclick action', () => {
                    const checked = false;
                    const workflowState = { currentTask: { id, manual, completed, details }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({
                            enabled, checked,
                            onClickAction: actions.toggleCompleteStateLocally
                        });
                });
            });
        });
        describe('If the task !isLatestTask in the breadcrumbs', () => {
            const taskBreadcrumbs = ['task1', 'task2'];
            describe('and is set to manual', () => {
                const enabled = true;
                const manual = true;
                test('and is incomplete, should return an enabled unchecked button with the markTaskAsComplete onclick action', () => {
                    const completed = false;
                    const checked = false;
                    const workflowState = { currentTask: { id, manual, completed, details }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({
                            enabled, checked,
                            onClickAction: actions.markTaskAsComplete
                        });
                });
                test('and is complete, should return an enabled checked button with the markTaskAsIncomplete onclick action', () => {
                    const completed = true;
                    const checked = true;
                    const workflowState = { currentTask: { id, manual, completed, details }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({
                            enabled, checked,
                            onClickAction: actions.markTaskAsIncomplete
                        });
                });
            });
            describe('and is set to not manual', () => {
                const enabled = false;
                const manual = false;
                test('and is incomplete, should return an disabled unchecked button', () => {
                    const completed = false;
                    const checked = false;
                    const workflowState = { currentTask: { id, manual, completed, details }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({ enabled, checked, onClickAction: null });
                });
                test('and is complete, should return an disabled checked button', () => {
                    const completed = true;
                    const checked = true;
                    const workflowState = { currentTask: { id, manual, completed, details }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({ enabled, checked, onClickAction: null });
                });
            });
        });
    });
});

describe('The "Prior Task" button should', () => {
    const details = { terminus: false };
    describe('If the task is set to manual', () => {
        const manual = true;
        test('and if !isOldestTask in the breadcrumbs, should return an enabled button with the getPreviousTask onclick action', () => {
            const taskBreadcrumbs = ['task0', 'task1', 'task2'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toMatchObject({
                    enabled: true,
                    onClickAction: actions.getPreviousTask
                });
        });
        test('and if isOldestTask in the breadcrumbs, should return a disabled button', () => {
            const taskBreadcrumbs = ['task1', 'task2'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toMatchObject({ enabled: false, onClickAction: null });
        });
    });
    describe('If the task is not set to manual', () => {
        const manual = false;
        test('and if breadcrumbs length > 1, should return an enabled button with the getPreviousTask onclick action', () => {
            const taskBreadcrumbs = ['task0', 'task1'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toMatchObject({
                    enabled: true,
                    onClickAction: actions.getPreviousTask
                });
        });
        test('and if breadcrumbs length <= 1, should return a disabled button', () => {
            const taskBreadcrumbs = ['task1'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toMatchObject({ enabled: false, onClickAction: null });
        });
    });
});

describe('The "Next Task" button should', () => {
    describe('if the workflow is terminus', () => {
        const details = { terminus: true };
        test('The "Next Task" button should be disabled', () => {
            const completed = true;
            const taskBreadcrumbs = ['task1', 'task2'];
            const workflowState = { currentTask: { id, completed, details }, taskBreadcrumbs };
            expect(nextTaskButton(workflowState))
                .toMatchObject({ enabled: false, onClickAction: null });
        });
    });
    describe('if the workflow is not terminus', () => {
        const details = { terminus: false };
        test('If the task isLatestTask in the breadcrumbs, should return an disabled button', () => {
            const taskBreadcrumbs = ['task0', 'task1'];
            const workflowState = { currentTask: { id, details }, taskBreadcrumbs };
            expect(nextTaskButton(workflowState))
                .toMatchObject({ enabled: false, onClickAction: null });
        });
        test('If the task !isLatestTask in the breadcrumbs, should return an enabled button with the onclick getNextTask action', () => {
            const taskBreadcrumbs = ['task0', 'task1', 'task2'];
            const workflowState = { currentTask: { id, details }, taskBreadcrumbs };
            expect(nextTaskButton(workflowState))
                .toMatchObject({
                    enabled: true,
                    onClickAction: actions.getNextTask
                });
        });
    });
});

describe('The "What\'s Next" button should', () => {
    const details = { terminus: false };
    test('If the task is complete, should return an enabled button with the onclick [fetchLatestWorkflowState] actions', () => {
        const completed = true;
        const taskBreadcrumbs = ['task1', 'task2'];
        const workflowState = { currentTask: { id, completed, details }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toMatchObject({
                enabled: true,
                onClickAction: actions.fetchLatestWorkflowState
            });
    });
    test('If the task is incomplete, should return an enabled button with the onclick skipTaskAndFetchLatestWorkflowState actions', () => {
        const completed = false;
        const taskBreadcrumbs = ['task0', 'task1', 'task2'];
        const workflowState = { currentTask: { id, completed, details }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toMatchObject({
                enabled: true,
                onClickAction: actions.skipTaskAndFetchLatestWorkflowState
            });
    });
});
