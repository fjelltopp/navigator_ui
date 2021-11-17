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

const displayStatsData = (displayState, onClickActions) => (
    <>
        {displayState &&
            (
                <div>
                    <hr />
                    <pre>{onClickActions || ['null'].map(action => <p>{action}</p>)}</pre>
                </div>
            )
        }
    </>
)

export function TaskCompleteCheckbox({ workflow, handleClick, displayState }) {
    const buttonAppearance = (
        workflow.currentTask.complete
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
        ...taskCompleteCheckbox(workflow)
    }
    return (
        <Button
            variant={button.variant}
            onClick={() => handleClick(button.onClickActions)}
            disabled={!button.enabled}
        >
            <span>{button.label}</span>
            <FontAwesomeIcon icon={button.icon} className="ms-2" />
            {displayStatsData(displayState, button.onClickActions)}
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
                        onClick={() => handleClick(button.onClickActions)}
                        disabled={!button.enabled}
                    >
                        <FontAwesomeIcon icon={button.icon} className="me-2" />
                        <span>{button.label}</span>
                        {displayStatsData(displayState, button.onClickActions)}
                    </Button>
                </>
            )
            )}
        </ButtonGroup>
    )
}
