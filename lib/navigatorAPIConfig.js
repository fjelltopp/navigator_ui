import axios from 'axios';
import { getAccessToken } from '@auth0/nextjs-auth0';

export async function authorizedNavigatorAPI(req, res, url, method = 'GET') {
    try {
        const { accessToken } = await getAccessToken(req, res);
        const secureNavigatorAPIConfig = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
            headers: {
                'accept-language': req.headers['accept-language'],
                'authorization': `Bearer ${accessToken}`
            }
        });
        let apiResponse = null;
        switch (method) {
            case 'GET':
                apiResponse = await secureNavigatorAPIConfig.get(url);
                break
            case 'POST':
                apiResponse = await secureNavigatorAPIConfig.post(url);
                break
            case 'DELETE':
                apiResponse = await secureNavigatorAPIConfig.delete(url);
                break
        }
        res.status(200).json(apiResponse.data);
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message
        });
    }
    return req, res
}
