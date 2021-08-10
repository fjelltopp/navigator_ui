import React, { useState, useEffect } from 'react';
import {
    ButtonToolbar, ButtonGroup, Button,
    Offcanvas, Breadcrumb, ProgressBar
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faCheckCircle, faCircleNotch, faQuestionCircle, faRoute } from '@fortawesome/free-solid-svg-icons';
import getMockedApiResponse from './MockedApiResponse';

export default function App({ user }) {
    const [isLoading, setLoading] = useState(true);
    const [mockedApiResponse, setMockedApiResponse] = useState();
    const progressStyles = {};

    useEffect(() => {
        if (isLoading) {
            function simulateNetworkRequest() {
                return new Promise((resolve) => setTimeout(resolve, 2000));
            }
            simulateNetworkRequest().then(() => {
                setLoading(false);
                setMockedApiResponse(getMockedApiResponse());
            });
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);
    return (
        <>
            {/* <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb> */}
            <h1>Task 1.2 - Data Prep</h1>
            <ProgressBar variant='danger' style={progressStyles} now={17} />
            <hr />
            {mockedApiResponse &&
                <>
                    <div>{mockedApiResponse.display_html}</div>
                    <hr />
                    <ButtonToolbar className="justify-content-between">
                        <ButtonGroup aria-label="First group">
                            <Button variant="outline-danger" href="https://google.com" target="_blank">
                                <FontAwesomeIcon icon={faRoute} />
                                <span> Let's go</span>
                            </Button>
                            <Button variant="outline-danger">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                                <span> Help</span>
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant='danger' onClick={handleClick} disabled={!mockedApiResponse.skippable}>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                                <span> Skip</span>
                            </Button>
                            <Button variant='danger' onClick={handleClick}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span> Step Complete</span>
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </>
            }
            <Offcanvas
                show={isLoading}
                placement='top'
                keyboard={false}
                style={{ height: 'fit-content' }}
            >
                <Offcanvas.Body className="text-center">
                    <h2 className="text-danger">
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                        <span> Loading</span>
                    </h2>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );

}
