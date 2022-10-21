import { authorizedNavigatorAPI } from "@/lib/navigatorAPIConfig"; // FIXME set up proper namespace
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const getWorkflowTasks = (datasetId) => `/workflows/${datasetId}/tasks`;

export default withApiAuthRequired(async function user(req, res) {
    const { datasetId } = req.query;
    return authorizedNavigatorAPI(req, res, getWorkflowTasks(datasetId));
});
