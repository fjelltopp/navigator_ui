import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export default function PopupModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buttonStyles = {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }

    return (
        <>
            <Button variant="light" onClick={handleShow} style={buttonStyles}>
                <span>Moving back multiple steps</span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h1><FontAwesomeIcon icon={faInfoCircle} /></h1>
                    <div>You have been sent back to the <b>Populate ART template</b> task. Please follow the instructions again before continuing.</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
