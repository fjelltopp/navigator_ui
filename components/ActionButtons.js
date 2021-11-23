import { ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import {
    faAngleLeft, faAngleRight,
    faAngleDoubleRight, faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import {
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton,
    getWorkflowStats
} from '../lib/actionButtons';

const displayStatsData = (showDebugData, onClickAction) => (
    <>
        {showDebugData &&
            <div>
                <hr />
                <p>{onClickAction}</p>
            </div>
        }
    </>
)

export function TaskCompleteCheckbox({ workflow, handleClick, showDebugData }) {
    const { complete } = getWorkflowStats(workflow);
    const buttonAppearance = (
        complete
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
            onClick={() => handleClick(button.onClickAction)}
            disabled={!button.enabled}
        >
            <span>{button.label}</span>
            <FontAwesomeIcon icon={button.icon} className="ms-2" />
            {button.onClickAction && displayStatsData(showDebugData, button.onClickAction)}
        </Button>
    )
}

export function MainThreeActionButtons({ workflow, handleClick, showDebugData }) {
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
                        {button.onClickAction && displayStatsData(showDebugData, button.onClickAction)}
                    </Button>
                </>
            )
            )}
        </ButtonGroup>
    )
}
