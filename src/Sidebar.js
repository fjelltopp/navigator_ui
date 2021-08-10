import React, { useState } from 'react';
import { ListGroup, Dropdown, Accordion, Modal, Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faCheckCircle, faCircle, faFolder } from '@fortawesome/free-solid-svg-icons';
import { getMockedProjects } from './MockedApiResponse';

const datasets = [
    'Uganda Inputs UNAIDS Estimates 2021',
    'Naomi data runs',
    'Naomi files',
    'Uganda DHIS2 ART & ANC data for Naomi Output ANC',
    'Uganda DHIS2 ART & ANC data for Naomi Output ART',
    'Uganda ANC 2020yr Output ANC',
    'Uganda ART 2020 Output ART'
];

export default function Sidebar({ user }) {
    const [showModal, setShowModal] = useState(false);
    const hideModal = () => setShowModal(false);
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
            href="#"
            ref={ref}
            onClick={(e) => { e.preventDefault(); onClick(e); }}
            className="link-dark text-decoration-none dropdown-toggle"
        >{children}</a>
    ));
    const isActiveMilestone = (milestones, currentMilestoneIndex) => {
        let indexOfFirstIncompleteMilestone = null;
        milestones.forEach((milestone, index) => {
            if (milestone.progress < 100) {
                if (!indexOfFirstIncompleteMilestone) {
                    indexOfFirstIncompleteMilestone = index;
                }
            }
        });
        return currentMilestoneIndex === indexOfFirstIncompleteMilestone;
    }
    return (
        <>
            <h4 className="text-danger text-center">
                <FontAwesomeIcon icon={faCompass} />
                <span> HIV Tools Navigator</span>
            </h4>
            <hr />
            <div className="projects">
                <Accordion defaultActiveKey={0} flush>
                    {getMockedProjects().map(project => (
                        <>
                            <Accordion.Item key={project.id} eventKey={project.id}>
                                <Accordion.Header>{project.name}</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup variant="flush">
                                        {project.milestones.map((milestone, index) => (
                                            <ListGroup.Item
                                                variant={isActiveMilestone(project.milestones, index) ? 'danger' : ''}
                                            >
                                                <FontAwesomeIcon
                                                    fixedWidth
                                                    icon={milestone.progress === 100 ? faCheckCircle : faCircle}
                                                    className="text-muted"
                                                />
                                                <span> {milestone.name}</span>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </>
                    ))}
                    <Accordion.Item flush>
                        <Accordion.Header onClick={() => setShowModal(true)}>+ Add New Project</Accordion.Header>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div class="mt-auto p-3 user-dropdown">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <img src="https://gravatar.com/avatar/505e9bedd54db6fe89907e0b40ca16d5?s=270&d=identicon" alt="" width="32" height="32" class="rounded-circle me-2" />
                        <span>Manoj Nathwani</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Help</Dropdown.Item>
                        <Dropdown.Item>Training Resources</Dropdown.Item>
                        <Dropdown.Item>Account Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Modal show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={2}><Image src="https://adr.unaids.org/uploads/group/2019-08-30-082314.463879Ug-logo.jpg" fluid /></Col>
                                <Col>
                                    <h4>Uganda</h4>
                                    <a href="https://adr.unaids.org/organization/uganda" target="_blank" rel="noreferrer" className="link-danger">adr.unaids.org/organization/uganda</a>
                                </Col>
                            </Row>

                        </ListGroup.Item>
                        {datasets.map(dataset =>
                            <ListGroup.Item key={dataset} action>
                                <FontAwesomeIcon icon={faFolder} />
                                <span> {dataset}</span>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
};