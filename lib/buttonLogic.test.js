import {
    actions,
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
} from './buttonLogic';

const id = 'task1';

describe('The "Task Complete" button should', () => {
    const enabled = true;
    describe('If the task is the last task in the breadcrumbs', () => {
        const taskBreadcrumbs = ['task1', 'task2'];
        describe('and is set to manual', () => {
            const manual = true;
            test('and is incomplete, should return an enabled unchecked button with the markTaskAsCompleted onclick action', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: actions.markTaskAsCompleted
                    });
            });
            test('and is completed, should return an enabled checked button with the markTaskAsIncomplete onclick action', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: actions.markTaskAsIncomplete
                    });
            });
        });
        describe('and is set to  not manual', () => {
            const manual = false;
            test('and is incomplete, should return an enabled unchecked button with onClick=null', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: null
                    });
            });
            test('and is completed, should return an enabled checked button with onClick=null', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: null
                    });
            });
        });
    });
    describe('If the task is not the last task in the breadcrumbs', () => {
        const taskBreadcrumbs = ['task2', 'task1'];
        describe('and is set to manual', () => {
            const manual = true;
            test('and is incomplete, should return an enabled unchecked button with the markTaskAsCompleted onclick action', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: actions.markTaskAsCompleted
                    });
            });
            test('and is completed, should return an enabled checked button with the markTaskAsIncomplete onclick action', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: actions.markTaskAsIncomplete
                    });
            });
        });
        describe('and is set to  not manual', () => {
            const manual = false;
            test('and is incomplete, should return an enabled unchecked button with onClick=null', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({ enabled, checked, onClickAction: null });
            });
            test('and is completed, should return an enabled checked button with onClick=null', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(workflowState))
                    .toStrictEqual({ enabled, checked, onClickAction: null });
            });
        });
    });
});

describe('The "Prior Task" button should', () => {
    describe('If the task is set to manual', () => {
        const manual = true;
        test('and if breadcrumbs length > 1, should return an enabled button with the stepCurrentTaskBackOnce onclick action', () => {
            const taskBreadcrumbs = ['task0', 'task1'];
            const workflowState = { currentTask: { id, manual }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({
                    enabled: true,
                    onClickAction: actions.stepCurrentTaskBackOnce
                });
        });
        test('and if breadcrumbs length <= 1, should return a disabled button', () => {
            const taskBreadcrumbs = ['task1'];
            const workflowState = { currentTask: { id, manual }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({ enabled: false, onClickAction: null });
        });
    });
    describe('If the task is not set to manual', () => {
        const manual = false;
        test('and if breadcrumbs length > 1, should return an enabled button with the stepCurrentTaskBackOnce onclick action', () => {
            const taskBreadcrumbs = ['task0', 'task1'];
            const workflowState = { currentTask: { id, manual }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({
                    enabled: true,
                    onClickAction: actions.stepCurrentTaskBackOnce
                });
        });
        test('and if breadcrumbs length <= 1, should return a disabled button', () => {
            const taskBreadcrumbs = ['task1'];
            const workflowState = { currentTask: { id, manual }, taskBreadcrumbs };
            expect(priorTaskButton(workflowState))
                .toStrictEqual({ enabled: false, onClickAction: null });
        });
    });
});

describe('The "Next Task" button should', () => {
    test('If the task is the last task in the breadcrumbs, should return an disabled button', () => {
        const taskBreadcrumbs = ['task0', 'task1'];
        const workflowState = { currentTask: { id }, taskBreadcrumbs };
        expect(nextTaskButton(workflowState))
            .toStrictEqual({ enabled: false, onClickAction: null });
    });
    test('If the task is not the last task in the breadcrumbs, should return an enabled button with the onclick stepCurrentTaskForwardOnce action', () => {
        const taskBreadcrumbs = ['task0', 'task1', 'task2'];
        const workflowState = { currentTask: { id }, taskBreadcrumbs };
        expect(nextTaskButton(workflowState))
            .toStrictEqual({
                enabled: true,
                onClickAction: actions.stepCurrentTaskForwardOnce
            });
    });
});

describe('The "What\'s Next" button should', () => {
    test('If the task is completed, should return an enabled button with the onclick fetchLatestWorkflowState action', () => {
        const completed = true;
        const taskBreadcrumbs = ['task0', 'task1'];
        const workflowState = { currentTask: { id, completed }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toStrictEqual({
                enabled: true,
                onClickAction: actions.fetchLatestWorkflowState
            });
    });
    test('If the task is incomplete, should return an enabled button with the onclick stepCurrentTaskForwardOnce and fetchLatestWorkflowState actions', () => {
        const completed = false;
        const taskBreadcrumbs = ['task0', 'task1'];
        const workflowState = { currentTask: { id, completed }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toStrictEqual({
                enabled: true,
                onClickAction: [
                    actions.stepCurrentTaskForwardOnce,
                    actions.fetchLatestWorkflowState
                ].join(', ')
            });
    });
});
