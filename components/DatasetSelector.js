import React, { useState } from 'react';
import {
    Row, Col, Form, Modal, Image, ListGroup, FloatingLabel
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

export default function DatasetSelector({ user, handleNextButton }) {
    const [showModal, setShowModal] = useState(false);

    function SelectDatasetInput() {
        const addNewDatasetOption = {
            id: 0,
            name: '+ Add New Dataset'
        };
        const handleChange = e => {
            const newValue = parseInt(e.target.value);
            if (newValue === addNewDatasetOption.id) {
                setShowModal(true);
            } else {
                user.currentDatasetId = e.target.value;
                handleNextButton();
            }
        }
        const selectOptions = [...user.datasets, addNewDatasetOption]
            .map(dataset =>
                <option key={dataset.id} value={dataset.id}>
                    {dataset.name}
                </option>
            )
        return (
            <FloatingLabel label="Dataset">
                <Form.Select size="lg"
                    value={user.currentDatasetId}
                    onChange={handleChange}
                >
                    {selectOptions}
                </Form.Select>
            </FloatingLabel>
        )
    }

    function AddNewDatasetModal() {
        return (
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Dataset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col xs={2}><Image src="https://adr.unaids.org/uploads/group/2019-08-30-082314.463879Ug-logo.jpg" fluid /></Col>
                                <Col>
                                    <h4>Uganda</h4>
                                    <a href="https://adr.unaids.org/organization/uganda" target="_blank" rel="noreferrer" className="link-danger">adr.unaids.org/organization/uganda</a>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {user.datasets.map(dataset =>
                            <ListGroup.Item key={dataset.id} action>
                                <FontAwesomeIcon icon={faFolder} />
                                <span> {dataset.name}</span>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        )
    }

    return (<><SelectDatasetInput /><AddNewDatasetModal /></>)
}