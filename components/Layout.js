import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Logo from './Logo';

function Main({ children }) {
  return <main className="p-3">{children}</main>
}

export function Layout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col id="Sidebar" md={2} className="d-flex flex-column p-2 bg-white">
          <h4 className="text-center p-3"><Logo /></h4>
          <Sidebar />
        </Col>
        <Col md={10} className="ms-md-auto">
          <Main>{children}</Main>
        </Col>
      </Row>
    </Container>
  )
}

export function LogInLayout({ children }) {
  return (
    <div id="LoginPage"><Main>{children}</Main></div>
  )
}
