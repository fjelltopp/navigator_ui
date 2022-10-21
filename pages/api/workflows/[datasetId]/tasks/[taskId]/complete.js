import {
    authorizedNavigatorAPI,
} from "@/lib/navigatorAPIConfig";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const taskCompleteRequest = (datasetId, taskId) =>
    `/workflows/${datasetId}/tasks/${taskId}/complete`;

export default withApiAuthRequired(async function user(req, res) {
    const { datasetId, taskId } = req.query;
    return authorizedNavigatorAPI(
        req,
        res,
        taskCompleteRequest(datasetId, taskId),
        req.method
    );
});
