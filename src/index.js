import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import App from './App';
import Sidebar from './Sidebar';
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

ReactDOM.render(
  <>
    <Container fluid>
      <Row>
        <Col md={2} className="d-md-block sidebar collapse p-3">
          <Sidebar user={user} />
        </Col>
        <Col md={10} className="ms-md-auto">
          <Container>
            <br />
            <App user={user} />
          </Container>
        </Col>
      </Row>
    </Container>
  </>, document.getElementById('root')
);
