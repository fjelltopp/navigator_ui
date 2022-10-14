import { getAuthorizedNavigatorAPI } from "@/lib/navigatorAPIConfig"; // FIXME set up proper namespace
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const getWorkflow = (datasetId) => `/workflows/${datasetId}/state`;

export default withApiAuthRequired(async function user(req, res) {
  const { datasetId } = req.query;
  return getAuthorizedNavigatorAPI(req, res, getWorkflow(datasetId));
});
