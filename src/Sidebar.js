import React from "react";
import { ListGroup, Dropdown, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { getMockedProjects } from './MockedApiResponse';

export default function Sidebar({ user }) {
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
            <h4 className="text-danger text-center p-3 m-0">
                <FontAwesomeIcon icon={faCompass} />
                <span> HIV Tools Navigator</span>
            </h4>
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
                    <Accordion.Header onClick={() => alert('hi')}>+ Add New Project</Accordion.Header>
                </Accordion.Item>
            </Accordion>
            <div class="fixed-bottom user-dropdown p-3">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <img src="https://gravatar.com/avatar/505e9bedd54db6fe89907e0b40ca16d5?s=270&d=identicon" alt="" width="32" height="32" class="rounded-circle me-2" />
                        <span>Manoj Nathwani</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
};