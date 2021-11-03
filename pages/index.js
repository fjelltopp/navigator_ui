import React, { useState, useEffect } from 'react';
import {
  Row, Col, ButtonToolbar, ButtonGroup, Button, OverlayTrigger,
  Tooltip, Offcanvas, ProgressBar, Badge, ListGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleRight, faCheckCircle,
  faCircleNotch, faLink
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
    await props.fetchDatasetState(
      getDatasetState(props.currentDatasetId),
      { manual: true }
    );
  }

  useEffect(() => {
    updateDatasetState();
  }, [props.currentDatasetId]);

  const progressBars = [
    { variant: "danger", now: props.datasetState && props.datasetState.percentage },
    { variant: "secondary", now: props.datasetState && props.datasetState.grey }
  ];

  function MainPageContent({ id: workflowId, current_task: currentTask }) {

    const handleNextButton = async apiRequest => {
      await props.fetchDatasetState(apiRequest(workflowId, currentTask.id));
      await twentyMilisecondDelay();
      await updateDatasetState();
    }

    function SkipWorkflowTaskButton() {
      const handleClick = () =>
        handleNextButton(skipWorkflowTask);
      const button = (
        <Button
          variant="danger"
          onClick={handleClick}
          disabled={!currentTask.skippable}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
          <span> Skip</span>
        </Button>
      )
      if (currentTask.skippable) {
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

    function CompleteWorkflowTaskButton() {
      const handleClick = () =>
        handleNextButton(completeWorkflowTask);
      return (
        <Button
          variant="danger"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
          <span> Mark as complete</span>
        </Button>
      )
    }

    function ActionableLinks({ actionableLinks }) {
      return (
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              {actionableLinks.map((action, index) =>
                <ListGroup.Item
                  key={index}
                  action
                  as="a"
                  className="link-danger"
                  href={action.link}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} />
                  <span> {action.label}</span>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )
    }

    return (
      <>
        <ProgressBar>
          {progressBars.map(({ variant, now }, index) =>
            <ProgressBar key={index} variant={variant} now={now} />
          )}
        </ProgressBar>
        <Badge bg="danger">Task {currentTask.id}</Badge>
        <Badge bg="danger">{currentTask.milestone}</Badge>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: currentTask.content.display_html }}></div>
        {currentTask.content.actionable_links &&
          <>
            <br />
            <ActionableLinks actionableLinks={currentTask.content.actionable_links} />
          </>
        }
        <hr />
        <ButtonToolbar className="justify-content-end">
          <ButtonGroup>
            <SkipWorkflowTaskButton />
            <CompleteWorkflowTaskButton />
          </ButtonGroup>
        </ButtonToolbar>
      </>
    )

  }

  return (
    <Layout>
      <DatasetSelector {...props} />
      <br />
      {props.datasetState && props.datasetState.id &&
        <MainPageContent {...props.datasetState} />
      }
      <Offcanvas show={isLoading} placement="top" keyboard={false}>
        <Offcanvas.Body className="text-center">
          <h2 className="text-danger">
            <FontAwesomeIcon icon={faCircleNotch} spin />
            <span> Please wait...</span>
          </h2>
        </Offcanvas.Body>
      </Offcanvas>
    </Layout>
  )

}
