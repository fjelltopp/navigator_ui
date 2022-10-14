import axios from 'axios';
import { getAccessToken } from '@auth0/nextjs-auth0';

export async function getAuthorizedNavigatorAPI(req, res, url) {
    try {
        const { accessToken } = await getAccessToken(req, res);
        const secureNavigatorAPIConfig = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
            headers: {
                'accept-language': req.headers['accept-language'],
                'authorization': `Bearer ${accessToken}`
            }
        });
        const apiResponse = await secureNavigatorAPIConfig.get(url)
        res.status(200).json(apiResponse.data);
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message
        });
    }
    return req, res
}

export async function postAuthorizedNavigatorAPI(req, res, url) {
    try {
        const { accessToken } = await getAccessToken(req, res);
        const secureNavigatorAPIConfig = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
            headers: {
                'accept-language': req.headers['accept-language'],
                'authorization': `Bearer ${accessToken}`
            }
        });
        const apiResponse = await secureNavigatorAPIConfig.post(url)
        res.status(200).json(apiResponse.data);
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message
        });
    }
    return req, res
}

export async function deleteAuthorizedNavigatorAPI(req, res, url) {
    try {
        const { accessToken } = await getAccessToken(req, res);
        const secureNavigatorAPIConfig = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
            headers: {
                'accept-language': req.headers['accept-language'],
                'authorization': `Bearer ${accessToken}`
            }
        });
        const apiResponse = await secureNavigatorAPIConfig.delete(url)
        res.status(200).json(apiResponse.data);
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message
        });
    }
    return req, res
}
