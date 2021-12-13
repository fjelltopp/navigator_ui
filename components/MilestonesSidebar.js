import { ListGroup, ProgressBar } from 'react-bootstrap';
import CheckboxWithLabel from '../components/CheckboxWithLabel';

export default function MilestonesSidebar(props) {

    const listItem = (milestone, index) => {
        const active = props.currentMilestoneId === milestone.id;
        const variant = active ? 'dark' : null;
        const displayProgress = active || (milestone.progress > 0);
        const currentActiveMilestoneId = props
            .milestones.map(x => x.id)
            .indexOf(props.currentMilestoneId);
        const milestoneIsInTheFuture = index > currentActiveMilestoneId;
        return (
            <ListGroup.Item
                key={milestone.id}
                variant={variant}
                action={!milestoneIsInTheFuture}
                onClick={() => !milestoneIsInTheFuture &&
                    props.updateWorkflowTaskFromMilestoneId(milestone.id)
                }
            >
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
            {props.milestones.map((milestone, index) => listItem(milestone, index))}
            {!props.milestoneListFullyResolved &&
                <ListGroup.Item className="text-muted text-center">
                    <small>More milestones may be added</small>
                </ListGroup.Item>
            }
        </ListGroup>
    )

}
