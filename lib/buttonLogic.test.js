import { taskCompleteCheckbox } from './buttonLogic';
import {
    taskCompleteRequest,
    taskCompleteDeleteRequest
} from './api';

const datasetId = 'dataset1';
const id = 'task1';

describe('The "Task Complete" button should', () => {
    const enabled = true;
    describe('If the task is the last task in the breadcrumbs', () => {
        const taskBreadcrumbs = ['task1', 'task2'];
        describe('and is set to manual', () => {
            const manual = true;
            test('and is incomplete, should return an enabled unchecked button with onClick=taskCompleteRequest', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: taskCompleteRequest(
                            datasetId, workflowState.currentTask.id
                        )
                    });
            });
            test('and is completed, should return an enabled checked button with onClick=taskCompleteDeleteRequest', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: taskCompleteDeleteRequest(
                            datasetId, workflowState.currentTask.id
                        )
                    });
            });
        });
        describe('and is set to  not manual', () => {
            const manual = false;
            test('and is incomplete, should return an enabled unchecked button with onClick=null', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: null
                    });
            });
            test('and is completed, should return an enabled checked button with onClick=null', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
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
            test('and is incomplete, should return an enabled unchecked button with onClick=taskCompleteRequest', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: taskCompleteRequest(
                            datasetId, workflowState.currentTask.id
                        )
                    });
            });
            test('and is completed, should return an enabled checked button with onClick=taskCompleteDeleteRequest', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({
                        enabled, checked,
                        onClickAction: taskCompleteDeleteRequest(
                            datasetId, workflowState.currentTask.id
                        )
                    });
            });
        });
        describe('and is set to  not manual', () => {
            const manual = false;
            test('and is incomplete, should return an enabled unchecked button with onClick=null', () => {
                const completed = false;
                const checked = false;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({ enabled, checked, onClickAction: null });
            });
            test('and is completed, should return an enabled checked button with onClick=null', () => {
                const completed = true;
                const checked = true;
                const workflowState = { currentTask: { id, manual, completed }, taskBreadcrumbs };
                expect(taskCompleteCheckbox(datasetId, workflowState))
                    .toStrictEqual({ enabled, checked, onClickAction: null });
            });
        });
    });
});