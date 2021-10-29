import React from 'react';
import { useRouter } from 'next/router'
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { LogInLayout } from '../components/Layout';
import Logo from '../components/Logo';

const logos = [
    '/images/unaids.png',
    '/images/imperial_college.png',
    '/images/avenir_health.png',
    '/images/fjelltopp.png',
];

export default function Login({ }) {
    const router = useRouter()

    return (
        <LogInLayout>
            <h3 className="text-center"><Logo /></h3>
            <hr />
            <form method='post' action='/TODO'>
                <p>
                    <span>Please login using your </span>
                    <a
                        href="https://adr.unaids.org"
                        target="_blank"
                        rel="noreferrer"
                        className="link-danger">adr.unaids.org</a>
                    <span> login details:</span>
                </p>
                <Form.Group className="mb-3">
                    <Form.Control name="username" type="email" placeholder="Username or Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="danger" onClick={() => router.push('/')}>Login</Button>
            </form>
            <hr />
            <Row>
                {logos.map(src => <Col key={src}><Image src={src} fluid /></Col>)}
            </Row>
        </LogInLayout>
    )

}
