import { authorizedNavigatorAPI } from "@/lib/navigatorAPIConfig";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const taskSkipRequest = (datasetId, taskId) =>
    `/workflows/${datasetId}/tasks/${taskId}/skip`;

export default withApiAuthRequired(async function user(req, res) {
    const { datasetId, taskId } = req.query;
    return authorizedNavigatorAPI(
        req,
        res,
        taskSkipRequest(datasetId, taskId),
        "POST"
    );
});
