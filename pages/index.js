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
} from '../components/MainThreeactionButtons.js';
import { makeUseAxios } from 'axios-hooks'
import {
  baseAxiosConfig, getWorkflow, getWorkflowTask,
  taskSkipRequest
} from '../lib/api.js';
import { actions } from '../lib/actionButtons.js';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function Index(props) {
  const [isLoading, setLoading] = useState(false);
  const [workflow, setWorkflow] = useState();

  async function runWithFakeLoading(asyncFunction) {
    setLoading(true);
    await new Promise((resolve) =>
      setTimeout(resolve, 2000));
    await asyncFunction;
    setLoading(false);
  }

  const [{ }, makeApiRequest] = useAxios(
    null, { manual: true }
  );
  async function fetchWorkflow() {
    runWithFakeLoading(
      makeApiRequest(
        getWorkflow(props.currentDatasetId)
      ).then(res => setWorkflow(res.data))
    )
  }

  useEffect(() => {
    fetchWorkflow();
  }, [props.currentDatasetId]);

  function carryOutActions(actionsToCarryOut) {
    if (!actionsToCarryOut) {
      alert('No action set');
      return;
    }
    const updateWorkflowComplete = complete => {
      const apiRequest = complete
        ? taskCompleteRequest
        : taskCompleteDeleteRequest
      makeApiRequest(
        apiRequest(
          props.currentDatasetId,
          workflow.currentTask.id
        )
      ).then(() => {
        let updatedWorkflow = { ...workflow };
        updatedWorkflow.currentTask.details.complete = complete;
        setWorkflow(updatedWorkflow)
      })
    }
    actionsToCarryOut.map(async action => {
      if (action === actions.markTaskAsComplete) {
        updateWorkflowComplete(true);
      } else if (action === actions.markTaskAsIncomplete) {
        updateWorkflowComplete(false);
      } else if ([
        actions.getPreviousTask,
        actions.getNextTask
      ].includes(action)) {
        const taskBreadcrumbs = workflow.taskBreadcrumbs;
        const indexOfCurrentTask = taskBreadcrumbs.indexOf(workflow.currentTask.id);
        const newTaskId = action === actions.getPreviousTask
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
      } else if (action === actions.skipTask) {
        // TODO: finish implementing and test
        // why this request is cancelled and the next request
        // is immediatly kicked off without waiting for this one to complete
        await makeApiRequest(
          taskSkipRequest(
            props.currentDatasetId,
            workflow.currentTask.id
          )
        )
      } else if (action === actions.fetchLatestWorkflowState) {
        await fetchWorkflow();
      } else {
        throw new Error([`Unknown action: ${action}`])
      }
    });
  }

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
                  <TaskCompleteCheckbox
                    workflow={{ currentTask, taskBreadcrumbs }}
                    handleClick={carryOutActions}
                  />
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
                  <MainThreeActionButtons
                    workflow={{ currentTask, taskBreadcrumbs }}
                    handleClick={carryOutActions}
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
        user={props.user}
      />
      {workflow && workflow.id &&
        <MainPageContent {...workflow} />
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
