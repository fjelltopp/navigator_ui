import { Layout } from '../components/Layout'
import { Col, Accordion, ListGroup, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import DatasetSelector from '../components/DatasetSelector';
import LoadingBanner from '../components/LoadingBanner';
import ErrorPagePopup from '../components/ErrorPagePopup';
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, getWorkflowTasks } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function TasksPage(props) {

    const [{ data, loading, error: apiError }] = useAxios(
        getWorkflowTasks(props.currentDatasetId)
    );

    const checkmarkTrue = (
        <span className="me-2 text-success">
            <FontAwesomeIcon icon={faCheckSquare} />
        </span>
    )
    const checkmarkFalse = (
        <span className="me-2 text-muted">
            <FontAwesomeIcon icon={faSquare} />
        </span>
    )

    function TaskListInAccordion({ index, milestone }) {
        const taskList = (
            <ListGroup>
                {milestone.tasks.map((task, index) => (
                    <ListGroup.Item key={index}>
                        {task.completed ? checkmarkTrue : checkmarkFalse}
                        <span>{task.title}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
        if (milestone.title) {
            return (
                <Accordion key={index}>
                    <Accordion.Item eventKey={0}>
                        <Accordion.Header>
                            <div style={{ width: '100%' }}>
                                <h4 className="m-0">
                                    <h4 className="m-0">
                                        {milestone.progress === 100 ? checkmarkTrue : checkmarkFalse}
                                        <span>{milestone.title}</span>
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
            return <ErrorPagePopup {...{ apiError, props }} />;
        } else if (loading) {
            return <LoadingBanner />
        } else {
            return (
                <Col sm={6}>
                    <h2 className="mt-4">Your Task List</h2>
                    <hr className="mb-4" />
                    {data.taskList.map((milestone, index) => (
                        <div className="mb-4">
                            <TaskListInAccordion
                                index={index}
                                milestone={milestone}
                            />
                        </div>
                    ))}
                </Col>
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
            <ProgressBar className="mt-2">
                <ProgressBar variant="danger" now="38" />
            </ProgressBar>
            <MainPageContent />
        </Layout>
    )

}
