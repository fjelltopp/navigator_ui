import React, { useState, useEffect } from 'react';
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
import getMockedApiResponse from '../lib/MockedApiResponse';


export default function Index(props) {
  // const [isLoading, setLoading] = useState(true);
  // const [mockedApiResponse, setMockedApiResponse] = useState();

  // useEffect(() => {
  //   if (isLoading) {
  //     function simulateNetworkRequest() {
  //       return new Promise((resolve) => setTimeout(resolve, 2000));
  //     }
  //     simulateNetworkRequest().then(() => {
  //       setLoading(false);
  //       setMockedApiResponse(getMockedApiResponse());
  //       props.fetchDatasetState({
  //         params: { dataset_id: props.currentDatasetId }
  //       })
  //     });
  //   }
  // }, [isLoading]);
  useEffect(() => {
    props.fetchDatasetState({
      params: { dataset_id: props.currentDatasetId }
    })
  }, [props.currentDatasetId]);

  const handleNextButton = () => props.fetchDatasetState({
    method: 'post',
    data: {
      dataset_id: props.currentDatasetId,
      action: 'next_step',
      last_updated: props.datasetState.last_updated
    },
  }).then(() => props.fetchDatasetState({
    params: { dataset_id: props.currentDatasetId }
  }))
  const progressBars = [
    { variant: 'danger', now: props.datasetState && props.datasetState.percentage },
    { variant: 'secondary', now: props.datasetState && props.datasetState.grey }
  ];

  // function SkipButton() {
  //   const skipButton = (
  //     <Button
  //       variant='danger'
  //       onClick={handleNextButton}
  //       disabled={!mockedApiResponse.skippable}
  //     >
  //       <FontAwesomeIcon icon={faAngleDoubleRight} />
  //       <span> Skip</span>
  //     </Button>
  //   )
  //   return mockedApiResponse.skippable
  //     ? skipButton
  //     : (
  //       <OverlayTrigger
  //         placement={'bottom'}
  //         overlay={<Tooltip>This task cannot be skipped</Tooltip>}
  //       >
  //         <span style={{ marginRight: -2 }}>{skipButton}</span>
  //       </OverlayTrigger>
  //     )
  // }

  function MainPageContent({ data }) {
    return (
      <>
        <ProgressBar>
          {progressBars.map(({ variant, now }, index) =>
            <ProgressBar key={index} variant={variant} now={now} />
          )}
        </ProgressBar>
        <Badge bg="danger">Task {data.task_number}</Badge>
        <Badge bg="danger">{data.milestone}</Badge>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: data.display_html }}></div>
        <hr />
        <ButtonToolbar className="justify-content-between">
          <ButtonGroup aria-label="First group">
            <Button variant="outline-danger" href={data.lets_go_url} target="_blank">
              <FontAwesomeIcon icon={faRoute} />
              <span> Let's go</span>
            </Button>
            <Button variant="outline-danger">
              <FontAwesomeIcon icon={faQuestionCircle} />
              <span> Help</span>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            {/* <SkipButton /> */}
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
      <DatasetSelector {...{ ...props, handleNextButton }} />
      <br />
      {props.datasetState && <MainPageContent {...{ data: props.datasetState }} />}
      {/* <Offcanvas show={props.datasetStateLoading} placement='top' keyboard={false}>
        <Offcanvas.Body className="text-center">
          <h2 className="text-danger">
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <span> Please wait...</span>
          </h2>
        </Offcanvas.Body>
      </Offcanvas> */}
    </Layout>
  )

}
