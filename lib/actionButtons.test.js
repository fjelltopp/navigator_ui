import {
    actions,
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
} from './actionButtons';

const id = 'task1';

describe('The "Task Complete" button should', () => {
    describe('if the workflow is !reached', () => {
        const manual = true;
        const reached = false;
        const details = { terminus: false };
        test('always return a disabled button with no onClick Action', () => {
            const completed = true;
            const taskBreadcrumbs = [id];
            const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
            expect(taskCompleteCheckbox(workflowState))
                .toMatchObject({
                    enabled: false,
                    checked: true,
                    onClickAction: null
                });
        });
    });
    describe('if the workflow is terminus', () => {
        const manual = true;
        const reached = true;
        const details = { terminus: true };
        test('always return a disabled button with no onClick Action', () => {
            const completed = true;
            const taskBreadcrumbs = [id];
            const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
            expect(taskCompleteCheckbox(workflowState))
                .toMatchObject({
                    enabled: false,
                    checked: true,
                    onClickAction: null
                });
        });
    });
    describe('if the workflow is reached and !terminus', () => {
        const reached = true;
        const details = { terminus: false };
        describe('if the task isLatestTask in the breadcrumbs', () => {
            const completed = false;
            const enabled = true;
            const taskBreadcrumbs = ['task0', 'task1'];
            describe('and is set to manual', () => {
                const manual = true;
                test('and is incomplete, should return an enabled unchecked button with the markTaskAsComplete onclick action', () => {
                    const checked = false;
                    const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
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
                    const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({
                            enabled, checked,
                            onClickAction: actions.toggleCompleteStateLocally
                        });
                });
            });
        });
        describe('if the task !isLatestTask in the breadcrumbs', () => {
            const taskBreadcrumbs = [id, 'task2'];
            describe('and is set to manual', () => {
                const enabled = true;
                const manual = true;
                test('and is incomplete, should return an enabled unchecked button with the markTaskAsComplete onclick action', () => {
                    const completed = false;
                    const checked = false;
                    const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({
                            enabled, checked,
                            onClickAction: actions.markTaskAsComplete
                        });
                });
                test('and is complete, should return an enabled checked button with the markTaskAsIncomplete onclick action', () => {
                    const completed = true;
                    const checked = true;
                    const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
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
                    const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({ enabled, checked });
                });
                test('and is complete, should return an disabled checked button', () => {
                    const completed = true;
                    const checked = true;
                    const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
                    expect(taskCompleteCheckbox(workflowState))
                        .toMatchObject({ enabled, checked });
                });
            });
        });
    });
});

describe('The "Prior Task" button should', () => {
    const manual = true;
    describe('if the workflow is !reached, the "Prior Task" button should be disabled', () => {
        const reached = false;
        const details = { terminus: false };
        const completed = true;
        const taskBreadcrumbs = [id, 'task2'];
        const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
        expect(priorTaskButton(workflowState))
            .toMatchObject({ enabled: false, onClickAction: null });
    });
    describe('if the task is reached', () => {
        const reached = true;
        describe('if the workflow is terminus', () => {
            const completed = true;
            const details = { terminus: true };
            test('always return a disabled button with no onClick Action', () => {
                const taskBreadcrumbs = [id];
                const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                expect(priorTaskButton(workflowState))
                    .toMatchObject({ enabled: false });
            });
        });
        describe('if the workflow is !terminus', () => {
            const details = { terminus: false };
            test('if isOldestTask in the breadcrumbs, should return a disabled button', () => {
                const completed = true;
                const taskBreadcrumbs = [id, 'task2'];
                const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                expect(priorTaskButton(workflowState))
                    .toMatchObject({ enabled: false });
            })
            describe('if !isOldestTask in the breadcrumbs', () => {
                test('and if isLatestTask in the breadcrumbs, should return a button with getPreviousTask onclick action', () => {
                    const completed = true;
                    const taskBreadcrumbs = ['task0', 'task1'];
                    const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                    expect(priorTaskButton(workflowState))
                        .toMatchObject({ onClickAction: actions.getPreviousTask });
                })
                describe('and if !isLatestTask in the breadcrumbs', () => {
                    const taskBreadcrumbs = ['task0', id, 'task2'];
                    test('and if task is complete should return a button with onclick getPreviousTask action', () => {
                        const completed = true;
                        const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                        expect(priorTaskButton(workflowState))
                            .toMatchObject({ onClickAction: actions.getPreviousTask });
                    })
                    test('and if task is incomplete should return a button with onclick skipTaskAndGetPreviousTask action', () => {
                        const completed = false;
                        const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                        expect(priorTaskButton(workflowState))
                            .toMatchObject({ onClickAction: actions.skipTaskAndGetPreviousTask });
                    })
                })
            })
        })
    });
});

describe('The "Next Task" button should', () => {
    const manual = true;
    describe('if the workflow is !reached', () => {
        const reached = false;
        const details = { terminus: false };
        test('the "Next Task" button should be disabled', () => {
            const completed = true;
            const taskBreadcrumbs = [id, 'task2'];
            const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
            expect(nextTaskButton(workflowState))
                .toMatchObject({ enabled: false, onClickAction: null });
        });
    });
    describe('if the task is reached', () => {
        const reached = true;
        test('if the workflow is terminus, should return a disabled button', () => {
            const details = { terminus: true };
            const completed = false;
            const taskBreadcrumbs = [id, 'task2'];
            const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
            expect(nextTaskButton(workflowState))
                .toMatchObject({ enabled: false });
        });
        describe('if the workflow is !terminus', () => {
            const details = { terminus: false };
            test('and if isLatestTask in the breadcrumbs, should return a disabled button', () => {
                const completed = false;
                const taskBreadcrumbs = [id];
                const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                expect(nextTaskButton(workflowState))
                    .toMatchObject({ enabled: false });
            })
            describe('and if !isLatestTask in the breadcrumbs', () => {
                const taskBreadcrumbs = [id, 'task2'];
                test('and if the task is complete, should return a button with onclick getNextTask action', () => {
                    const completed = true;
                    const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                    expect(nextTaskButton(workflowState))
                        .toMatchObject({ onClickAction: actions.getNextTask });
                })
                test('and if the task is incomplete, should return a button with onclick skipTaskAndGetNextTask action', () => {
                    const completed = false;
                    const workflowState = { currentTask: { id, completed, manual, details, reached }, taskBreadcrumbs };
                    expect(nextTaskButton(workflowState))
                        .toMatchObject({ onClickAction: actions.skipTaskAndGetNextTask });
                })
            })
        });
    });
});

describe('The "What\'s Next" button should', () => {
    const manual = true;
    const reached = true;
    const details = { terminus: false };
    test('if the task is complete, should return a button with onclick fetchLatestWorkflowState actions', () => {
        const completed = true;
        const taskBreadcrumbs = [id, 'task2'];
        const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toMatchObject({
                enabled: true,
                onClickAction: actions.fetchLatestWorkflowState
            });
    });
    test('if the task is incomplete, should return a button with onclick skipTaskAndFetchLatestWorkflowState actions', () => {
        const completed = false;
        const taskBreadcrumbs = ['task0', id, 'task2'];
        const workflowState = { currentTask: { id, manual, completed, details, reached }, taskBreadcrumbs };
        expect(whatsNextButton(workflowState))
            .toMatchObject({
                enabled: true,
                onClickAction: actions.skipTaskAndFetchLatestWorkflowState
            });
    });
});
