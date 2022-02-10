import React, { useState, useEffect } from 'react';
import { Trans } from '@lingui/react';
import { useRouter } from "next/router";
import { Layout } from '../components/Layout';
import { Accordion, ListGroup, ProgressBar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import DatasetSelector from '../components/DatasetSelector';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import { FetchWorkflowError, FetchWorkflowTasksError } from '../components/ErrorComponents';
import { makeUseAxios } from 'axios-hooks';
import { baseAxiosConfig, getWorkflow, getWorkflowTasks } from '../lib/api';

export default function TasksPage(props) {
    const router = useRouter();
    const { locale } = router;
    const useAxios = makeUseAxios(baseAxiosConfig(locale));

    const [_loading, setLoading] = useState(true);
    const [{
        data: workflow,
        loading: fetchWorkflowLoading,
        error: fetchWorkflowError
    }, fetchWorkflow] = useAxios(
        getWorkflow(props.currentDatasetId),
        { manual: true }
    );
    const [{
        data: workflowTasks,
        loading: fetchWorkflowTasksLoading,
        error: fetchWorkflowTasksError
    }, fetchWorkflowTasks] = useAxios(
        getWorkflowTasks(props.currentDatasetId),
        { manual: true }
    );
    const loading = _loading || fetchWorkflowLoading || fetchWorkflowTasksLoading;

    useEffect(async () => {
        await fetchWorkflow();
        await fetchWorkflowTasks();
        setLoading(false);
    }, [props.currentDatasetId]);

    function TaskListInAccordion({ milestone, expanded }) {
        const taskList = (
            <ListGroup>
                {milestone.tasks.map(task => (
                    <ListGroup.Item
                        action
                        key={task.id}
                        onClick={() => router.push(`/?redirectToTaskId=${task.id}`)}
                    >
                        <CheckboxWithLabel
                            checked={task.completed}
                            label={task.title}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
        if (milestone.title) {
            return (
                <Accordion defaultActiveKey={expanded ? 1 : 0}>
                    <Accordion.Item eventKey={1}>
                        <Accordion.Header>
                            <div style={{ width: '100%' }}>
                                <h4 className="m-0">
                                    <h4 className="m-0">
                                        <CheckboxWithLabel
                                            checked={milestone.progress === 100}
                                            label={milestone.title}
                                        />
                                    </h4>
                                </h4>
                                <ProgressBar className="mt-2" style={{ height: 5 }}>
                                    <ProgressBar variant="danger" now={milestone.progress || 1} />
                                </ProgressBar>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>{taskList}</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
        } else {
            return taskList;
        }
    }

    function MainPageContent() {
        function Body() {
            if (fetchWorkflowError) {
                return (
                    <FetchWorkflowError
                        error={{ title: 'FetchWorkflowError', data: fetchWorkflowError }}
                        currentDatasetId={props.currentDatasetId}
                        datasets={props.user.datasets}
                    />
                )
            } else if (fetchWorkflowTasksError) {
                return (
                    <FetchWorkflowTasksError
                        error={{ title: 'workflowTasksError', data: fetchWorkflowTasksError }}
                    />
                )
            } else if (loading) {
                return (
                    <h3 className="text-muted">
                        <FontAwesomeIcon spin icon={faSpinner} className="ms-2" />
                    </h3>
                )
            } else {
                return (
                    <>
                        {workflowTasks.taskList.map(milestone => (
                            <div className="mb-4" key={milestone.id}>
                                <TaskListInAccordion
                                    milestone={milestone}
                                    expanded={milestone.id === workflow.currentTask.milestoneID}
                                />
                            </div>
                        ))}
                        {!workflowTasks.fullyResolved &&
                            <ListGroup>
                                <ListGroup.Item className="text-muted">
                                    <Trans id="More tasks may be added" />
                                </ListGroup.Item>
                            </ListGroup>
                        }
                    </>
                )
            }
        }
        return (
            <>
                <h2 className="mt-5">
                    <Trans id="Your Task List" />
                    <Button
                        variant="outline-danger"
                        onClick={fetchWorkflowTasks}
                        className="float-end"
                        disabled={loading}
                    >
                        <FontAwesomeIcon icon={faRefresh} className="me-2" />
                        <Trans id="Refresh" />
                    </Button>
                </h2>
                <hr className="mb-4" />
                <Body />
            </>
        )
    }

    return (
        <Layout>
            <DatasetSelector
                currentDatasetId={props.currentDatasetId}
                setCurrentDatasetId={props.setCurrentDatasetId}
                datasets={props.user.datasets}
            />
            <ProgressBar className="mt-2">
                {workflowTasks &&
                    <ProgressBar variant="danger" now={workflowTasks.progress || 1} />
                }
            </ProgressBar>
            <MainPageContent />
        </Layout>
    )

}
