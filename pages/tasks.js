import { Layout } from '../components/Layout'
import { Accordion, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import DatasetSelector from '../components/DatasetSelector';

export default function TasksPage(props) {
    var Chance = require('chance');
    var chance = new Chance();

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

    return (
        <Layout>
            <DatasetSelector {...props} />
            <ProgressBar className="mt-2">
                <ProgressBar variant="danger" now="38" />
            </ProgressBar>

            <br />
            <h2>Your Task List</h2>
            <br />

            <div className="m-2">
                <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="-1">
                        <Accordion.Header>
                            <h4 className="m-0">
                                <h4 className="m-0">
                                    {checkmarkTrue}
                                    <span>Milestone 1</span>
                                </h4>
                            </h4>
                        </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <ListGroup>
                                <ListGroup.Item>
                                    {checkmarkTrue} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {checkmarkTrue} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {checkmarkTrue} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {checkmarkTrue} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Header>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <ListGroup>
                                <ListGroup.Item>
                                    {checkmarkTrue} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            <h4 className="m-0">
                                {checkmarkTrue}
                                <span>Milestone 2</span>
                            </h4>
                        </Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            <ListGroup>
                                <ListGroup.Item>
                                    {checkmarkTrue} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {checkmarkFalse} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {checkmarkFalse} Task {chance.sentence({ words: 5 })}
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            </div>

            {/* <ListGroup>
                <ListGroup.Item variant="danger">
                    <h4>Milestone 1</h4>
                </ListGroup.Item>
                {[1, 2, 3, 4, 5].map(id =>
                    <ListGroup.Item
                        key={id} as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Task {chance.sentence({ words: 5 })} <Badge bg="success" pill>Completed</Badge></div>
                            <small className="text-muted">Completed by {chance.name()} on {chance.date({ string: true })}</small>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup> */}

        </Layout>
    )

}
