import { useState } from 'react';
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
            <div>For technical support, contact <TechnicalSupportEmailAddress /></div>
            <ButtonGroup size="sm" className="mt-3">
                <Button variant="danger" onClick={() => location.reload(true)}>
                    <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                    <span>Refresh Page</span>
                </Button>
                <Button variant="light" onClick={() => setshowJsonDump(!showJsonDump)}>
                    <span>View Error Logs</span>
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
    const title = `Failed to load ${CurrentDatasetName}`;
    const lines = [
        'An unexpected error occurred when trying to load this dataset,',
        'Please try refreshing this page or switching to another dataset.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function FetchWorkflowTaskError({ error }) {
    const title = `Failed to load task`;
    const lines = [
        'An unexpected error occurred when trying to load this task,',
        'Please try refreshing this page or switching to another dataset.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function FetchMilestoneError({ error }) {
    const title = `Failed to load milestone`;
    const lines = [
        'An unexpected error occurred when trying to load this milestone,',
        'Please try refreshing this page or switching to another dataset.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function MarkTaskAsCompleteError({ error }) {
    const title = `Failed to complete task`;
    const lines = [
        'An unexpected error occurred when trying to mark this task as complete,',
        'Please try completing the action again or refreshing this page.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function MarkTaskAsIncompleteError({ error }) {
    const title = `Failed to mark task as incomplete`;
    const lines = [
        'An unexpected error occurred when trying to mark this task as incomplete,',
        'Please try completing the action again or refreshing this page.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function SkipTaskError({ error }) {
    const title = `Failed to skip task`;
    const lines = [
        'An unexpected error occurred when trying to skip this task,',
        'Please try completing the action again or refreshing this page.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}

export function FetchWorkflowTasksError({ error }) {
    const title = `Failed to load task list`;
    const lines = [
        'An unexpected error occurred when trying to laod this task list,',
        'Please try refreshing this page or switching to another dataset.'
    ];
    return <BaseErrorAlert {...{ title, lines, error }} />
}
