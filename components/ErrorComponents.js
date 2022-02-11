import { useState } from 'react';
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { Col, Alert, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import LogsComponent from './LogsComponent';
import { TechnicalSupportEmailAddress } from '../pages/contact_us';

function BaseErrorAlert({ title, lines, error }) {
    const [showJsonDump, setshowJsonDump] = useState(false);
    return (
        <Alert variant="danger">
            <Alert.Heading>{title}</Alert.Heading>
            <hr />
            {lines.map((line, index) => <div key={index}>{line}</div>)}
            <div>
                <Trans
                    id="For technical support, contact <0>TechnicalSupportEmailAddress</0>"
                    components={[<TechnicalSupportEmailAddress />]}
                />
            </div>
            <ButtonGroup size="sm" className="mt-3">
                <Button variant="danger" onClick={() => location.reload(true)}>
                    <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                    <span>{t`Refresh Page`}</span>
                </Button>
                <Button variant="light" onClick={() => setshowJsonDump(!showJsonDump)}>
                    <span>{t`View Error Logs`}</span>
                </Button>
            </ButtonGroup>
            {showJsonDump && (
                <Col xs={{ span: 10, offset: 1 }}>
                    <LogsComponent objects={[{ ...error }]} />
                </Col>
            )}
        </Alert >
    )
}

export function FetchWorkflowError({ error, currentDatasetId, datasets }) {
    const CurrentDatasetName = datasets
        .filter(x => x.id === currentDatasetId)[0].name;
    const title = <Trans
        id="Failed to load {CurrentDatasetName}"
        values={{ CurrentDatasetName }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to load this dataset`,
        t`Please try refreshing this page or switching to another dataset.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function FetchWorkflowTaskError({ error }) {
    const taskId = error.data.config.url.split('/').slice(-1);
    const title = <Trans
        id="Failed to load task {taskId}"
        values={{ taskId }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to load this task`,
        t`Please try refreshing this page or switching to another dataset.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function FetchMilestoneError({ error }) {
    const milestoneId = error.data.config.url.split('/').slice(-1);
    const title = <Trans
        id="Failed to load milestone {milestoneId}"
        values={{ milestoneId }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to load this milestone`,
        t`Please try refreshing this page or switching to another dataset.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function MarkTaskAsCompleteError({ error }) {
    const taskId = error.data.config.url.split('/').slice(-2)[0];
    const title = <Trans
        id="Failed to complete task {taskId}"
        values={{ taskId }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to mark this task as complete`,
        t`Please try completing the action again or refreshing this page.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function MarkTaskAsIncompleteError({ error }) {
    const taskId = error.data.config.url.split('/').slice(-2)[0];
    const title = <Trans
        id="Failed to mark task {taskId} as incomplete"
        values={{ taskId }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to mark this task as incomplete`,
        t`Please try completing the action again or refreshing this page.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function SkipTaskError({ error }) {
    const taskId = error.data.config.url.split('/').slice(-2)[0];
    const title = <Trans
        id="Failed to skip task {taskId}"
        values={{ taskId }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to skip this task`,
        t`Please try completing the action again or refreshing this page.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function FetchWorkflowTasksError({ error }) {
    const datasetId = error.data.config.url.split('/').slice(-2)[0];
    const title = <Trans
        id="Failed to load task list for dataset {datasetId}"
        values={{ datasetId }}
    />;
    const lines = [
        t`An unexpected error occurred when trying to laod this task list`,
        t`Please try refreshing this page or switching to another dataset.`,
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}
