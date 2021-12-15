import { Alert, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

function RefreshPageButton() {
    return (
        <Button variant="light" onClick={() => location.reload(true)}>
            <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
            <span>Refresh Page</span>
        </Button>
    )
}

export function FetchWorkflowError({ currentDatasetId, datasets }) {
    const CurrentDatasetName = datasets
        .filter(x => x.id === currentDatasetId)[0].name;

    const title = `Failed to load ${CurrentDatasetName}`;
    const lines = [
        'An unexpected error occurred when trying to load this dataset,',
        'Please try refreshing this page or switching to another dataset.'
    ];
    return (
        <Alert variant="danger" className="mt-3 mb-1" >
            <Alert.Heading>{title}</Alert.Heading>
            <hr />
            {lines.map((line, index) => <div key={index}>{line}</div>)}
            <ButtonGroup size="sm" className="mt-3">
                <RefreshPageButton />
            </ButtonGroup>
        </Alert >
    )
}
