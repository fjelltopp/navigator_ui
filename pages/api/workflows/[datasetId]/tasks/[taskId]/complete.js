import {
  postAuthorizedNavigatorAPI,
  deleteAuthorizedNavigatorAPI,
} from "@/lib/navigatorAPIConfig"; // FIXME set up proper namespace
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const taskCompleteRequest = (datasetId, taskId) =>
  `/workflows/${datasetId}/tasks/${taskId}/complete`;

export default withApiAuthRequired(async function user(req, res) {
  const { datasetId, taskId } = req.query;
  if (req.method === "POST") {
    return postAuthorizedNavigatorAPI(
      req,
      res,
      taskSkipRequest(datasetId, taskId)
    );
  } else if (req.method === "DELETE") {
    return deleteAuthorizedNavigatorAPI(
      req,
      res,
      taskSkipRequest(datasetId, taskId)
    );
  }
});
