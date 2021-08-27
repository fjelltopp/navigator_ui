import React, { useState, useEffect } from 'react';
import { getSession } from "next-auth/client";
import {
  ButtonToolbar, ButtonGroup, Button, OverlayTrigger,
  Tooltip, Offcanvas, ProgressBar, Badge
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleRight, faCheckCircle,
  faCircleNotch, faQuestionCircle, faRoute
} from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../components/Layout'
import DatasetSelector from '../components/DatasetSelector';
import getMockedApiResponse from './api/MockedApiResponse';


export default function Index({ user }) {
  const [isLoading, setLoading] = useState(true);
  const [mockedApiResponse, setMockedApiResponse] = useState();

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

  const handleNextButton = () => setLoading(true);
  const progressBars = [
    { variant: 'danger', now: mockedApiResponse && mockedApiResponse.percentage },
    { variant: 'secondary', now: mockedApiResponse && mockedApiResponse.grey }
  ];

  function SkipButton() {
    const skipButton = (
      <Button
        variant='danger'
        onClick={handleNextButton}
        disabled={!mockedApiResponse.skippable}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
        <span> Skip</span>
      </Button>
    )
    return mockedApiResponse.skippable
      ? skipButton
      : (
        <OverlayTrigger
          placement={'bottom'}
          overlay={<Tooltip>This task cannot be skipped</Tooltip>}
        >
          <span style={{ marginRight: -2 }}>{skipButton}</span>
        </OverlayTrigger>
      )
  }

  function MainPageContent({ mockedApiResponse: data }) {
    return (
      <>
        <ProgressBar>
          {progressBars.map(({ variant, now }, index) =>
            <ProgressBar key={index} variant={variant} now={now} />
          )}
        </ProgressBar>
        <Badge bg="danger">Task {data.taskNumber}</Badge>
        <Badge bg="danger">{data.milestone}</Badge>
        <hr />
        <div>{data.displayHtml}</div>
        <hr />
        <ButtonToolbar className="justify-content-between">
          <ButtonGroup aria-label="First group">
            <Button variant="outline-danger" href={data.letsGoUrl} target="_blank">
              <FontAwesomeIcon icon={faRoute} />
              <span> Let's go</span>
            </Button>
            <Button variant="outline-danger">
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span> Help</span>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <SkipButton />
            <Button variant='danger' onClick={handleNextButton}>
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> Task Complete</span>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </>
    )
  }

  return (
    <Layout>
      <DatasetSelector {...{ user, handleNextButton }} />
      <br />
      {mockedApiResponse && <MainPageContent {...{ mockedApiResponse }} />}
      <Offcanvas show={isLoading} placement='top' keyboard={false}>
        <Offcanvas.Body className="text-center">
          <h2 className="text-danger">
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <span> Loading</span>
          </h2>
        </Offcanvas.Body>
      </Offcanvas>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  const userIsAuthed = (session && session.user);

  if (!userIsAuthed) {
    res.writeHead(302, { Location: '/signin' }).end();
  }
  return { props: { user: session.user.image } };

}
