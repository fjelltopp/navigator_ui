import { getAuthorizedNavigatorAPI } from "@/lib/navigatorAPIConfig"; // FIXME set up proper namespace
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const getWorkflowTask = (datasetId, taskId) =>
  `/workflows/${datasetId}/tasks/${taskId}`;

export default withApiAuthRequired(async function user(req, res) {
  const { datasetId, taskId } = req.query;
  return getAuthorizedNavigatorAPI(
    req,
    res,
    getWorkflowTask(datasetId, taskId)
  );
});
