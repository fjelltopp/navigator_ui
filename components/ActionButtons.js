import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import {
    faAngleLeft, faAngleRight, faSpinner,
    faAngleDoubleRight, faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import {
    getWorkflowStats,
    taskCompleteCheckbox,
    priorTaskButton,
    nextTaskButton,
    whatsNextButton
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

function ButtonWithTooltip({ button, buttonComponent }) {
    if (button.tooltip) {
        const tooltip = (
            <Tooltip>
                {button.tooltip.map(line => <div>{line}</div>)}
            </Tooltip>
        )
        return (
            <OverlayTrigger overlay={tooltip}>
                <span className="d-inline-block">
                    {buttonComponent}
                </span>
            </OverlayTrigger>
        )
    } else {
        return buttonComponent;
    }
}

export function TaskCompleteCheckbox({ workflow, handleClick, showDebugData, markTaskAsCompleteLoading, markTaskAsIncompleteLoading }) {
    if (markTaskAsCompleteLoading || markTaskAsIncompleteLoading) {
        const button = (
            markTaskAsCompleteLoading
                ? {
                    label: 'Task Complete',
                    variant: 'outline-success',
                }
                : {
                    label: 'Task Complete?',
                    variant: 'outline-danger',
                }
        )
        return (
            <Button
                variant={button.variant}
                disabled={true}
            >
                <span>{button.label}</span>
                <FontAwesomeIcon spin icon={faSpinner} className="ms-2" />
            </Button>
        )
    } else {
        const { completed } = getWorkflowStats(workflow);
        const buttonAppearance = (
            completed
                ? {
                    label: 'Task Complete',
                    variant: 'outline-success',
                    icon: faCheckSquare
                }
                : {
                    label: 'Task Complete?',
                    variant: 'outline-danger',
                    icon: faSquare
                }
        )
        const button = {
            ...buttonAppearance,
            ...taskCompleteCheckbox(workflow)
        }
        const buttonComponent = (
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
        return <ButtonWithTooltip {...{ button, buttonComponent }} />
    }
}

export function MainThreeActionButtons({ workflow, handleClick, showDebugData }) {
    const buttons = [
        {
            label: 'Prior Task',
            icon: faAngleLeft,
            style: { borderRadius: '.25rem 0 0 .25rem' },
            ...priorTaskButton(workflow),
        },
        {
            label: 'Next Task',
            icon: faAngleRight,
            style: { borderRadius: 0 },
            ...nextTaskButton(workflow),
        },
        {
            label: 'What\'s Next?',
            icon: faAngleDoubleRight,
            style: { borderRadius: '0 .25rem .25rem 0' },
            ...whatsNextButton(workflow),
        },
    ];
    return (
        <ButtonGroup>
            {buttons.map(button => {
                const buttonComponent = (
                    <Button
                        key={button.label}
                        style={button.style}
                        variant="danger"
                        onClick={() => handleClick(button.onClickAction)}
                        disabled={!button.enabled}
                    >
                        <FontAwesomeIcon icon={button.icon} className="me-2" />
                        <span>{button.label}</span>
                        {button.onClickAction && displayStatsData(showDebugData, button.onClickAction)}
                    </Button>
                )
                return <ButtonWithTooltip {...{ button, buttonComponent }} />
            })}
        </ButtonGroup>
    )
}
