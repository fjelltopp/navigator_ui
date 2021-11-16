import React, { useState } from 'react';
import {
    Row, Col, Form, Modal, Image, ListGroup, FloatingLabel
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, getDatasets } from '../lib/api';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function DatasetSelector({ currentDatasetId, setCurrentDatasetId, user }) {
    const [showModal, setShowModal] = useState(false);

    const [
        {
            data: datasets,
            loading: datasetsLoading,
        },
        fetchDatasets
    ] = useAxios(getDatasets, { manual: true });

    function SelectDatasetInput() {
        const addNewDatasetOption = {
            id: "0",
            name: '+ Add New Dataset'
        };
        const handleChange = e => {
            if (e.target.value === addNewDatasetOption.id) {
                fetchDatasets();
                setShowModal(true);
            } else {
                setCurrentDatasetId(e.target.value);
            }
        }
        const selectOptions = [...user.datasets.datasets, addNewDatasetOption]
            .map(dataset =>
                <option key={dataset.id} value={dataset.id}>
                    {dataset.name}
                </option>
            )
        return (
            <FloatingLabel label="Dataset">
                <Form.Select
                    value={currentDatasetId}
                    onChange={handleChange}
                >
                    {selectOptions}
                </Form.Select>
            </FloatingLabel>
        )
    }

    const listView = () => (
        <ListGroup variant="flush">
            {datasets && datasets.map(dataset =>
                <ListGroup.Item
                    key={dataset.id}
                    action
                    onClick={() => alert(dataset.id)}
                >
                    <FontAwesomeIcon icon={faFolder} className="me-2" />
                    <span>{dataset.name}</span>
                </ListGroup.Item>
            )}
        </ListGroup>
    )

    function AddNewDatasetModal() {
        return (
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Dataset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {datasetsLoading ? 'Loading...' : listView()}
                </Modal.Body>
            </Modal>
        )
    }

    return (<><SelectDatasetInput /><AddNewDatasetModal /></>)
}