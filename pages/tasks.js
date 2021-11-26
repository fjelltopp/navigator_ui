import { Layout } from '../components/Layout'
import { Col, Accordion, ListGroup, ProgressBar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import DatasetSelector from '../components/DatasetSelector';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import LoadingBanner from '../components/LoadingBanner';
import ErrorPagePopup from '../components/ErrorPagePopup';
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, getWorkflowTasks } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function TasksPage(props) {

    const [{ data, loading, error: apiError }, makeApiRequest] = useAxios(
        getWorkflowTasks(props.currentDatasetId)
    );

    function TaskListInAccordion({ milestone }) {
        const taskList = (
            <ListGroup>
                {milestone.tasks.map((task, index) => (
                    <ListGroup.Item key={index}>
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
                <Accordion>
                    <Accordion.Item eventKey={0}>
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
            return <ErrorPagePopup {...{ apiError, props }} />;
        } else if (loading) {
            return <LoadingBanner />
        } else {
            return (
                <Col sm={9}>
                    <h2 className="mt-5">
                        <span>Your Task List</span>
                        <Button
                            variant="outline-danger"
                            onClick={makeApiRequest}
                            className="float-end"
                        >
                            <FontAwesomeIcon icon={faRefresh} className="me-2" />
                            <span>Refresh</span>
                        </Button>
                    </h2>
                    <hr className="mb-4" />
                    {data.taskList.map((milestone, index) => (
                        <div className="mb-4" key={index}>
                            <TaskListInAccordion milestone={milestone} />
                        </div>
                    ))}
                    {!data.fullyResolved &&
                        <ListGroup>
                            <ListGroup.Item className="text-muted">
                                <span>More tasks may be added</span>
                            </ListGroup.Item>
                        </ListGroup>
                    }
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
