import React, { useState, useEffect } from 'react';
import {
  Row, Col, ButtonToolbar, ButtonGroup, Button, OverlayTrigger,
  Tooltip, Offcanvas, ProgressBar, ListGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleDoubleRight, faCircle,
  faCheckCircle, faCircleNotch, faLink, faAngleRight,
  faCheckSquare, faSquare
} from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../components/Layout'
import DatasetSelector from '../components/DatasetSelector';
import MilestonesSidebar from '../components/MilestonesSidebar';
import { getDatasetState, completeWorkflowTask, skipWorkflowTask } from '../lib/api';

export default function Index(props) {
  const [isLoading, setLoading] = useState(false);

  // TODO: stop faking these
  const [taskComplete, setTaskComplete] = useState(true);
  const displayAdditionalMilestonesLabel = true;

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

    function TaskCompleteButton() {
      // TODO: implement
      // TODO: better fa integration because faSquare sucks
      if (taskComplete) {
        return (
          <Button
            variant="outline-success"
            onClick={() => setTaskComplete(!taskComplete)}
          >
            <span>Task Complete</span>
            <FontAwesomeIcon icon={faCheckSquare} className="ms-2" />
          </Button>
        )
      } else {
        return (
          <Button
            variant="outline-danger"
            onClick={() => setTaskComplete(!taskComplete)}
          >
            <span>Task Incomplete</span>
            <FontAwesomeIcon icon={faSquare} className="ms-2" />
          </Button>
        )
      }
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
          <FontAwesomeIcon icon={faAngleRight} className="me-2" />
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
          <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
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
          <FontAwesomeIcon icon={faAngleDoubleRight} className="me-2" />
          <span>What's Next?</span>
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
            <MilestonesSidebar
              milestones={milestones}
              currentMilestoneId={currentMilestone.id}
            />
          </Col>
          <Col className="border-start">
            <h4>{currentTask.details.title}</h4>
            <br />
            <div dangerouslySetInnerHTML={{ __html: currentTask.details.displayHtml }}></div>
            <Row>
              <Col xs={9}>
                {currentTask.details.helpUrls &&
                  <>
                    <br />
                    <HelpUrlsComponent helpUrls={currentTask.details.helpUrls} />
                  </>
                }
              </Col>
              <Col xs={3} className="d-flex align-items-end flex-column">
                <div className="mt-auto">
                  <TaskCompleteButton />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <div id="WorkflowAndTaskIds" className="text-muted">
                  <span>Debug info:</span>
                  <br />
                  <span>Workflow {workflowId}</span>
                  <br />
                  <span>Task {currentTask.id}</span>
                </div>
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
