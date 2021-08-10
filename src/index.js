import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import App from './App';
import Sidebar from './Sidebar';
import LoginPage from './LoginPage';
import './index.css';

const user = {
  firstName: 'Manoj',
  lastName: 'Nathwani',
  datasets: [
    { id: 1, name: 'Uganda Inputs UNAIDS Estimates 2021' },
    { id: 2, name: 'Malawi Inputs UNAIDS Estimates 2021' },
    { id: 3, name: 'Antarctica Inputs UNAIDS Estimates 2021' }
  ],
};

function AuthedPage() {
  const [authed, setAuthed] = useState(false);
  return (
    <>
      {
        authed
          ? (
            <Row>
              <Col md={2} className="d-flex flex-column sidebar collapse p-3">
                <Sidebar user={user} />
              </Col>
              <Col md={10} className="ms-md-auto">
                <main className="p-3">
                  <App user={user} />
                </main>
              </Col>
            </Row >
          )
          : <LoginPage {...{ setAuthed }} />
      }
    </>
  )
}

ReactDOM.render(
  <>
    <Container fluid>
      <AuthedPage />
    </Container>
  </>, document.getElementById('root')
);
