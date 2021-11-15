import React, { useState, useEffect } from 'react';
import {
  Row, Col, ButtonToolbar, ListGroup, Offcanvas,
  ProgressBar
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLink } from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../components/Layout'
import DatasetSelector from '../components/DatasetSelector';
import MilestonesSidebar from '../components/MilestonesSidebar';
import {
  TaskCompleteCheckbox,
  MainThreeActionButtons
} from '../components/MainThreeActionButtons';
import { getWorkflow } from '../lib/api';

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

  async function updateworkflow() {
    await twentyMilisecondDelay();
    await props.fetchWorkflow(
      getWorkflow(props.currentDatasetId),
      { manual: true }
    );
  }

  useEffect(() => {
    updateworkflow();
  }, [props.currentDatasetId]);

  function MainPageContent({ id: workflowId, milestones, currentTask, taskBreadcrumbs, progress }) {

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
          <ProgressBar variant="danger" now={progress} />
        </ProgressBar>
        <br />
        <Row>
          <Col md={3}>
            <MilestonesSidebar
              milestones={milestones}
              currentMilestoneId={currentTask.milestoneID}
              milestoneListFullyResolved={currentTask.milestoneListFullyResolved}
            />
          </Col>
          <Col className="border-start">
            <h4>{currentTask.details.title}</h4>
            <br />
            <div dangerouslySetInnerHTML={{ __html: currentTask.details.displayHTML }}></div>
            <Row>
              <Col xs={9}>
                {currentTask.details.helpURLs &&
                  <>
                    <br />
                    <HelpUrlsComponent helpUrls={currentTask.details.helpURLs} />
                  </>
                }
              </Col>
              <Col xs={3} className="d-flex align-items-end flex-column">
                <div className="mt-auto">
                  <TaskCompleteCheckbox {...{ currentTask, taskBreadcrumbs }} />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <div id="WorkflowAndTaskIds">
                  <span>Workflow {workflowId}</span>
                  <br />
                  <span>Task {currentTask.id}</span>
                </div>
              </Col>
              <Col>
                <ButtonToolbar className="justify-content-end">
                  <MainThreeActionButtons {...{ currentTask, taskBreadcrumbs }} />
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
      {props.workflow && props.workflow.id &&
        <MainPageContent {...props.workflow} />
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
