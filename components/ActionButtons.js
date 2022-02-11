import { Trans } from '@lingui/react';
import { t } from '@lingui/macro'
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
                {button.tooltip.map((line, index) => <div key={index}>{line}</div>)}
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
                    label: t`Task Complete`,
                    variant: 'outline-success',
                }
                : {
                    label: t`Task Complete?`,
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
                    label: t`Task Complete`,
                    variant: 'outline-success',
                    icon: faCheckSquare
                }
                : {
                    label: t`Task Complete?`,
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
            label: t`Prior Task`,
            icon: faAngleLeft,
            style: { borderRadius: '.25rem 0 0 .25rem' },
            ...priorTaskButton(workflow),
        },
        {
            label: t`Next Task`,
            icon: faAngleRight,
            style: { borderRadius: 0 },
            ...nextTaskButton(workflow),
        },
        {
            label: t`What's Next?`,
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
                return (
                    <div key={button.label}>
                        <ButtonWithTooltip {...{ button, buttonComponent }} />
                    </div>
                )
            })}
        </ButtonGroup>
    )
}
