import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

function Main({ children }) {
  return <main className="p-3">{children}</main>
}

export function Layout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col id="Sidebar" md={2} className="d-flex flex-column p-3 bg-white">
          <h3 className="text-danger text-center p-3">🧭 UNAIDS Tools Navigator</h3>
          <Sidebar />
        </Col>
        <Col md={10} className="ms-md-auto">
          <Main>{children}</Main>
        </Col>
      </Row>
    </Container>
  )
}

export function SignInLayout({ children }) {
  return (
    <div id="LoginPage"><Main>{children}</Main></div>
  )
}
