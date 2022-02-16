import React, { useState } from 'react';
import { Row, Col, ListGroup, Button, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFile } from '@fortawesome/free-solid-svg-icons';
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function DatasetSelector({ currentDatasetId, setCurrentDatasetId, datasets }) {
    const [open, setOpen] = useState(false);

    const CurrentDatasetName = datasets
        .filter(x => x.id === currentDatasetId)[0].name;

    const handleChange = datasetId => {
        setOpen(false);
        setCurrentDatasetId(datasetId);
    }

    function DatasetsListView() {
        return (
            <ListGroup className="shadow bg-body m-3 mt-1">
                {datasets.map(dataset =>
                    <ListGroup.Item
                        key={dataset.id}
                        action
                        onClick={() => handleChange(dataset.id)}
                    >
                        <Row>
                            <Col xs={1} className="text-center">
                                <FontAwesomeIcon icon={faFile} className="mt-3" />
                            </Col>
                            <Col>
                                <div><b>{dataset.name}</b></div>
                                <small className="text-muted">{dataset.organizationName}</small>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}
            </ListGroup>
        )
    }

    return (
        <>
            <Button
                variant="outline-secondary"
                onClick={() => setOpen(!open)}
                aria-controls="DatasetListView"
                aria-expanded={open}
            >
                {CurrentDatasetName}
                <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
            </Button>
            <Collapse in={open} style={{ position: 'absolute', zIndex: 999 }}>
                <div id="DatasetListView">
                    <DatasetsListView />
                </div>
            </Collapse>
        </>
    )

}