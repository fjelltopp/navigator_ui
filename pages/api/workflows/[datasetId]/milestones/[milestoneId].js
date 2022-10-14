import { getAuthorizedNavigatorAPI } from "@/lib/navigatorAPIConfig"; // FIXME set up proper namespace
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const getMilestone = (datasetId, milestoneId) =>
  `/workflows/${datasetId}/milestones/${milestoneId}`;

export default withApiAuthRequired(async function user(req, res) {
  const { datasetId, milestoneId } = req.query;
  return getAuthorizedNavigatorAPI(
    req,
    res,
    getMilestone(datasetId, milestoneId)
  );
});
