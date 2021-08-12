import React from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css';

const logos = [
    'https://hivtools.unaids.org/images/unaids.png',
    'https://hivtools.unaids.org/images/imperialCollege.png',
    'https://hivtools.unaids.org/images/AvenirHealth.png',
    'https://hivtools.unaids.org/images/FjelltoppColourBlue.png',
];

export default function LoginPage({ setAuthed }) {
    const handleSubmit = () => {
        setAuthed(true);
    }
    return (
        <div id="LoginPage">
            <main className="p-4">
                <h3 className="text-danger text-center">
                    <FontAwesomeIcon icon={faCompass} />
                    <span> HIV Tools Navigator</span>
                </h3>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <p>Please login using your <a href="https://adr.unaids.org" target="_blank" rel="noreferrer" className="link-danger">adr.unaids.org</a> login details:</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Username or Email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="danger" type="submit">Login</Button>
                </Form>
                <hr />
                <Row>
                    {logos.map(src => <Col key={src}><Image src={src} fluid /></Col>)}
                </Row>
            </main >
        </div>
    )
}