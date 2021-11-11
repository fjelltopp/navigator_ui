import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup, ProgressBar } from 'react-bootstrap';

export default function MilestonesSidebar({ milestones, currentMilestoneId }) {
    const milestoneListFullyResolved = false; // TODO: implement

    const listItem = milestone => {
        const active = currentMilestoneId === milestone.id;
        const variant = active ? 'dark' : null;
        const iconColor = milestone.completed ? 'text-success' : 'text-muted';
        const iconIcon = milestone.completed ? faCheckCircle : faCircle;
        const progressBarValue = 35; // TODO: implement
        return (
            <ListGroup.Item key={milestone.id} variant={variant}>
                <FontAwesomeIcon className={`me-2 ${iconColor}`} icon={iconIcon} />
                <span>{milestone.title}</span>
                {active && (
                    <ProgressBar className="mb-1 mt-1">
                        <ProgressBar variant="danger" now={progressBarValue} />
                    </ProgressBar>
                )}
            </ListGroup.Item>
        )
    }

    return (
        <ListGroup id="MilestonesSidebar" variant="flush">
            {milestones.map(milestone => listItem(milestone))}
            {!milestoneListFullyResolved &&
                <ListGroup.Item className="text-muted text-center">
                    <small>More milestones may be added</small>
                </ListGroup.Item>
            }
        </ListGroup>
    )

}
