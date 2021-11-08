import React, { useState, useEffect } from 'react';
import {
  Row, Col, ButtonToolbar, ButtonGroup, Button, OverlayTrigger,
  Tooltip, Offcanvas, ProgressBar, Badge, ListGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft, faAngleDoubleRight, faCircle,
  faCheckCircle, faCircleNotch, faLink,
} from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../components/Layout'
import DatasetSelector from '../components/DatasetSelector';
import { getDatasetState, completeWorkflowTask, skipWorkflowTask } from '../lib/api';

export default function Index(props) {
  const [isLoading, setLoading] = useState(false);

  async function twentyMilisecondDelay() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return setLoading(false);
  }

  async function updateDatasetState() {
    await twentyMilisecondDelay();
    await props.fetchDatasetState(
      getDatasetState(props.currentDatasetId),
      { manual: true }
    );
  }

  useEffect(() => {
    updateDatasetState();
  }, [props.currentDatasetId]);

  function MainPageContent({ id: workflowId, milestones, taskBreadcrumps, currentTask }) {

    const currentMilestone = milestones.filter(
      milestone => milestone.id === currentTask.details.milestoneId
    )[0];
    const progressBars = [
      { variant: "danger", now: currentMilestone.progress },
      // TODO: figure out if we've gone back steps and add
      // the grey part of the progress bar back:
      // { variant: "secondary", now: 10 }
    ];

    const handleNextButton = async apiRequest => {
      const apiRequestConfig = apiRequest(workflowId, currentTask.id);
      await props.fetchDatasetState(apiRequestConfig);
      await updateDatasetState();
    }

    function SkipWorkflowTaskButton() {
      const handleClick = () =>
        handleNextButton(skipWorkflowTask);
      const button = (
        <Button
          variant="danger"
          onClick={handleClick}
          disabled={!currentTask.details.skippable}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} className="me-2" />
          <span>Next Task</span>
        </Button>
      )
      if (currentTask.details.skippable) {
        return button;
      } else {
        return (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>This task cannot be skipped</Tooltip>}
          >
            <span style={{ marginRight: -2 }}>{button}</span>
          </OverlayTrigger>
        )
      }
    }

    function GoBackOneStepWorkflowTaskButton() {
      // TODO: build back button functionality
      const handleClick = () =>
        alert('This feature is not built yet');
      return (
        <Button
          variant="danger"
          onClick={handleClick}
          disabled={!taskBreadcrumps.lenth}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="me-2" />
          <span>Prior Task</span>
        </Button>
      )
    }

    function CompleteWorkflowTaskButton() {
      const handleClick = () =>
        handleNextButton(completeWorkflowTask);
      return (
        <Button
          variant="danger"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
          <span>I'm Done</span>
        </Button>
      )
    }

    function HelpUrlsComponent({ helpUrls }) {
      return (
        <Row id="HelpUrlsComponent">
          <Col md={6}>
            <ListGroup variant="flush">
              {helpUrls.map((action, index) =>
                <ListGroup.Item
                  key={index}
                  action as="a"
                  className="link-danger"
                  href={action.url}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} className="me-2" />
                  <span>{action.label}</span>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )
    }

    return (
      <>
        <ProgressBar className="mt-2">
          {progressBars.map(({ variant, now }, index) =>
            <ProgressBar key={index} variant={variant} now={now} />
          )}
        </ProgressBar>
        <br />
        <Row>
          <Col md={3}>
            <ListGroup id="MilestoneStatus" variant="flush">
              {milestones.map(milestone =>
                <ListGroup.Item
                  key={milestone.id}
                  variant={currentMilestone.id === milestone.id ? 'dark' : ''}
                >
                  <FontAwesomeIcon
                    className={`me-2 ${milestone.completed ? 'text-success' : 'text-muted'}`}
                    icon={milestone.completed ? faCheckCircle : faCircle}
                  />
                  <span>{milestone.title}</span>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col className="border-start">
            <h3>{currentTask.details.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: currentTask.details.displayHtml }}></div>
            {currentTask.details.helpUrls &&
              <>
                <br />
                <HelpUrlsComponent helpUrls={currentTask.details.helpUrls} />
              </>
            }
            <hr />
            <Row>
              <Col>
                <small className="text-muted">Workflow {workflowId}</small>
                <br />
                <small className="text-muted">Task {currentTask.id}</small>
              </Col>
              <Col>
                <ButtonToolbar className="justify-content-end">
                  <ButtonGroup>
                    <GoBackOneStepWorkflowTaskButton />
                    <SkipWorkflowTaskButton />
                    <CompleteWorkflowTaskButton />
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )

  }

  return (
    <Layout>
      <DatasetSelector {...props} />
      {props.datasetState && props.datasetState.id &&
        <MainPageContent {...props.datasetState} />
      }
      <Offcanvas show={isLoading} placement="top" keyboard={false}>
        <Offcanvas.Body className="text-center">
          <h2 className="text-danger">
            <FontAwesomeIcon icon={faCircleNotch} spin className="me-2" />
            <span>Please wait...</span>
          </h2>
        </Offcanvas.Body>
      </Offcanvas>
    </Layout>
  )

}
