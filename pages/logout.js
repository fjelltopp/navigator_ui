import { useRouter } from 'next/router'
import { makeUseAxios } from 'axios-hooks'
import { baseAxiosConfig, logoutApiRequest } from '../lib/api.js';

const useAxios = makeUseAxios(baseAxiosConfig)

export default function LogoutPage() {
    const router = useRouter()

    const [{ loading, error }] = useAxios(logoutApiRequest);

    if (loading) {
        return 'Logging out...'
    } else if (error) {
        return 'Logout Error'
    } else {
        router.push('/');
        return null;
    }

}
