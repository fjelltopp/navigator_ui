import React, { useState } from 'react';
import { Row, Col, ListGroup, Button, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faFile } from '@fortawesome/free-solid-svg-icons';
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, getDatasets } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function DatasetSelector({ currentDatasetId, setCurrentDatasetId, datasets }) {
    const [open, setOpen] = useState(false);

    const CurrentDatasetName = datasets
        .filter(x => x.id === currentDatasetId)[0].name;

    function DatasetsListView() {
        return (
            <ListGroup variant="flush" className="shadow bg-body m-3 mt-">
                {datasets.map(dataset =>
                    <ListGroup.Item
                        key={dataset.id}
                        action
                        onClick={() => setCurrentDatasetId(dataset.id)}
                    >
                        <Row>
                            <Col xs={1} className="text-center">
                                <FontAwesomeIcon icon={faFile} className="mt-3" />
                            </Col>
                            <Col>
                                <div><b>{dataset.name}</b></div>
                                <div>{dataset.organizationName}</div>
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
            <Collapse in={open}>
                <Row>
                    <Col xs={6}>
                        <div id="DatasetListView">
                            <DatasetsListView />
                        </div>
                    </Col>
                </Row>
            </Collapse>
        </>
    )
}