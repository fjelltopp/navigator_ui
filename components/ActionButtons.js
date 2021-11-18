import { ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft, faAngleRight, faAngleDoubleRight,
    faTimes, faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import {
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
} from '../lib/actionButtons';

const displayStatsData = (onClickAction) => (
    <div>
        <hr />
        <p>{onClickAction}</p>
    </div>
)

export function TaskCompleteCheckbox({ workflow, handleClick, displayState }) {
    const buttonAppearance = (
        workflow.currentTask.details.complete
            ? {
                label: 'Task Complete',
                variant: 'outline-success',
                icon: faCheckSquare
            }
            : {
                label: 'Task Incomplete',
                variant: 'outline-danger',
                icon: faTimes
            }
    )
    const button = {
        ...buttonAppearance,
        ...taskCompleteCheckbox(workflow)
    }
    return (
        <Button
            variant={button.variant}
            onClick={() => handleClick(button.onClickAction)}
            disabled={!button.enabled}
        >
            <span>{button.label}</span>
            <FontAwesomeIcon icon={button.icon} className="ms-2" />
            {button.onClickAction && displayStatsData(button.onClickAction)}
        </Button>
    )
}

export function MainThreeActionButtons({ workflow, handleClick, displayState }) {
    const buttons = [
        {
            label: "Prior Task",
            icon: faAngleLeft,
            ...priorTaskButton(workflow),
        },
        {
            label: "Next Task",
            icon: faAngleRight,
            ...nextTaskButton(workflow),
        },
        {
            label: "What's Next?",
            icon: faAngleDoubleRight,
            ...whatsNextButton(workflow),
        },
    ];
    return (
        <ButtonGroup>
            {buttons.map(button => (
                <>
                    <Button
                        key={button.label}
                        variant="danger"
                        onClick={() => handleClick(button.onClickAction)}
                        disabled={!button.enabled}
                    >
                        <FontAwesomeIcon icon={button.icon} className="me-2" />
                        <span>{button.label}</span>
                        {button.onClickAction && displayStatsData(button.onClickAction)}
                    </Button>
                </>
            )
            )}
        </ButtonGroup>
    )
}
