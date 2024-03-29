import { useState, useEffect } from "react";
import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import {
  Row,
  Col,
  ButtonToolbar,
  ListGroup,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "@/components/Layout";
import DatasetSelector from "@/components/DatasetSelector";
import LogsComponent from "@/components/LogsComponent";
import LoadingComponent from "@/components/LoadingComponent";
import MilestonesSidebar from "@/components/MilestonesSidebar";
import {
  FetchWorkflowError,
  FetchWorkflowTaskError,
  FetchMilestoneError,
  MarkTaskAsCompleteError,
  MarkTaskAsIncompleteError,
  SkipTaskError,
} from "@/components/ErrorComponents";
import {
  TaskCompleteCheckbox,
  MainThreeActionButtons,
} from "@/components/ActionButtons";
import { makeUseAxios } from "axios-hooks";
import {
  baseAxiosConfig,
  getWorkflow,
  getWorkflowTask,
  getMilestone,
  taskSkipRequest,
  taskCompleteRequest,
  taskCompleteDeleteRequest,
} from "@/lib/api";
import { getWorkflowStats } from "@/lib/actionButtons";
import { actions } from "@/lib/actionButtons";

export default function IndexPage(props) {
  const router = useRouter();
  const { locale } = router;
  const { datasetId, taskId } = router.query;
  const useAxios = makeUseAxios(baseAxiosConfig(locale));

  const [showDebugData, setshowDebugData] = useState(false);
  const [workflow, setWorkflow] = useState();
  const [_loading, setLoading] = useState(false);
  const [actionError, _setActionError] = useState(null);
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  function setActionError(name, error) {
    _setActionError({ name, error });
  }
  const setDatasetIdQueryParam = (datasetId) => {
    const url = {
      pathname: router.pathname,
      query: { datasetId },
    };
    router.push(url, undefined, { shallow: true, locale });
  };
  const setTaskIdQueryParam = (taskId) => {
    const url = {
      pathname: router.pathname,
      query: { datasetId: props.currentDatasetId, taskId },
    };
    router.push(url, undefined, { shallow: true, locale });
  };

  const [
    { loading: fetchWorkflowLoading, error: fetchWorkflowError },
    _fetchWorkflow,
  ] = useAxios(null, { manual: true });
  const [
    { loading: fetchWorkflowTaskLoading, error: fetchWorkflowTaskError },
    _fetchWorkflowTask,
  ] = useAxios(null, { manual: true });
  const [
    { loading: fetchMilestoneLoading, error: fetchMilestoneError },
    _fetchMilestone,
  ] = useAxios(null, { manual: true });
  const [{ loading: markTaskAsCompleteLoading }, _markTaskAsComplete] =
    useAxios(null, { manual: true });
  const [{ loading: markTaskAsIncompleteLoading }, _markTaskAsIncomplete] =
    useAxios(null, { manual: true });
  const [{ loading: skipTaskLoading }, _skipTask] = useAxios(null, {
    manual: true,
  });

  const loading =
    _loading ||
    fetchWorkflowLoading ||
    fetchWorkflowTaskLoading ||
    fetchMilestoneLoading ||
    skipTaskLoading;

  function fetchWorkflow() {
    _fetchWorkflow(getWorkflow(props.currentDatasetId)).then((res) =>
      setWorkflow(res.data)
    );
  }
  function updateWorkflowTask(newTaskId) {
    _fetchWorkflowTask(getWorkflowTask(props.currentDatasetId, newTaskId)).then(
      ({ data }) => {
        let updatedWorkflow = { ...workflow };
        updatedWorkflow.currentTask = { ...data };
        setWorkflow(updatedWorkflow);
      }
    );
  }
  function updateWorkflowTaskFromMilestoneId(milestoneId) {
    setLoading(true);
    setActionError(null);
    _fetchMilestone(getMilestone(props.currentDatasetId, milestoneId))
      .then(({ data }) => {
        if (data.tasks) {
          const firstTaskIdInMilestone = data.tasks[0].id;
          updateWorkflowTask(firstTaskIdInMilestone);
        } else {
          console.error(`Milestone ${milestoneId} has no tasks`);
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchWorkflow();
    setActionError(null);
  }, [props.currentDatasetId]);

  useEffect(() => {
    if (workflow) {
      const redirectToDatasetId =
        initialPageLoad && datasetId && props.currentDatasetId != datasetId;
      const redirectToTaskId =
        initialPageLoad && taskId && workflow.currentTask.id != taskId;
      if (redirectToDatasetId) {
        console.log("redirecting to datasetId", datasetId);
        props.setCurrentDatasetId(datasetId);
      } else if (redirectToTaskId) {
        console.log("redirecting to taskId", taskId);
        updateWorkflowTask(taskId);
      } else {
        setTaskIdQueryParam(workflow.currentTask.id);
      }
    }
  }, [workflow, datasetId, taskId]);

  function carryOutActions(actionToCarryOut) {
    setInitialPageLoad(false);
    setActionError(null);
    const updateWorkflowComplete = (complete, postToApi) => {
      function updateLocalState() {
        let updatedWorkflow = { ...workflow };
        updatedWorkflow.currentTask.completed = complete;
        setWorkflow(updatedWorkflow);
      }
      if (postToApi) {
        const apiClient = complete
          ? _markTaskAsComplete
          : _markTaskAsIncomplete;
        const apiRequest = complete
          ? taskCompleteRequest
          : taskCompleteDeleteRequest;
        apiClient(apiRequest(props.currentDatasetId, workflow.currentTask.id))
          .then(() => updateLocalState())
          .catch((error) => {
            const errorName = complete
              ? "MarkTaskAsCompleteError"
              : "MarkTaskAsIncompleteError";
            setActionError(errorName, error);
          });
      } else {
        updateLocalState();
      }
    };
    const getPreviousOrNextTask = (actionToCarryOut) => {
      const taskBreadcrumbs = workflow.taskBreadcrumbs;
      const indexOfCurrentTask = taskBreadcrumbs.indexOf(
        workflow.currentTask.id
      );
      const newTaskId =
        actionToCarryOut === actions.getPreviousTask
          ? taskBreadcrumbs[indexOfCurrentTask - 1]
          : taskBreadcrumbs[indexOfCurrentTask + 1];
      return newTaskId;
    };
    if (actionToCarryOut === actions.markTaskAsComplete) {
      updateWorkflowComplete(true, true);
    } else if (actionToCarryOut === actions.markTaskAsIncomplete) {
      updateWorkflowComplete(false, true);
    } else if (
      [actions.getPreviousTask, actions.getNextTask].includes(actionToCarryOut)
    ) {
      const newTaskId = getPreviousOrNextTask(actionToCarryOut);
      updateWorkflowTask(newTaskId);
    } else if (
      actionToCarryOut === actions.skipTaskAndFetchLatestWorkflowState
    ) {
      _skipTask(
        taskSkipRequest(props.currentDatasetId, workflow.currentTask.id)
      )
        .then(() => fetchWorkflow())
        .catch((error) => setActionError("SkipTaskError", error));
    } else if (actionToCarryOut === actions.skipTaskAndGetNextTask) {
      _skipTask(
        taskSkipRequest(props.currentDatasetId, workflow.currentTask.id)
      )
        .then(() => {
          const newTaskId = getPreviousOrNextTask(actions.getNextTask);
          updateWorkflowTask(newTaskId);
        })
        .catch((error) => setActionError("SkipTaskError", error));
    } else if (actionToCarryOut === actions.skipTaskAndGetPreviousTask) {
      _skipTask(
        taskSkipRequest(props.currentDatasetId, workflow.currentTask.id)
      )
        .then(() => {
          const newTaskId = getPreviousOrNextTask(actions.getPreviousTask);
          updateWorkflowTask(newTaskId);
        })
        .catch((error) => setActionError("SkipTaskError", error));
    } else if (actionToCarryOut === actions.fetchLatestWorkflowState) {
      fetchWorkflow();
    } else if (actionToCarryOut === actions.toggleCompleteStateLocally) {
      updateWorkflowComplete(!workflow.currentTask.completed, false);
    } else {
      throw new Error([`Unknown action: ${actionToCarryOut}`]);
    }
  }

  function WorkflowComponent({ workflow }) {
    const { isLatestTask } = getWorkflowStats(workflow);

    function HelpUrlsComponent({ helpUrls }) {
      return (
        <Row id="HelpUrlsComponent">
          <Col md={9}>
            <ListGroup variant="flush">
              {helpUrls.map((action, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  variant="light"
                  className="text-danger bg-white"
                  href={action.url}
                  target="_blank"
                >
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faLink} className="me-2" />
                    </Col>
                    <Col>{action.label}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      );
    }

    return (
      <div id="WorkflowComponent" className={loading ? "loading" : ""}>
        <ProgressBar className="mt-2">
          <ProgressBar variant="danger" now={workflow.progress || 1} />
        </ProgressBar>
        <br />
        <Row>
          <Col md={3}>
            <MilestonesSidebar
              milestones={workflow.milestones}
              currentMilestoneId={workflow.currentTask.milestoneID}
              milestoneListFullyResolved={workflow.milestoneListFullyResolved}
              updateWorkflowTaskFromMilestoneId={
                updateWorkflowTaskFromMilestoneId
              }
            />
          </Col>
          <Col className="border-start">
            {!loading && <TaskDetailsError />}
            <Alert
              variant="warning"
              show={!loading && !workflow.currentTask.reached}
            >
              <span>{t`You are previewing a future task`}</span>
            </Alert>
            {!loading &&
              workflow.message &&
              isLatestTask &&
              !initialPageLoad && (
                <Alert variant={workflow.message.level}>
                  {workflow.message.text}
                </Alert>
              )}
            <h4>
              {loading ? (
                <Skeleton width="75%" />
              ) : (
                workflow.currentTask.details.title
              )}
            </h4>
            <br />
            {loading ? (
              <Skeleton count={15} />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: workflow.currentTask.details.displayHTML,
                }}
              ></div>
            )}
            <Row className="mt-4">
              <Col xs={9}>
                {!loading && workflow.currentTask.details.helpURLs && (
                  <HelpUrlsComponent
                    helpUrls={workflow.currentTask.details.helpURLs}
                  />
                )}
              </Col>
              <Col xs={3} className="d-flex align-items-end flex-column">
                <div className="mt-auto">
                  <TaskCompleteCheckbox
                    workflow={{
                      currentTask: workflow.currentTask,
                      taskBreadcrumbs: workflow.taskBreadcrumbs,
                    }}
                    handleClick={carryOutActions}
                    {...{
                      showDebugData,
                      markTaskAsCompleteLoading,
                      markTaskAsIncompleteLoading,
                    }}
                  />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <div id="WorkflowAndTaskIds">
                  <div>
                    <Trans
                      id="Dataset: {datasetId}"
                      values={{ datasetId: props.currentDatasetId }}
                    />
                  </div>
                  <div>
                    <Trans
                      id="Workflow: {workflowId}"
                      values={{ workflowId: workflow.id }}
                    />
                    <span> | </span>
                    <Trans
                      id="Task: {taskId}"
                      values={{ taskId: workflow.currentTask.id }}
                    />
                  </div>
                  <div>
                    <a
                      onClick={() => setshowDebugData(!showDebugData)}
                    >{t`Debug Mode`}</a>
                  </div>
                </div>
              </Col>
              <Col>
                <ButtonToolbar className="justify-content-end">
                  <MainThreeActionButtons
                    workflow={{
                      currentTask: workflow.currentTask,
                      taskBreadcrumbs: workflow.taskBreadcrumbs,
                    }}
                    handleClick={carryOutActions}
                    showDebugData={showDebugData}
                  />
                </ButtonToolbar>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  function MainPageContentOrError() {
    const errorComponent = () => {
      if (fetchWorkflowError) {
        return (
          <FetchWorkflowError
            error={{ title: "FetchWorkflowError", data: fetchWorkflowError }}
            currentDatasetId={props.currentDatasetId}
            datasets={props.user.datasets}
          />
        );
      } else if (fetchWorkflowTaskError) {
        return (
          <FetchWorkflowTaskError
            error={{
              title: "FetchWorkflowTaskError",
              data: fetchWorkflowTaskError,
            }}
          />
        );
      } else if (fetchMilestoneError) {
        return (
          <FetchMilestoneError
            error={{
              title: "fetchMilestoneError",
              data: fetchMilestoneError,
            }}
          />
        );
      }
    };
    if (errorComponent()) {
      return <div className="mt-3 mb-1">{errorComponent()}</div>;
    } else if (workflow && workflow.id) {
      return <WorkflowComponent {...{ workflow }} />;
    } else {
      return (
        <div className="mt-4 mb-2">
          <LoadingComponent />
        </div>
      );
    }
  }

  function TaskDetailsError() {
    if (actionError) {
      switch (actionError.name) {
        case "MarkTaskAsCompleteError":
          return (
            <MarkTaskAsCompleteError
              error={{
                title: actionError.name,
                data: actionError.error,
              }}
            />
          );
        case "MarkTaskAsIncompleteError":
          return (
            <MarkTaskAsIncompleteError
              error={{
                title: actionError.name,
                data: actionError.error,
              }}
            />
          );
        case "SkipTaskError":
          return (
            <SkipTaskError
              error={{
                title: actionError.name,
                data: actionError.error,
              }}
            />
          );
        case null:
          return null;
        default:
          return `actionError.name ${actionError.name} unhandled`;
      }
    } else {
      return null;
    }
  }

  return (
    <Layout>
      <DatasetSelector
        currentDatasetId={props.currentDatasetId}
        setCurrentDatasetId={setDatasetIdQueryParam}
        datasets={props.user.datasets}
      />
      <MainPageContentOrError />
      {showDebugData && (
        <LogsComponent
          objects={[
            { title: "workflow", data: workflow },
            { title: "props", data: props },
          ]}
        />
      )}
    </Layout>
  );
}
