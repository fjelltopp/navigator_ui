import React, { useState, useEffect } from 'react';
import {
  Row, Col, ButtonToolbar, ListGroup, Offcanvas,
  ProgressBar, Alert
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faLink, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../components/Layout'
import DatasetSelector from '../components/DatasetSelector';
import MilestonesSidebar from '../components/MilestonesSidebar';
import {
  TaskCompleteCheckbox,
  MainThreeActionButtons
} from '../components/ActionButtons';
import { makeUseAxios } from 'axios-hooks'
import {
  baseAxiosConfig, getWorkflow, getWorkflowTask,
  taskSkipRequest, taskCompleteRequest, taskCompleteDeleteRequest
} from '../lib/api';
import { actions } from '../lib/actionButtons';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function Index(props) {
  const [displayState, setDisplayState] = useState(false);
  const [workflow, setWorkflow] = useState();

  const [{ loading, error }, makeApiRequest] = useAxios(
    null, { manual: true }
  );
  async function fetchWorkflow() {
    makeApiRequest(
      getWorkflow(props.currentDatasetId)
    ).then(res => setWorkflow(res.data))
  }

  useEffect(() => {
    fetchWorkflow();
  }, [props.currentDatasetId]);

  function carryOutActions(actionToCarryOut) {
    const updateWorkflowComplete = (complete, postToApi) => {
      function updateLocalState() {
        let updatedWorkflow = { ...workflow };
        updatedWorkflow.currentTask.details.complete = complete;
        setWorkflow(updatedWorkflow)
      }
      if (postToApi) {
        const apiRequest = complete
          ? taskCompleteRequest
          : taskCompleteDeleteRequest
        makeApiRequest(
          apiRequest(
            props.currentDatasetId,
            workflow.currentTask.id
          )
        ).then(() => updateLocalState())
      } else {
        updateLocalState();
      }
    }
    if (actionToCarryOut === actions.markTaskAsComplete) {
      updateWorkflowComplete(true, true);
    } else if (actionToCarryOut === actions.markTaskAsIncomplete) {
      updateWorkflowComplete(false, true);
    } else if ([
      actions.getPreviousTask,
      actions.getNextTask
    ].includes(actionToCarryOut)) {
      const taskBreadcrumbs = workflow.taskBreadcrumbs;
      const indexOfCurrentTask = taskBreadcrumbs.indexOf(workflow.currentTask.id);
      const newTaskId = actionToCarryOut === actions.getPreviousTask
        ? taskBreadcrumbs[indexOfCurrentTask - 1]
        : taskBreadcrumbs[indexOfCurrentTask + 1]
      makeApiRequest(
        getWorkflowTask(
          props.currentDatasetId,
          newTaskId
        )
      ).then(({ data }) => {
        let updatedWorkflow = { ...workflow };
        updatedWorkflow.currentTask = { ...data };
        setWorkflow(updatedWorkflow);
      })
    } else if (actionToCarryOut === actions.skipTaskAndFetchLatestWorkflowState) {
      makeApiRequest(
        taskSkipRequest(
          props.currentDatasetId,
          workflow.currentTask.id
        )
      ).then(() => fetchWorkflow());
    } else if (actionToCarryOut === actions.fetchLatestWorkflowState) {
      fetchWorkflow();
    } else if (actionToCarryOut === actions.toggleCompleteStateLocally) {
      updateWorkflowComplete(!workflow.currentTask.details.complete, false);
    } else {
      throw new Error([`Unknown action: ${actionToCarryOut}`])
    }
  }

  function MainPageContent({ id: workflowId, milestones, message, currentTask, taskBreadcrumbs, progress, milestoneListFullyResolved }) {

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
          <ProgressBar variant="danger" now={progress || 1} />
        </ProgressBar>
        <br />
        <Row>
          <Col md={3}>
            <MilestonesSidebar
              milestones={milestones}
              currentMilestoneId={currentTask.milestoneID}
              milestoneListFullyResolved={milestoneListFullyResolved}
            />
          </Col>
          <Col className="border-start">
            {message && (
              <Alert variant={message.level}>{message.text}</Alert>
            )}
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
                  <TaskCompleteCheckbox
                    workflow={{ currentTask, taskBreadcrumbs }}
                    handleClick={carryOutActions}
                    displayState={displayState}
                  />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <div id="WorkflowAndTaskIds">
                  <div>Workflow {workflowId}</div>
                  <div>Task {currentTask.id}</div>
                  <div>
                    <a onClick={() => setDisplayState(!displayState)}>Debug Mode</a>
                  </div>
                </div>
              </Col>
              <Col>
                <ButtonToolbar className="justify-content-end">
                  <MainThreeActionButtons
                    workflow={{ currentTask, taskBreadcrumbs }}
                    handleClick={carryOutActions}
                    displayState={displayState}
                  />
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
      <DatasetSelector
        currentDatasetId={props.currentDatasetId}
        setCurrentDatasetId={props.setCurrentDatasetId}
        datasets={props.user.datasets}
      />
      {workflow && workflow.id &&
        <MainPageContent {...workflow} />
      }
      <Offcanvas show={loading} placement="top" keyboard={false}>
        <Offcanvas.Body className="text-center">
          <h2 className="text-danger">
            <FontAwesomeIcon icon={faCircleNotch} spin className="me-2" />
            <span>Please wait...</span>
          </h2>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={error} placement="top" keyboard={false}>
        <Offcanvas.Body className="text-center">
          <h4 className="text-danger">
            <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
            <span>Something went wrong, please refresh this page</span>
          </h4>
        </Offcanvas.Body>
      </Offcanvas>
      {displayState && (
        <>
          <hr />
          <pre style={{ fontSize: 10 }}>{JSON.stringify(workflow, null, 3)}</pre>
        </>
      )}
    </Layout>
  )

}
