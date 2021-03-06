import React from 'react';
import { useRouter } from "next/router";
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { makeUseAxios } from 'axios-hooks';
import { Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';
import { LogInLayout } from '../components/Layout';
import Logo from '../components/Logo';
import LocaleSelector from '../components/LocaleSelector';
import { baseAxiosConfig, loginApiRequest } from '../lib/api';

const logos = [
    '/images/unaids.png',
    '/images/imperial_college.png',
    '/images/fjelltopp.png',
    '/images/avenir_health.png',
    '/images/strategy4ward.png',
];

export default function Login() {
    const router = useRouter();
    const { locale } = router;
    const { redirectPath } = router.query;
    const useAxios = makeUseAxios(baseAxiosConfig(locale));

    const [
        {
            data: loginState,
            loading: loginStateLoading,
            error: loginStateError
        },
        loginRequest
    ] = useAxios(loginApiRequest, { manual: true });

    function ErrorBanner() {
        return (
            loginStateError &&
            <Alert variant={'danger'} className="mt-2">
                {(
                    loginStateError.message.includes('401')
                        ? t`Login failed. Bad username or password.`
                        : loginStateError.message
                )}
            </Alert>
        )
    }

    if (loginState) {
        router.push(redirectPath || '/', undefined, { locale });
        return null;
    }
    const handleSubmit = event => {
        event.preventDefault();
        const username = event.currentTarget.elements.username.value;
        const password = event.currentTarget.elements.password.value;
        loginRequest({ data: { username, password } })
            .catch(error => console.error(error))
    }
    function LinkToCkanSite() {
        return (
            <a
                href={process.env.NEXT_PUBLIC_CKAN_SITE_URL}
                target="_blank"
                rel="noreferrer"
                className="link-danger">{process.env.NEXT_PUBLIC_CKAN_SITE_URL}</a>
        )
    }

    return (
        <LogInLayout>
            <div className="text-end">
                <LocaleSelector drop="down" />
            </div>
            <h3 className="text-center mb-4"><Logo /></h3>
            <hr />
            <p>{t`Welcome to the UNAIDS HIV Estimates Navigator. Your HIV estimates journey begins here!`}</p>
            <p>{t`The HIV Estimates Navigator ("Navigator") is the latest tool provided by UNAIDS to assist country teams to produce their annual HIV estimates. The Navigator is an automated, step-by-step assistant for estimates teams. Whether you have participated in the estimates for many years or it???s your first time, the Navigator will guide you through the process across all estimates tools and models. From generating your input data to selecting advanced options and fitting your models, Navigator provides detailed, step-by-step instructions and resources to assist you along the way. Need to step away for a bit? No problem, Navigator will help you pick up where you left off, telling you what's next and what tasks remain to be done.`}</p>
            <hr />
            <ErrorBanner />
            <form id="LoginForm" onSubmit={handleSubmit}>
                <p>
                    <Trans
                        id="Please login using your <0>LinkToCkanSite</0> login details:"
                        components={[<LinkToCkanSite />]}
                    />
                </p>
                <Form.Group className="mb-3">
                    <Form.Control
                        name="username"
                        type="text"
                        placeholder={t`Username or Email`}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder={t`Password`}
                        required
                    />
                </Form.Group>
                <Button
                    variant="danger"
                    disabled={loginStateLoading}
                    type="submit"
                >{loginStateLoading ? t`Logging in...` : t`Login`}</Button>
                <Button
                    as={'a'}
                    variant="link"
                    href={`${process.env.NEXT_PUBLIC_CKAN_SITE_URL}/user/register`}
                    target="_blank"
                    className="text-secondary"
                >{t`Register`}</Button>
                <Button
                    as={'a'}
                    variant="link"
                    href={`${process.env.NEXT_PUBLIC_CKAN_SITE_URL}/user/reset`}
                    target="_blank"
                    className="text-secondary float-end"
                >{t`Forgot password?`}</Button>
            </form>
            <hr />
            <Row className="text-center">
                {logos.map((src, index) => <Col key={index}><Image src={src} fluid /></Col>)}
            </Row>
        </LogInLayout>
    )

}
