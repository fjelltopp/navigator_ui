import { useRouter } from "next/router";
import { Layout } from '../components/Layout';
import { Accordion, ListGroup, ProgressBar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import DatasetSelector from '../components/DatasetSelector';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import LoadingBanner from '../components/LoadingBanner';
import ErrorPagePopup from '../components/ErrorPagePopup';
import { makeUseAxios } from 'axios-hooks';
import { baseAxiosConfig, getWorkflow, getWorkflowTasks } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function TasksPage(props) {
    const router = useRouter();
    const [{ data: workflow, error: workflowError }] =
        useAxios(getWorkflow(props.currentDatasetId));
    const [{ data: workflowTasks, error: workflowTasksError }, fetchWorkflowTasks] =
        useAxios(getWorkflowTasks(props.currentDatasetId));
    const apiError = workflowError || workflowTasksError;

    function TaskListInAccordion({ milestone, expanded }) {
        const listGroupAttrs = task => task.reached
            ? {
                action: true,
                onClick: () => router.push(`/?redirectToTaskId=${task.id}`)
            }
            : {}
        const taskList = (
            <ListGroup>
                {milestone.tasks.map(task => (
                    <ListGroup.Item key={task.id} {...listGroupAttrs(task)}>
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
        if (apiError) {
            return <ErrorPagePopup
                props={props}
                workflow={workflow}
                apiError={workflowError || workflowTasksError}
            />
        } else if (!workflow || !workflowTasks) {
            return <LoadingBanner />
        } else {
            return (
                <>
                    <h2 className="mt-5">
                        <span>Your Task List</span>
                        <Button
                            variant="outline-danger"
                            onClick={fetchWorkflowTasks}
                            className="float-end"
                        >
                            <FontAwesomeIcon icon={faRefresh} className="me-2" />
                            <span>Refresh</span>
                        </Button>
                    </h2>
                    <hr className="mb-4" />
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
                                <span>More tasks may be added</span>
                            </ListGroup.Item>
                        </ListGroup>
                    }
                </>
            )
        }
    }

    return (
        <Layout>
            <DatasetSelector
                currentDatasetId={props.currentDatasetId}
                setCurrentDatasetId={props.setCurrentDatasetId}
                datasets={props.user.datasets}
            />
            {workflowTasks &&
                <ProgressBar className="mt-2">
                    <ProgressBar variant="danger" now={workflowTasks.progress || 1} />
                </ProgressBar>
            }
            <MainPageContent />
        </Layout>
    )

}
