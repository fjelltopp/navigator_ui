import { getSession, getCsrfToken } from "next-auth/client";
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { SignInLayout } from '../components/Layout';

const logos = [
    'https://hivtools.unaids.org/images/unaids.png',
    'https://hivtools.unaids.org/images/imperialCollege.png',
    'https://hivtools.unaids.org/images/AvenirHealth.png',
    'https://hivtools.unaids.org/images/FjelltoppColourBlue.png',
];

export default function SignIn({ csrfToken }) {
    return (
        <SignInLayout>
            <h3 className="text-danger text-center">
                <FontAwesomeIcon icon={faCompass} />
                <span> HIV Tools Navigator</span>
            </h3>
            <hr />
            <form method='post' action='/api/auth/callback/credentials'>
                <p>Please login using your <a href="https://adr.unaids.org" target="_blank" rel="noreferrer" className="link-danger">adr.unaids.org</a> login details:</p>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <Form.Group className="mb-3">
                    <Form.Control name="username" type="email" placeholder="Username or Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="danger" type="submit">Login</Button>
            </form>
            <hr />
            <Row>
                {logos.map(src => <Col key={src}><Image src={src} fluid /></Col>)}
            </Row>
        </SignInLayout>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession({ req });

    const props = {};
    if (session && session.user) {
        // redirect to index if already logged in
        res.writeHead(302, { Location: '/' }).end();
    } else {
        props.csrfToken = await getCsrfToken(context);
    }
    return { props };

}
