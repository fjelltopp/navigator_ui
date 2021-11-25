import { ListGroup, ProgressBar } from 'react-bootstrap';
import CheckboxWithLabel from '../components/CheckboxWithLabel';

export default function MilestonesSidebar(props) {

    const listItem = milestone => {
        const active = props.currentMilestoneId === milestone.id;
        const variant = active ? 'dark' : null;
        const displayProgress = active || (milestone.progress > 0);
        return (
            <ListGroup.Item key={milestone.id} variant={variant}>
                <CheckboxWithLabel
                    checked={milestone.completed}
                    label={milestone.title}
                />
                {displayProgress &&
                    <ProgressBar className="mb-1 mt-1">
                        <ProgressBar variant="danger" now={milestone.progress || 1} />
                    </ProgressBar>
                }
            </ListGroup.Item>
        )
    }

    return (
        <ListGroup id="MilestonesSidebar" variant="flush">
            {props.milestones.map(milestone => listItem(milestone))}
            {!props.milestoneListFullyResolved &&
                <ListGroup.Item className="text-muted text-center">
                    <small>More milestones may be added</small>
                </ListGroup.Item>
            }
        </ListGroup>
    )

}
