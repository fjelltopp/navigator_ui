import { useState } from 'react';
import { Trans } from '@lingui/react';
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
            <div><Trans id="For technical support, contact" /> <TechnicalSupportEmailAddress /></div>
            <ButtonGroup size="sm" className="mt-3">
                <Button variant="danger" onClick={() => location.reload(true)}>
                    <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                    <Trans id="Refresh Page" />
                </Button>
                <Button variant="light" onClick={() => setshowJsonDump(!showJsonDump)}>
                    <Trans id="View Error Logs" />
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
        <Trans id="An unexpected error occurred when trying to load this dataset" />,
        <Trans id="Please try refreshing this page or switching to another dataset." />
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
        <Trans id="An unexpected error occurred when trying to load this task" />,
        <Trans id="Please try refreshing this page or switching to another dataset." />
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
        <Trans id="An unexpected error occurred when trying to load this milestone" />,
        <Trans id="Please try refreshing this page or switching to another dataset." />
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
        <Trans id="An unexpected error occurred when trying to mark this task as complete" />,
        <Trans id="Please try completing the action again or refreshing this page." />
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
        <Trans id="An unexpected error occurred when trying to mark this task as incomplete" />,
        <Trans id="Please try completing the action again or refreshing this page." />
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
        <Trans id="An unexpected error occurred when trying to skip this task" />,
        <Trans id="Please try completing the action again or refreshing this page." />
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
        <Trans id="An unexpected error occurred when trying to laod this task list" />,
        <Trans id="Please try refreshing this page or switching to another dataset." />
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}
