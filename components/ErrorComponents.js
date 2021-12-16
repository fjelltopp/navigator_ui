import { useState } from 'react';
import { Col, Alert, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import LogsComponent from './LogsComponent';
import { TechnicalSupportEmailAddress } from '../pages/contact_us';

function RefreshPageButton() {
    return (
        <Button variant="danger" onClick={() => location.reload(true)}>
            <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
            <span>Refresh Page</span>
        </Button>
    )
}

function ToggleViewErrorLogsButton({ showJsonDump, setshowJsonDump }) {
    const handleClick = () => setshowJsonDump(!showJsonDump)
    return (
        <Button variant="light" onClick={handleClick}>View Error Logs</Button>
    )
}

function BaseErrorAlert({ title, lines, error }) {
    const [showJsonDump, setshowJsonDump] = useState(false);
    return (
        <Alert variant="danger" className="mt-3 mb-1" >
            <Alert.Heading>{title}</Alert.Heading>
            <hr />
            {lines.map((line, index) => <div key={index}>{line}</div>)}
            <div>For technical support, contact <TechnicalSupportEmailAddress /></div>
            <ButtonGroup size="sm" className="mt-3">
                <RefreshPageButton />
                <ToggleViewErrorLogsButton {...{ showJsonDump, setshowJsonDump }} />
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
