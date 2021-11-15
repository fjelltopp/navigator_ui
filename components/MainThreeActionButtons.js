import { ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft, faAngleRight, faAngleDoubleRight,
    faSquare, faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import {
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
} from '../lib/actionButtons';

export function TaskCompleteCheckbox(workflowState) {
    const buttonAppearance = (
        workflowState.currentTask.complete
            ? {
                label: 'Task Complete',
                variant: 'outline-success',
                icon: faCheckSquare
            }
            : {
                label: 'Task Incomplete',
                variant: 'outline-danger',
                icon: faSquare
            }
    )
    const button = {
        ...buttonAppearance,
        ...taskCompleteCheckbox(workflowState)
    }
    console.log(button);
    const handleClick = () => {
        // workflowState.currentTask.details.complete =
        //     !workflowState.currentTask.details.complete;
        alert(button.onClickActions);
    }
    return (
        <Button
            variant={button.variant}
            onClick={handleClick}
            disabled={!button.enabled}
        >
            <span>{button.label}</span>
            <FontAwesomeIcon icon={button.icon} className="ms-2" />
        </Button>
    )
}

export function MainThreeActionButtons(workflowState) {
    const buttons = [
        {
            label: "Prior Task",
            icon: faAngleLeft,
            ...priorTaskButton(workflowState),
        },
        {
            label: "Next Task",
            icon: faAngleRight,
            ...nextTaskButton(workflowState),
        },
        {
            label: "What's Next?",
            icon: faAngleDoubleRight,
            ...whatsNextButton(workflowState),
        },
    ];
    return (
        <ButtonGroup>
            {buttons.map(button => {
                const handleClick = () =>
                    alert(button.onClickActions);
                return (
                    <Button
                        variant="danger"
                        onClick={handleClick}
                        disabled={!button.enabled}
                    >
                        <FontAwesomeIcon icon={button.icon} className="me-2" />
                        <span>{button.label}</span>
                    </Button>
                )
            })}
        </ButtonGroup>
    )
}
