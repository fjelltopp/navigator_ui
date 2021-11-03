import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { makeUseAxios } from 'axios-hooks'
import { Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';
import { LogInLayout } from '../components/Layout';
import Logo from '../components/Logo';
import { baseAxiosConfig, attemptLogin } from '../lib/api';

const logos = [
    '/images/unaids.png',
    '/images/imperial_college.png',
    '/images/avenir_health.png',
    '/images/fjelltopp.png',
];
const useAxios = makeUseAxios(baseAxiosConfig)

export default function Login({ }) {
    const router = useRouter()
    const [username, setUsername] = useState('manoj-nathwani');
    const [password, setPassword] = useState('Ad#jeWhPtHMw2V@6PJ!uyePes');

    const [
        {
            data: loginState,
            loading: loginStateLoading,
            error: loginStateError
        },
        loginRequest
    ] = useAxios(attemptLogin, { manual: true });

    if (loginState) {
        router.push('/');
    }
    const handleLogin = () => {
        loginRequest({ data: { username, password } })
            .then(success => console.log(success))
            .catch(error => console.error(error))
    }

    return (
        <LogInLayout>
            <h3 className="text-center"><Logo /></h3>
            <hr />
            {loginStateError && <Alert variant={'danger'}>{loginStateError.message}</Alert>}
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
                <Form.Control
                    name="username"
                    type="email"
                    placeholder="Username or Email"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button
                variant="danger"
                onClick={handleLogin}
                disabled={loginStateLoading}
            >{loginStateLoading ? 'Logging in...' : 'Login'}</Button>
            <hr />
            <Row>
                {logos.map(src => <Col key={src}><Image src={src} fluid /></Col>)}
            </Row>
        </LogInLayout>
    )

}
