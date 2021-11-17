import {
    actions,
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
} from './actionButtons';

const id = 'task1';

describe('The "Task Complete" button should', () => {
    describe('If the task isLatestTask in the breadcrumbs', () => {
        const enabled = true;
        const taskBreadcrumbs = ['task0', 'task1'];
        describe('and is set to manual', () => {
            const manual = true;
            test('and is incomplete, should return an enabled unchecked button with the markTaskAsComplete onclick action', () => {
                const complete = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickActions: [actions.markTaskAsComplete]
                    });
            });
            test('and is complete, should return an enabled checked button with the markTaskAsIncomplete onclick action', () => {
                const complete = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickActions: [actions.markTaskAsIncomplete]
                    });
            });
        });
        describe('and is set to not manual', () => {
            const manual = false;            
            test('and is incomplete, should return an enabled unchecked button with the toggleCompleteStateLocally onclick action', () => {
                const complete = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickActions: [actions.toggleCompleteStateLocally]
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
                const complete = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickActions: [actions.markTaskAsComplete]
                    });
            });
            test('and is complete, should return an enabled checked button with the markTaskAsIncomplete onclick action', () => {
                const complete = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickActions: [actions.markTaskAsIncomplete]
                    });
            });
        });
        describe('and is set to not manual', () => {
            const enabled = false;
            const manual = false;
            test('and is incomplete, should return an disabled unchecked button', () => {
                const complete = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({ enabled, checked, onClickActions: null });
            });
            test('and is complete, should return an disabled checked button', () => {
                const complete = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, details: { complete } }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({ enabled, checked, onClickActions: null });
            });
        });
    });
});

describe('The "Prior Task" button should', () => {
    const details = { complete: null };
    describe('If the task is set to manual', () => {
        const manual = true;
        test('and if isOldestTask in the breadcrumbs, should return an enabled button with the getPreviousTask onclick action', () => {
            const taskBreadcrumbs = ['task1', 'task2'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({
                    enabled: true,
                    onClickActions: [actions.getPreviousTask]
                });
        });
        test('and if not isOldestTask in the breadcrumbs, should return a disabled button', () => {
            const taskBreadcrumbs = ['task0', 'task1'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({ enabled: false, onClickActions: null });
        });
    });
    describe('If the task is not set to manual', () => {
        const manual = false;
        test('and if breadcrumbs length > 1, should return an enabled button with the getPreviousTask onclick action', () => {
            const taskBreadcrumbs = ['task0', 'task1'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({
                    enabled: true,
                    onClickActions: [actions.getPreviousTask]
                });
        });
        test('and if breadcrumbs length <= 1, should return a disabled button', () => {
            const taskBreadcrumbs = ['task1'];
            const workflowState = { currentTask: { id, manual, details }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({ enabled: false, onClickActions: null });
        });
    });
});

describe('The "Next Task" button should', () => {
    const details = { complete: null };
    test('If the task isLatestTask in the breadcrumbs, should return an disabled button', () => {
        const taskBreadcrumbs = ['task0', 'task1'];
        const workflowState = { currentTask: { id, details }, taskBreadcrumbs };
        expect(nextTaskButton(workflowState))
            .toStrictEqual({ enabled: false, onClickActions: null });
    });
    test('If the task !isLatestTask in the breadcrumbs, should return an enabled button with the onclick getNextTask action', () => {
        const taskBreadcrumbs = ['task0', 'task1', 'task2'];
        const workflowState = { currentTask: { id, details }, taskBreadcrumbs };
        expect(nextTaskButton(workflowState))
            .toStrictEqual({
                enabled: true,
                onClickActions: [actions.getNextTask]
            });
    });
});

describe('The "What\'s Next" button should', () => {
    test('If the task is complete, should return an enabled button with the onclick [fetchLatestWorkflowState] actions', () => {
        const complete = true;
        const taskBreadcrumbs = ['task0', 'task1'];
        const workflowState = { currentTask: { id, details: { complete } }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toStrictEqual({
                enabled: true,
                onClickActions: [actions.fetchLatestWorkflowState]
            });
    });
    test('If the task is incomplete, should return an enabled button with the onclick [skipTask, fetchLatestWorkflowState] actions', () => {
        const complete = false;
        const taskBreadcrumbs = ['task0', 'task1'];
        const workflowState = { currentTask: { id, details: { complete } }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toStrictEqual({
                enabled: true,
                onClickActions: [
                    actions.skipTask,
                    actions.fetchLatestWorkflowState
                ]
            });
    });
});
