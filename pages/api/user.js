/// NOTES
// So, the getAccessToken is working, but I can't seem to hit any oldapi endpoints with fetch... so I am trying to use axios.. but I can't use hooks
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios'

function baseAxiosConfig(accessToken) {
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
        headers: {
            // 'Accept-Language': locale,
            'authorization': `Bearer ${accessToken}`
        }
    })
}

export default withApiAuthRequired(async function user(req, res) {
    try {
        // const router = useRouter();
        // const { locale } = router;
        const { accessToken } = await getAccessToken(req, res);
        const apiResponse = await baseAxiosConfig(accessToken).get('user/')
        res.status(200).json(apiResponse.data);
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message
        });
    }
});
