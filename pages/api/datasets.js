import { authorizedNavigatorAPI } from "@/lib/navigatorAPIConfig";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function user(req, res) {
    return authorizedNavigatorAPI(req, res, "/datasets/");
});
