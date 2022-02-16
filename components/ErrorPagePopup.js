import React, { useState } from 'react';
import { t } from '@lingui/macro';
import { Col, ButtonGroup, Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExclamationCircle, faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import LogsComponent from '../components/LogsComponent';

export default function ErrorPagePopup({ apiError, workflow, props }) {
    const [showJsonDump, setshowJsonDump] = useState(false);

    const errorLogs = [
        { title: 'API Error', data: apiError },
        { title: 'workflow', data: workflow },
        { title: 'props', data: props }
    ];

    return (
        <Offcanvas show={true} placement="top" keyboard={false}>
            <Offcanvas.Body>
                <div className="text-center">
                    <h4 className="text-danger">
                        <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                        <span data-testid="ErrorMessage">
                            {t`Something went wrong, please refresh this page`}
                        </span>
                    </h4>
                    <ButtonGroup size="sm" className="mt-2">
                        <Button
                            variant="danger"
                            onClick={() => location.reload(true)}
                        >
                            <FontAwesomeIcon icon={faArrowsRotate} className="me-2" />
                            <span>{t`Refresh Page`}</span>
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => setshowJsonDump(!showJsonDump)}
                        >{t`View Error Logs`}</Button>
                    </ButtonGroup>
                </div>
                {showJsonDump && (
                    <Col xs={{ span: 6, offset: 3 }}>
                        <LogsComponent objects={errorLogs} />
                    </Col>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    )

}